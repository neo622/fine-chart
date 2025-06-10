import { useSeriesOptions } from '../../entities/chart/chartHooks';
import { useSeriesShift } from '../../entities/chart/chartHooks';
import { useState } from 'react';

export const SeriesShift = () => {
  const series = useSeriesOptions();
  const { moveDataLeft, moveDataRight, resetData } = useSeriesShift();
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);

  const handleCheckboxChange = (yKey: string, checked: boolean) => {
    if (checked) {
      setSelectedSeries(yKey);
    } else {
      setSelectedSeries(null);
    }
  };

  return (
    <div
      style={{
        width: '90%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '20px 15px',
        alignItems: 'center',
      }}
    >
      <div style={sectionStyle}>
        <h2 style={titleStyle}>Series Shift</h2>
        <div style={{ padding: '20px', height: 'calc(100% - 90px)' }}>
          <div style={containerStyle}>
            <div style={seriesListStyle}>
              {series?.map((item: any, index) => (
                <div key={index} style={seriesItemStyle}>
                  <input
                    type='radio'
                    name='series'
                    id={`series-${index}`}
                    style={checkboxStyle}
                    checked={selectedSeries === item.yKey}
                    onChange={(e) => handleCheckboxChange(item.yKey, e.target.checked)}
                  />
                  <label htmlFor={`series-${index}`} style={labelStyle}>
                    {item.yName}
                  </label>
                </div>
              ))}
              <div style={buttonContainerStyle}>
                <button
                  style={buttonStyle}
                  onClick={() => selectedSeries && moveDataLeft([selectedSeries])}
                  disabled={!selectedSeries}
                >
                  Move Left
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => selectedSeries && moveDataRight([selectedSeries])}
                  disabled={!selectedSeries}
                >
                  Move Right
                </button>
                <button style={buttonStyle} onClick={() => resetData()} disabled={!selectedSeries}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const sectionStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
  border: '1px solid rgba(56, 56, 56, 0.1)',
};

const titleStyle = {
  margin: '0 0 16px 0',
  width: '100%',
  height: '50px',
  background: '#b2cff7',
  color: '#00006a',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '20px',
};

const containerStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '20px',
};

const seriesListStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '10px',
  flex: 1,
};

const seriesItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  backgroundColor: 'white',
};

const checkboxStyle = {
  width: '18px',
  height: '18px',
};

const labelStyle = {
  fontSize: '14px',
  color: '#333',
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
};

const buttonStyle = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#1976d2',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
};
