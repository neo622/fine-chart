import { useState } from 'react';
import { useSeriesOptions } from '../../entities/chart/chartHooks';

interface AxisSelection {
  [key: string]: 'left' | 'right' | null;
}

export const AssignAxis = () => {
  const series = useSeriesOptions();
  const [axisSelections, setAxisSelections] = useState<AxisSelection>({});
  const handleAxisChange = (seriesName: string, axis: 'left' | 'right') => {
    setAxisSelections((prev) => ({
      ...prev,
      [seriesName]: prev[seriesName] === axis ? null : axis,
    }));
  };

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
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
              <tr key={item.yName}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{item.yName}</td>
                <td style={tdStyle}>
                  <div style={checkboxContainerStyle}>
                    <label style={checkboxStyle}>
                      <input
                        type='checkbox'
                        checked={axisSelections[item.yName] === 'left'}
                        onChange={() => handleAxisChange(item.yName, 'left')}
                      />
                    </label>
                  </div>
                </td>
                <td style={tdStyle}>
                  <div style={checkboxContainerStyle}>
                    <label style={checkboxStyle}>
                      <input
                        type='checkbox'
                        checked={axisSelections[item.yName] === 'right'}
                        onChange={() => handleAxisChange(item.yName, 'right')}
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
