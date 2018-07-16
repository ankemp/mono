export interface IUser {
  uid: string;
  displayName: string;
  email: string;
  [key: string]: any;
}

export class User implements IUser {
  constructor(
    public displayName: string,
    public uid: string = null,
    public email: string = null,
    public profile?: { [key: string]: any }
  ) {}
}
