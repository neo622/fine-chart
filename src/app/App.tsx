import { css, cx } from '@emotion/css';
import { LineChart } from '../components/LineChart';
import { LineChartWtW } from '../components/LineChartWtW';
import { LegendTable } from '../components/LegendTable';
import { Editor } from '../components/Editor';
import { SeriesShift } from '../features/series-shift/SeriesShift';
import { HeaderOptions } from '../components/HeaderOptions';
import { useAppSelector } from './hooks';
import { FooterOptions } from '../components/FooterOptions';
import { BoxPlotChart } from '../components/BoxPlotChart';
import { useRef } from 'react';

function App() {
  const isEditorVisible = useAppSelector((state) => state.ui.isEditorVisible);
  const isSeriesShiftVisible = useAppSelector((state) => state.ui.isSeriesShiftVisible);
  const isLegendVisible = useAppSelector((state) => state.legend.isVisible);
  const isBoxPlotVisible = useAppSelector((state) => state.ui.isBoxPlotVisible);
  const isWtwChartVisible = useAppSelector((state) => state.ui.isWtwChartVisible);

  const chartRef = useRef<any>(null);

  const renderChart = () => {
    if (isWtwChartVisible) return <LineChartWtW ref={chartRef} />;
    if (isBoxPlotVisible) return <BoxPlotChart ref={chartRef} />;
    return <LineChart ref={chartRef} />;
  };

  return (
    <div className={wrapper}>
      <div className={containerStyle}>
        <div className={chartAreaStyle}>
          <div className={headerStyle}>
            <HeaderOptions chartRef={chartRef} />
          </div>
          <div className={chartContainerStyle}>
            <div className={cx(chartStyle, !isLegendVisible && chartStyleFull)}>
              {renderChart()}
            </div>
            <div className={headerStyle}>
              <FooterOptions />
            </div>
            <div className={cx(legendStyle, !isLegendVisible && legendStyleHidden)}>
              {isLegendVisible && <LegendTable />}
            </div>
          </div>
        </div>
        <div className={isEditorVisible || isSeriesShiftVisible ? editorStyle : hideEditorStyle}>
          {isEditorVisible && <Editor />}
          {isSeriesShiftVisible && <SeriesShift />}
        </div>
      </div>
    </div>
  );
}

const wrapper = css`
  width: 100vw;
  height: 100vh;
  background-color: #f4f5f5;
  display: flex;
  align-items: center;
`;

const containerStyle = css`
  width: 100vw;
  height: 95vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background-color: black;
`;

const chartAreaStyle = css`
  flex: 7;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const headerStyle = css`
  height: 50px; /* 임의값, 필요시 조정 */
  background: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const chartContainerStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const chartStyle = css`
  flex: 3;
  background: #e0e0e0;
  min-height: 0;
`;

const chartStyleFull = css`
  flex: 4;
`;

const legendStyle = css`
  flex: 1;
  background: white;
  min-height: 0;
`;

const legendStyleHidden = css`
  flex: 0;
  height: 0;
  padding: 0;
  border: none;
  overflow: hidden;
`;

const editorStyle = css`
  flex: 3;
  background: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(80px + 100%); /* 헤더 높이 + 그래프 높이 */
`;

const hideEditorStyle = css`
  display: none;
`;

export default App;
