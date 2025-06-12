import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleShowLegend, updateLegendValue } from '../../entities/legend/legendSlice';
import { fieldOrder } from './constant';

export const LegendEditor = () => {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector((state) => state.legend.isVisible);
  const value = useAppSelector((state) => state.legend.value);

  const handleShowLegendChange = () => {
    dispatch(toggleShowLegend());
  };

  const handleCheckboxChange = (key: keyof typeof value) => {
    dispatch(
      updateLegendValue({
        newValue: { ...value, [key]: !value[key] },
      }),
    );
  };

  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <label style={labelStyle}>
          Show Legend
          <input
            type='checkbox'
            style={checkboxStyle}
            checked={isVisible}
            onChange={handleShowLegendChange}
          />
        </label>
      </div>
      <div style={valueBoxStyle}>
        <div style={valueTitleStyle}>Value</div>
        <div style={valueGridStyle}>
          {fieldOrder.map((field) => (
            <label key={field} style={valueLabelStyle}>
              <input
                type='checkbox'
                style={checkboxStyle}
                checked={value[field as keyof typeof value]}
                onChange={() => handleCheckboxChange(field as keyof typeof value)}
              />{' '}
              {field}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  padding: '20px',
  backgroundColor: '#fff',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const labelStyle: React.CSSProperties = {
  fontWeight: 500,
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const checkboxStyle: React.CSSProperties = {
  marginLeft: '8px',
  accentColor: '#1976d2',
  width: '18px',
  height: '18px',
};

const valueBoxStyle: React.CSSProperties = {
  border: '1px solid #bdbdbd',
  borderRadius: '6px',
  background: '#fff',
  padding: '16px',
};

const valueTitleStyle: React.CSSProperties = {
  fontWeight: 500,
  marginBottom: '10px',
};

const valueGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
};

const valueLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '15px',
  fontWeight: 400,
};
