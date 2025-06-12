import { css } from '@emotion/css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useChartOptions } from '../entities/chart/chartHooks';
import { updateSeries } from '../entities/chart/chartSlice';
import { fieldOrder } from '../features/legend-editor/constant';

export const LegendTable = () => {
  const dispatch = useAppDispatch();
  const chartOptions = useChartOptions();
  const series = chartOptions.series || [];
  const legendValue = useAppSelector((state) => state.legend.value);

  const handleToggleSeries = (yName: string, currentVisible: boolean) => {
    const idx = series.findIndex((s: any) => s.yName === yName);
    if (idx !== -1) {
      dispatch(updateSeries({ index: idx, newSeries: { visible: !currentVisible } }));
    }
  };

  // yName을 가공하는 함수
  const getDisplayName = (yName: string) => {
    const parts = yName.split(' | ');
    // 체크된 항목만 join
    return fieldOrder
      .map((field, idx) => (legendValue[field as keyof typeof legendValue] ? parts[idx] : null))
      .filter(Boolean)
      .join(' | ');
  };

  return (
    <div className={tableContainerStyle}>
      <table className={tableStyle}>
        {/* <thead>
          <tr>
            <th className={thStyle}>시리즈</th>
            <th className={thStyle}>최대값</th>
            <th className={thStyle}>최소값</th>
            <th className={thStyle}>평균값</th>
          </tr>
        </thead> */}
        <tbody>
          {series.map((s: any) => (
            <tr key={s.yName}>
              <td className={tdStyle} style={{ width: 32, textAlign: 'center' }}>
                <input
                  type='checkbox'
                  checked={s.visible}
                  onChange={() => handleToggleSeries(s.yName, s.visible)}
                  style={{ accentColor: s.stroke, width: 18, height: 18, cursor: 'pointer' }}
                />
              </td>
              <td className={tdStyle}>
                <span className={colorDotStyle(s.stroke)} />
                <span>{getDisplayName(s.yName)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableContainerStyle = css`
  width: 100%;
  height: 100%;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: auto;
`;

const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
`;

// const thStyle = css`
//   padding: 8px;
//   text-align: left;
//   border-bottom: 2px solid #e0e0e0;
//   background: #f5f5f5;
//   position: sticky;
//   top: 0;
// `;

const tdStyle = css`
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
`;

const colorDotStyle = (color: string) => css`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${color};
  margin-right: 8px;
`;
