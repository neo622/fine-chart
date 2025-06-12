import { useEffect, useRef } from 'react';
import { AgCharts } from 'ag-charts-react';
import type { AgChartOptions } from 'ag-charts-enterprise';
import 'ag-charts-enterprise';

import { useAppDispatch } from '../app/hooks';
import { loadLineChart } from '../entities/chart/chartSlice';
import { useChartOptions } from '../entities/chart/chartHooks';
import { createTooltip } from '../entities/chart/chartUtils';
import { toggleLoading } from '../entities/ui/uiSlice';
import { fetchTraceData } from '../features/backend-actions/LoadData';

export const LineChart = () => {
  const chartRef = useRef<any>(null);
  const chart = useChartOptions();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const load = async () => {
      dispatch(toggleLoading(true));
      const data = await fetchTraceData();
      if (data) {
        dispatch(loadLineChart(data));
      }
      dispatch(toggleLoading(false));
    };
    load();
  }, []);

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

  // const logCurrentChart = () => {
  //   const chartInstance = chartRef.current?.chart;
  //   if (chartInstance) {
  //     const annotations = chartInstance.annotations.annotations._nodes;
  //     console.log(chartInstance.addAnnotation);
  //     console.log(annotations);
  //   }
  // };

  return (
    <>
      <button onClick={() => console.log(chart)}>ddd</button>
      <AgCharts ref={chartRef} options={chartOptions} style={{ width: '90%', height: '100%' }} />
    </>
  );
};
