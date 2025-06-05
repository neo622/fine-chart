// 차트 상태 조회/변경 커스텀 훅
import type { AgChartOptions } from 'ag-charts-community';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateSeries, updateAxis } from './chartSlice';

// 차트 옵션 조회
export const useChartOptions = () => useAppSelector((state) => state.chart);

// Series 정보 조회
export const useSeriesOptions = () =>
  useAppSelector((state) => state.chart.series) as AgChartOptions['series'];

// Axes 정보 조회
export const useAxesOptions = () => useAppSelector((state) => state.chart.axes);

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

export const useAxisActions = () => {
  const dispatch = useAppDispatch();
  const axes = useAppSelector((state) => state.chart.axes);

  const setSecondaryAxis = (yKey: string, target: 'left' | 'right') => {
    const newAxes: any = axes?.map((axis) => {
      if (!('keys' in axis)) return axis;

      const filteredKeys = axis.keys?.filter((key) => key !== yKey) ?? [];

      if (axis.position === target) {
        return {
          ...axis,
          keys: [...filteredKeys, yKey],
        };
      }
      return {
        ...axis,
        keys: filteredKeys,
      };
    });

    dispatch(updateAxis(newAxes));
  };

  return {
    setSecondaryAxis,
  };
};
