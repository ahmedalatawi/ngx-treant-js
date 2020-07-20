import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTreantJsComponent } from './ngx-treant-js.component';

import { Treant } from 'treant-js';
import * as raphael from '../../../../../node_modules/treant-js/vendor/raphael';
import * as jquery from 'jquery';
import { By } from '@angular/platform-browser';

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
                    HTMLclass: 'test-chart-class',
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
                children: [
                    {
                        text: { name: 'Account' },
                        stackChildren: true,
                        connectors: {
                            style: {
                                stroke: '#8080FF',
                                'arrow-end': 'block-wide-long',
                            },
                        },
                        children: [
                            {
                                text: { name: 'Receptionist' },
                                HTMLclass: 'reception',
                            },
                            {
                                text: { name: 'Author' },
                            },
                        ],
                    },
                ],
            },
        };
        fixture.detectChanges();
    });

    it('Tree should be loaded', () => {
        const chart = fixture.debugElement.query(By.css('.test-chart-class')).nativeElement;
        expect(chart.id).toBe('test-chart-id');
    });
});
