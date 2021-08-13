import { TestBed } from '@angular/core/testing';

import { PreviewServiceService } from './preview-service.service';

describe('PreviewServiceService', () => {
    let service: PreviewServiceService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PreviewServiceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
