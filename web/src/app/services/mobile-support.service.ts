import { EventEmitter, Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { textChangeRangeIsUnchanged } from 'typescript';

export interface UpdateData {
    isMobile: boolean | undefined;
}

@Injectable({
    providedIn: 'root',
})
export class MobileSupportService {
    public isMobile: boolean | undefined = undefined;

    public supportUpdate: EventEmitter<UpdateData> =
        new EventEmitter<UpdateData>();

    constructor(private deviceDetectorService: DeviceDetectorService) {
        setInterval(this.update.bind(this), 4000);
        this.update();
    }

    public getData(): UpdateData {
        return this.update(false);
    }

    private update(sendUpdate = true): UpdateData {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const isMobile =
            (this.deviceDetectorService.isMobile() &&
                !this.deviceDetectorService.isTablet()) ||
            viewportHeight > viewportWidth;

        const update: UpdateData = {
            isMobile:
                this.isMobile != isMobile || !sendUpdate ? isMobile : undefined,
        };

        if (update.isMobile != undefined && sendUpdate)
            this.supportUpdate.emit(update);

        this.isMobile = isMobile;

        return update;
    }
}
