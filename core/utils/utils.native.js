const parseString = require("react-native-xml2js").parseString;

export function parseStringToJson(text) {
  return parseString(text, function(err, result) {
    return result;
  });
}
