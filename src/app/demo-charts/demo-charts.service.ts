import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DemoAppService {
    private organiseChartBigCommpanyData = {
        chart: {
            container: '#OrganiseChart-big-commpany',
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
                {
                    text: { name: 'Operation Manager' },
                    connectors: {
                        style: {
                            stroke: '#bbb',
                            'stroke-dasharray': '- .', // "", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."
                            'arrow-start': 'classic-wide-long',
                        },
                    },
                    children: [
                        {
                            text: { name: 'Manager I' },
                            connectors: {
                                style: {
                                    stroke: '#00CE67',
                                },
                            },
                            children: [
                                {
                                    text: { name: 'Worker I' },
                                },
                                {
                                    pseudo: true,
                                    connectors: {
                                        style: {
                                            stroke: '#00CE67',
                                        },
                                    },
                                    children: [
                                        {
                                            text: { name: 'Worker II' },
                                        },
                                    ],
                                },
                                {
                                    text: { name: 'Worker III' },
                                },
                            ],
                        },
                        {
                            text: { name: 'Manager II' },
                            connectors: {
                                type: 'curve',
                                style: {
                                    stroke: '#50688D',
                                },
                            },
                            children: [
                                {
                                    text: { name: 'Worker I' },
                                },
                                {
                                    text: { name: 'Worker II' },
                                },
                            ],
                        },
                        {
                            text: { name: 'Manager III' },
                            connectors: {
                                style: {
                                    stroke: '#FF5555',
                                },
                            },
                            children: [
                                {
                                    text: { name: 'Worker I' },
                                },
                                {
                                    pseudo: true,
                                    connectors: {
                                        style: {
                                            stroke: '#FF5555',
                                        },
                                    },
                                    children: [
                                        {
                                            text: { name: 'Worker II' },
                                        },
                                        {
                                            text: { name: 'Worker III' },
                                        },
                                    ],
                                },
                                {
                                    text: { name: 'Worker IV' },
                                },
                            ],
                        },
                    ],
                },
                {
                    text: { name: 'Delivery Manager' },
                    stackChildren: true,
                    connectors: {
                        stackIndent: 30,
                        style: {
                            stroke: '#E3C61A',
                            'arrow-end': 'block-wide-long',
                        },
                    },
                    children: [
                        {
                            text: { name: 'Driver I' },
                        },
                        {
                            text: { name: 'Driver II' },
                        },
                        {
                            text: { name: 'Driver III' },
                        },
                    ],
                },
            ],
        },
    };

    private collapsableStructureData = {
        chart: {
            container: '#collapsable-structure',

            animateOnInit: false,

            node: {
                collapsable: true,
            },
            animation: {
                nodeAnimation: 'easeOutBounce',
                nodeSpeed: 700,
                connectorsAnimation: 'bounce',
                connectorsSpeed: 700,
            },
        },
        nodeStructure: {
            image: 'http://fperucic.github.io/treant-js/examples/collapsable/img/malory.png',
            id: 0,
            // text: {
            //     contact: {
            //         val: "contact me",
            //         href: "http://twitter.com/",
            //         target: "_self"
            //     }
            // },
            children: [
                {
                    image: 'http://fperucic.github.io/treant-js/examples/collapsable/img/lana.png',
                    id: 1,
                    collapsed: true,
                    children: [
                        {
                            image:
                                'http://fperucic.github.io/treant-js/examples/collapsable/img/figgs.png',
                            id: 2,
                        },
                    ],
                },
                {
                    image:
                        'http://fperucic.github.io/treant-js/examples/collapsable/img/sterling.png',
                    id: 3,
                    childrenDropLevel: 1,
                    children: [
                        {
                            image:
                                'http://fperucic.github.io/treant-js/examples/collapsable/img/woodhouse.png',
                            id: 4,
                        },
                    ],
                },
                {
                    pseudo: true,
                    children: [
                        {
                            image:
                                'http://fperucic.github.io/treant-js/examples/collapsable/img/cheryl.png',
                            id: 5,
                        },
                        {
                            image:
                                'http://fperucic.github.io/treant-js/examples/collapsable/img/pam.png',
                            id: 6,
                        },
                    ],
                },
            ],
        },
    };

    private basicPopoverData = {
        chart: {
            container: "#basic-popover",
            connectors: {
                type: 'step'
            },
            node: {
                HTMLclass: 'nodeExample1'
            }
        },
        nodeStructure: {
            id: 0,
            parentId: -1,
            text: {
                name: "Mark Hill",
                title: "Chief executive officer",
                contact: "Tel: 01 213 123 134",
            },
            image: "assets/headshots/2.jpg",
            children: [
                {
                    text:{
                        name: "Joe Linux",
                        title: "Chief Technology Officer",
                    },
                    id: 1,
                    parentId: 0,
                    stackChildren: true,
                    image: "assets/headshots/1.jpg",
                    children: [
                        {
                            text:{
                                name: "Ron Blomquist",
                                title: "Chief Information Security Officer"
                            },
                            id: 2,
                            parentId: 1,
                            image: "assets/headshots/8.jpg"
                        },
                        {
                            text:{
                                name: "Michael Rubin",
                                title: "Chief Innovation Officer",
                                contact: "we@aregreat.com"
                            },
                            id: 3,
                            parentId: 2,
                            image: "assets/headshots/9.jpg"
                        }
                    ]
                },
                {
                    stackChildren: true,
                    text:{
                        name: "Linda May",
                        title: "Chief Business Officer",
                    },
                    id: 4,
                    parentId: 0,
                    image: "assets/headshots/5.jpg",
                    children: [
                        {
                            text:{
                                name: "Alice Lopez",
                                title: "Chief Communications Officer"
                            },
                            id: 5,
                            parentId: 4,
                            image: "assets/headshots/7.jpg"
                        },
                        {
                            text:{
                                name: "Mary Johnson",
                                title: "Chief Brand Officer"
                            },
                            id: 6,
                            parentId: 5,
                            image: "assets/headshots/4.jpg"
                        },
                        {
                            text:{
                                name: "Kirk Douglas",
                                title: "Chief Business Development Officer"
                            },
                            id: 7,
                            parentId: 6,
                            image: "assets/headshots/11.jpg"
                        }
                    ]
                },
                {
                    text:{
                        name: "John Green",
                        title: "Chief accounting officer",
                        contact: "Tel: 01 213 123 134",
                    },
                    id: 8,
                    parentId: 0,
                    image: "assets/headshots/6.jpg",
                    children: [
                        {
                            text:{
                                name: "Erica Reel",
                                title: "Chief Customer Officer"
                            },
                            // link: {
                            //     href: "http://www.google.com"
                            // },
                            id: 9,
                            parentId: 8,
                            image: "assets/headshots/10.jpg"
                        }
                    ]
                }
            ]
        }
    };


    constructor() {}

    getOrganiseChartBigCommpanyData(): any {
        return this.organiseChartBigCommpanyData;
    }

    getCollapsableStructureData(): any {
        return this.collapsableStructureData;
    }

    getBasicPopoverData(): any {
        return this.basicPopoverData;
    }

    flattenItems(items, key): any {
        return items.reduce((flattenedItems, item) => {
            flattenedItems.push(item)
            if (Array.isArray(item[key])) {
                flattenedItems = flattenedItems.concat(this.flattenItems(item[key], key))
                // delete item[key]
            }
            return flattenedItems
        }, [])
      }
}
