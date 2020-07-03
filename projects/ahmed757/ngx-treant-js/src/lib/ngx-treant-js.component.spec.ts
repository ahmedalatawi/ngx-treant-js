import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTreantJsComponent } from './ngx-treant-js.component';

import { Treant } from 'treant-js';
import * as raphael from '../../../../node_modules/treant-js/vendor/raphael';
import * as jquery from 'jquery';

(<any>window).Treant = Treant;
(<any>window).$ = jquery;
(<any>window).Raphael = raphael;

describe('NgxTreantJsComponent', () => {
    let component: NgxTreantJsComponent;
    let fixture: ComponentFixture<NgxTreantJsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgxTreantJsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxTreantJsComponent);
        component = fixture.componentInstance;
        component.chartId = 'test-chart-id';
        component.chartClass = 'test-chart-class';
        component.data = {
            chart: {
                container: '#test-chart-id',
                levelSeparation: 45,
                rootOrientation: 'WEST',
                nodeAlign: 'BOTTOM',
                connectors: {
                    type: 'step',
                    style: {
                        'stroke-width': 2,
                    },
                },
                node: {
                    HTMLclass: 'big-commpany',
                },
            },
            nodeStructure: {
                text: { name: 'CEO' },
                connectors: {
                    style: {
                        stroke: '#bbb',
                        'arrow-end': 'oval-wide-long',
                        className: 'test',
                    },
                },
            },
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
