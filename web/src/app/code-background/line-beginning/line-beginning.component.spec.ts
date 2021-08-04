import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineBeginningComponent } from './line-beginning.component';

describe('LineBeginningComponent', () => {
    let component: LineBeginningComponent;
    let fixture: ComponentFixture<LineBeginningComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LineBeginningComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LineBeginningComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
