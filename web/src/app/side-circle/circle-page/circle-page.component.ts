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

    /* src https://stackoverflow.com/questions/17722497/scroll-smoothly-to-specific-element-on-page */
    public doScrolling(elementY: number, duration: number): void {
        const startingY = window.pageYOffset;
        const diff = elementY - startingY;
        let start: any;

        // Bootstrap our animation - it will get called right before next frame shall be rendered.
        window.requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp;
            // Elapsed milliseconds since start of scrolling.
            const time = timestamp - start;
            // Get percent of completion in range [0, 1].
            const percent = Math.min(time / duration, 1);

            const newPercent = (Math.sin((percent - 0.5) * Math.PI) + 1) / 2;

            window.scrollTo(0, startingY + diff * newPercent);

            // Proceed with animation as long as we wanted it to.
            if (time < duration) {
                window.requestAnimationFrame(step);
            }
        });
    }

    public onclick(event: any): void {
        const viewportHeight: number = window.innerHeight;
        this.doScrolling(viewportHeight * <number>this.row, 1000);
    }
}
