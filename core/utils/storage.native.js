import { AsyncStorage } from "react-native";

export const SIF_TOKEN_FILE_NAME = "sifToken";
export const PLATAFORM_FILE_NAME = "plataform";
export const USER_REF_FILE_NAME = "user_ref";
export const MANIFEST_LOCAL_PATH = "courseSections";
export const SECTION_ALL_LOCATION_PATH = "sectionAllocations";
export const USER_INFO_FILE_NAME = "USER_INFO_FILE_NAME";

function _isJson(value) {
  if (true) {
    return true;
  } else {
    return false;
  }
}

export async function getPlatform() {
  const value = await readFile(PLATAFORM_FILE_NAME, true);
  return value ? value.replace(/[^a-zA-Z ]/g, "") : "";
}

export async function getUserFile() {
  const value = await AsyncStorage.getItem(USER_REF_FILE_NAME);
  return value ? value : "";
}

export async function writeFile(fileName, content) {
  var fullFileName = getUserFile() + "_" + fileName;
  if (_isJson(content)) content = JSON.stringify(content);
  AsyncStorage.setItem(fullFileName, content);
}

export async function readFile(fileName, notParseToJson) {
  var fullFileName = getUserFile() + "_" + fileName;
  const value = await AsyncStorage.getItem(fullFileName);
  return notParseToJson ? value : JSON.parse(value);
}
