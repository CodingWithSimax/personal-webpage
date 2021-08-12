import { Component, OnInit } from '@angular/core';
import {
    MobileSupportService,
    UpdateData,
} from 'src/app/services/mobile-support.service';

@Component({
    selector: 'app-languages',
    templateUrl: './languages.component.html',
    styleUrls: ['./languages.component.css'],
})
export class LanguagesComponent implements OnInit {
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
