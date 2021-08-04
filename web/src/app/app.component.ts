import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public title = 'personal-webpage-web';
    public displayMainPage = false;

    constructor() {
        window.scrollTo(0, 0);

        document.body.style.overflowX = 'hidden';
        document.body.style.overflowY = 'hidden';
    }

    public ngOnInit(): void {
        setTimeout(() => {
            this.displayMainPage = true;
            document.body.style.overflowY = 'unset';
        }, 8 * 1000);
    }
}
