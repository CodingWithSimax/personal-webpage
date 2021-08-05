import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PageUpdateServiceService {
    public pageUpdated: EventEmitter<number> = new EventEmitter<number>();
    public pageLoadedFirstTime: EventEmitter<number> =
        new EventEmitter<number>();

    private loadedPages: Array<number> = [];

    constructor() {}

    public updatePage(page: number): void {
        this.pageUpdated.emit(page);
        if (this.loadedPages.indexOf(page) == -1) {
            this.pageLoadedFirstTime.emit(page);
            this.loadedPages.push(page);
        }
    }
}
