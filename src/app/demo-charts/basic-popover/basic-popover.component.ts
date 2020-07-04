import { Component, OnInit } from '@angular/core';
import { DemoAppService } from '../demo-charts.service';

@Component({
    selector: 'ngx-treant-demo-basic-popover',
    templateUrl: './basic-popover.component.html',
    styleUrls: ['./basic-popover.component.css'],
})
export class BasicPopoverComponent implements OnInit {
    basicPopoverId = 'basic-popover';
    basicPopoverClass = 'basic-popover-chart';

    basicPopoverData;

    private tree;
    private treant;
    private nodes;

    private content = `
           <div class="popover-content">
              <div class="btn-group mr-2" role="group">
                  <a type="button" class="btn btn-primary btn-sm" title="Edit this node" id="edit" href="#">Edit</a>
              </div>
              <div class="btn-group mr-2" role="group">
                  <a type="button" class="btn btn-danger btn-sm" title="Remove this node" id="delete" href="#">Remove</a>
              </div>
          </div>
      `;

    popoverSettings = {
        title: '<div class="popover-title">Collapsable Actions</div>',
        placement: 'bottom',
        content: this.content,
        container: 'body',
        html: true,
        selector: 'a',
        trigger: 'hover',
    };

    constructor(private svc: DemoAppService) {}

    ngOnInit(): void {
        // do something here
    }

    onDrag(obj): void {
        console.log(obj);
    }

    onDrop(obj): void {
        console.log(obj);

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
            .on('click', '#edit', (ev) => {
                alert(event.node.image);
                ev.preventDefault();
                ev.stopPropagation();
            });
    }

    onLoadTree(tree): void {
        this.tree = tree;

        console.log('tree: ', tree.nodeDB);
    }

    onLoadTreant(treant): void {
        this.treant = treant;
        console.log('treant: ', treant);
    }

    onLoadNodes(obj): void {
        console.log('nodes: ', obj);
        const $oNodes = obj.nodes;
        const $ = obj.$;
    }
}
