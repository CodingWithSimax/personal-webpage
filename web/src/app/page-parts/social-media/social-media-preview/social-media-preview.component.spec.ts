import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaPreviewComponent } from './social-media-preview.component';

describe('SocialMediaPreviewComponent', () => {
    let component: SocialMediaPreviewComponent;
    let fixture: ComponentFixture<SocialMediaPreviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SocialMediaPreviewComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SocialMediaPreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
