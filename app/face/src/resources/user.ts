export interface IUserProps {
  id: string;
  username: string;
  name: string;
  email?: string;
  password: string;
}

const chung: IUserProps = {
  id: "1",
  username: "chgeonlee",
  name: "chung",
  email: "chgeon.lee@gmail.com",
  password: "@ABC123",
};

const ella: IUserProps = {
  id: "2",
  username: "ella",
  name: "Ella",
  email: "ella@gmail.com",
  password: "@ABC123",
};

const USERS: { [key: string]: IUserProps } = {
  CHUNG: chung,
  ELLA: ella,
};

export default class UserResource {
  private static _instance: UserResource;
  public static get instance() {
    return this._instance || (this._instance = new UserResource());
  }

  public getUserWithName(name: string): IUserProps {
    // @ts-ignore
    return USERS[
      Object.keys(USERS).filter((f) => USERS[f].username.toString() === name)
    ];
  }

  public getUserWithId(id?: string): IUserProps {
    // @ts-ignore
    return USERS[
      Object.keys(USERS).filter((f) => USERS[f].id.toString() === id.toString())
    ];
  }
}
