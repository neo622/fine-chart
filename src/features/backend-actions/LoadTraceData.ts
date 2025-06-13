import axios from 'axios';
import type { AgChartOptions } from 'ag-charts-enterprise';

import { API_URL, payload_trace } from '../../shared/constants/constant';

type ApiResponse = {
  equipment: string;
  lotid: string;
  module: string;
  parameter: string;
  recipe: string;
  data: {
    time: number[]; // UNIX timestamp
    value: (string | null)[];
  };
}[];

type ChartDataPoint = {
  timestamp: Date | number;
  [seriesKey: string]: any;
};

type ProcessedChartResult = {
  data: ChartDataPoint[];
  series: any[];
  axes: any[];
};

export const processData = (apiData: ApiResponse): ProcessedChartResult => {
  if (!Array.isArray(apiData) || apiData.length === 0) {
    return { data: [], series: [], axes: [] };
  }

  const firstTimeArray = apiData[0].data.time;
  const length = firstTimeArray.length;

  // 1. 시리즈 키 목록
  const seriesKeys = apiData.map(
    (seriesObj) =>
      `${seriesObj.equipment} | ${seriesObj.lotid} | ${seriesObj.module} | ${seriesObj.recipe} | ${seriesObj.parameter}`,
  );

  // 2. 데이터 배열 초기화
  const data: ChartDataPoint[] = firstTimeArray.map((timestamp, i) => {
    const row: ChartDataPoint = { timestamp }; // timestamp 그대로 number
    apiData.forEach((seriesObj) => {
      const key = `${seriesObj.equipment} | ${seriesObj.lotid} | ${seriesObj.module} | ${seriesObj.recipe} | ${seriesObj.parameter}`;
      const val = seriesObj.data.value[i];
      row[key] = val !== null ? parseFloat(val) : null;
    });
    return row;
  });

  // 3. 시리즈 배열 구성
  const series = seriesKeys.map((key, i) => ({
    visible: true,
    type: 'line',
    xKey: 'timestamp',
    yKey: key,
    yName: key,
    stroke: getSeriesColor(i),
    strokeWidth: 1,
    marker: { enabled: false },
    connectMissingData: true,
  }));
  console.log('씨씨', seriesKeys);
  // 4. Axes 구성 (left 축에 모든 시리즈 연결)
  const axes = [
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
      keys: seriesKeys,
      min: undefined,
      max: undefined,
      interval: { step: undefined },
      label: { fontWeight: undefined, fontSize: undefined, color: undefined },
    },
    {
      type: 'number',
      position: 'right',
      keys: [],
      min: undefined,
      max: undefined,
      interval: { step: undefined },
      label: { fontWeight: undefined, fontSize: undefined, color: undefined },
    },
  ];

  return { data, series, axes };
};

const getSeriesColor = (index: number): string => {
  const palette = ['#2196F3', '#4CAF50', '#FFC107', '#E91E63', '#9C27B0'];
  return palette[index % palette.length];
};

export const fetchTraceData = async (): Promise<ProcessedChartResult | null> => {
  try {
    // const response_process = await axios.post(API_URL, payload_process);
    console.log('실행');
    const response = await axios.post(API_URL, payload_trace);
    console.log('응답 데이터:', response);
    const processedData = processData(response.data);
    console.log('변환된 데이터:', processedData);
    return processedData;
  } catch (error) {
    console.log('데이터 요청 중 에러 발생', error);
    return null;
  }
};
