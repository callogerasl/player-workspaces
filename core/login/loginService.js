import { stateList, platformList } from "./lists.js";
import * as envDetails from "./../utils/envDetails";
import * as storage from "./../utils/storage";
import * as networkUtils from "./../utils/networkUtils";
import * as utils from "./../utils/utils";

export function getPlatformForKey(key) {
  var result = "Select platform";
  platformList.forEach(item => {
    if (item.key === key) result = item.label;
  });
  return result;
}

export function getStateListService() {
  return stateList;
}

export async function getOrganizationXML(query) {
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

export async function getDistrictListService(stateKey) {
  var query =
    "?method=retrieveDistricts&elementId=district&requestId=" + stateKey;

  return getOrganizationXML(query);
}

export async function getSchoolListService(districtKey) {
  var query =
    "?method=retrieveSchools&elementId=school&organizationType=public&requestId=" +
    districtKey;

  return getOrganizationXML(query);
}

export async function getPlatformUserId() {
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
