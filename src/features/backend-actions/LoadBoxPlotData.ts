import axios from 'axios';
import { API_URL_BOX, payload_boxplot } from '../../shared/constants/constant';

type Stats = {
  Q1: number;
  Q3: number;
  avg: number;
  min: number;
  max: number;
};

type StepData = {
  data: {
    time: number[];
    value: (string | number | null)[];
  };
  stats: Stats;
};

type BoxPlotSeriesGroup = {
  module: string;
  parameter: string;
  wafer: string[];
  [stepKey: `step_${number}`]: StepData | any; // 'step_0', 'step_1', ...
};

type ApiBoxPlotResponse = {
  response: BoxPlotSeriesGroup[];
};

export const processData = (apiData: ApiBoxPlotResponse): { series: any[] } => {
  const rawSeries = apiData.response;
  const resultSeries: any[] = [];

  rawSeries.forEach((group) => {
    const { parameter, ...rest } = group;
    const seriesData: any[] = [];

    Object.entries(rest).forEach(([key, value]) => {
      if (!key.startsWith('step_')) return;

      const stats = value?.stats;
      if (!stats) return;

      const stepIndex = key.split('_')[1]; // 'step_0' → '0'
      seriesData.push({
        step: `step_${stepIndex}`,
        min: stats.min,
        q1: stats.Q1,
        median: stats.avg,
        q3: stats.Q3,
        max: stats.max,
      });
    });

    resultSeries.push({
      type: 'box-plot',
      yName: parameter,
      data: seriesData,
      xKey: 'step',
      minKey: 'min',
      q1Key: 'q1',
      medianKey: 'median',
      q3Key: 'q3',
      maxKey: 'max',
    });
  });

  return { series: resultSeries };
};

export const fetchBoxPlotData = async (): Promise<{ series: any[] } | null> => {
  try {
    const response = await axios.post(API_URL_BOX, payload_boxplot);
    const result = processData(response.data);
    return result;
  } catch (error) {
    console.error('BoxPlot API 요청 중 오류 발생:', error);
    return null;
  }
};
