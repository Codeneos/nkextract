import { Command, flags } from '@oclif/command'
import * as inquirer from 'inquirer'
import nk from '../nk';

export class PublicCommand extends Command {
    static flags = {
        user: flags.string({ char: 'u', helpValue: 'username@example.com.org', dependsOn: [ 'password' ], description: 'username used for the NK.pl login' }),        
        password: flags.string({ char: 'p', dependsOn: [ 'user' ], description: 'password used for the NK.pl login' }),        
        headless: flags.boolean({ char: 'h', default: true, allowNo: true, description: 'display the Chrome bowrser when extracting images' })
    }

    static args = [
        { name: 'gallery', required: true, description: 'comma seperate lists gallery URL snippet(s)' }
    ]

    static description = 'Extract public gallery images NK.pl';
    static examples = [
        'nkextract public szkola/11498/klasa/12',        
        'nkextract public szkola/23481',          
        'nkextract public szkola/23481,szkola/11498'
    ];

    async run() {      
        const { flags, args } = this.parse(PublicCommand);
        const urlSnippets : Array<string> = args.gallery.split(',').map(s => s.trim());

        this.log('NK.pl gallery extractor 2020');
        
        if (!flags.user) {
            const { user, password } = await inquirer.prompt([
                { type: 'input', message:'Enter your NK.pl username', name: 'user' },            
                { type: 'password', message:'Enter your NK.pl password', name: 'password' }
            ]);
            flags.user = user;
            flags.password = password;
        }        

        const nkInstance = new nk(flags.headless);
        try {
            await nkInstance.login(flags.user, flags.password);
            for (const urlSnippet of urlSnippets) {
                const folder = `./${urlSnippet.replace(/\//g, '-')}`
                await nkInstance.downloadPublicGallery(urlSnippet, folder);
            }
        } catch(err) {
            console.error(`Error while extracing gallery: ${err.message}`);
        } finally {
            await nkInstance.close();
        }
    }
}