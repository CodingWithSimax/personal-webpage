import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-social-media-symbol',
    templateUrl: './social-media-symbol.component.html',
    styleUrls: ['./social-media-symbol.component.css'],
})
export class SocialMediaSymbolComponent implements OnInit {
    @Input() public src: string | undefined;
    @Input() public href: string | undefined;
    @Input() public value: string | undefined;

    constructor() {}

    public ngOnInit(): void {}

    public redirect(): void {
        if (this.href != undefined) window.location.replace(this.href);
    }
}
