import { useSeriesOptions, useSeriesActions } from '../../entities/chart/chartHooks';
import { useState, useRef, useEffect } from 'react';
import { ChromePicker } from 'react-color';

interface SeriesColor {
  color: string;
  fontSize: number;
}

export const SeriesEditor = () => {
  const seriesOptions = useSeriesOptions();
  const { updateSeriesStyle } = useSeriesActions();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [seriesColors, setSeriesColors] = useState<SeriesColor[]>(
    () =>
      seriesOptions?.map((series: any) => ({
        color: series.stroke || '#e0e0e0',
        fontSize: series.strokeWidth || 12,
      })) || [],
  );
  const popupRef = useRef<HTMLDivElement>(null);

  // seriesOptions가 변경될 때마다 seriesColors 업데이트
  useEffect(() => {
    if (seriesOptions) {
      setSeriesColors(
        seriesOptions.map((series: any) => ({
          color: series.stroke || '#e0e0e0',
          fontSize: series.strokeWidth || 12,
        })),
      );
    }
  }, [seriesOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setSelectedIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleColorBoxClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedIndex(index);
  };

  const handleColorChange = (color: string) => {
    if (selectedIndex !== null) {
      setSeriesColors((prev) =>
        prev.map((item, index) => (index === selectedIndex ? { ...item, color } : item)),
      );
      updateSeriesStyle(selectedIndex, { stroke: color });
    }
  };

  const handleFontSizeChange = (fontSize: number) => {
    if (selectedIndex !== null) {
      setSeriesColors((prev) =>
        prev.map((item, index) => (index === selectedIndex ? { ...item, fontSize } : item)),
      );
      updateSeriesStyle(selectedIndex, { strokeWidth: fontSize });
    }
  };

  return (
    <div style={containerStyle}>
      <div style={seriesBoxStyle}>
        <div style={boxTitleStyle}>Series</div>
        <div style={seriesListStyle}>
          {seriesOptions?.map((series: any, index) => (
            <div key={index} style={seriesItemStyle}>
              <span style={seriesNameStyle}>{series.yName}</span>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    ...colorBoxStyle,
                    backgroundColor: seriesColors[index]?.color || '#e0e0e0',
                  }}
                  onClick={(e) => handleColorBoxClick(index, e)}
                />
                {selectedIndex === index && (
                  <div ref={popupRef} style={popupStyle}>
                    <div style={popupContentStyle}>
                      <div style={fontSizeContainerStyle}>
                        <span style={labelStyle}>Font Size:</span>
                        <select
                          value={seriesColors[index]?.fontSize || 12}
                          onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                          style={selectStyle}
                        >
                          {[8, 10, 12, 14, 16, 18, 20].map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                      <ChromePicker
                        color={seriesColors[index]?.color || '#e0e0e0'}
                        onChange={(color) => handleColorChange(color.hex)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  paddingTop: '10px',
};

const seriesBoxStyle = {
  width: '90%',
  height: '50%',
  backgroundColor: 'white',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '8px',
};

const boxTitleStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#1976d2',
  marginBottom: '5px',
};

const seriesListStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '5px',
};

const seriesItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px',
  borderRadius: '4px',
};

const seriesNameStyle = {
  fontSize: '14px',
  color: '#333',
};

const colorBoxStyle = {
  width: '15px',
  height: '15px',
  border: '1px solid #e0e0e0',
  borderRadius: '2px',
};

const popupStyle = {
  position: 'absolute' as const,
  top: '25px',
  right: '0',
  zIndex: 1000,
  backgroundColor: 'white',
  borderRadius: '4px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  padding: '10px',
};

const popupContentStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '10px',
};

const fontSizeContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const labelStyle = {
  fontSize: '14px',
  color: '#333',
};

const selectStyle = {
  padding: '4px 8px',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  fontSize: '14px',
};
