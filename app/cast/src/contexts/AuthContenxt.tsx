import press from "@/lib";
import util from "../util";
import { createContext, useEffect, useRef } from "react";
import { LocalStorageKeys } from "../util/storage";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { GlobalEventEnum } from "../../../../lib/constants";
import { TimerKeys } from "../util/timer";

const PER_MINUTE = 60000;
const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const userData = UserDataContainer.instance;

  // 초기 진입시
  useEffect(() => {
    const init = async () => {
      if (userData.idToken && userData.idTokenExp) {
        if (userData.idTokenExp * 1000 > new Date().getTime()) {
          userData.attribute = util.tool.parseJwt(userData.idToken);
          await handleRefreshIdToken();
        } else {
          userData.destroy();
        }
      }
    };
    init();

    return () => {
      util.timer.unroll(TimerKeys.TIMER_TOKEN_UPDATE);
    };
  }, []);

  // 1분전 토큰 갱신 로직
  const registerRefreshTokenTimer = async () => {
    util.timer.enroll(
      TimerKeys.TIMER_TOKEN_UPDATE,
      handleRefreshIdToken,
      userData.idTokenExp * 1000 - 4 * PER_MINUTE - new Date().getTime()
    );
  };

  // IdToken 갱신 로직
  const handleRefreshIdToken = async () => {
    const user = util.aws.cognito.userPool.getCurrentUser();
    if (user == null) {
      handleLogout();
      return;
    }
    try {
      const session: CognitoUserSession = await new Promise(
        (resolve, reject) => {
          user.getSession((err, session) => {
            if (err) reject(err);
            else resolve(session);
          });
        }
      );

      const refreshedToken: string = await new Promise((resolve, reject) => {
        user.refreshSession(
          session.getRefreshToken(),
          (err, refreshedSession) => {
            if (err) reject(err);
            else resolve(refreshedSession.getIdToken().getJwtToken());
          }
        );
      });

      userData.idToken = refreshedToken;
      userData.idTokenExp = session.getIdToken().getExpiration();
      registerRefreshTokenTimer();
    } catch (error) {
      console.error("토큰 갱신 중 에러 발생:", error);
    }
  };

  // 로그인 처리
  const handleLogin = async (email, password) => {
    util.aws.cognito
      .user(email)
      .authenticateUser(util.aws.cognito.auth(email, password), {
        onSuccess: (s) => {
          const n = s.getIdToken();
          userData.idToken = n.getJwtToken();
          userData.idTokenExp = s.getIdToken().getExpiration();
          userData.attribute = n.payload;

          registerRefreshTokenTimer();
        },
        onFailure: (e) => {
          alert("로그인에 실패했습니다.");
        },
      });
  };

  // 로그아웃 처리
  const handleLogout = () => {
    util.timer.unroll(TimerKeys.TIMER_TOKEN_UPDATE);
    userData.destroy();
    const user = util.aws.cognito.userPool.getCurrentUser();
    if (!user) return;

    user.signOut();
  };

  return (
    <AuthContext.Provider value={{ handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export class UserDataContainer {
  private static _instance: UserDataContainer;
  public static get instance() {
    return this._instance || (this._instance = new UserDataContainer());
  }

  _attribute = {};
  public set attribute(n: object) {
    this._attribute = n;
    press.wire.fire(GlobalEventEnum.CHANGED_USER_CONFIG);
  }

  public destroy() {
    this.attribute = {};
    util.storage.local.remove(LocalStorageKeys.SERVICE_ID_TOKEN_NAME);
    util.storage.local.remove(LocalStorageKeys.SERVICE_ID_TOKEN_EXP);
  }

  public get attribute() {
    return this._attribute;
  }

  public get idToken(): string {
    return util.storage.local.get(LocalStorageKeys.SERVICE_ID_TOKEN_NAME);
  }

  public set idToken(n: string) {
    util.storage.local.set(LocalStorageKeys.SERVICE_ID_TOKEN_NAME, n);
  }

  public get idTokenExp(): number {
    const val = util.storage.local.get(LocalStorageKeys.SERVICE_ID_TOKEN_EXP);
    return val ? parseInt(val) : null;
  }

  public set idTokenExp(n: number) {
    util.storage.local.set(LocalStorageKeys.SERVICE_ID_TOKEN_EXP, n);
  }
}

export default AuthContext;
