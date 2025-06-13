import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { AgCharts } from 'ag-charts-react';
import type { AgChartOptions } from 'ag-charts-enterprise';
import 'ag-charts-enterprise';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadLineChart, setTraceData } from '../entities/chart/chartSlice';
import { useChartOptions } from '../entities/chart/chartHooks';
import { createTooltip } from '../entities/chart/chartUtils';
import { toggleLoading } from '../entities/ui/uiSlice';
import { fetchTraceData } from '../features/backend-actions/LoadTraceData';

export const LineChart = forwardRef((props, ref) => {
  const chartRef = useRef<any>(null);
  const chart = useChartOptions();
  const dispatch = useAppDispatch();
  const traceData = useAppSelector((state) => state.chart.traceData);

  useImperativeHandle(ref, () => ({
    getChartContainer: () => chartRef.current?.chart?.container,
  }));

  useEffect(() => {
    const load = async () => {
      dispatch(toggleLoading(true));
      console.log('traceData', traceData);
      if (traceData.data.length === 0) {
        const data = await fetchTraceData();
        if (data) {
          dispatch(loadLineChart(data));
        }
      } else {
        dispatch(loadLineChart(traceData));
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
    data: traceData.data,
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
      <AgCharts ref={chartRef} options={chartOptions} style={{ width: '100%', height: '100%' }} />
    </>
  );
});
