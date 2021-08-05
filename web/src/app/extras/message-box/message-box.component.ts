import { Component, OnInit } from '@angular/core';
import { MessageBoxService } from './message-box.service';

@Component({
    selector: 'app-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.css'],
})
export class MessageBoxComponent implements OnInit {
    public messageBoxes: Array<{
        title: string;
        text: string;
        timeout: number;
        image: string;
        fadeOut?: boolean;
    }> = [];

    constructor(private messageBoxService: MessageBoxService) {}

    ngOnInit(): void {
        this.messageBoxService._updateMessageBoxes.subscribe((messageBoxes) => {
            this.messageBoxes = messageBoxes;
        });
    }
}
