import { TestBed } from '@angular/core/testing';

import { TouchSupportService } from './touch-support.service';

describe('TouchSupportService', () => {
    let service: TouchSupportService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TouchSupportService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
