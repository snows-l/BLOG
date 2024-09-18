<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-15 19:43:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-18 20:59:09
 * @FilePath: /BLOG/src/components/MapCharts/index.vue
-->
<template>
  <div ref="chartContainer" id="mapChart" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import { getBlogVisitList } from '@/api/common';
import * as echarts from 'echarts';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import geoJson from './chinaJson.json';

const chartContainer = ref(null);
const chartInstance = ref(null);

const state = reactive({
  data: []
});

const geoCoordMap = {};
geoJson.features.forEach(function (v) {
  let name = v.properties.name; // 地区名称
  geoCoordMap[name] = v.properties.center; // 地区经纬度
  let sum = 0;
  let list = [{ name: '访问数量 ', value: 0 }];
  list.forEach((item, index) => {
    sum += Number(item.value);
  });
  state.data.push({
    name: name,
    value: sum,
    data: list
  });
});
state.data.push({
  name: '其他国家（国外）',
  value: 0,
  data: [{ name: '访问数量 ', value: 0 }]
});

const convertData = (geoCoordMap, data) => {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};
const maxNumberArr = (data, field) => {
  field = field ? field : 'value';
  var max = 0;
  for (var a = 0; a < data.length; a++) {
    if (Number(data[a][field]) > max) {
      max = Number(data[a][field]);
    }
  }
  return max;
};

const getsymbolSize = val => {
  if (val == 0) {
    return 0;
  } else if (val <= 5) {
    return 5;
  } else if (val <= 10) {
    return 10;
  } else {
    return 15;
  }
};

const getOption = () => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        if (!params.name || params.name == '') {
          return;
        }
        let toolTiphtml = params.name + ': ';
        state.data.forEach((item, index) => {
          if (item.name == params.name) {
            item.data.forEach((item, index) => {
              toolTiphtml += item.value;
            });
          }
        });
        return toolTiphtml;
      }
    },
    legend: {
      orient: 'vertical',
      y: 'bottom',
      x: 'right',
      data: [],
      textStyle: {
        color: '#fff'
      }
    },
    visualMap: {
      show: false,
      min: 0,
      max: maxNumberArr(state.data),
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: true,
      seriesIndex: [1],
      inRange: {
        color: ['#00568f', '#052d4f']
      }
    },
    /*工具按钮组*/
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: {
          title: '数据',
          readOnly: false
        },
        // restore: {
        //   title: '还原',
        //   onClick: function () {
        //     getBlogVisitListFn();
        //   }
        // },
        // 自定义刷新按钮
        myRefresh: {
          show: true,
          title: '刷新',
          icon: 'path://M512 981.333333c-209.866667 0-396.693333-126.026667-466.293333-314.08a35.52 35.52 0 0 1 23.626666-44.426666 38.613333 38.613333 0 0 1 48 20.693333c58.666667 158.933333 217.013333 265.493333 394.666667 265.6s336-106.666667 394.666667-266.133333a37.6 37.6 0 0 1 28.853333-23.626667 38.986667 38.986667 0 0 1 35.786667 11.946667 34.773333 34.773333 0 0 1 7.146666 35.36c-69.386667 188.373333-256.48 314.666667-466.453333 314.666666z m431.36-574.08a37.92 37.92 0 0 1-35.946667-24.266666C849.386667 222.56 690.613333 114.88 512 114.72S174.72 222.346667 116.746667 382.773333A38.72 38.72 0 0 1 69.333333 403.733333a35.786667 35.786667 0 0 1-24.106666-44.373333C113.333333 169.866667 301.013333 42.666667 512 42.666667s398.666667 127.306667 467.146667 316.96a34.56 34.56 0 0 1-4.906667 32.64 38.933333 38.933333 0 0 1-30.88 14.986666z',
          onclick: function () {
            getBlogVisitListFn();
          }
        },
        saveAsImage: {
          title: '保存为图片',
          type: 'png',
          name: 'BLOG地图',
          excludeComponents: ['toolbox'],
          pixelRatio: 2
        }
      }
    },
    geo: {
      show: true,
      map: 'china',
      roam: false,
      itemStyle: {
        areaColor: '#031525',
        borderColor: '#076ba1'
      },
      emphasis: {
        label: {
          show: false
        },
        itemStyle: {
          areaColor: '#2B91B7'
        }
      }
    },
    series: [
      {
        name: '散点',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: function (val) {
          return getsymbolSize(val[2]);
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          label: {
            show: false
          }
        },
        itemStyle: {
          color: 'rgba(255,255,0,0.8)'
        },
        data: convertData(geoCoordMap, state.data)
      },
      {
        name: '图层',
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
          show: true,
          color: '#fff'
        },
        roam: true,
        itemStyle: {
          areaColor: '#031525',
          borderColor: '#3B5077'
        },
        emphasis: {
          label: {
            show: false
          },
          itemStyle: {
            areaColor: '#2B91B7'
          }
        },
        animation: true,
        data: state.data
      },
      {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: function (val) {
          return getsymbolSize(val[2]);
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        itemStyle: {
          color: 'rgba(255,255,0,0.8)',
          shadowBlur: 10,
          shadowColor: '#05C3F9'
        },
        emphasis: {
          scale: true
        },
        zlevel: 1,
        data: convertData(
          geoCoordMap,
          state.data
            .sort(function (a, b) {
              return b.value - a.value;
            })
            .slice(0, 5)
        )
      }
    ]
  };
};

const getBlogVisitListFn = () => {
  // 获取数据
  getBlogVisitList().then(res => {
    if (res.code == 200) {
      state.data.forEach((item, index) => {
        let sum = 0;
        let otherSum = 0;
        res.data.forEach(item2 => {
          if (item2.city.includes(item.name)) {
            sum = item2.total;
          }
          if (item2.city.includes('其他')) {
            otherSum = item2.total;
          }
        });
        item.value = sum;
        item.data[0].value = sum;
        if (item.name.includes('其他')) {
          item.value = otherSum;
          item.data[0].value = item.value;
        }
      });
    }
    const option = getOption();
    chartInstance.value.setOption(option);
  });
};
getBlogVisitListFn();

const resetViewCharts = () => {
  chartInstance.value.resize();
};

onMounted(() => {
  chartInstance.value = echarts.init(chartContainer.value);
  echarts.registerMap('china', geoJson);
  const option = getOption();
  chartInstance.value.setOption(option);

  window.addEventListener('resize', resetViewCharts);
});

onUnmounted(() => {
  window.removeEventListener('resize', resetViewCharts);
  chartInstance.value && chartInstance.value.dispose();
});
</script>
