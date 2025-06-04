import { css } from '@emotion/css';
import { LineChart } from '../components/LineChart';
import { LegendTable } from '../components/LegendTable';
import { Editor } from '../components/Editor';
import { HeaderOptions } from '../components/HeaderOptions';
import { useAppSelector } from './hooks';

function App() {
  const isEditorVisible = useAppSelector((state) => state.ui.isEditorVisible);

  return (
    <div className={wrapper}>
      <div className={containerStyle}>
        <div className={chartAreaStyle}>
          <div className={headerStyle}>
            <HeaderOptions />
          </div>
          <div className={chartContainerStyle}>
            <div className={chartStyle}>
              <LineChart />
            </div>
            <div className={legendStyle}>
              <LegendTable />
            </div>
          </div>
        </div>
        {isEditorVisible && (
          <div className={editorStyle}>
            <Editor />
          </div>
        )}
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

const legendStyle = css`
  flex: 1;
  background: white;
  min-height: 0;
`;

const editorStyle = css`
  flex: 3;
  background: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(80px + 100%); /* 헤더 높이 + 그래프 높이 */
`;

export default App;
