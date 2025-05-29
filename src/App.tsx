import { css } from '@emotion/css';
import { LineChart } from './components/LineChart';

function App() {
  return (
    <div className={containerStyle}>
      <div className={chartAreaStyle}>
        <div className={headerStyle}>이 곳은 헤더입니다.</div>
        <div className={graphStyle}>
          <LineChart />
        </div>
      </div>
      <div className={editorStyle}>이 곳은 차트 에디터 입니다.</div>
    </div>
  );
}

const containerStyle = css`
  width: 100vw;
  height: 100vh;
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
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const graphStyle = css`
  flex: 1;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const editorStyle = css`
  flex: 3;
  background: #d0d0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(80px + 100%); /* 헤더 높이 + 그래프 높이 */
`;

export default App;
