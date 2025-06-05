import { useState, useEffect } from 'react';
import { useAxisActions, useSeriesOptions } from '../../entities/chart/chartHooks';

interface AxisSelection {
  [key: string]: 'left' | 'right' | null;
}

export const AssignAxis = () => {
  const series = useSeriesOptions();
  const { setSecondaryAxis } = useAxisActions();

  const [axisSelections, setAxisSelections] = useState<AxisSelection>({});

  // 초기 렌더링 시 모든 행의 left radio 선택
  useEffect(() => {
    if (series) {
      const initialSelections: AxisSelection = {};
      series.forEach((item: any) => {
        initialSelections[item.yKey] = 'left';
      });
      setAxisSelections(initialSelections);
    }
  }, [series]);

  const handleAxisChange = (seriesName: string, axis: 'left' | 'right') => {
    if (axisSelections[seriesName] === axis) return;

    setAxisSelections((prev) => ({
      ...prev,
      [seriesName]: axis,
    }));
    setSecondaryAxis(seriesName, axis);
  };

  // const onClickButton = () => {
  //   setSecondaryAxis('series3', 'right');
  // };

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
      {/* <button onClick={onClickButton}></button> */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Index</th>
            <th style={thStyle}>Series</th>
            <th style={thStyle}>Left</th>
            <th style={thStyle}>Right</th>
          </tr>
        </thead>
        <tbody>
          {series &&
            series.map((item: any, index) => (
              <tr key={item.yKey}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{item.yKey}</td>
                <td style={tdStyle}>
                  <div style={checkboxContainerStyle}>
                    <label style={checkboxStyle}>
                      <input
                        type='radio'
                        name={`axis-${item.yKey}`}
                        checked={axisSelections[item.yKey] === 'left'}
                        onChange={() => handleAxisChange(item.yKey, 'left')}
                      />
                    </label>
                  </div>
                </td>
                <td style={tdStyle}>
                  <div style={checkboxContainerStyle}>
                    <label style={checkboxStyle}>
                      <input
                        type='radio'
                        name={`axis-${item.yKey}`}
                        checked={axisSelections[item.yKey] === 'right'}
                        onChange={() => handleAxisChange(item.yKey, 'right')}
                      />
                    </label>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  fontSize: '14px',
};

const thStyle = {
  backgroundColor: '#f5f5f5',
  color: '#1976d2',
  padding: '12px',
  textAlign: 'left' as const,
  borderBottom: '1px solid #e0e0e0',
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #e0e0e0',
};

const checkboxContainerStyle = {
  display: 'flex',
  gap: '20px',
};

const checkboxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};
