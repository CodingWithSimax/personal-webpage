import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import {
    MobileSupportService,
    UpdateData,
} from './services/mobile-support.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public title = 'personal-webpage-web';
    public displayMainPage = false;

    public isMobile = true;

    private timeout: any;

    constructor(private mobileSupportService: MobileSupportService) {
        document.body.style.overflowX = 'hidden';
        document.body.style.overflowY = 'hidden';
    }

    public ngOnInit(): void {
        this.mobileSupportService.supportUpdate.subscribe(
            this.supportUpdate.bind(this)
        );

        this.timeout = setTimeout(() => {
            this.displayMainPage = true;
            document.body.style.overflowY = 'unset';
            window.scrollTo(0, 0);
        }, 8 * 1000);

        this.supportUpdate(this.mobileSupportService.getData());

        setTimeout(() => window.scrollTo(0, 0), 1);
    }

    private supportUpdate(data: UpdateData): void {
        this.isMobile = <boolean>data.isMobile;
        if (this.isMobile) {
            this.displayMainPage = true;
            document.body.style.overflowY = 'unset';
            if (this.timeout != undefined) {
                clearTimeout(this.timeout);
                this.timeout = undefined;
            }
        }
        console.log('update: ', data);
    }
}
