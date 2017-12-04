import * as loginService from "./loginService";
import * as sectionService from "./../sections/sectionsService";
import * as envDetails from "./../utils/envDetails";
import * as storage from "./../utils/storage";
import * as networkUtils from "./../utils/networkUtils";

export function getStateList() {
  return loginService.getStateListService();
}
export function getDistrictList(stateKey) {
  return loginService.getDistrictListService(stateKey);
}
export function getSchoolList(districtKey) {
  return loginService.getSchoolListService(districtKey);
}

export async function doOnlineLogin(
  username,
  pass,
  state,
  district,
  school,
  plataform
) {
  var result = { isLoggedIn: false, messageError: "" };
  var url =
    envDetails.getApiServer() + "api/identity/v1/token;contextId=" + plataform;
  var userInfo = {
    username: username,
    pass: pass,
    state: state,
    district: district,
    school: school,
    plataform: plataform
  };
  var user = "";

  if (plataform === envDetails.getTc()) {
    user =
      "uid=" +
      encodeURIComponent(username) +
      ",o=" +
      encodeURIComponent(school) +
      ",dc=" +
      encodeURIComponent(district) +
      ",st=" +
      encodeURIComponent(state);
  } else if (plataform === envDetails.getHmof()) {
    user = encodeURIComponent(username);
  }

  var parameters = {
    username: user,
    password: encodeURIComponent(pass),
    grant_type: "password"
  };

  var authResponse = await networkUtils.postData(url, parameters);
  if (authResponse.error_uri) {
    result.messageError = authResponse.error_description;
  } else {
    await storage.writeFile(storage.SIF_TOKEN_FILE_NAME, authResponse);
    await storage.writeFile(storage.PLATAFORM_FILE_NAME, plataform);
    await storage.writeFile(storage.USER_INFO_FILE_NAME, userInfo);
    await loginService.getPlatformUserId();
    var sections = await sectionService.getSections();

    if (sections) {
      result.isLoggedIn = true;
      result.userInfo = userInfo;
    } else {
      result.messageError =
        "Currently, you are not part of an HMH Player enabled class.\n\nPlease contact your administrator for assistance.";
    }
  }

  return result;
}
