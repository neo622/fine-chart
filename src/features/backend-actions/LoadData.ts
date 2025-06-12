import axios from 'axios';
import type { AgChartOptions } from 'ag-charts-enterprise';

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
  series: any;
};

//Payload 및 URL
const API_URL: string = 'http://10.100.100.172:9002/param_chart';
const payload: any = {
  equipment: 'PQK28708',
  lotid: '20241113081328_EPD_barer_1foup',
  recipe: 'CTD_P3F_AR_O2N2',
  info: [
    {
      id: 0,
      module: 'TM',
      parameter: 'TM_Bara_Press_read',
      wafer: ['1', '2'],
      step: [],
    },
    // {
    //   id: 1,
    //   module: 'PM3',
    //   parameter: 'APC_Pressure',
    //   wafer: ['1', '2'],
    //   step: ['1', '2', '3', '4', '5'],
    // },
    // {
    //   id: 1,
    //   module: 'PM3',
    //   parameter: 'Gas1_Monitor',
    //   wafer: ['1', '2'],
    //   step: ['1', '2', '3', '4', '5'],
    // },
    // {
    //   id: 2,
    //   module: 'PM3',
    //   parameter: 'Gas2_Monitor',
    //   wafer: ['1', '2'],
    //   step: ['1', '2', '3', '4', '5'],
    // },
    {
      id: 1,
      module: 'TM',
      parameter: 'LL2_N2Flow_Switch_Monitor',
      wafer: ['1', '2'],
      step: [],
    },
  ],
};
//

export const processData = (apiData: ApiResponse): ProcessedChartResult => {
  if (!Array.isArray(apiData) || apiData.length === 0) {
    return { data: [], series: [] };
  }

  const firstTimeArray = apiData[0].data.time;
  const length = firstTimeArray.length;

  console.log('API DATA', apiData);

  // 데이터 배열 초기화
  const data: ChartDataPoint[] = firstTimeArray.map((timestamp, i) => {
    const row: ChartDataPoint = { timestamp }; // timestamp 그대로 number
    apiData.forEach((seriesObj) => {
      const key = `${seriesObj.parameter}`;
      const val = seriesObj.data.value[i];
      row[key] = val !== null ? parseFloat(val) : null;
    });
    return row;
  });

  // 시리즈 배열 및 키 구성
  const series = apiData.map((seriesObj, i) => ({
    visible: true,
    type: 'line',
    xKey: 'timestamp',
    yKey: `${seriesObj.parameter}`,
    yName: [
      seriesObj.equipment,
      seriesObj.lotid,
      seriesObj.module,
      seriesObj.recipe,
      seriesObj.parameter,
    ].join(' | '),
    stroke: getSeriesColor(i),
    strokeWidth: 1,
    marker: { enabled: false },
    connectMissingData: true,
  }));

  return { data, series };
};

const getSeriesColor = (index: number): string => {
  const palette = ['#2196F3', '#4CAF50', '#FFC107', '#E91E63', '#9C27B0'];
  return palette[index % palette.length];
};

export const fetchTraceData = async (): Promise<ProcessedChartResult | null> => {
  try {
    const response = await axios.post(API_URL, payload);
    const processedData = processData(response.data);
    console.log('변환된 데이터:', processedData);
    return processedData;
  } catch (error) {
    console.log('데이터 요청 중 에러 발생', error);
    return null;
  }
};
