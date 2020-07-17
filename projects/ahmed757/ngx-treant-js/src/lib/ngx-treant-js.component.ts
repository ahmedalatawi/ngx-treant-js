import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

declare const Treant: any;
declare const $: any;

/**
 * A simple Angular2+ component used as a wrapper for [TreantJS](https://fperucic.github.io/treant-js/) library
 * for visualization of tree (chart) diagrams, with additional functionality.
 */
@Component({
    selector: 'ngx-treant-chart',
    templateUrl: './ngx-treant-js.component.html',
})
export class NgxTreantJsComponent implements AfterViewInit {
    @Input() chartId: string;
    @Input() chartClass: string;

    @Input() data: any;
    @Input() popoverSettings: any;
    @Input() mouseleaveMilliseconds: number;
    @Input() isDraggable: boolean;
    @Input() textProps: any;

    @Output() clicked: EventEmitter<any> = new EventEmitter();
    @Output() hovered: EventEmitter<any> = new EventEmitter();
    @Output() dragged: EventEmitter<any> = new EventEmitter();
    @Output() dropped: EventEmitter<any> = new EventEmitter();
    @Output() updated: EventEmitter<any> = new EventEmitter();

    @Output() loadedNodes: EventEmitter<any> = new EventEmitter();
    @Output() loadedTreant: EventEmitter<any> = new EventEmitter();
    @Output() loadedTree: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngAfterViewInit(): void {
        const callback = (callback: any) => {
            let popoverElm1;
            let popoverElm2;
            let timeout;
            let draggedNode;
            let droppedNode;

            const __this = this;

            // add ids to nodeDOMs
            for (let i = 0; i < callback.nodeDB.db.length; i++) {
                callback.nodeDB.db[i].nodeDOM.id = callback.nodeDB.db[i].id;
            }

            this.loadedTree.emit(callback);

            const $oNodes = $(`#${this.chartId} .node`);

            // add support for drag and drop functionality
            const addDragAndDropSupport = () => {
                for (let i = 0; i < $oNodes.length; i++) {
                    $oNodes[i].draggable = true;
                    $oNodes[i].classList.add('drop');
                    $oNodes[i].addEventListener('dragstart', drag, false);
                    $oNodes[i].addEventListener('drop', drop, false);
                    $oNodes[i].addEventListener('dragover', allowDrop, false);
                }
            };

            // swap nodes after drag and drop
            function swapNodes(nodes, dragIndex, dropIndex) {
                const temp = nodes[dragIndex];
                const dragClone = { ...temp };
                const dropClone = { ...nodes[dropIndex] };

                nodes[dragIndex] = nodes[dropIndex];
                nodes[dropIndex] = temp;

                // set dragged node props
                nodes[dragIndex].id = dragClone.id;
                nodes[dragIndex].nodeDOM.id = dragClone.id;
                nodes[dragIndex].parentId = dragClone.parentId;
                nodes[dragIndex].children = dragClone.children;
                nodes[dragIndex].connStyle = dragClone.connStyle;
                nodes[dragIndex].stackChildren = dragClone.stackChildren;
                nodes[dragIndex].stackParentId = dragClone.stackParentId;
                nodes[dragIndex].stackParent = dragClone.stackParent;
                nodes[dragIndex].leftNeighborId = dragClone.leftNeighborId;
                nodes[dragIndex].rightNeighborId = dragClone.rightNeighborId;
                nodes[dragIndex].collapsed = dragClone.collapsed;
                nodes[dragIndex].collapsable = dragClone.collapsable;

                // set dropped node props
                nodes[dropIndex].id = dropClone.id;
                nodes[dropIndex].nodeDOM.id = dropClone.id;
                nodes[dropIndex].parentId = dropClone.parentId;
                nodes[dropIndex].children = dropClone.children;
                nodes[dropIndex].connStyle = dropClone.connStyle;
                nodes[dropIndex].stackChildren = dropClone.stackChildren;
                nodes[dropIndex].stackParent = dropClone.stackParent;
                nodes[dropIndex].stackParentId = dropClone.stackParentId;
                nodes[dropIndex].leftNeighborId = dropClone.leftNeighborId;
                nodes[dropIndex].rightNeighborId = dropClone.rightNeighborId;
                nodes[dropIndex].collapsed = dropClone.collapsed;
                nodes[dropIndex].collapsable = dropClone.collapsable;
            }

            function hidePopover() {
                $(popoverElm1).popover('hide');
                $(popoverElm2).popover('hide');
            }

            function drag(event) {
                draggedNode = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));

                hidePopover();

                __this.dragged.emit({ draggedNode, $ });
            }

            function drop(event) {
                event.preventDefault();
                droppedNode = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));

                hidePopover();

                __this.dropped.emit({ draggedNode: droppedNode, droppedNode: draggedNode, $ });

                const dragIndex = callback.nodeDB.db.findIndex((n) => n.id == draggedNode.id);
                const dropIndex = callback.nodeDB.db.findIndex((n) => n.id == droppedNode.id);

                swapNodes(callback.nodeDB.db, dragIndex, dropIndex);

                callback.positionTree();
            }

            function allowDrop(event) {
                event.preventDefault();
            }

            function updateTextVal(currentEle, value, classVal, node, propName) {
                let isTextUpdated = false;

                $(document).off('click');
                $(currentEle).html(
                    '<input class="input-field" style="width:' +
                        $(currentEle).width() +
                        'px;" type="text" value="' +
                        value +
                        '"/>'
                );
                $('.input-field').focus();
                $('.input-field').keyup(function (event) {
                    if (event.keyCode === 13) {
                        const inputClass = $(event.target).attr('class');
                        const newValue = $('.input-field').val() ? $('.input-field').val() : value;

                        $(currentEle).html('<p class="' + classVal + '">' + newValue + '</p>');
                        if (inputClass === 'input-field') {
                            isTextUpdated = true;
                        }

                        if (propName) {
                            node.text[propName] = newValue;
                            node.width = $(currentEle).width();
                        }

                        callback.positionTree();

                        __this.updated.emit({ node, $ });
                    }
                });

                $(document).click(function () {
                    if ($(event.target).attr('class') !== 'input-field' && !isTextUpdated) {
                        const newValue = $('.input-field').val() ? $('.input-field').val() : value;

                        $(currentEle).html('<p class="' + classVal + '">' + newValue + '</p>');
                        $(document).off('click');

                        if (propName) {
                            node.text[propName] = newValue;
                            node.width = $(currentEle).width();
                        }

                        callback.positionTree();

                        __this.updated.emit({ node, $ });
                    }
                });
            }

            this.isDraggable && addDragAndDropSupport();

            $oNodes.off('click').on('click', function (event) {
                const node = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));

                hidePopover();

                __this.clicked.emit({ node, $ });
            });

            $oNodes.off('dblclick').on('dblclick', function (e) {
                if ($(event.target).attr('class') !== 'input-field') {
                    e.stopPropagation();
                    const node = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                    const currentEle = $(event.target);
                    const value = $(event.target).text();
                    const classVal = $(event.target).attr('class');
                    const propName = classVal && classVal.split('-')[1];

                    hidePopover();

                    node.text &&
                        node.text[propName] &&
                        updateTextVal(currentEle, value, classVal, node, propName);
                }
            });

            if (this.popoverSettings) {
                $oNodes.popover(this.popoverSettings);
                $oNodes
                    .off('mouseenter')
                    .on('mouseenter', function (e) {
                        hidePopover();

                        popoverElm1 = this;

                        $(this).popover('show');

                        const node = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                        __this.hovered.emit({ node, $ });

                        clearTimeout(timeout);

                        $('.popover')
                            .off('mouseleave')
                            .on('mouseleave', function () {
                                hidePopover();
                            });
                    })
                    .off('mouseleave')
                    .on('mouseleave', function (e) {
                        let hovered = false;
                        popoverElm2 = this;

                        $('.popover').hover(
                            function () {
                                hovered = true;
                            },
                            function () {
                                hovered = false;
                            }
                        );

                        if (!$('.popover:hover').length) {
                            timeout = setTimeout(() => {
                                !hovered && hidePopover();
                            }, __this.mouseleaveMilliseconds || 0);
                        }
                    });
            }

            // emit Tree nodes
            this.loadedNodes.emit({ nodes: callback.nodeDB.db, $ });
        };

        // create Treant instance and add its container ID
        // this instance can be useful to operate on the Tree
        const treant = new Treant(this.data, callback, $);
        treant.container_id = this.chartId;
        this.loadedTreant.emit(treant);
    }
}
