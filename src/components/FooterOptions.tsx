import wtwIcon from '../assets/icons/wtw.png';
import editIcon from '../assets/icons/edit.png';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleBoxPlot } from '../entities/ui/uiSlice';

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

export const FooterOptions = () => {
  const dispatch = useAppDispatch();
  const isBoxPlotVisible = useAppSelector((state) => state.ui.isBoxPlotVisible);

  const buttons = [
    { id: 'wtw', icon: wtwIcon, onClick: () => {}, isActive: false },
    {
      id: 'edit',
      icon: editIcon,
      onClick: () => dispatch(toggleBoxPlot()),
      isActive: isBoxPlotVisible,
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0 20px',
        height: '100%',
        width: '100%',
      }}
    >
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
