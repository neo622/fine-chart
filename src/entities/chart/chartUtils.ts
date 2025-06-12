import type { AgCartesianChartOptions } from 'ag-charts-community';
import type { AppDispatch } from '../../app/store';
import { updateTooltip } from './chartSlice';

interface ClickedTooltip {
  type: string;
  start: { [key: string]: any };
  end: { [key: string]: any };
  text: string;
  fontSize: number;
}

export const createTooltip = (dispatch: AppDispatch, chartOptions: AgCartesianChartOptions) => {
  return (event: any) => {
    const { datum, xKey, yKey } = event;
    const xValue = datum[xKey];
    const yValue = datum[yKey];
    console.log('ey', xValue, yValue);
    const tooltipData: ClickedTooltip = {
      type: 'callout',
      start: {
        x: {
          value:
            typeof xValue === 'object' && xValue instanceof Date ? xValue.toISOString() : xValue,
          groupPercentage: 0.1,
        },
        y: yValue,
      },
      end: {
        x: {
          value:
            typeof xValue === 'object' && xValue instanceof Date ? xValue.toISOString() : xValue,
          groupPercentage: 0.5,
        },
        y: yValue + 10,
      },
      text: `${xValue} + ${yValue}`,
      fontSize: 12,
    };

    const currentTooltip = chartOptions.initialState?.annotations ?? [];
    const isDuplicate = currentTooltip.some((tooltip: any) => tooltip.text === String(yValue));
    if (!isDuplicate) {
      dispatch(updateTooltip([...currentTooltip, tooltipData]));
    }
  };
};
