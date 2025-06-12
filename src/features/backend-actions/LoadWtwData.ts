import axios from 'axios';

import { API_URL_WTW, payload_wtw } from '../../shared/constants/constant';

type WtwApiResponse = {
  [parameter: string]: {
    data: {
      time: number[];
      value: (string | number | null)[];
    };
    equipment: string;
    lotid: string;
    module: string;
    recipe: string;
    step: string[];
    wafer: string;
  };
}[];

type ChartDataPoint = {
  timestamp: number;
  [seriesKey: string]: number | null;
};

type ProcessedChartResult = {
  data: ChartDataPoint[];
  series: any[];
  axes: any[];
};

export const processWtwData = (apiData: WtwApiResponse): ProcessedChartResult => {
  if (!Array.isArray(apiData) || apiData.length === 0) {
    return { data: [], series: [], axes: [] };
  }

  const firstEntry = apiData[0];
  const firstParamKey = Object.keys(firstEntry)[0];
  const firstSeries = firstEntry[firstParamKey];
  const timeArray = firstSeries.data.time;

  const data: ChartDataPoint[] = timeArray.map((t) => ({ timestamp: t }));
  const seriesKeys: string[] = [];

  apiData.forEach((entry, idx) => {
    const paramKey = Object.keys(entry)[0];
    const seriesObj = entry[paramKey];

    const {
      data: { value },
      equipment,
      module,
      wafer,
    } = seriesObj;

    const seriesKey = `${equipment}__${module}__${paramKey}__W${wafer}`;
    seriesKeys.push(seriesKey);

    value.forEach((v, i) => {
      if (data[i]) {
        const parsed = v !== null ? parseFloat(v as string) : null;
        data[i][seriesKey] = isNaN(parsed!) ? null : parsed;
      }
    });
  });

  const series = seriesKeys.map((key, i) => ({
    visible: true,
    type: 'line',
    xKey: 'timestamp',
    yKey: key,
    yName: key,
    stroke: getSeriesColor(i),
    strokeWidth: 1,
    marker: { enabled: false },
    connectMissingValues: true,
  }));

  const axes = [
    {
      type: 'number',
      position: 'bottom',
      label: {
        format: '',
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
  const palette = ['#2196F3', '#4CAF50', '#FFC107', '#E91E63', '#9C27B0', '#00BCD4', '#FF5722'];
  return palette[index % palette.length];
};

export const fetchWtwData = async () => {
  try {
    const response = await axios.post(API_URL_WTW, payload_wtw);
    console.log('wtw 응답 데이터:', response);
    const processedData = processWtwData(response.data);
    console.log('변환된 데이터:', processedData);
    return processedData;
  } catch (error) {
    console.log('데이터 요청 중 에러 발생', error);
    return null;
  }
};
