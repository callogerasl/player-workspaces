import * as envDetails from "./../utils/envDetails";
import * as storage from "./../utils/storage";
import * as networkUtils from "./../utils/networkUtils";
import * as utils from "./../utils/utils";
import { STUDENT, TEACHER, ED, TC, HMOF } from "../utils/envDetails";

async function getOrganizationXML(query) {
  var list = [];
  var url =
    envDetails.getApiServer() + "ePC/xml/retrieveOrganizationXML" + query;
  return fetch(url)
    .then(response => response.text())
    .then(response => {
      utils.parseStringToJson(response, function(result) {
        if (result) {
          result.optionRoot.option.forEach(item => {
            if (item.value) {
              list.push({
                key: item.id[0],
                label: item.value[0]
              });
            }
          });
        }
      });
      return list;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getDistricts(stateKey) {
  var query =
    "?method=retrieveDistricts&elementId=district&requestId=" + stateKey;

  return getOrganizationXML(query);
}

export async function getSchools(districtKey) {
  var query =
    "?method=retrieveSchools&elementId=school&organizationType=public&requestId=" +
    districtKey;

  return getOrganizationXML(query);
}

async function getPlatformUserId() {
  var authObj = await storage.readFile(storage.SIF_TOKEN_FILE_NAME);
  var contextId = await storage.getPlatform();

  var url =
    "/api/identity/v1/students/" +
    authObj.ref_id +
    "/localId;contextId=" +
    contextId;

  var platformUser = await networkUtils.getText(url);

  if (platformUser) {
    platformUser = platformUser.replace(/"/g, "");
    await storage.writeFile(storage.USER_REF_FILE_NAME, platformUser);
  }
  return platformUser;
}

function isTeacher(authObj) {
  var roles = (authObj.roles || "").toLowerCase();
  return roles.indexOf("instructor") > -1;
}

export async function authenticate(
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
    plataform: plataform,
    role: ""
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
    userInfo.role = isTeacher(authResponse) ? TEACHER : STUDENT;

    await storage.writeFile(storage.SIF_TOKEN_FILE_NAME, authResponse);
    await storage.writeFile(storage.PLATAFORM_FILE_NAME, plataform);
    await storage.writeFile(storage.USER_INFO_FILE_NAME, userInfo);
    await getPlatformUserId();
    result.isLoggedIn = true;
    result.userInfo = userInfo;
  }

  return result;
}
