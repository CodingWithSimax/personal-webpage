import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-code-background',
    templateUrl: './code-background.component.html',
    styleUrls: ['./code-background.component.css'],
})
export class CodeBackgroundComponent implements OnInit {
    public curLine = 0;
    public loadingBarText = '';
    public loadingBarStep = 0;

    constructor() {}

    public ngOnInit(): void {
        this.animate();
        this.animateLoadingBar();
    }

    private async animate(): Promise<void> {
        for (let index = 0; index < 6; index++) {
            await new Promise((resolve) =>
                setTimeout(resolve, 500 + Math.floor(Math.random() * 500))
            );
            this.curLine += 1;
        }
    }

    private animateLoadingBar(): void {
        const interval = setInterval(() => {
            this.loadingBarStep++;
            if (this.loadingBarStep >= 4) this.loadingBarStep = 0;
            const stepSymbols = ['-', '\\', '|', '/'];
            this.loadingBarText = stepSymbols[this.loadingBarStep];
        }, 500);
        setTimeout(() => clearInterval(interval), 7000);
    }
}
