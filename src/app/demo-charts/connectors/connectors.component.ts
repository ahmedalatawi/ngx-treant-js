import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DemoAppService } from '../demo-charts.service';

@Component({
    selector: 'ngx-treant-demo-connectors',
    templateUrl: './connectors.component.html',
    styleUrls: ['./connectors.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ConnectorsComponent implements OnInit {
    connectorsId = 'OrganiseChart-big-commpany';
    connectorsClass = 'connectors-chart';

    connectorsData;

    private tree;
    private treant;
    private nodes;

    constructor(private svc: DemoAppService) {
        this.connectorsData = this.svc.getOrganiseChartBigCommpanyData();
    }

    ngOnInit(): void {}

    onDrag(obj): void {
        console.log(obj);
    }

    onDrop(obj): void {
        console.log(obj);

        // this.tree.positionTree();
        console.log('updated tree ', this.tree.nodeDB);
    }

    onClick(obj): void {
        console.log('onClick: ', obj);
    }

    onUpdate(obj): void {
        console.log('onUpdate: ', obj.node[0]);
    }

    onHover(event): void {
        console.log('onHover: ', event);

        event
            .$('.popover')
            .off('click')
            .on('click', '#edit', (e) => {
                alert(event.node.image);
                e.preventDefault();
                e.stopPropagation();
            });
    }

    onLoadNodes(obj): void {
        console.log('Connectors nodes: ', obj.nodes);
        this.nodes = obj.nodes;
    }

    onLoadTree(tree): void {
        this.tree = tree;
        console.log('Connectors tree: ', tree);
    }

    onLoadTreant(treant): void {
        this.treant = treant;
        console.log('Connectors treant: ', treant);
    }
}
