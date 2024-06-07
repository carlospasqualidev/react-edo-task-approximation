export interface IUserAccount {
  id: string;
  name: string;
  email: string;
  image?: string;
  organizations?: {
    id: string;
    name: string;
  }[];
}
