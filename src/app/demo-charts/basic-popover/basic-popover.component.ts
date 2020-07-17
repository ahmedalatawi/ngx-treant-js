import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    TemplateRef,
    AfterViewInit,
} from '@angular/core';
import { DemoAppService } from '../demo-charts.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'ngx-treant-demo-basic-popover',
    templateUrl: './basic-popover.component.html',
    styleUrls: ['./basic-popover.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class BasicPopoverComponent implements AfterViewInit, OnInit {
    modalRef: BsModalRef;
    @ViewChild('template') modalTemplate: TemplateRef<any>;

    registerForm: FormGroup;

    basicPopoverId = 'basic-popover';
    basicPopoverClass = 'basic-popover-chart';

    basicPopoverData;

    displayChart = true;

    private node;
    private tree;
    private treant;
    private nodes;
    private flatNodes;

    private content = `
           <div class="popover-content">
              <div class="btn-group mr-2" role="group">
                  <a type="button" class="btn btn-primary btn-sm" title="Add child node" id="add" href="#">Add New</a>
              </div>
              <div class="btn-group mr-2" role="group">
                  <a type="button" class="btn btn-danger btn-sm" title="Remove this node" id="delete" href="#">Remove</a>
              </div>
          </div>
      `;

    popoverSettings = {
        title: '<div class="popover-title"></div>',
        placement: 'top',
        content: this.content,
        container: 'body',
        html: true,
        selector: 'div',
        trigger: 'hover',
    };

    constructor(
        private svc: DemoAppService,
        private modalService: BsModalService,
        private formBuilder: FormBuilder
    ) {
        svc = new DemoAppService();
        this.basicPopoverData = svc.getBasicPopoverData();
        this.flatNodes = svc.flattenItems([this.basicPopoverData.nodeStructure], 'children');
    }

    ngAfterViewInit() {
        this.registerForm = this.formBuilder.group({
            title: [''],
            name: [''],
            contact: [''],
            image: [''],
        });
    }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        const node = this.flatNodes.find((n) => n.id == this.node.id);
        const hasChildren = !!node.children && !!node.children.length;

        const newEmployee = {
            text: {
                name: this.registerForm.value.name || '',
                title: this.registerForm.value.title || '',
                contact: this.registerForm.value.contact || '',
            },
            id: 0,
            parentId: 0,
            image: this.registerForm.value.image || '',
            children: hasChildren ? node.children : [],
        };

        node.children = [newEmployee];

        this.modalRef.hide();

        this.displayChart = false;
        this.treant.destroy();

        setTimeout(() => {
            this.displayChart = true;
        });

        console.log(this.registerForm.value);
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    ngOnInit(): void {
        // do something here
    }

    onDrag(obj): void {
        console.log(obj);
    }

    onDrop(obj): void {
        const dragIndex = this.flatNodes.findIndex((n) => n.id == obj.draggedNode.id);
        const dropIndex = this.flatNodes.findIndex((n) => n.id == obj.droppedNode.id);
        const temp = this.flatNodes[dragIndex];

        this.flatNodes[dragIndex] = this.flatNodes[dropIndex];
        this.flatNodes[dropIndex] = temp;

        setTimeout(() => {
            this.flatNodes.forEach((n, i) => {
                this.flatNodes[i].id = i;
                const node = this.nodes.find((n) => n.id == i);
                this.flatNodes[i].parentId = node.parentId;
            });

            const unflattenNodes = this.flatNodes[0];
            unflattenNodes.children = this.unflatten(this.flatNodes);

            this.basicPopoverData.nodeStructure = unflattenNodes;
        });

        console.log('updated tree ', this.basicPopoverData.nodeStructure);
    }

    onClick(obj): void {
        console.log('onClick: ', obj);
    }

    onUpdate(obj): void {
        console.log('onUpdate: ', obj);
    }

    onHover(event): void {
        setTimeout(() => {
            event.$('.popover-title').text(event.node.text.name);
        }, 100);

        event
            .$('.popover')
            .off('click')
            .on('click', '#add', (e) => {
                this.node = event.node;
                event.$('.popover').popover('hide');
                this.registerForm.reset();
                this.openModal(this.modalTemplate);

                e.preventDefault();
                e.stopPropagation();
            })
            .on('click', '#delete', (e) => {
                let confirmDelete = confirm(
                    'Are you sure you want to remove employee: ' + event.node.text.name
                );

                if (confirmDelete) {
                    const node = this.flatNodes.find((n) => n.id == event.node.id);
                    const hasChildren = !!node.children && !!node.children.length;

                    event.$('.popover').popover('hide');

                    if (hasChildren) {
                        const parent = this.flatNodes.find((n) => n.id == event.node.parentId);
                        if (parent) {
                            parent.children = parent.children || [];
                            parent.children.push(node.children[0]);
                        }
                    }

                    this.displayChart = false;
                    this.treant.destroy();

                    setTimeout(() => {
                        const removeNode = (node, id) => {
                            return node.id == id
                                ? undefined
                                : {
                                      ...node,
                                      children:
                                          node.children &&
                                          node.children.reduce(
                                              (children, child) =>
                                                  children.concat(removeNode(child, id) || []),
                                              []
                                          ),
                                  };
                        };

                        // const id = hasChildren ? -1 : node.id;
                        // const children = parentNode.id === 0 ? parentNode.children || [] : findObjectById(this.basicPopoverData.nodeStructure, parentNode.id);
                        this.basicPopoverData.nodeStructure = removeNode(
                            this.basicPopoverData.nodeStructure,
                            node.id
                        );

                        if (this.basicPopoverData.nodeStructure) {
                            this.displayChart = true;
                        }
                    });
                }
                // console.log(this.basicPopoverData);
                console.log(this.nodes);

                // alert(event.node.text.name);
                e.preventDefault();
                e.stopPropagation();
            });
    }

    onLoadTree(tree): void {
        this.tree = tree;
        console.log('tree: ', this.tree);
    }

    onLoadTreant(treant): void {
        this.treant = treant;
        console.log('treant: ', treant);
    }

    onLoadNodes(obj): void {
        this.nodes = obj.nodes;
        const $ = obj.$;

        setTimeout(() => {
            this.flatNodes = this.svc.flattenItems(
                [this.basicPopoverData.nodeStructure],
                'children'
            );
            this.flatNodes.forEach((n, i) => {
                this.flatNodes[i].id = i;
                const node = this.nodes.find((n) => n.id == i);
                this.flatNodes[i].parentId = node.parentId;
            });

            const unflattenNodes = this.flatNodes[0];
            unflattenNodes.children = this.unflatten(this.flatNodes);

            this.basicPopoverData.nodeStructure = unflattenNodes;
        });

        console.log('nodes: ', this.nodes);
        console.log('flatNodes: ', this.flatNodes);
    }

    private unflatten(arr) {
        var tree = [],
            mappedArr = {},
            arrElem,
            mappedElem;

        for (var i = 0, len = arr.length; i < len; i++) {
            arrElem = arr[i];
            mappedArr[arrElem.id] = arrElem;
            mappedArr[arrElem.id]['children'] = [];
        }

        for (var id in mappedArr) {
            if (mappedArr.hasOwnProperty(id)) {
                mappedElem = mappedArr[id];

                if (mappedElem.parentId) {
                    mappedArr[mappedElem['parentId']] &&
                        mappedArr[mappedElem['parentId']]['children'].push(mappedElem);
                } else {
                    tree.push(mappedElem);
                }
            }
        }
        return tree;
    }
}
