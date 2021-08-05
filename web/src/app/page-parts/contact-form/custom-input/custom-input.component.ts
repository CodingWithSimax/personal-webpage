import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageUpdateServiceService } from 'src/app/side-circle/page-update-service.service';

@Component({
    selector: 'app-custom-input',
    templateUrl: './custom-input.component.html',
    styleUrls: ['./custom-input.component.css'],
})
export class CustomInputComponent implements OnInit {
    @Input() rows: number | undefined;
    @Input() columns: number | undefined;
    public subBarOpacity: string | undefined;
    @Input() pageTrigger: number | undefined;
    @Input() preview: string | undefined;

    public opacityPreview = '100%';

    @Output() valueUpdate: EventEmitter<string> = new EventEmitter<string>();

    public barHeight = '0%';

    constructor(private pageUpdateService: PageUpdateServiceService) {}

    public ngOnInit(): void {
        if (this.rows == undefined) this.rows = 1;
        if (this.columns == undefined) this.columns = 50;

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

    public onKey(event: any): void {
        this.valueUpdate.emit(event.target.value);
        this.subBarOpacity = event.target.value === '' ? '100%' : '0%';
    }

    public onFocus(event: any): void {
        this.opacityPreview = '0%';
    }
    public onBlur(event: any): void {
        if (event.target.value === '') {
            this.opacityPreview = '100%';
        }
    }
}
