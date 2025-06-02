import { useSeriesOptions, useSeriesActions } from '../entities/chart/chartHooks';

export const Editor = () => {
  const series = useSeriesOptions();
  const { updateStrokeWidth } = useSeriesActions();
  const onClickEditor = () => {
    updateStrokeWidth(1, 10);
  };
  return (
    <div style={{ width: '100%', height: '100%' }} onClick={onClickEditor}>
      이 곳은 차트 에디터 입니다.
    </div>
  );
};
