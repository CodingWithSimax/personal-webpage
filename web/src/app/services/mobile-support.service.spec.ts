import { TestBed } from '@angular/core/testing';

import { MobileSupportServiceService } from './mobile-support-service.service';

describe('MobileSupportServiceService', () => {
    let service: MobileSupportServiceService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MobileSupportServiceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
