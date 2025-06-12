export type ChartDataSeries = {
  [key: string]: number | string | Date;
};

export type ChartData = ChartDataSeries[];

export type ChartSeries = {
  type: 'line' | 'box';
  xKey: 'timestamp' | 'index';
  yKey: string;
  yName: string;
  stroke: string;
  strokeWidth: number;
  marker: { enabled: boolean };
};

export type ChartAxes = {
  type: 'time' | 'number';
  position: 'bottom' | 'left' | 'right';
  label?: { format: string };
};

export type ChartLegend = {
  enabled: boolean;
  position: string;
};

export type ChartPadding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type ChartOption = {
  data: any[];
  series: ChartSeries[];
  axes: ChartAxes[];
  legend: ChartLegend;
  padding: ChartPadding;
  tooltip?: any;
  animation?: any;
  zoom?: any;
};
