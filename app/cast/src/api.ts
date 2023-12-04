import util from "./util";

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
