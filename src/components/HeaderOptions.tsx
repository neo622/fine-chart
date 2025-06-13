import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleEditor, toggleSeriesShift } from '../entities/ui/uiSlice';
import { toggleAnnotation } from '../entities/chart/chartSlice';
import editIcon from '../assets/icons/edit.png';
import shiftIcon from '../assets/icons/shift.png';
import rulerIcon from '../assets/icons/ruler.png';
import downloadIcon from '../assets/icons/download.png';
import captureIcon from '../assets/icons/capture.png';
import eraserIcon from '../assets/icons/eraser.png';
import { useCaptureImage, useDownloadExcelData } from '../features/export-data/exportHooks';

interface ButtonProps {
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

const IconButton = ({ icon, isActive, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: '48px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isActive ? '#e3f2fd' : 'white',
        border: `1px solid ${isActive ? '#90caf9' : '#e0e0e0'}`,
        borderRadius: '4px',
        cursor: 'pointer',
        padding: '8px',
        transition: 'all 0.2s ease',
      }}
    >
      <img src={icon} alt='icon' style={{ width: '18px', height: '18px' }} />
    </button>
  );
};

export const HeaderOptions = ({ chartRef }: { chartRef: any }) => {
  const dispatch = useAppDispatch();
  const chart = useAppSelector((state) => state.chart);
  const isEditorVisible = useAppSelector((state) => state.ui.isEditorVisible);
  const isSeriesShiftVisible = useAppSelector((state) => state.ui.isSeriesShiftVisible);
  const isAnnotationEnabled = useAppSelector(
    (state) => state.chart.chartOptions.annotations?.axesButtons?.enabled ?? false,
  );
  const { downloadExcel } = useDownloadExcelData();
  const { captureImage } = useCaptureImage();

  const [waferInfo, setWaferInfo] = useState(false);
  const [stepInfo, setStepInfo] = useState(false);

  const buttons = [
    {
      id: 'edit',
      icon: editIcon,
      onClick: () => dispatch(toggleEditor()),
      isActive: isEditorVisible,
    },
    {
      id: 'shift',
      icon: shiftIcon,
      onClick: () => dispatch(toggleSeriesShift()),
      isActive: isSeriesShiftVisible,
    },
    {
      id: 'ruler',
      icon: rulerIcon,
      onClick: () => dispatch(toggleAnnotation()),
      isActive: isAnnotationEnabled,
    },
    {
      id: 'download',
      icon: downloadIcon,
      onClick: () => {
        if (chart.chartOptions.data) {
          downloadExcel(chart.chartOptions?.data);
        }
      },
      isActive: false,
    },
    {
      id: 'capture',
      icon: captureIcon,
      onClick: () => {
        if (chart.chartOptions.data) {
          captureImage(chartRef);
        }
      },
      isActive: false,
    },
    { id: 'erasor', icon: eraserIcon, onClick: () => {}, isActive: false },
  ];

  const checkboxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginRight: '20px',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        height: '100%',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
        <label style={checkboxStyle}>
          <input
            type='checkbox'
            checked={waferInfo}
            onChange={(e) => setWaferInfo(e.target.checked)}
          />
          Wafer Info
        </label>
        <label style={checkboxStyle}>
          <input
            type='checkbox'
            checked={stepInfo}
            onChange={(e) => setStepInfo(e.target.checked)}
          />
          Step Info
        </label>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginRight: '20px' }}>
        {buttons.map((button) => (
          <IconButton
            key={button.id}
            icon={button.icon}
            isActive={button.isActive}
            onClick={button.onClick}
          />
        ))}
      </div>
    </div>
  );
};
