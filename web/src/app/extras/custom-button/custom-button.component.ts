import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PageUpdateServiceService } from 'src/app/side-circle/page-update-service.service';

@Component({
    selector: 'app-custom-button',
    templateUrl: './custom-button.component.html',
    styleUrls: ['./custom-button.component.css'],
})
export class CustomButtonComponent implements OnInit {
    @Input() public value: string | undefined;
    @Input() public pageTrigger: number | undefined;

    @Output() public click: EventEmitter<undefined> =
        new EventEmitter<undefined>();

    public barHeight = '0%';

    constructor(private pageUpdateService: PageUpdateServiceService) {}

    public ngOnInit(): void {
        if (this.pageTrigger == undefined) {
            this.barAnimation();
        } else {
            this.pageUpdateService.pageLoadedFirstTime.subscribe((number) => {
                if (number == this.pageTrigger) this.barAnimation();
            });
        }
    }

    public barAnimation(): void {
        this.barHeight = 'min(0.75vw, 0.75vh)';
    }

    public onclick(event: any): void {
        this.click.emit(undefined);
    }
}
