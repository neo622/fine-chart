// 브라우저로 부터 가져와야 함
export const API_URL: string = 'http://10.100.100.172:9002/param_chart';
export const API_URL_WTW: string = 'http://10.100.100.172:9002/wafer_to_wafer';
export const payload_wtw: any = {
  equipment: 'PQK28708',
  lotid: '20241113081328_EPD_barer_1foup',
  recipe: 'CTD_P3F_AR_O2N2',
  info: [
    {
      id: 0,
      module: 'PM3',
      parameter: 'APC_Pressure',
      wafer: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
      ],
      step: ['1', '2', '3', '4', '5'],
    },
  ],
};

export const payload_trace: any = {
  equipment: 'PQK28708',
  lotid: '20241113081328_EPD_barer_1foup',
  recipe: 'CTD_P3F_AR_O2N2',
  info: [
    {
      id: 0,
      module: 'TM',
      parameter: 'TM_Bara_Press_read',
      wafer: ['1', '2'],
      step: [],
    },
    // {
    //   id: 1,
    //   module: 'PM3',
    //   parameter: 'APC_Pressure',
    //   wafer: ['1', '2'],
    //   step: ['1', '2', '3', '4', '5'],
    // },
    // {
    //   id: 1,
    //   module: 'PM3',
    //   parameter: 'Gas1_Monitor',
    //   wafer: ['1', '2'],
    //   step: ['1', '2', '3', '4', '5'],
    // },
    // {
    //   id: 2,
    //   module: 'PM3',
    //   parameter: 'Gas2_Monitor',
    //   wafer: ['1', '2'],
    //   step: ['1', '2', '3', '4', '5'],
    // },
    {
      id: 1,
      module: 'TM',
      parameter: 'LL2_N2Flow_Switch_Monitor',
      wafer: ['1', '2'],
      step: [],
    },
  ],
};
//
