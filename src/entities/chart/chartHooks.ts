// 차트 상태 조회/변경 커스텀 훅
import type { AgChartOptions } from 'ag-charts-community';
import type { AxisConfig } from '../../features/axis-editor/AxisEditor';
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

  const changeAxesConfig = (newConfig: AxisConfig) => {
    const updatedAxes = axes?.map((axis) => {
      if (!('position' in axis)) return axis;

      const position = axis.position;
      if (!(position === 'left' || position === 'right')) return axis;

      const config = newConfig[position];
      if (!config) return axis;

      const updatedAxis = {
        ...axis,
        min: config.isAutomation ? undefined : Number(config.min) || undefined,
        max: config.isAutomation ? undefined : Number(config.max) || undefined,
        interval: {
          ...(axis.interval ?? {}),
          step: config.isAutomation ? undefined : Number(config.interval) || undefined,
        },
        label: {
          ...(axis.label ?? {}),
          fontSize: Number(config.fontSize) || undefined,
          color: config.fontColor || undefined,
        },
        // gridStyle: [
        //   {
        //     ...(axis.gridStyle?.[0] ?? {}),
        //     stroke: config.gridColor,
        //   },
        // ],
      };

      return updatedAxis;
    });

    dispatch(updateAxis(updatedAxes));
  };

  return {
    setSecondaryAxis,
    changeAxesConfig,
  };
};
