import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeChartsComponent } from './demo-charts/home/home-charts.component';
import { BasicPopoverComponent } from './demo-charts/basic-popover/basic-popover.component';
import { CollapsableComponent } from './demo-charts/collapsable/collapsable.component';
import { ConnectorsComponent } from './demo-charts/connectors/connectors.component';

const routes: Routes = [
    { path: '', redirectTo: '/charts', pathMatch: 'full' },
    { path: 'charts', component: HomeChartsComponent },
    { path: 'basic-popover', component: BasicPopoverComponent },
    { path: 'collapsable', component: CollapsableComponent },
    { path: 'connectors', component: ConnectorsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
