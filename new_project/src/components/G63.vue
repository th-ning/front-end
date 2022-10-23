<template>
    <div id="G6App">
        <!-- G6展示区域 -->
    </div>
  </template>
  
  <script>
  import G6 from '@antv/g6';
  import testque from '../G6Json/testque.json'
  import test from '../G6Json/test.json'
  import testart from '../G6Json/testart.json'
  import tester from '../G6Json/tester.json'
  export default {
    name: 'G6',
    props: {
      msg: String
    },
    data(){
      return{
        query_type:'Research question',
        testque,
        test,   
        testart,  
        tester      
      }
    },
    methods: {
      G6() {
        const container = document.getElementById('G6App');
        const graph = new G6.Graph({
          container: 'G6App',
          width:window.innerWidth-510,
          height:window.innerHeight-100,
          layout: {
            type: 'force',
            preventOverlap: true,
            linkDistance: 200
          },
          modes: {
            default: ['drag-canvas'],
          },
        });
      // json数据衔接
        var data="";
        // if (type=='Research question'){
        //   data=this.testque
        //   console.log("第一");
        // }else if (type=='Research objective'){
        //   data=this.test
        //   console.log("第二");
        // }else if (type=='Researcher'){
        //   data=this.tester
        //   console.log("第三");
        // }else if (type=='Article'){
        //   data=this.testart
        //   console.log("第四");
        // }else{
        //   data=this.test
        // };
        data=this.tester
        const nodes = data.nodes;
        nodes.forEach((node) => {
            node.size = Math.random() * 30 + 5;
        });
        graph.data({
            nodes: data.nodes,
            edges: data.edges.map(function (edge, i) {
              edge.id = 'edge' + i;
              return Object.assign({}, edge);
            }),
        });
        // graph.refresh();
        graph.render();
  
        graph.on('node:dragstart', function (e) {
            graph.layout();
            const model = e.item.get('model');
            model.fx = e.x;
            model.fy = e.y;
        });
        graph.on('node:drag', function (e) {
            const forceLayout = graph.get('layoutController').layoutMethods[0];
            forceLayout.execute();
            const model = e.item.get('model');
            model.fx = e.x;
            model.fy = e.y;
        });
        graph.on('node:dragend', function (e) {
            e.item.get('model').fx = null;
            e.item.get('model').fy = null;
        });
  
        if (typeof window !== 'undefined')
            window.onresize = () => {
              if (!graph || graph.get('destroyed')) return;
              if (!container || !container.scrollWidth || !container.scrollHeight) return;
              graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
      },
    },
    mounted(){
      this.G6();
    }
  }
  </script>
  <style scoped>
    #G6App{
      width: 100%;
      height: 100%;
    }
  </style>
  