import axios from 'axios';
import type { AgChartOptions } from 'ag-charts-enterprise';

type ApiResponse = {
  equipment: string;
  lotid: string;
  module: string;
  parameter: string;
  data: {
    time: number[]; // UNIX timestamp
    value: (string | null)[];
  };
}[];

type ChartDataPoint = {
  timestamp: Date;
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
      module: 'PM3',
      parameter: 'APC_Pressure',
      wafer: ['1', '2'],
      step: ['1', '2', '3', '4', '5'],
    },
    {
      id: 1,
      module: 'TM',
      parameter: 'LL1_Pira_Press_Read',
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

  const resultMap: Map<number, ChartDataPoint> = new Map();
  const seriesList: string[] = [];

  apiData.forEach((seriesObj) => {
    const { equipment, lotid, module, parameter, data } = seriesObj;
    const { time, value } = data;

    // const seriesKey = `${lotid}__${module}__${parameter}`;
    const seriesKey = `${parameter}`;
    seriesList.push(seriesKey);

    for (let i = 0; i < time.length; i++) {
      const timestamp = time[i];
      const val = value[i];

      if (!resultMap.has(timestamp)) {
        resultMap.set(timestamp, {
          timestamp: new Date(timestamp),
        });
      }

      const row = resultMap.get(timestamp)!;
      row[seriesKey] = val !== null ? parseFloat(val) : null;
    }
  });

  const data = Array.from(resultMap.values()).sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
  );

  // 시리즈 구성
  const series = seriesList.map((key, i) => ({
    visible: true,
    type: 'line',
    xKey: 'timestamp',
    yKey: key,
    yName: key, // 필요시 가공
    stroke: '#2196F3',
    strokeWidth: 5,
    marker: { enabled: false },
  }));
  console.log('daaaaamn', data, series);
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
