import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
    MobileSupportService,
    UpdateData,
} from 'src/app/services/mobile-support.service';

@Component({
    selector: 'app-animated-label',
    templateUrl: './animated-label.component.html',
    styleUrls: ['./animated-label.component.css'],
})
export class AnimatedLabelComponent implements OnInit {
    @Input() public value: string | undefined;
    @Input() public interval: number | undefined;
    public curValue: string | undefined = '';
    public cursorOn: boolean | undefined;

    private cursorInterval: any;
    private textInterval: any;

    private chars: Array<string> = 'undefined'.split('');
    private step = 0;

    constructor() {}

    public ngOnInit(): void {
        this.animateCursor();
        this.animateText();
    }

    private animateCursor(): void {
        if (this.interval == undefined) return;
        this.cursorInterval = setInterval(() => {
            this.cursorOn = this.cursorOn ? false : true;
        }, <number>this.interval * 1.25);
    }
    private animateText(): void {
        this.chars = <Array<string>>this.value?.split('');
        if (this.chars != undefined && this.interval != undefined) {
            this.textInterval = setInterval(() => {
                if (this.step % 5 == 0 && this.step < this.chars.length * 5) {
                    this.curValue += this.chars[this.step / 5];
                }
                if (this.step > this.chars.length * 5 + 8 * 5) {
                    this.curValue = this.curValue?.substring(
                        0,
                        this.curValue.length - 1
                    );
                    if (this.curValue === '') this.step = -1;
                }
                this.step++;
            }, <number>this.interval / 5);
        }
    }
}
