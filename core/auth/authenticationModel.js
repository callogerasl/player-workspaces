import * as envDetails from "./../utils/envDetails";
import * as storage from "./../utils/storage";

export async function isTeacher() {
  var authObj = await storage.readFile(storage.SIF_TOKEN_FILE_NAME);
  var roles = (authObj.roles || "").toLowerCase();
  return roles.indexOf("instructor") > -1;
}

export async function isEd() {
  var plataform = await storage.readFile(storage.plataform);
  return plataform === envDetails.getEd();
}

export async function userType() {
  var teacher = await isTeacher();
  var ed = await isEd();

  if (teacher && ed) {
    return "edTeacher";
  } else if (!teacher && ed) {
    return "edStudent";
  } else if (!teacher && !ed) {
    return "student";
  } else {
    return "teacher";
  }
}
