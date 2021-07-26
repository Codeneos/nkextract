import puppeteer, { Browser } from 'puppeteer';
import * as fs from 'fs-extra';
import * as fsBase from 'fs';
import * as path from 'path';

export default class {

    private browser: Browser;
    private page: puppeteer.Page;
    private albumnTitles: { [key: string]: string } = {};

    public constructor(private headless = false) {
    }

    public async login(user: string, password: string) {
        this.browser = await puppeteer.launch(!this.headless ? { headless: true, defaultViewport: null } : { headless: false });
        this.page = await this.browser.newPage();

        console.log(`Opening nk.pl`);
        await this.page.goto('https://nk.pl/logowanie');
        await this.page.waitForTimeout(3000);

        // Accept all
        await (await this.page.$('.cmp-intro_acceptAll'))?.click({ delay: 50 });

        console.log(`Logging in as: ${user}`);
        await this.page.type('#login', user);
        await this.page.type('#password', password);
        await this.page.click('.login-box__inner form button');
        await this.page.waitForNavigation();

        // Return login frame
        return (await this.page.$('#nk_portal_wrapper #nk_portal')).contentFrame();
    }

    public async goto(url?: string) {
        console.log(`Opening ${url ?? `Profile Page`}`);
        await this.page.goto(`https://nk.pl/#${url ?? ''}`);
        await this.page.waitForTimeout(3000);
        return (await this.page.$('#nk_portal_wrapper #nk_portal')).contentFrame();
    }

    public async clickMenu(frame: puppeteer.Frame, menuItem: string) {
        console.log(`Navigating to ${menuItem}`);
        await frame.click(`#menu-mate li[data-gtm-click-value="${menuItem}"]`);
        await frame.waitForNavigation();
    }

    public async extractGalleryUrls(galleryFrame: puppeteer.Frame) {
        console.log(`Extracting Gallery URLs...`);
        const nextButtonSelector = '.gallery .pagination__item--next:not(.is-disabled)';
        const galleryUrlSelector = '.gallery div.photo__top > a:not(.photo__top__comments)';
        const urls = new Array<string>();

        while (true) {
            // Extract Urls
            urls.push(...await galleryFrame.$$eval(galleryUrlSelector, anchors => [].map.call(anchors, a => a.href)));

            // Click next button or break
            const button = await galleryFrame.$(nextButtonSelector);
            if (!button) {
                break;
            }
            await button.click();
            await galleryFrame.waitForNavigation();
        }

        console.log(`Found ${urls.length} pohotos in Gallery`);
        return urls;
    }

    public async getAlbumTitle(galleryFrame: puppeteer.Frame, galleryUrl: string) {
        const albumTitleSelector = '.breadcrumbs__item:last-child';
        const [albumKey, albumId] = galleryUrl.split('/').slice(-4);

        if (albumKey != 'album') {
            return;
        }

        if (!this.albumnTitles[albumId]) {
            const albumUrl = galleryUrl.split('/').slice(0, -2).join('/');
            await galleryFrame.goto(albumUrl);
            this.albumnTitles[albumId] = await galleryFrame.$eval(albumTitleSelector, (e: HTMLDivElement) => e.innerText);
            console.log(`Albumn ${albumId}: ${this.albumnTitles[albumId]}`);
        }

        return this.albumnTitles[albumId];
    }

    public async downloadGalleryImage(galleryFrame: puppeteer.Frame, galleryUrl: string, targetFolder: string) {
        const fullImageLink = '.gallery-photo__img > a';
        const descriptionSelector = '.gallery-photo__description > p';
        const dateSelector = '.gallery-photo__info__date time';
        const alumTitle = await this.getAlbumTitle(galleryFrame, galleryUrl);

        await galleryFrame.goto(galleryUrl);
        await galleryFrame.waitForSelector(fullImageLink, { timeout: 30000 });
        const fullImageUrl = await galleryFrame.$eval<string>(fullImageLink, (e: HTMLLinkElement) => e.href);
        const description = await galleryFrame.$(descriptionSelector) && await galleryFrame.$eval(descriptionSelector, (e: HTMLDivElement) => e.innerText.trim());
        const photoDate = new Date(await galleryFrame.$eval(dateSelector, (e: HTMLTimeElement) => e.dateTime));

        const imageName = fullImageUrl.split('/').pop();
        const basePath = alumTitle ? path.join(targetFolder, alumTitle.replace(/[/\\?%*:|"<>\(\).\n\t\r'"]/g, '')) : targetFolder;

        let baseName = description?.replace(/[/\\?%*:|"<>\(\)\,\!\.\n\t\r'"]/g, '') ?? imageName.split('.').shift();
        if (baseName.length > 50) {
            baseName = baseName.slice(0, 50);
        }

        console.log(`Downloading image: ${baseName}...`);

        const commentsPromise = this.extractComments(galleryFrame, galleryUrl);
        const imagePage = await this.browser.newPage();
        const imageSource = await imagePage.goto(fullImageUrl);
        const imagePath = path.join(basePath, baseName + path.extname(imageName));

        try {
            await fs.outputFile(imagePath, await imageSource.buffer());
            fsBase.utimesSync(imagePath, photoDate, photoDate);
        } catch (err) {
            console.warn(`Error while saving photo: ${baseName}`);
        } finally {
            await imagePage.close();
        }

        const comments = await commentsPromise;
        if (comments.length > 0) {
            console.log(` - Save ${comments.length} comments as JSON meta`);
            const commentsPath = path.join(basePath, baseName + '.comments.json');
            await fs.outputFile(commentsPath, JSON.stringify(comments, undefined, 4));
        }
    }

    public async extractComments(frame: puppeteer.Frame, url: string) {
        const commentsSelector = 'div[itemtype="http://schema.org/Comment"]';

        if (frame.url() != url) {
            await frame.goto(url);
        }
        const comments = await frame.$$eval(commentsSelector, (e: any[]) => e.map(c => ({
            username: c.querySelector('.entry__content__username').innerText,
            comment: c.querySelector('.entry__content [itemprop="text"]').innerText
        })));

        return comments;
    }

    public async downloadPersonalGallery(folder: string) {
        // Download Gallery
        const profilePage = await this.goto();
        await this.clickMenu(profilePage, 'Galeria');
        const urls = await this.extractGalleryUrls(profilePage);
        for (const url of urls) {
            await this.downloadGalleryImage(profilePage, url, folder);
        }
        console.log(`Done! downloaded ${urls.length} photos from profile gallery`);
    }

    public async downloadPublicGallery(publicUrlSnippet: string, folder: string) {
        // Download Gallery
        const publicPage = await this.goto(publicUrlSnippet);
        await this.clickMenu(publicPage, 'Galeria');
        const urls = await this.extractGalleryUrls(publicPage);
        for (const url of urls) {
            await this.downloadGalleryImage(publicPage, url, folder);
        }
        console.log(`Done! downloaded ${urls.length} photos from public gallery ${publicUrlSnippet}`);
    }

    public close() {
        return this.browser.close();
    }
}