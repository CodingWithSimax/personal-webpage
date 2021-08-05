import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MessageBoxService {
    public messageBoxes: Array<{
        title: string;
        text: string;
        timeout: number;
        image: string;
        id?: number;
        fadeOut?: boolean;
    }> = [];
    public _updateMessageBoxes: EventEmitter<
        Array<{
            title: string;
            text: string;
            timeout: number;
            image: string;
        }>
    > = new EventEmitter<
        Array<{
            title: string;
            text: string;
            timeout: number;
            image: string;
        }>
    >();
    public idCount = 0;

    constructor() {}

    public infoMessage(data: {
        title: string;
        text: string;
        timeout: number;
        image: string;
    }): void {
        const curId = this.idCount;
        this.messageBoxes.push({
            title: data.title,
            text: data.text,
            timeout: data.timeout,
            image: data.image,
            id: curId,
            fadeOut: false,
        });
        this.idCount++;
        this._updateMessageBoxes.emit(this.messageBoxes);
        setTimeout(() => {
            this.messageBoxes = this.messageBoxes.map((messageBox) => {
                if (messageBox.id === curId) {
                    return {
                        title: messageBox.title,
                        text: messageBox.text,
                        timeout: messageBox.timeout,
                        image: messageBox.image,
                        id: messageBox.id,
                        fadeOut: true,
                    };
                }
                return messageBox;
            });
            this._updateMessageBoxes.emit(this.messageBoxes);
            setTimeout(() => {
                this.messageBoxes = this.messageBoxes.filter(
                    (messageBox) => messageBox.id != curId
                );
                this._updateMessageBoxes.emit(this.messageBoxes);
            }, 1000);
        }, data.timeout);
    }
}
