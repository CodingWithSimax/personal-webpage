import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PageUpdateServiceService {
    public pageUpdated: EventEmitter<number> = new EventEmitter<number>();

    constructor() {}

    public updatePage(page: number): void {
        this.pageUpdated.emit(page);
    }
}
