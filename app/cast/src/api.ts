import { UserDataContainer } from "./contexts/AuthContenxt";
import util from "./util";

export const apiGetPosts = async () => {
  const inst = await util.api.normal;
  const userData = UserDataContainer.instance;
  const token = userData.idToken;
  const header = {} as any;
  if (token) {
    header.Authorization = `Bearer ${token}`;
  }

  return inst.get("/posts", {
    headers: header,
  });
};

export const getTest = async () => {
  const inst = await util.api.secret();

  return inst
    .get("test")
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((e) => {
      console.log(e.response.status);
      // 401 - token 오류 확인 등,
      // 403 - api gateway에서 연결이 안됬을 경우 등,
      return;
    });
};

export const getNormal = () => {
  return util.api.normal
    .get("")
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((e) => {
      console.log(e.response?.status); // 권한 없을 경우 401
      return;
    });
};

export const postEnrollUser = (email: string) => {
  return util.api.normal
    .post("user/enroll", {
      email: email,
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return;
    });
};
