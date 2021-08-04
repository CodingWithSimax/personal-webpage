import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-label-title',
    templateUrl: './label-title.component.html',
    styleUrls: ['./label-title.component.css'],
})
export class LabelTitleComponent implements OnInit {
    @Input() public value: string | undefined;

    constructor() {}

    ngOnInit(): void {}
}
