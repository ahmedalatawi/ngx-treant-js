import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DemoAppService } from '../demo-charts.service';

@Component({
    selector: 'ngx-treant-demo-collapsable',
    templateUrl: './collapsable.component.html',
    styleUrls: ['./collapsable.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class CollapsableComponent implements OnInit {
    collapsableStructureId = 'collapsable-structure';
    collapsableStructureClass = 'collapsable-structure-chart';

    collapsableStructureData;

    private tree;
    private treant;
    private nodes;

    constructor(private svc: DemoAppService) {
        this.collapsableStructureData = this.svc.getCollapsableStructureData();
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
        this.nodes = obj.nodes;

        console.log('Collapsable nodes: ', this.nodes);
    }

    onLoadTree(tree): void {
        this.tree = tree;
        console.log('Collapsable tree: ', this.tree);
    }

    onLoadTreant(treant): void {
        this.treant = treant;
        console.log('Collapsable treant: ', this.treant);
    }
}
