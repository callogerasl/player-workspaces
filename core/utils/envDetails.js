import * as storage from "./storage";

export const TEACHER = "TEACHER";
export const STUDENT = "STUDENT";

export const TC = "tc";
export const HMOF = "hmof";
export const ED = "ed";

const INT = "int";
const PROD = "prod";
const CERTRV = "certrv";
const DEV = "dev";
const BUILD = "build";

// appSettings.apiServer = '';
// appSettings.playerServicesApiServer = 'https://cert.collab.api.hmhco.com';
// appSettings.tcLoginServer = 'https://www-review-cert-tc1.thinkcentral.com';
// appSettings.contentServerTC = 'https://www-review-cert-tc1.thinkcentral.com';
// appSettings.contentServerHMOF = 'https://my-review-cert.hrw.com';
// appSettings.epcAdminTC = 'http://admin-review-cert.thinkcentral.com/ePCAdmin/start.do';
// appSettings.epcAdminHMOF = 'http://support-review-cert.hrw.com/login_form.jsp';
// appSettings.collabServerGlobalPrefix = '';
// appSettings.collabServeráDomain = 'cert.collab.api.hmhco.com';
// appSettings.collabServerSSL = true;
// appSettings.gaTrackingId = 'UA-87696118-1'; // Cert rv TRACKING_ID
// appSettings.gaAnalytics = true;
// appSettings.epcAdminTC = 'http://admin-review-cert.thinkcentral.com/ePCAdmin/start.do';
// appSettings.epcAdminHMOF = 'http://support-review-cert.hrw.com/login_form.jsp';
// appSettings.apiServerEd = 'https://cert.hmhco.com';
// appSettings.edLoginServer = 'https://cert.hmhco.com/arvo/login/';
// appSettings.contentServerED = 'https://cert.hmhco.com';

const urls = {
  dev: {
    hmof: "https://my-review-cert.hrw.com",
    tc: "https://www-review-cert-tc1.thinkcentral.com",
    collab: "http://local.collab.api.hmhco.com:8101",
    edLogin: "https://cert.hmhco.com/arvo/login/",
    apiServer: "https://www-review-cert-tc1.thinkcentral.com/"
  },
  build: {
    hmof: "https://my-review-cert.hrw.com",
    tc: "https://www-review-cert-tc1.thinkcentral.com",
    collab: "http://build.collab.api.hmhco.com:8101",
    edLogin: "https://cert.hmhco.com/arvo/login/",
    apiServer: "https://cert.hmhco.com/arvo/login/"
  },
  int: {
    hmof: "http://my-test.hrw.com",
    tc: "http://www-int.thinkcentral.com",
    collab: "http://int.collab.api.hmhco.com",
    edLogin: "https://cert.hmhco.com/arvo/login/",
    apiServer: "https://cert.hmhco.com/arvo/login/"
  },
  certrv: {
    hmof: "https://my-review-cert.hrw.com",
    tc: "https://www-review-cert-tc1.thinkcentral.com",
    collab: "https://cert.collab.api.hmhco.com",
    edLogin: "https://cert.hmhco.com/arvo/login/",
    apiServer: "https://cert.hmhco.com/arvo/login/"
  },
  prod: {
    hmof: "https://my.hrw.com",
    tc: "https://www-k6.thinkcentral.com",
    collab: "https://collab.api.hmhco.com",
    edLogin: "https://cert.hmhco.com/arvo/login/",
    apiServer: "https://cert.hmhco.com/arvo/login/"
  }
};

const currentPlatform = () => {
  // if (process.env.SIF_TOKEN) {
  //   const res = process.env.SIF_TOKEN;
  //   return res.platform;
  // }

  // if (window.location.host.includes("thinkcentral")) {
  //   return TC;
  // }
  return HMOF;
};

const currentEnvironment = () => {
  // const host = window.location.host;

  // if (host.includes("local.collab")) {
  //   return DEV;
  // } else if (host.includes("build.collab")) {
  //   return BUILD;
  // } else if (process.env.SIF_TOKEN) {
  //   return CERTRV;
  // } else if (host.includes("my-test") || host.includes("int.thinkcentral")) {
  //   return INT;
  // } else if (host.includes("review-cert")) {
  //   return CERTRV;
  // } else {
  //   return PROD;
  // }
  return DEV;
};

const platform = currentPlatform();
const environment = currentEnvironment();
const tempUrlsObj = urls[environment];
const platformUrl = tempUrlsObj[platform];
const collabUrl = tempUrlsObj.collab;

export async function getContentServer() {
  var plataform = await storage.getPlatform();
  if (plataform === TC) {
    return tempUrlsObj.tc;
  } else {
    return tempUrlsObj.hmof;
  }
}

export function getApiServer() {
  return tempUrlsObj.apiServer;
}

export function getEdLoginUrl() {
  return tempUrlsObj.edLogin;
}

export function getTc() {
  return TC;
}

export function getHmof() {
  return HMOF;
}

export function getEd() {
  return ED;
}

export default () => {
  return {
    platform,
    tempUrlsObj,
    platformUrl,
    collabUrl
  };
};
