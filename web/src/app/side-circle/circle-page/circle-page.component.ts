import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-circle-page',
    templateUrl: './circle-page.component.html',
    styleUrls: ['./circle-page.component.css'],
})
export class CirclePageComponent implements OnInit {
    @Input() public row: number | undefined;
    @Input() public maxRowLength: number | undefined;
    @Input() public src: string | undefined;

    public left: number | undefined = 0;
    public top: number | undefined = 0;
    public rotation: number | undefined = 0;

    constructor() {}

    public ngOnInit(): void {
        const angleSpace = 360 / <number>this.maxRowLength;
        const angle = angleSpace * <number>this.row;
        this.rotation = angle;
    }
}
