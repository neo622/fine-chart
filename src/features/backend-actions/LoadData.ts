import axios from 'axios';

//Payload 및 URL
const API_URL: string = 'http://10.100.100.172:9002/param_chart';
const payload: any = {
  equipment: 'PQK28708',
  lotid: '20241113081328_EPD_barer_1foup',
  recipe: 'CTD_P3F_AR_O2N2',
  info: [
    {
      id: 0,
      module: 'PM3',
      parameter: 'APC_Pressure',
      wafer: ['1', '2'],
      step: ['1', '2', '3', '4', '5'],
    },
    {
      id: 1,
      module: 'TM',
      parameter: 'LL1_Pira_Press_Read',
      wafer: ['1', '2'],
      step: [],
    },
  ],
};
//

const processData = (data: any) => {
  console.log('프프프', typeof data);
  return data;
};

export const fetchTraceData = async () => {
  try {
    const response = await axios.post(API_URL, payload);
    // const processedData = processData(response.data);
    console.log('리스', response);
    const processedData = processData(response.data);

    // console.log('프로세스 데이터', processedData);
    return processedData;
  } catch (error) {
    console.log('데이터 요청 중 에러 발생', error);
    return null;
  }
};
