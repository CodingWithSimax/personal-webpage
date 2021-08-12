import { Component, OnInit } from '@angular/core';
import {
    MobileSupportService,
    UpdateData,
} from 'src/app/services/mobile-support.service';

@Component({
    selector: 'app-credits',
    templateUrl: './credits.component.html',
    styleUrls: ['./credits.component.css'],
})
export class CreditsComponent implements OnInit {
    public isMobile = true;

    constructor(private mobileSupportService: MobileSupportService) {}

    public ngOnInit(): void {
        this.mobileSupportService.supportUpdate.subscribe(
            this.supportUpdate.bind(this)
        );
        this.supportUpdate(this.mobileSupportService.getData());
    }

    public supportUpdate(data: UpdateData): void {
        this.isMobile = <boolean>data.isMobile;
    }
}
