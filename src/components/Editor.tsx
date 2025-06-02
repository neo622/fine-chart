import { useSeriesActions } from '../entities/chart/chartHooks';

export const Editor = () => {
  const { updateStrokeWidth } = useSeriesActions();
  const onClickEditor = () => {
    updateStrokeWidth(1, 10);
  };

  const sectionStyle = {
    width: '100%',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    border: '1px solid rgba(56, 56, 56, 0.1)',
  };

  return (
    <div
      style={{
        width: '90%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '0 15px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ ...sectionStyle, height: '30%', marginTop: '15px' }}>
        <h2
          style={{
            margin: '0 0 16px 0',
            width: '100%',
            height: '50px',
            background: '#b2cff7',
            color: '#00006a',
          }}
        >
          Assign Axis
        </h2>
        {/* Assign Axis 컨텐츠 */}
      </div>
      <div style={{ ...sectionStyle, height: '60%', marginBottom: '20px' }}>
        <h2
          style={{
            margin: '0 0 16px 0',
            width: '100%',
            height: '50px',
            background: '#b2cff7',
            color: '#00006a',
          }}
        >
          Chart Editor
        </h2>
        <div style={{ width: '100%', height: '100%' }} onClick={onClickEditor}>
          이 곳은 차트 에디터 입니다.
        </div>
      </div>
    </div>
  );
};
