// import { useSeriesActions } from '../entities/chart/chartHooks';
import { useState } from 'react';
import { AssignAxis } from '../features/assign-axis/AssignAxis';
import { AxisEditor } from '../features/axis-editor/AxisEditor';
import { SeriesEditor } from '../features/series-editor/SeriesEditor';
import { LegendEditor } from '../features/legend-editor/LegendEditor';

type TabType = 'axis' | 'legend' | 'series';

export const Editor = () => {
  // const { updateStrokeWidth } = useSeriesActions();
  // const onClickEditor = () => {
  //   updateStrokeWidth(1, 10);
  // }

  const [activeTab, setActiveTab] = useState<TabType>('axis');

  const renderEditor = () => {
    switch (activeTab) {
      case 'axis':
        return <AxisEditor />;
      case 'legend':
        return <LegendEditor />;
      case 'series':
        return <SeriesEditor />;
      default:
        return null;
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
      <div style={{ ...sectionStyle, height: '30%', marginTop: '15px' }}>
        <h2 style={titleStyle}>Assign Axis</h2>
        <div style={{ padding: '20px', height: 'calc(100% - 90px)' }}>
          <AssignAxis />
        </div>
      </div>
      <div style={{ ...sectionStyle, height: '60%', marginBottom: '20px' }}>
        <h2 style={titleStyle}>Chart Editor</h2>
        <div style={{ width: '100%', height: '100%', padding: '20px' }}>
          <div style={tabContainerStyle}>
            <button
              style={{
                ...tabButtonStyle,
                backgroundColor: activeTab === 'axis' ? '#e3f2fd' : '#f5f5f5',
              }}
              onClick={() => setActiveTab('axis')}
            >
              Axis
            </button>
            <button
              style={{
                ...tabButtonStyle,
                backgroundColor: activeTab === 'legend' ? '#e3f2fd' : '#f5f5f5',
              }}
              onClick={() => setActiveTab('legend')}
            >
              Legend
            </button>
            <button
              style={{
                ...tabButtonStyle,
                backgroundColor: activeTab === 'series' ? '#e3f2fd' : '#f5f5f5',
              }}
              onClick={() => setActiveTab('series')}
            >
              Series
            </button>
          </div>
          <div style={editorContainerStyle}>{renderEditor()}</div>
        </div>
      </div>
    </div>
  );
};

const sectionStyle = {
  width: '100%',
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

const tabContainerStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '20px',
};

const tabButtonStyle = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  color: '#1976d2',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
};

const editorContainerStyle = {
  width: '80%',
  height: 'calc(80% - 60px)',
  backgroundColor: 'white',
};
