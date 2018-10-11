import { AccessTokenExpiredError } from './definitions';

export const makeBearer = token => 'Bearer ' + token;

const objectFromKeyValueList = keyValueList => keyValueList.reduce((obj, [key, value]) => {
  obj[key] = value;
  return obj;
}, {});

/**
 *  Given an object of apiFunctions where all api functions have a `apiFunction(accessToken)(...args)
 *  interface and a `fetchAccessToken` function, returns a decorated api object that fetches a shared
 *  `accessToken` for the api functions using `fetchAccessToken` on first call or if calling a function
 *  raises an `AccessTokenExpiredError`.
 */
export const withFetchAccessToken = (fetchAccessToken, apiFunctionByName) => {
  let accessToken;

  const apiFunctionWithFetchAccessTokenByNameList = Object.entries(apiFunctionByName).map(
    ([name, apiFunction]) => [name, async (...args) => {
      if (!accessToken) {
        accessToken = await fetchAccessToken();
      }
      try {
        return await apiFunction(accessToken)(...args);
      }
      catch (e) {
        if (e instanceof AccessTokenExpiredError) {
          accessToken = await fetchAccessToken();
          return await apiFunction(accessToken)(...args);
        }
        else {
          throw(e);
        }
      }
    }]
  );

  return objectFromKeyValueList(apiFunctionWithFetchAccessTokenByNameList);
};
