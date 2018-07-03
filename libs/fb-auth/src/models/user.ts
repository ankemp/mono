// import { UserInfo } from "firebase";

export interface IUser {
  uid: string;
  displayName: string;
  email: string;
}

export class User implements IUser {
  constructor(
    public displayName: string,
    public email: string = null,
    public uid: string = null
  ) { }
}
