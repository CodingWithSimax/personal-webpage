import { Injectable, OnInit } from '@angular/core';
import { updateParenthesizedType } from 'typescript';
import { MobileSupportService, UpdateData } from './mobile-support.service';

interface TouchSupportElementData {
    id: string;
    callback: (args: Array<any> | undefined) => void;
    callbackArgs: Array<any> | undefined;
    scrollStartPosition: number;
}

export class ComponentTouchSupport {
    private isTouchDevice = false;
    private component: OnInit;
    private elements: Array<TouchSupportElementData> = [];

    public setTouchDevice(state: boolean): void {
        this.isTouchDevice = state;
    }

    constructor(component: OnInit, isTouchDevice: boolean) {
        this.component = component;
        this.setTouchDevice(isTouchDevice);
    }

    private registerElement(
        elementId: string,
        callback: (args: Array<any> | undefined) => void,
        callbackArgs: Array<any> | undefined
    ) {
        this.elements.push({
            id: elementId,
            callback: callback,
            scrollStartPosition: -1,
            callbackArgs: callbackArgs,
        });
    }

    private getScrollOffset(): number {
        return (
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0
        );
    }

    public touchStart(
        elementId: string,
        callback: (args: Array<any> | undefined) => void,
        callbackArgs: Array<any> | undefined = undefined
    ): void {
        if (this.elements.filter((el) => el.id === elementId).length <= 0)
            this.registerElement(elementId, callback, callbackArgs);
        this.elements = this.elements.map((el) => {
            if (el.id === elementId)
                el.scrollStartPosition = this.getScrollOffset();
            return el;
        });
    }
    public touchEnd(elementId: string): void {
        for (const element of this.elements) {
            if (
                element.id === elementId &&
                element.scrollStartPosition === this.getScrollOffset()
            ) {
                element.callback.bind(this.component)(element.callbackArgs);
                console.log('executed command', element);
                return;
            }
        }
        console.log('touch event cancelled');
    }
}

@Injectable({
    providedIn: 'root',
})
export class TouchSupportService {
    private isTouchDevice = false;

    constructor(private mobileSupportService: MobileSupportService) {
        this.mobileSupportService.supportUpdate.subscribe(
            this.updateMobileSupport.bind(this)
        );
        this.updateMobileSupport(this.mobileSupportService.getData());
    }
    private updateMobileSupport(data: UpdateData): void {
        this.isTouchDevice = <boolean>data.isTouchDevice;
    }

    public registerComponent(component: OnInit): ComponentTouchSupport {
        return new ComponentTouchSupport(component, this.isTouchDevice);
    }
}
