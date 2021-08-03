/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnimatedLabelComponent } from './animated-label.component';

describe('AnimatedLabelComponent', () => {
    let component: AnimatedLabelComponent;
    let fixture: ComponentFixture<AnimatedLabelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AnimatedLabelComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnimatedLabelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
