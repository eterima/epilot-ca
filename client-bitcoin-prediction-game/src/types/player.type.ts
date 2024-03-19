export type Player = {
  id: string;
  email: string;
  allTimeScore: number;
};

export type JWTToken = {
  accessToken: string;
};

export type GuessDetails = {
  guess: number;
  btcCurrentValue: number;
  sendRequestAt: Date;
};
