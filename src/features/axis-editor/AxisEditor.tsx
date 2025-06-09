import { useState, useEffect, useRef } from 'react';
import { useAxesOptions, useAxisActions } from '../../entities/chart/chartHooks';
import { ChromePicker } from 'react-color';

interface ScaleType {
  isAutomation: boolean;
  min: number | string | undefined;
  max: number | string | undefined;
  interval: number | string | undefined;
  fontSize: number | string | undefined;
  fontColor: string | undefined;
  gridColor: string | undefined;
}

export interface AxisConfig {
  [key: string]: ScaleType;
}

export const AxisEditor = () => {
  const currentAxesOption = useAxesOptions();
  const { changeAxesConfig } = useAxisActions();
  const fontColorPickerRef = useRef<HTMLDivElement>(null);
  const gridColorPickerRef = useRef<HTMLDivElement>(null);
  // TODO: min, max 관련 내용은 agchartaxisnumberoption을 사용해야 해서 추후에 맞추기
  const leftAxesOption: any = currentAxesOption?.filter((item) => item.position === 'left')[0];
  const rightAxesOption: any = currentAxesOption?.filter((item) => item.position === 'right')[0];

  const [axisConfig, setAxisConfig] = useState<AxisConfig>({
    left: {
      isAutomation: true,
      min: leftAxesOption?.min ?? '',
      max: leftAxesOption?.max ?? '',
      interval: '',
      fontSize: leftAxesOption?.label.fontSize ?? '',
      fontColor: '#000000',
      gridColor: '#e0e0e0',
    },
    right: {
      isAutomation: true,
      min: rightAxesOption?.min ?? '',
      max: rightAxesOption?.max ?? '',
      interval: '',
      fontSize: rightAxesOption?.label.fontSize ?? '',
      fontColor: '#000000',
      gridColor: '#e0e0e0',
    },
  });

  const [selectedAxis, setSelectedAxis] = useState<'left' | 'right'>('left');
  const [showFontColorPicker, setShowFontColorPicker] = useState(false);
  const [showGridColorPicker, setShowGridColorPicker] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fontColorPickerRef.current &&
        !fontColorPickerRef.current.contains(event.target as Node) &&
        showFontColorPicker
      ) {
        setShowFontColorPicker(false);
      }
      if (
        gridColorPickerRef.current &&
        !gridColorPickerRef.current.contains(event.target as Node) &&
        showGridColorPicker
      ) {
        setShowGridColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFontColorPicker, showGridColorPicker]);

  const handleConfigChange = (
    axis: 'left' | 'right',
    field: keyof ScaleType,
    value: ScaleType[keyof ScaleType],
  ) => {
    setAxisConfig((prev) => {
      const updatedAxis = {
        ...prev[axis],
        [field]: value,
      };

      const newConfig: AxisConfig = {
        ...prev,
        [axis]: updatedAxis,
      };

      // 자동화 변경 시 즉시 반영
      if (field === 'isAutomation') {
        changeAxesConfig(newConfig);
      }

      return newConfig;
    });
  };

  const handleBlurChange = () => {
    changeAxesConfig(axisConfig);
  };

  return (
    <div style={containerStyle}>
      <div style={axisBoxStyle}>
        <button onClick={() => console.log(leftAxesOption, rightAxesOption)}>console axes</button>
        <div style={boxTitleStyle}>Axis</div>
        <div style={checkboxContainerStyle}>
          <label style={checkboxStyle}>
            <input
              type='radio'
              name='axis'
              checked={selectedAxis === 'left'}
              onChange={() => setSelectedAxis('left')}
            />
            Left Axis
          </label>
          <label style={checkboxStyle}>
            <input
              type='radio'
              name='axis'
              checked={selectedAxis === 'right'}
              onChange={() => setSelectedAxis('right')}
            />
            Right Axis
          </label>
        </div>
      </div>
      <div style={rightContainerStyle}>
        <div style={scaleBoxStyle}>
          <div style={boxTitleStyle}>Scale</div>
          <div style={scaleContentStyle}>
            <div style={scaleRowStyle}>
              <div style={scaleLabelStyle}>Automation</div>
              <div style={toggleContainerStyle}>
                <input
                  type='checkbox'
                  style={toggleStyle}
                  checked={axisConfig[selectedAxis].isAutomation}
                  onChange={(e) =>
                    handleConfigChange(selectedAxis, 'isAutomation', e.target.checked)
                  }
                />
              </div>
            </div>
            <div style={scaleRowStyle}>
              <div style={scaleLabelStyle}>Minimum</div>
              <input
                type='number'
                style={{
                  ...numberInputStyle,
                  opacity: axisConfig[selectedAxis].isAutomation ? 0.5 : 1,
                  cursor: axisConfig[selectedAxis].isAutomation ? 'not-allowed' : 'text',
                }}
                value={axisConfig[selectedAxis].min}
                onChange={(e) => handleConfigChange(selectedAxis, 'min', Number(e.target.value))}
                disabled={axisConfig[selectedAxis].isAutomation}
                onBlur={handleBlurChange}
              />
            </div>
            <div style={scaleRowStyle}>
              <div style={scaleLabelStyle}>Maximum</div>
              <input
                type='number'
                style={{
                  ...numberInputStyle,
                  opacity: axisConfig[selectedAxis].isAutomation ? 0.5 : 1,
                  cursor: axisConfig[selectedAxis].isAutomation ? 'not-allowed' : 'text',
                }}
                value={axisConfig[selectedAxis].max}
                onChange={(e) => handleConfigChange(selectedAxis, 'max', Number(e.target.value))}
                disabled={axisConfig[selectedAxis].isAutomation}
                onBlur={handleBlurChange}
              />
            </div>
            <div style={scaleRowStyle}>
              <div style={scaleLabelStyle}>Interval</div>
              <input
                type='number'
                style={{
                  ...numberInputStyle,
                  opacity: axisConfig[selectedAxis].isAutomation ? 0.5 : 1,
                  cursor: axisConfig[selectedAxis].isAutomation ? 'not-allowed' : 'text',
                }}
                value={axisConfig[selectedAxis].interval}
                onChange={(e) =>
                  handleConfigChange(selectedAxis, 'interval', Number(e.target.value))
                }
                disabled={axisConfig[selectedAxis].isAutomation}
                onBlur={handleBlurChange}
              />
            </div>
          </div>
        </div>
        <div style={styleBoxStyle}>
          <div style={boxTitleStyle}>Style</div>
          <div style={scaleContentStyle}>
            <div style={scaleRowStyle}>
              <div style={scaleLabelStyle}>Font Size</div>
              <input
                type='number'
                style={numberInputStyle}
                value={axisConfig[selectedAxis].fontSize}
                onChange={(e) =>
                  handleConfigChange(selectedAxis, 'fontSize', Number(e.target.value))
                }
                onBlur={handleBlurChange}
              />
            </div>
            <div style={scaleRowStyle}>
              <div style={scaleLabelStyle}>Font Color</div>
              <div style={colorPickerContainerStyle}>
                <div
                  style={{
                    ...colorPreviewStyle,
                    backgroundColor: axisConfig[selectedAxis].fontColor,
                  }}
                  onClick={() => setShowFontColorPicker(!showFontColorPicker)}
                />
                {showFontColorPicker && (
                  <div style={colorPickerStyle} ref={fontColorPickerRef}>
                    <ChromePicker
                      color={axisConfig[selectedAxis].fontColor}
                      onChange={(color) => handleConfigChange(selectedAxis, 'fontColor', color.hex)}
                      onChangeComplete={handleBlurChange}
                    />
                  </div>
                )}
              </div>
            </div>
            <div style={scaleRowStyle}>
              <div style={scaleLabelStyle}>Grid Color</div>
              <div style={colorPickerContainerStyle}>
                <div
                  style={{
                    ...colorPreviewStyle,
                    backgroundColor: axisConfig[selectedAxis].gridColor,
                  }}
                  onClick={() => setShowGridColorPicker(!showGridColorPicker)}
                />
                {showGridColorPicker && (
                  <div style={colorPickerStyle} ref={gridColorPickerRef}>
                    <ChromePicker
                      color={axisConfig[selectedAxis].gridColor}
                      onChange={(color) => handleConfigChange(selectedAxis, 'gridColor', color.hex)}
                      onChangeComplete={handleBlurChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  gap: '20px',
  padding: '20px',
};

const axisBoxStyle = {
  width: '25%',
  height: '80%',
  backgroundColor: 'white',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '15px',
};

const rightContainerStyle = {
  width: '70%',
  height: '85%',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '20px',
};

const scaleBoxStyle = {
  width: '100%',
  height: '40%',
  backgroundColor: 'white',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '15px',
};

const styleBoxStyle = {
  width: '100%',
  height: '40%',
  backgroundColor: 'white',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '15px',
};

const checkboxContainerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '15px',
};

const checkboxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  color: '#333',
};

const boxTitleStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#1976d2',
  marginBottom: '5px',
};

const scaleContentStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '15px',
};

const scaleRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
};

const scaleLabelStyle = {
  width: '100px',
  fontSize: '14px',
  color: '#333',
};

const numberInputStyle = {
  width: '100px',
  padding: '4px 8px',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  fontSize: '14px',
};

const toggleContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const toggleStyle = {
  width: '40px',
  height: '20px',
  cursor: 'pointer',
};

const colorPickerContainerStyle = {
  position: 'relative' as const,
};

const colorPreviewStyle = {
  width: '30px',
  height: '30px',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  cursor: 'pointer',
};

const colorPickerStyle = {
  position: 'absolute' as const,
  zIndex: 2,
  top: '40px',
  left: '0',
};
