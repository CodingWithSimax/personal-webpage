import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ContactFormService {
    constructor() {}

    private str2array(str: string): Array<number> {
        const array = [];
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            array.push(str.charCodeAt(i));
        }
        return array;
    }

    public async sendContactFormData(data: {
        [key: string]: string;
    }): Promise<boolean> {
        const result = await (
            await fetch('/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
        ).json();
        return result.success;
    }
}
