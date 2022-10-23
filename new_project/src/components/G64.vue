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
  import {onFrame} from '@antv/g6/dist/g6.min.js';
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
          defaultNode: {
            type: 'circle',
            style: {
            fill: '#fff',
            fontSize: 22,
                  },
          },
          layout: {
            type: 'force',
            preventOverlap: true,
            linkDistance: 200,
          },
          modes: {
            default: ['drag-canvas'],
          },
        });
      // json数据衔接
        var data="";
        data=this.testart
        const nodes = data.nodes;
        nodes.forEach((node) => {
            node.size = Math.random() * 30 + 40;
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

        // 监听节点上的click事件
        graph.on('node:click', (ev) => {
          var item = ev.item;
          // 数据联动
          this.$store.commit('increment', item._cfg.id);
          this.$emit('fatherMethodxy');

          // 聚焦当前点击的节点（把节点放到视口中心）
          var matrix = item.get('group').getMatrix();       
          var point = {
            x: matrix[6],
            y: matrix[7]
          };
          var width = graph.get('width');
          var height = graph.get('height');
          // 找到视口中心
          var viewCenter = {
            x: width / 2,
            y: height / 2
          };
          var modelCenter = graph.getPointByCanvas(viewCenter.x, viewCenter.y);
          // var viewportMatrix = graph.get('group').getMatrix();
          // console.log("viewportMatrix",graph.get('group'));
          // debugger
          // 画布平移的目标位置，最终目标是graph.translate(dx, dy);
          // var dx = (modelCenter.x - point.x) * viewportMatrix[0];
          // var dy = (modelCenter.y - point.y) * viewportMatrix[4];
          var dx = modelCenter.x - point.x;
          var dy = modelCenter.y - point.y;
          var lastX = 0;
          var lastY = 0;
          var newX = void 0;
          var newY = void 0;
          // 动画每次平移一点，直到目标位置
          graph.get('canvas').animate({
            onFrame: function onFrame(ratio) {
              newX = dx * ratio;
              newY = dy * ratio;
              graph.translate(newX - lastX, newY - lastY);
              
              lastX = newX;
              lastY = newY;
            }
          }, 300, 'easeCubic');
          // graph.zoom(2, { x: 100, y: 100 });
        });
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
  