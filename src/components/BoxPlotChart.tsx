import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { AgCharts } from 'ag-charts-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import 'ag-charts-enterprise';
import { toggleLoading } from '../entities/ui/uiSlice';
import { fetchBoxPlotData } from '../features/backend-actions/LoadBoxPlotData';
import { loadBoxPlot } from '../entities/boxplot/boxSlice';

export const BoxPlotChart = forwardRef((props, ref) => {
  const chartRef = useRef<any>(null);
  const boxplot = useAppSelector((state) => state.boxplot);
  const dispatch = useAppDispatch();

  useImperativeHandle(ref, () => ({
    getChartContainer: () => chartRef.current?.chart?.container,
  }));

  useEffect(() => {
    const load = async () => {
      dispatch(toggleLoading(true));
      console.log('boxplot', boxplot);
      if (boxplot.series.length === 0) {
        const data = await fetchBoxPlotData();
        if (data) {
          console.log('변환된 boxplotdata:', data);
          dispatch(loadBoxPlot(data));
        }
      } else {
        return;
      }
    };
    load();
  }, []);

  return (
    <AgCharts ref={chartRef} options={boxplot.series} style={{ width: '100%', height: '100%' }} />
  );
});
