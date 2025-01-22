'use client'
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface SystemGaugeProps {
  value: number;
  title: string;
}

export default function SystemGauge({ value, title }: SystemGaugeProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        formatter: '{b}: {c}%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e6e8eb',
        textStyle: {
          color: '#1d2129',
        },
      },
      series: [
        {
          type: 'gauge',
          radius: '100%',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 100,
          splitNumber: 5,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.3, '#58b9e3'],  // 低负载 - 浅蓝色（像山间的溪流）
                [0.7, '#4992ff'],  // 中负载 - 深蓝色（像晴朗的天空）
                [1, '#6056e9']     // 高负载 - 紫色（像日落时的山峰）
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 6,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: '#464e79'
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: '#464e79',
              width: 1
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: '#464e79',
              width: 2
            }
          },
          axisLabel: {
            color: '#464e79',
            fontSize: 12,
            distance: -60,
            formatter: function(value: number) {
              if (value === 0 || value === 100) {
                return value + '%';
              }
              return '';
            }
          },
          title: {
            offsetCenter: [0, '-20%'],
            fontSize: 14,
            color: '#464e79'
          },
          detail: {
            fontSize: 20,
            offsetCenter: [0, '0%'],
            valueAnimation: true,
            formatter: function(value: number) {
              return value.toFixed(1) + '%';
            },
            color: '#464e79'
          },
          data: [{
            value: value,
            name: title
          }]
        }
      ]
    };

    chartInstance.current.setOption(option);

    // 响应式调整
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, [value, title]);

  return <div ref={chartRef} className="w-24 h-24" />;
} 