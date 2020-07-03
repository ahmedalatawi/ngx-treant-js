import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

declare const Treant: any;
declare const $: any;

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
                nodes[dragIndex].rightNeighborId = dragClone.rightNeighborId; //collapsable
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

            function drag(event) {
                draggedNode = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                __this.dragged.emit({ draggedNode, $ });
            }

            function drop(event) {
                event.preventDefault();
                droppedNode = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));

                __this.dropped.emit({ draggedNode, droppedNode, $ });

                const dragIndex = callback.nodeDB.db.findIndex((n) => n.id == draggedNode.id);
                const dropIndex = callback.nodeDB.db.findIndex((n) => n.id == droppedNode.id);

                swapNodes(callback.nodeDB.db, dragIndex, dropIndex);

                callback.positionTree();
            }

            function allowDrop(event) {
                event.preventDefault();
            }

            function updateTextVal(currentEle, value, classVal) {
                const node = callback.nodeDB.db.find((n) => n.id == $(currentEle).attr('id'));
                let isTextUpdated = false;

                $(document).off('click');
                $(currentEle).html(
                    '<input class="input-field" type="text" value="' + value + '"/>'
                );
                $('.input-field').focus();
                $('.input-field').keyup(function (event) {
                    if (event.keyCode === 13) {
                        const inputClass = $(event.target).attr('class');
                        const newValue = $('.input-field').val() ? $('.input-field').val() : value;
                        console.log('current value ', value);
                        console.log('value ', $('.input-field').val());
                        $(currentEle).html('<p class="' + classVal + '">' + newValue + '</p>');
                        if (inputClass === 'input-field') {
                            isTextUpdated = true;
                        }

                        node.text.name = newValue;
                        node.width = $(currentEle).width();

                        callback.positionTree();

                        __this.updated.emit({ node, $ });
                    }
                });

                $(document).click(function () {
                    if ($(event.target).attr('class') !== 'input-field' && !isTextUpdated) {
                        const newValue = $('.input-field').val() ? $('.input-field').val() : value;

                        $(currentEle).html('<p class="' + classVal + '">' + newValue + '</p>');
                        $(document).off('click');

                        node.text.name = newValue;
                        node.width = $(currentEle).width();

                        callback.positionTree();

                        __this.updated.emit({ node, $ });
                    }
                });
            }

            this.isDraggable && addDragAndDropSupport();

            $oNodes.off('click').on('click', function (event) {
                const node = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                __this.clicked.emit({ node, $ });
            });

            $oNodes.off('dblclick').on('dblclick', function (e) {
                if ($(event.target).attr('class') !== 'input-field') {
                    e.stopPropagation();
                    const currentEle = $(this);
                    const value = $(this).text();
                    const classVal = $(event.target).attr('class');
                    const node = callback.nodeDB.db.find((n) => n.id == $(currentEle).attr('id'));

                    !node.image && updateTextVal(currentEle, value, classVal);
                }
            });

            if (this.popoverSettings) {
                $oNodes.popover(this.popoverSettings);
                $oNodes
                    .off('mouseenter')
                    .on('mouseenter', function () {
                        var _this = this;
                        $(this).popover('show');

                        const node = callback.nodeDB.db.find((n) => n.id == $(this).attr('id'));
                        __this.hovered.emit({ node, $ });

                        $('.popover').on('mouseleave', function () {
                            $(_this).popover('hide');
                        });
                    })
                    .off('mouseleave')
                    .on('mouseleave', function () {
                        var _this = this;
                        setTimeout(function () {
                            if (!$('.popover:hover').length) {
                                $(_this).popover('hide');
                            }
                        }, __this.mouseleaveMilliseconds || 0);
                    });
            }

            this.loadedNodes.emit({ nodes: callback.nodeDB.db, $ });
        };

        const treant = new Treant(this.data, callback, $);
        treant.container_id = this.chartId;
        this.loadedTreant.emit(treant);
    }
}
