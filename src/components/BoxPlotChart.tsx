import { forwardRef, useImperativeHandle, useRef } from 'react';
import { AgCharts } from 'ag-charts-react';
import { useAppSelector } from '../app/hooks';
import 'ag-charts-enterprise';

export const BoxPlotChart = forwardRef((props, ref) => {
  const chartRef = useRef<any>(null);
  const boxPlotOption = useAppSelector((state) => state.boxplot);

  useImperativeHandle(ref, () => ({
    getChartContainer: () => chartRef.current?.chart?.container,
  }));

  return (
    <AgCharts ref={chartRef} options={boxPlotOption} style={{ width: '100%', height: '100%' }} />
  );
});
