import ExcelJS from 'exceljs';

export const useDownloadExcelData = () => {
  /**
   * @param data 엑셀로 내보낼 데이터 (배열)
   *   예시: [{ Time: '16:43:0', 'PM1.Gas1_Monitor': -8.93, ... }, ...]
   */
  const formatTimestamp = (ts: any) => {
    const date = new Date(Number(ts));
    // 포맷: YYYY-MM-DD hh:mm:ss A
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    let hh = date.getHours();
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    const ampm = hh >= 12 ? 'PM' : 'AM';
    hh = hh % 12 || 12;
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss} ${ampm}`;
  };

  const downloadExcel = async (data: any[]) => {
    if (!data || data.length === 0) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // 1. 헤더 추출 및 작성
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // 2. 데이터 행 추가 (Timestamp 포맷 변환)
    data.forEach((row) => {
      worksheet.addRow(
        headers.map((h) =>
          h.toLowerCase().includes('time') || h.toLowerCase().includes('timestamp')
            ? formatTimestamp(row[h])
            : row[h],
        ),
      );
    });

    // 3. 열 너비 자동 조정
    headers.forEach((h, i) => {
      const maxLen = Math.max(h.length, ...data.map((row) => String(row[h] ?? '').length));
      worksheet.getColumn(i + 1).width = maxLen + 2;
    });

    // 4. 파일 다운로드
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart-data.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return { downloadExcel };
};

export const useCaptureImage = () => {
  const captureImage = (chartRef: any) => {
    // 차트의 container에서 <canvas> 찾기
    const container = chartRef.current?.getChartContainer();
    if (!container) return;
    const canvas = container.querySelector('canvas');
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart-image.png';
    a.click();
  };

  return { captureImage };
};
