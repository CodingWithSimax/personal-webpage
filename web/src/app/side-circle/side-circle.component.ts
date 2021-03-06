import {
    Component,
    HostBinding,
    HostListener,
    Input,
    OnInit,
} from '@angular/core';
import { PageUpdateServiceService } from './page-update-service.service';

@Component({
    selector: 'app-side-circle',
    templateUrl: './side-circle.component.html',
    styleUrls: ['./side-circle.component.css'],
})
export class SideCircleComponent implements OnInit {
    @Input() maxRowLength: number | undefined;
    @Input() activateCircle: boolean | undefined;

    public rotation: number | undefined = 0;

    constructor(private pageUpdateService: PageUpdateServiceService) {}

    public ngOnInit(): void {}

    @HostListener('window:scroll')
    public onScrollEvent(): void {
        const verticalOffset: number =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        const viewportHeight: number = window.innerHeight;
        const procentScroll: number = verticalOffset / viewportHeight;

        this.pageUpdateService.updatePage(
            procentScroll >= Math.ceil(procentScroll) - 0.4
                ? Math.ceil(procentScroll)
                : Math.floor(procentScroll)
        );

        if (procentScroll >= Math.ceil(procentScroll) - 0.4) {
            let procent =
                (procentScroll - Math.floor(procentScroll) - 0.6) / 0.4;
            if (procent > 0.8) procent = 1;

            const lastRotationPosition =
                Math.floor(procentScroll) * (360 / <number>this.maxRowLength);
            const newRotationPosition =
                Math.ceil(procentScroll) * (360 / <number>this.maxRowLength);
            this.rotation =
                lastRotationPosition +
                (newRotationPosition - lastRotationPosition) * procent;
        }
    }
}
