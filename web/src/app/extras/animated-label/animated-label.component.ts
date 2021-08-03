import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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

    constructor() {}

    public ngOnInit(): void {
        this.animateCursor();
        this.animateText();
    }

    private animateCursor(): void {
        if (this.interval == undefined) return;
        setInterval(() => {
            this.cursorOn = this.cursorOn ? false : true;
        }, <number>this.interval * 1.25);
    }
    private async animateText(): Promise<void> {
        const chars = this.value?.split('');
        if (chars != undefined && this.interval != undefined) {
            for (const char of chars) {
                this.curValue += char;
                await new Promise((resolve) =>
                    setTimeout(resolve, this.interval)
                );
            }
            await new Promise((resolve) =>
                setTimeout(resolve, <number>this.interval * 8)
            );
            for (const char of chars) {
                this.curValue = this.curValue?.substring(
                    0,
                    this.curValue.length - 1
                );
                await new Promise((resolve) =>
                    setTimeout(resolve, <number>this.interval / 5)
                );
            }
            this.animateText();
        }
    }
}
