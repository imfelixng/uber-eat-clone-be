import got from 'got';
import * as FormData from 'form-data';

import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';

import { EmailVars, MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions
    ) {}

    private async sendEmail(subject: string, template: string, emailVars: EmailVars[]) {
        const formData = new FormData();
        formData.append('from', `Excited User <mailgun@${this.options.domain}>`)
        formData.append('to', `ngocnguyenmmo@gmail.com`)
        formData.append('subject', subject)
        formData.append('template', template)

        emailVars.forEach(eVar => {
            formData.append(`v:${eVar.key}`, eVar.value);
        });

        try {
            await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
                headers: {
                    "Authorization": `Basic ${Buffer.from(`api:${this.options.apiKey}`).toString('base64')}`
                },
                body: formData,
                method: "POST"
            });
            console.log('Email sent!');
        } catch (error) {
            console.log(error);
        }
    }

    sendVerificationEmail(email: string, code: string): void {
        this.sendEmail("Verify Your Email", 'verify-email', [
            { key: 'code', value: code },
            { key: 'username', value: email }
        ]);
    }

}
