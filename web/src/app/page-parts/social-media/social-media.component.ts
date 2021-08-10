import { Component, OnInit } from '@angular/core';
import {
    MobileSupportService,
    UpdateData,
} from 'src/app/services/mobile-support.service';

@Component({
    selector: 'app-social-media',
    templateUrl: './social-media.component.html',
    styleUrls: ['./social-media.component.css'],
})
export class SocialMediaComponent implements OnInit {
    public isMobile = true;

    constructor(private mobileSupportService: MobileSupportService) {}

    public ngOnInit(): void {
        this.mobileSupportService.supportUpdate.subscribe(
            this.supportUpdate.bind(this)
        );
        this.supportUpdate(this.mobileSupportService.getData());
    }

    private supportUpdate(data: UpdateData): void {
        this.isMobile = <boolean>data.isMobile;
    }
}
