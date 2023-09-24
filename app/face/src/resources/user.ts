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
    const fidx = Object.keys(USERS).findIndex(
      (f) => USERS[f].username.toString() === name,
    );

    if (fidx !== -1) return USERS[fidx];
    else {
      throw new Error();
    }
  }

  public getUserWithId(id?: string): IUserProps {
    const fidx = Object.keys(USERS).findIndex(
      (f) => USERS[f].id.toString() === id.toString(),
    );

    if (fidx !== -1) return USERS[fidx];
    else {
      throw new Error();
    }
  }
}
