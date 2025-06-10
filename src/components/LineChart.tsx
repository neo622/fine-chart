import { AgCharts } from 'ag-charts-react';
import type { AgChartOptions } from 'ag-charts-enterprise';
import 'ag-charts-enterprise';

import { useChartOptions } from '../entities/chart/chartHooks';

export const LineChart = () => {
  const chart = useChartOptions();
  const chartOptions: AgChartOptions = {
    data: chart.data,
    series: chart.series,
    axes: chart.axes,
    legend: chart.legend,
    padding: chart.padding,
    tooltip: chart.tooltip,
    animation: chart.animation,
    zoom: chart.zoom,
    annotations: chart.annotations,
  };

  return <AgCharts options={chartOptions} style={{ width: '100%', height: '100%' }} />;
};
