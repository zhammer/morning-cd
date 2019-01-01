import { AccessTokenExpiredError } from './definitions';

export function makeBearer(token: string) {
  return `Bearer ${token}`;
}

/**
 * Convert a list of [key, value] pairs to an object.
 * @param keyValueList List of [key, value] pairs.
 */
const objectFromKeyValueList = (keyValueList: Array<[string, any]>) => keyValueList.reduce((obj: { [key: string]: any }, [key, value]) => {
  obj[key] = value;
  return obj;
}, {});

interface ApiFunctionByName {
  [key: string]: (accessToken: string) => (...args: any[]) => Promise<any>;
}

/**
 *  Given an object of apiFunctions where all api functions have a `apiFunction(accessToken)(...args)
 *  interface and a `fetchAccessToken` function, returns a decorated api object that fetches a shared
 *  `accessToken` for the api functions using `fetchAccessToken` on first call or if calling a function
 *  raises an `AccessTokenExpiredError`.
 */
export function withFetchAccessToken (fetchAccessToken: () => Promise<string>, apiFunctionByName: ApiFunctionByName) {
  let accessToken: string;

  const apiFunctionWithFetchAccessTokenByNameList = Object.entries(apiFunctionByName).map(
    ([name, apiFunction]): [string, (...args: any[]) => Promise<any>] => [name, async (...args: any[]) => {
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
