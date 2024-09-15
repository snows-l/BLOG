<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-15 19:43:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-15 22:52:39
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
  } else if (val <= 15) {
    return 15;
  } else {
    return 20;
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
        var toolTiphtml = params.name + ':<br>';
        state.data.forEach((item, index) => {
          if (item.name == params.name) {
            item.data.forEach((item, index) => {
              toolTiphtml += item.name + ': ' + item.value + ' 人次<br>';
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
      data: ['credit_pm2.5'],
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
          readOnly: false
        },
        restore: {},
        saveAsImage: {}
      }
    },
    geo: {
      show: true,
      map: 'china',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#031525',
          borderColor: '#076ba1'
        },
        emphasis: {
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
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: 'rgba(255,255,0,0.8)'
          }
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
          normal: {
            show: true
          },
          emphasis: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#031525',
            borderColor: '#3B5077'
          },
          emphasis: {
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
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: 'rgba(255,255,0,0.8)',
            shadowBlur: 10,
            shadowColor: '#05C3F9'
          }
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

getBlogVisitList().then(res => {
  if (res.code == 200) {
    state.data.forEach((item, index) => {
      let sum = 0;
      res.data.forEach(item2 => {
        if (item2.city.includes(item.name)) {
          sum = item2.total;
        }
      });
      item.value = sum;
      item.data[0].value = sum;
    });
  }
  const option = getOption();
  chartInstance.value.setOption(option);
});

const resetViewCharts = () => {
  chartInstance.value.resize();
};

onMounted(() => {
  chartInstance.value = echarts.init(chartContainer.value);
  echarts.registerMap('china', geoJson);
  const option = getOption();
  chartInstance.value.setOption(option);

  //echarts 设置地图外边框以及多个geo实现缩放拖曳同步
  chartInstance.value.on('georoam', function (params) {
    let option = chartInstance.value.getOption(); //获得option对象
    if (params.zoom != null && params.zoom != undefined) {
      //捕捉到缩放时
      option.geo[0].zoom = option.series[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
      option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
    } else {
      //捕捉到拖曳时
      option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
    }
    chartInstance.value.setOption(option); //设置option
  });

  window.addEventListener('resize', resetViewCharts);
});

onUnmounted(() => {
  window.removeEventListener('resize', resetViewCharts);
  chartInstance.value && chartInstance.value.dispose();
});
</script>
