import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTitleComponent } from './label-title.component';

describe('LabelTitleComponent', () => {
    let component: LabelTitleComponent;
    let fixture: ComponentFixture<LabelTitleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LabelTitleComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LabelTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
