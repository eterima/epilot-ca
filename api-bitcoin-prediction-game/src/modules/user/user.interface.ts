export interface User {
  id: string;
  email: string;
  allTimeScore: number;
}

export interface UserWithPassword extends User {
  password: string;
}
