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
  console.log('??', data);
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
  return data;
};

export const generateBoxPlotData = () => {
  return [
    {
      department: 'Sales',
      min: 1052,
      q1: 4465,
      median: 5765,
      q3: 8834,
      max: 14852,
    },
    {
      department: 'R&D',
      min: 1009,
      q1: 2741,
      median: 4377,
      q3: 7725,
      max: 14814,
    },
    {
      department: 'HR',
      min: 1555,
      q1: 2696,
      median: 4071,
      q3: 9756,
      max: 19717,
    },
  ];
};

export const generateBoxPlotData2 = () => {
  return [
    {
      department: 'Sales',
      min: 1300,
      q1: 4465,
      median: 5765,
      q3: 8834,
      max: 15895,
    },
    {
      department: 'R&D',
      min: 1111,
      q1: 2741,
      median: 4377,
      q3: 7725,
      max: 17789,
    },
    {
      department: 'HR',
      min: 1234,
      q1: 2696,
      median: 4071,
      q3: 9756,
      max: 24571,
    },
  ];
};
