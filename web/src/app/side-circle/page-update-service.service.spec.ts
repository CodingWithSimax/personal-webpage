import { TestBed } from '@angular/core/testing';

import { PageUpdateServiceService } from './page-update-service.service';

describe('PageUpdateServiceService', () => {
    let service: PageUpdateServiceService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PageUpdateServiceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
