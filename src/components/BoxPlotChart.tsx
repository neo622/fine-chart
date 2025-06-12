import { useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import 'ag-charts-enterprise';

export const BoxPlotChart = () => {
  const dispatch = useAppDispatch();
  const boxPlotOption = useAppSelector((state) => state.boxplot);

  return <AgCharts options={boxPlotOption} style={{ width: '100%', height: '100%' }} />;
};
