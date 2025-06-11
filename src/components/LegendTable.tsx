import { css } from '@emotion/css';

export const LegendTable = () => {
  const series = [
    { name: '시리즈 1', color: '#2196F3' },
    { name: '시리즈 2', color: '#4CAF50' },
    { name: '시리즈 3', color: '#FFC107' },
  ];

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
          {series.map((s) => (
            <tr key={s.name}>
              <td className={tdStyle}>
                <span className={colorDotStyle(s.color)} />
                {s.name}
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
