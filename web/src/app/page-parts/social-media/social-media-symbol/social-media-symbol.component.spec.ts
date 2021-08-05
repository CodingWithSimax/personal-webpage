import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaSymbolComponent } from './social-media-symbol.component';

describe('SocialMediaSymbolComponent', () => {
    let component: SocialMediaSymbolComponent;
    let fixture: ComponentFixture<SocialMediaSymbolComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SocialMediaSymbolComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SocialMediaSymbolComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
