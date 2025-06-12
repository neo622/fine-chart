import { useEffect, useRef } from 'react';
import { AgCharts } from 'ag-charts-react';
import type { AgChartOptions } from 'ag-charts-enterprise';
import 'ag-charts-enterprise';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useChartOptions } from '../entities/chart/chartHooks';
import { createTooltip } from '../entities/chart/chartUtils';
import { toggleLoading } from '../entities/ui/uiSlice';
import { loadWtwChart } from '../entities/chart/chartSlice';
import { fetchWtwData } from '../features/backend-actions/LoadWtwData';

export const LineChartWtW = () => {
  const chartRef = useRef<any>(null);
  const chart = useChartOptions();
  const dispatch = useAppDispatch();
  const wtwData = useAppSelector((state) => state.chart.wtwData);

  useEffect(() => {
    const load = async () => {
      dispatch(toggleLoading(true));
      console.log('wtwData', wtwData);
      if (wtwData.data.length === 0) {
        const data: any = await fetchWtwData();
        // const tmp_chart_data: any = { data, series, axes };
        if (data) {
          dispatch(loadWtwChart(data));
        }
        console.log('good?', data);
      } else {
        dispatch(loadWtwChart(wtwData));
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
    data: wtwData.data,
  };

  return (
    <>
      {/* <button onClick={() => console.log(chart)}>ddd</button> */}
      <AgCharts ref={chartRef} options={chartOptions} style={{ width: '100%', height: '100%' }} />
    </>
  );
};
