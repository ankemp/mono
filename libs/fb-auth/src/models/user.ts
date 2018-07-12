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
    private profile?: { [key: string]: any }
  ) {
    if (!!profile) {
      Object.keys(profile).forEach(v => {
        this[v] = profile[v];
      });
      this.profile = undefined;
    }
  }
}
