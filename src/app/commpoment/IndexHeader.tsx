'use client'
import { useState, useEffect } from 'react';
import { Spin } from '@arco-design/web-react';
import * as echarts from 'echarts';

interface SystemInfo {
  memory: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };
  cpu: {
    usage: number;
    count: number;
  };
}

export default function IndexHeader() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const initChart = (elementId: string, data: number, title: string) => {
    const chartDom = document.getElementById(elementId);
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    const option = {
      tooltip: {
        formatter: '{b}: {c}%'
      },
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#1890ff'
                  },
                  {
                    offset: 1,
                    color: '#91d5ff'
                  }
                ]
              }
            }
          },
          axisLine: {
            lineStyle: {
              width: 8
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          title: {
            fontSize: 14,
            offsetCenter: [0, '30%']
          },
          data: [
            {
              value: data,
              name: title,
              title: {
                offsetCenter: ['0%', '-30%']
              },
              detail: {
                offsetCenter: ['0%', '0%']
              }
            }
          ],
          detail: {
            width: 50,
            height: 14,
            fontSize: 16,
            color: '#1890ff',
            formatter: '{value}%'
          }
        }
      ]
    };
    myChart.setOption(option);
  };

  useEffect(() => {
    fetchSystemInfo();
    const interval = setInterval(fetchSystemInfo, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (systemInfo) {
      initChart('memoryChart', systemInfo.memory.usage, '内存使用率');
      initChart('cpuChart', systemInfo.cpu.usage, 'CPU使用率');
    }
  }, [systemInfo]);

  const fetchSystemInfo = async () => {
    try {
      const response = await fetch('/api/system-stats');
      const data = await response.json();
      setSystemInfo(data);
      setLoading(false);
    } catch (error) {
      console.error('获取系统信息失败:', error);
    }
  };

  if (loading || !systemInfo) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="h-full flex justify-end items-center px-4">
      <div className="flex space-x-8">
        <div style={{ width: '120px', height: '120px' }} id="memoryChart"></div>
        <div style={{ width: '120px', height: '120px' }} id="cpuChart"></div>
      </div>
    </div>
  );
}
