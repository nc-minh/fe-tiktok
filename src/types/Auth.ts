export interface SignupDataType {
  fullname: string;
  username: string;
  password: string;
}

export interface LoginType {
  username: string;
  password: string;
}

export interface TokensType {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
