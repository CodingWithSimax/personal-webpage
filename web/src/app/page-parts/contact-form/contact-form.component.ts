import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageBoxService } from 'src/app/extras/message-box/message-box.service';
import {
    MobileSupportService,
    UpdateData,
} from 'src/app/services/mobile-support.service';
import {
    ComponentTouchSupport,
    TouchSupportService,
} from 'src/app/services/touch-support.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import { ContactFormService } from './contact-form.service';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
    public isMobile = true;
    public isTouchDevice = false;
    private contactFormData: { [key: string]: string } = {
        name: '',
        email: '',
        subject: '',
        message: '',
    };
    public componentTouchSupport: ComponentTouchSupport;

    constructor(
        private messageBoxService: MessageBoxService,
        private contactFormService: ContactFormService,
        private mobileSupportService: MobileSupportService,
        private touchSupportService: TouchSupportService
    ) {
        this.componentTouchSupport =
            this.touchSupportService.registerComponent(this);
    }

    public ngOnInit(): void {
        this.mobileSupportService.supportUpdate.subscribe(
            this.supportUpdate.bind(this)
        );
        this.supportUpdate(this.mobileSupportService.getData());
    }
    private supportUpdate(data: UpdateData): void {
        this.isMobile = <boolean>data.isMobile;
        this.isTouchDevice = <boolean>data.isTouchDevice;
    }

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
