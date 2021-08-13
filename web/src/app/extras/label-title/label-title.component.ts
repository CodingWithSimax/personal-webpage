import { Component, Input, OnInit } from '@angular/core';
import {
    MobileSupportService,
    UpdateData,
} from 'src/app/services/mobile-support.service';

@Component({
    selector: 'app-label-title',
    templateUrl: './label-title.component.html',
    styleUrls: ['./label-title.component.css'],
})
export class LabelTitleComponent implements OnInit {
    @Input() public value: string | undefined;

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
