[![Build Status](https://travis-ci.com/AhmedAlatawi/ngx-treant-js.svg?branch=master)](https://travis-ci.org/AhmedAlatawi/ngx-treant-js)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)


# NgxTreantJS :deciduous_tree:

![](./images/angular_treant_js.gif)

A simple Angular2+ component used as a wrapper for [TreantJS](https://fperucic.github.io/treant-js/) library for visualization of tree (chart) diagrams, with additional functionality. :fire::fire::fire:

### [Demo](https://codesandbox.io/s/ngx-treant-js-demo-u5skm) :movie_camera:

### :arrow_down: Installation 
```sh
npm install @ahmed757/ngx-treant-js --save
```

### :wrench: Configuration
Add required dependencies to `angular.json` as follows:

```json
...

"styles": [
    "node_modules/treant-js/Treant.css",
    "node_modules/treant-js/vendor/perfect-scrollbar/perfect-scrollbar.css",
    "src/styles.css"
],
"scripts": [
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/popper.js/dist/umd/popper.js",
    "node_modules/treant-js/vendor/jquery.easing.js",
    "node_modules/treant-js/vendor/jquery.mousewheel.js",
    "node_modules/treant-js/vendor/perfect-scrollbar/perfect-scrollbar.js",
    "node_modules/treant-js/vendor/raphael.js",
    "node_modules/treant-js/Treant.js"
]
...
```

See full example [here](https://github.com/AhmedAlatawi/ngx-treant-js/blob/master/angular.json).

### :pencil2: Key Goals
* Easy to integrate and use in any `Angular` applications
* Provide `callback` functions to react to user's actions, e.g. single-click, double-click, drag-drop, hover, etc
* provide `drag-drop` feature for swapping (re-positioning) `Tree` nodes
* Support adding & removing `Tree` nodes
* Support editting `Node`'s content, e.g. `name`, `title`, etc

### Quick start :rocket:
`employess-chart.component.html`
```html
<ngx-treant-chart
    [chartId]="employeesChartId"
    [chartClass]="employeesChartClass"
    [data]="employeesData">
</ngx-treant-chart>
```

`employess-chart.component.ts`
```typescript
export class EmployeesChartComponent {
    employeesChartId = 'employessChart-commpany';
    employeesChartClass = 'employess-chart';

    employeesData = {
        chart: {
            container: "#employessChart-commpany",
            
            connectors: {
                type: 'step'
            },
            node: {
                HTMLclass: 'employessNode'
            }
        },
        nodeStructure: {
            text: {
                name: "Paul Young",
                title: "Chief executive officer",
                contact: "Cel: 01 213 123 134",
            },
            image: "assets/images/img1.jpg",
            children: [
                {
                    text:{
                        name: "John Doe",
                        title: "Chief Technology Officer",
                    },
                    stackChildren: true,
                    image: "assets/images/img2.jpg",
                    children: [ ... ]
                }
            ]
        }
    }
}
```

`styles.css`
```css
...
.employess-chart {
  height: 600px;
  margin: 5px;
  width: 900px;
}

.Treant> p {
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
  font-weight: bold;
  font-size: 12px;
}

.node-name {
  font-weight: bold;
}

.employessNode {
  padding: 2px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background-color: #ffffff;
  border: 1px solid #000;
  width: 200px;
  font-family: Tahoma;
  font-size: 12px;
}
...
```
See full example [here](https://github.com/fperucic/treant-js/tree/master/examples/basic-example).

**Note: :bulb:** In a real world application, the `data` would most likely come from a server or remote place, which means that we would need to initialize `NgxTreantChart` only when `data` arrives. Therefore, `*ngIf` can be used as a workaround as follows:
```html
<ngx-treant-chart
    ...

    *ngIf="isDataLoaded">
</ngx-treant-chart>
```

### Bootstrap Popover Example
![](./images/chart_with_popover_example.gif)


### :page_facing_up: NgxTreantChart component API

| Attributes | Description |
| --- | --- |
| `[chartId]` | The chart uniqe `ID` (required) | 
| `[chartClass]` | The chart `CSS` class uniqe name (optional) |
| `[data]` | The data used for visualization of chart diagrams (required) |
| `[popoverSettings]` | The settings used for customizing a `popover` (optional - see [example]()) |
| `[mouseleaveMilliseconds]` | The mouseleaveMilliseconds delay used prior to a `popover` being hidden (optional) |
| `[isDraggable]` | A `boolean` flag used to enable `drag` & `drop` support (optional) |
| `(clicked)` | A callback function invoked when a `TreeNode` is clicked |
| `(hovered)` | A callback function invoked when a `TreeNode` is mouse hovered |
| `(dragged)` | A callback function invoked when a `TreeNode` is dragged |
| `(dropped)` | A callback function invoked when a `TreeNode` is dropped |
| `(updated)` | A callback function invoked when `TreeNode`'s content is updated on dblclick event |
| `(loadedNodes)` | A callback function invoked when `TreeNodes` are loaded |
| `(loadedTree)` | A callback function invoked when the `Tree` is loaded |
| `(loadedTreant)` | A callback function invoked when the `Treant` is loaded |

### Notes: :bulb:

1. The callback functions: `clicked`, `hovered`, and `updated` return a value of `Object` type, which consists of two properties:

* `Node`: instance of `TreeNode` type for the node that was modified
* `$`: `jQuery` instance, which can be used to perform any additional desired functionality that requires `jQuery`

### Example :pushpin:

```html
<ngx-treant-chart
    ...

    (clicked)="onClick($event)">
</ngx-treant-chart>
```
```typescript
onClick(event: any): void {
/* 
event: {
  node: {
    X: 106
    Y: 259.5
    children: (3) [1, 4, 19]
    collapsable: undefined
    collapsed: undefined
    connStyle: {type: "step", style: {…}, 
    stackIndent: 15}
    drawLineThrough: undefined
    height: 30
    id: 0
    image: undefined,
    ...
  },

  $: ƒ (e,t)
}
*/
}
```

2. The callback function `dragged` returns an object which contains an instance of `TreeNode` type as well as `jQuery` as follows:
```typescript
{
    draggedNode: {
        X: 106
        Y: 259.5
        children: (3) [1, 4, 19]
        collapsable: undefined,
        ...
    },

    $: ƒ (e,t)
}
```

3. The callback function `dropped` returns the following:
* `draggedNode`: the dragged node of `TreeNode` type
* `droppedNode`: the dropped node of `TreeNode` type
* `$`: `jQuery` instance

4. The callback function `loadedNodes` returns all `Tree` (chart) nodes.

5. The callback function `loadedTree` returns an instance of `Tree` (chart) type. The instance provides useful properties and functions, such as `nodeDB` and `positionTree()`, which can be used to update tree (chart) nodes:

```typescript
...

onLoadTree(tree: any): void {
    const nodes = tree.nodeDB;

    // do something with nodes

    tree.positionTree(); // apply changes
}
```

6. The callback function `loadedTreant` returns an instance of `Treant` type. The instance consists of `container_id` and `tree_id`:

```typescript
...

onLoadTreant(treant: any): void {
    console.log(treant);
    /* example
      {
        container_id: "employessChart-commpany",
        tree_id: 0
      }
    */

    treant.destroy(); // destroy tree
}
```


### Reference :dart:
* [TreantJS](https://fperucic.github.io/treant-js/)


### Author :books:
[Ahmed Alatawi](https://github.com/AhmedAlatawi)

