// 차트 상태 조회/변경 커스텀 훅
import type { AgCartesianSeriesOptions, AgChartOptions } from 'ag-charts-community';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateSeries } from './chartSlice';

// 차트 옵션 조회
export const useChartOptions = () => useAppSelector((state) => state.chart);

// Series 정보 조회
export const useSeriesOptions = () =>
  useAppSelector((state) => state.chart.series) as AgChartOptions['series'];

// Series Update 액션
export const useSeriesActions = () => {
  const dispatch = useAppDispatch();

  const updateStrokeWidth = (index: number, width: number) => {
    dispatch(updateSeries({ index, newSeries: { strokeWidth: width } }));
  };

  return {
    updateStrokeWidth,
  };
};
