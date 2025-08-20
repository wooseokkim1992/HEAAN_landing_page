export type TResCheckUser = {
  message: string;
  data: {
    email: string;
    heaan_status: string;
    coder_status: string;
  };
};

export type TLoginReqDTO = {
  email: string;
  password: string;
};

export type TNormalRespDTO = {
  message: string;
};
