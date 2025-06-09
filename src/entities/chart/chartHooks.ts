// 차트 상태 조회/변경 커스텀 훅
import type { AgChartOptions } from 'ag-charts-community';
import type { AxisConfig } from '../../features/axis-editor/AxisEditor';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateSeries, updateAxis, updateData } from './chartSlice';
import { useState } from 'react';
import { generateNewTestData } from '../../shared/utils/MockData';

// 차트 전체 옵션 조회
export const useChartOptions = () => useAppSelector((state) => state.chart);

// 차트 데이터 조회
export const useChartData = () => useAppSelector((state) => state.chart.data);

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
  // 이중 Y축 설정 기능
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
  // Y축 설정 변경 기능
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

export const useSeriesShift = () => {
  const dispatch = useAppDispatch();
  const chartData = useAppSelector((state) => state.chart.data) || [];
  const [deletedValues, setDeletedValues] = useState<{ [key: string]: any }>({});

  const moveDataRight = (selectedSeries: string[]) => {
    const newData = chartData.map((item) => ({ ...item })); // 재할당이 안되어서 깊은 복사 수행
    const newDeletedValues = { ...deletedValues };

    selectedSeries.forEach((series) => {
      // 맨 뒤의 값을 저장
      const lastValue = newData[newData.length - 1][series];
      if (!newDeletedValues[series]) {
        newDeletedValues[series] = { right: [], left: [] };
      }
      console.log(newDeletedValues);

      if (newDeletedValues[series].left.length > 0) {
        // 데이터 이동
        for (let i = newData.length - 1; i > 0; i--) {
          newData[i] = { ...newData[i], [series]: newData[i - 1][series] };
        }

        // 맨 앞에 null 삽입 대신에 left 기록의 맨 마지막 값을 삽입
        newData[0] = {
          ...newData[0],
          [series]: newDeletedValues[series].left[newDeletedValues[series].left.length - 1],
        };

        // left 기록의 맨 마지막 값을 삽입한 후에 해당 값은 제거
        newDeletedValues[series].left.pop();
      } else {
        // 데이터 이동
        for (let i = newData.length - 1; i > 0; i--) {
          newData[i] = { ...newData[i], [series]: newData[i - 1][series] };
        }

        // 이동하면서 삭제된 데이터를 저장
        newDeletedValues[series].right.push(lastValue);

        // 맨 앞에 null 삽입
        newData[0] = { ...newData[0], [series]: null };
      }
    });

    setDeletedValues(newDeletedValues);
    dispatch(updateData(newData));
  };

  const moveDataLeft = (selectedSeries: string[]) => {
    const newData = chartData.map((item) => ({ ...item }));
    const newDeletedValues = { ...deletedValues };

    selectedSeries.forEach((series) => {
      // 맨 앞의 값을 저장
      const firstValue = newData[0][series];
      if (!newDeletedValues[series]) {
        newDeletedValues[series] = { right: [], left: [] };
      }

      // 반대 이동 기록이 있을 때
      if (newDeletedValues[series].right.length > 0) {
        // 데이터 이동
        for (let i = 0; i < newData.length - 1; i++) {
          newData[i] = { ...newData[i], [series]: newData[i + 1][series] };
        }

        // 맨 뒤에 null 대신에 right 기록의 맨 마지막 값을 삽입
        newData[newData.length - 1] = {
          ...newData[newData.length - 1],
          [series]: newDeletedValues[series].right[newDeletedValues[series].right.length - 1],
        };

        // right 기록의 맨 마지막 값을 삽입한 후에 해당 값은 제거
        newDeletedValues[series].right.pop();
      }
      // 반대 이동 기록이 없을 떄 (원점일 때)
      else {
        // 데이터 이동
        for (let i = 0; i < newData.length - 1; i++) {
          newData[i] = { ...newData[i], [series]: newData[i + 1][series] };
        }
        // 이동하면서 삭제된 데이터를 저장
        newDeletedValues[series].left.push(firstValue);
        // 맨 뒤에 null 삽입
        newData[newData.length - 1] = {
          ...newData[newData.length - 1],
          [series]: null,
        };
      }
    });

    setDeletedValues(newDeletedValues);
    dispatch(updateData(newData));
  };
  console.log(deletedValues);
  const resetData = (selectedSeries: string[]) => {
    const newData = [...chartData];
    const newDeletedValues = { ...deletedValues };

    selectedSeries.forEach((series) => {
      if (newDeletedValues[series]) {
        // 저장된 값들을 원래 위치로 복원
        const restoredValues = newDeletedValues[series];
        for (let i = 0; i < restoredValues.length; i++) {
          if (newData[i][series] === null) {
            newData[i][series] = restoredValues[i];
          }
        }
        newDeletedValues[series] = [];
      }
    });

    setDeletedValues(newDeletedValues);
    dispatch(updateData(newData));
  };

  return {
    moveDataLeft,
    moveDataRight,
    resetData,
  };
};
