import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PageUpdateServiceService } from 'src/app/side-circle/page-update-service.service';

@Component({
    selector: 'app-progress-indicator',
    templateUrl: './progress-indicator.component.html',
    styleUrls: ['./progress-indicator.component.css'],
})
export class ProgressIndicatorComponent implements OnInit {
    @Input() public maxProgress: number | undefined;
    @Input() public progress: number | undefined;
    @Input() public isMobile: boolean | undefined;
    @Input() public text: string | undefined;

    public width: string | undefined;
    private extended = false;

    constructor(private pageUpdateService: PageUpdateServiceService) {}

    public ngOnInit(): void {
        this.pageUpdateService.pageUpdated.subscribe(
            this.pageUpdated.bind(this)
        );
    }

    private pageUpdated(page: number): void {
        if (page === 1 && !this.extended) {
            this.width = `${100 * <number>this.progress}%`;
            this.extended = true;
        }
    }
}
