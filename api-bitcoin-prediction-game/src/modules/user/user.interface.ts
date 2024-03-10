export interface User {
  id: string;
  email: string;
}

export interface UserWithPassword extends User {
  password: string;
}
