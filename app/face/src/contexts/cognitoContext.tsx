//import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer } from "react";
import press from "@/lib";
// third-party
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

export const userPool = new CognitoUserPool({
  UserPoolId: process.env.REACT_APP_AWS_POOL_ID || "ap-northeast-2_ZdytPq8Cn",
  ClientId:
    process.env.REACT_APP_AWS_APP_CLIENT_ID || "7atqciav6sv8cvlh6k3nhlkaq",
});

const APP_SERVICE_TOKEN_NAME = "faceServiceToken";

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem(APP_SERVICE_TOKEN_NAME, serviceToken);
  } else {
    localStorage.removeItem(APP_SERVICE_TOKEN_NAME);
  }
};

const AWSCognitoContext = createContext(null);

export const AWSCognitoProvider = ({ children }) => {
  const fnSucces = (token) => {
    const user = userPool.getCurrentUser();
    user.getSession((err, session) => {
      if (err || session.isValid() == false) {
        return;
      }

      user.getUserAttributes((err, attr) => {
        if (err) return;
        const email = attr.find(
          (attribute) => attribute.Name === "email"
        ).Value;

        const picture = attr.find(
          (attribute) => attribute.Name === "picture"
        ).Value;
        setSession(token);
        press.user.login(email, token, picture);
      });
    });
  };

  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem(APP_SERVICE_TOKEN_NAME);

        if (!token) {
          return press.user.logout();
        }

        fnSucces(token);
      } catch (err) {}
    };

    init();
  }, []);

  const login = async (email, password) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authData = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authData, {
      onSuccess: (session) => {
        console.log("...", session.getAccessToken());
        fnSucces(session.getAccessToken().getJwtToken());
      },
      onFailure: () => {
        console.log("failed");
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        user.completeNewPasswordChallenge("cndrjs85@@A", null, {
          onSuccess: () => {},
          onFailure: (e) => {},
        });
      },
    });
  };

  const register = (email, password, firstName, lastName) =>
    new Promise((success, rej) => {
      userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({ Name: "email", Value: email }),
          new CognitoUserAttribute({
            Name: "name",
            Value: `${firstName} ${lastName}`,
          }),
        ],
        [],
        async (err, result) => {
          if (err) {
            rej(err);
            return;
          }
          success(result);
        }
      );
    });

  const resetPassword = (email) => console.log(email);

  const logout = () => {
    const loggedInUser = userPool.getCurrentUser();
    if (loggedInUser) {
      setSession(null);
      loggedInUser.signOut();
      press.user.logout();
    }
  };

  return (
    <div>
      <AWSCognitoContext.Provider
        value={{ login, logout, register, resetPassword }}
      >
        {children}
      </AWSCognitoContext.Provider>
    </div>
  );
};

export default AWSCognitoContext;
