// 차트 상태 조회/변경 커스텀 훅
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateSeries } from './chartSlice';

export const useChartOptions = () => useAppSelector((state) => state.chart);

export const useSeriesOptions = () => useAppSelector((state) => state.chart.series);

export const useSeriesActions = () => {
  const dispatch = useAppDispatch();

  const updateStrokeWidth = (index: number, width: number) => {
    dispatch(updateSeries({ index, newSeries: { strokeWidth: width } }));
  };

  return {
    updateStrokeWidth,
  };
};
