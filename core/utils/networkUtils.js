import * as storage from "./storage";
import * as envDetails from "./envDetails";

export function jsonToQuery(item) {
  var result = "";
  for (var key in item) {
    result = result + key + "=" + item[key] + "&";
  }

  if (result) result = result.substring(0, result.length - 1);

  return result;
}

export async function getAuthToken() {
  var data = await storage.readFile(storage.SIF_TOKEN_FILE_NAME);
  var platform = await storage.getPlatform();
  return {
    token: data.access_token,
    refId: data.ref_id,
    platform: platform
  };
}

export async function postData(url, parameters, httpHeaders) {
  var defaultHeaders = {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  };

  return fetch(url, {
    method: "POST",
    headers: httpHeaders || defaultHeaders,
    body: jsonToQuery(parameters)
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.error) {
        throw new Error(responseJson.error);
      } else {
        return responseJson;
      }
    });
}

export function get(url) {
  try {
    if (url && url[0] === "/") {
      url = url.substring(1);
    }

    var fullUrl = envDetails.getApiServer() + url;
    return getAuthToken().then(data => {
      let { token, refI, platform } = data;
      return fetch(fullUrl, {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: token,
          Accept: "*/*"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          return responseJson;
        });
    });
  } catch (e) {
    console.error(e);
  }
}

export function getText(url) {
  try {
    if (url && url[0] === "/") {
      url = url.substring(1);
    }

    var fullUrl = envDetails.getApiServer() + url;
    return getAuthToken().then(data => {
      let { token, refI, platform } = data;
      return fetch(fullUrl, {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: token,
          Accept: "text/plain"
        }
      })
        .then(response => response.text())
        .then(responseText => {
          return responseText;
        });
    });
  } catch (e) {
    console.error(e);
  }
}

async function urlSubstitutionReplace(url) {
  return getAuthToken().then(data => {
    let { token, refId, platform } = data;
    url = url.replace(/\$\{ref_id\}/g, refId);
    url = url.replace(/\$\{platform\}/g, platform);
    return url;
  });
}

export async function sync(
  url,
  queryParams,
  localPath,
  fromCacheFirst,
  rawProcessFunction,
  forceReload,
  rawResponse
) {
  var result = null;
  var cacheFirst = fromCacheFirst === true && localPath;
  if (cacheFirst) {
    result = storage.readFile(localPath);
    if (result) {
      return result;
    }
  }

  var query;
  if (queryParams) {
    if (queryParams instanceof Object) {
      query = jsonToQuery(queryParams);
    } else {
      query = queryParams;
    }
    url = url + "?" + query;
  }

  url = await urlSubstitutionReplace(url);
  var result = await get(url);
  if (localPath) {
    await storage.writeFile(localPath, result);
  }

  return result;
}
