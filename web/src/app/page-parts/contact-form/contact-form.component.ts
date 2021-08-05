import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageBoxService } from 'src/app/extras/message-box/message-box.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import { ContactFormService } from './contact-form.service';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
    private contactFormData: { [key: string]: string } = {
        name: '',
        email: '',
        subject: '',
        message: '',
    };

    constructor(
        private messageBoxService: MessageBoxService,
        private contactFormService: ContactFormService
    ) {}

    public ngOnInit(): void {}

    public valueUpdate(key: string, value: string): void {
        this.contactFormData[key] = value;
    }

    public onSubmit(): void {
        if (
            this.contactFormData.name === '' ||
            this.contactFormData.email === '' ||
            this.contactFormData.subject === '' ||
            this.contactFormData.message === ''
        ) {
            this.messageBoxService.infoMessage({
                title: 'information required',
                text: 'please fill out all information',
                image: '/assets/images/exclamation-triangle-solid.svg',
                timeout: 5000,
            });
        } else {
            this.messageBoxService.infoMessage({
                title: 'sending message...',
                text: 'The message is being currently sent to Simax!',
                image: '/assets/images/spinner-solid.svg',
                timeout: 5000,
            });
            this.contactFormService
                .sendContactFormData(this.contactFormData)
                .then((result) => {
                    if (result) {
                        this.messageBoxService.infoMessage({
                            title: 'success',
                            text: 'message was sent',
                            image: '/assets/images/check-circle-regular.svg',
                            timeout: 5000,
                        });
                    }
                })
                .catch(() => {
                    this.messageBoxService.infoMessage({
                        title: 'error',
                        text: "message couldn't be sent",
                        image: '/assets/images/exclamation-triangle-solid.svg',
                        timeout: 5000,
                    });
                });
        }
        console.log('data: ', this.contactFormData);
    }
}
