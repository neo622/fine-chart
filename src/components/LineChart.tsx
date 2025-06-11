import { AgCharts } from 'ag-charts-react';
import type { AgChartOptions } from 'ag-charts-enterprise';
import 'ag-charts-enterprise';

import { useChartOptions } from '../entities/chart/chartHooks';
import { useAppDispatch } from '../app/hooks';
import { createTooltip } from '../entities/chart/chartUtils';
import type { AgCartesianChartOptions } from 'ag-charts-community';
import { useRef } from 'react';

export const LineChart = () => {
  const chartRef = useRef<any>(null);
  const chart = useChartOptions();
  const dispatch = useAppDispatch();

  const seriesWithListener = chart.series?.map((series) => {
    return {
      ...series,
      listeners: {
        nodeClick: createTooltip(dispatch, chart),
      },
    };
  });

  const chartOptions: AgChartOptions = {
    ...chart,
    //@ts-ignore
    series: seriesWithListener,
  };

  const logCurrentChart = () => {
    const chartInstance = chartRef.current?.chart;
    if (chartInstance) {
      const annotations = chartInstance.annotations.annotationData;
      console.log(chartInstance);
      console.log(annotations);
    }
  };

  return (
    <>
      <button onClick={logCurrentChart}>ddd</button>
      <AgCharts ref={chartRef} options={chartOptions} style={{ width: '100%', height: '100%' }} />
    </>
  );
};
