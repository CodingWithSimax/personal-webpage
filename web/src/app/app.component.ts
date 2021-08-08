import { Component } from '@angular/core';
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
        window.scrollTo(0, 0);

        document.body.style.overflowX = 'hidden';
        document.body.style.overflowY = 'hidden';
    }

    public ngOnInit(): void {
        this.mobileSupportService.supportUpdate.subscribe(
            this.supportUpdate.bind(this)
        );
        this.supportUpdate(this.mobileSupportService.getData());

        this.timeout = setTimeout(() => {
            this.displayMainPage = true;
            document.body.style.overflowY = 'unset';
        }, 8 * 1000);
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
