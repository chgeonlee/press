import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

export default class Cognito {
  private static _instance: Cognito;
  public static get instance() {
    return this._instance || (this._instance = new Cognito());
  }

  private constructor() {
    if (
      !process.env.REACT_APP_AWS_POOL_ID ||
      !process.env.REACT_APP_AWS_APP_CLIENT_ID
    ) {
      throw new Error("환경변수 오류");
    }
  }

  private _userPool: CognitoUserPool;
  public get userPool() {
    return (
      this._userPool ||
      (this._userPool = new CognitoUserPool({
        UserPoolId: process.env.REACT_APP_AWS_POOL_ID,
        ClientId: process.env.REACT_APP_AWS_APP_CLIENT_ID,
      }))
    );
  }

  public user = (username: string) => {
    return new CognitoUser({
      Username: username,
      Pool: this.userPool,
    });
  };

  public auth = (username: string, password: string) => {
    return new AuthenticationDetails({
      Username: username,
      Password: password,
    });
  };

  public attr = (spec: any) => {
    return new CognitoUserAttribute(spec);
  };
}
