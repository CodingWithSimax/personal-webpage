import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCircleComponent } from './side-circle.component';

describe('SideCircleComponent', () => {
    let component: SideCircleComponent;
    let fixture: ComponentFixture<SideCircleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SideCircleComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SideCircleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
