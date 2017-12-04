import { AsyncStorage } from "react-native";

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
