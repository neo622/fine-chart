import { useState } from 'react';
import { AgCharts } from 'ag-charts-react';
import type { AgChartOptions } from 'ag-charts-community';
import 'ag-charts-enterprise';
import 'ag-charts-enterprise';

const generateTestData = () => {
  const data = [];
  const now = new Date();

  for (let i = 0; i < 1000; i++) {
    const time = new Date(now.getTime() - (1000 - i) * 60000); // 1분 간격
    data.push({
      timestamp: time,
      series1: Math.random() * 100,
      series2: Math.random() * 150 + 50,
      series3: Math.random() * 200 + 100,
    });
  }

  return data;
};

export const LineChart = () => {
  const [chartOptions] = useState<AgChartOptions>({
    data: generateTestData(),
    series: [
      {
        type: 'line',
        xKey: 'timestamp',
        yKey: 'series1',
        yName: '시리즈 1',
        stroke: '#2196F3',
        strokeWidth: 1,
        marker: { enabled: false },
      },
      {
        type: 'line',
        xKey: 'timestamp',
        yKey: 'series2',
        yName: '시리즈 2',
        stroke: '#4CAF50',
        strokeWidth: 1,
        marker: { enabled: false },
      },
      {
        type: 'line',
        xKey: 'timestamp',
        yKey: 'series3',
        yName: '시리즈 3',
        stroke: '#FFC107',
        strokeWidth: 1,
        marker: { enabled: false },
      },
    ],
    axes: [
      {
        type: 'time',
        position: 'bottom',
        label: {
          format: '%H:%M',
        },
      },
      {
        type: 'number',
        position: 'left',
      },
    ],
    legend: {
      enabled: true,
      position: 'bottom',
    },
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
    tooltip: {
      delay: 50,
    },
    animation: {
      enabled: false,
    },
    zoom: {
      enabled: true,
      enableAxisDragging: false,
      enablePanning: true,
      enableScrolling: false,
      enableSelecting: true,
      panKey: 'shift',
      axes: 'xy',
    },
  });
  return <AgCharts options={chartOptions} style={{ width: '100%', height: '100%' }} />;
};
