export const generateTestData = () => {
  const data = [];
  const now = new Date();

  for (let i = 0; i < 10; i++) {
    const time = new Date(now.getTime() - (1000 - i) * 60000); // 1분 간격
    data.push({
      timestamp: time,
      series1: Math.random() * 100,
      series2: Math.random() * 150 + 50,
      series3: Math.random() * 200 + 100,
    });
  }
  console.log(data);
  const series = Object.keys(data[0]).filter((item) => item !== 'timeStamp');
  return data;
};

export const generateNewTestData = () => {
  const data = [];
  const now = new Date();

  for (let i = 0; i < 100; i++) {
    const time = new Date(now.getTime() - (1000 - i) * 60000); // 1분 간격
    data.push({
      timestamp: time,
      series1: Math.random() * 100,
      series2: Math.random() * 150 + 50,
      series3: Math.random() * 200 + 100,
    });
  }
  console.log(data);
  const series = Object.keys(data[0]).filter((item) => item !== 'timeStamp');
  return data;
};
