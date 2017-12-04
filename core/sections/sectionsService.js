import * as envDetails from "./../utils/envDetails";
import * as storage from "./../utils/storage";
import * as networkUtils from "./../utils/networkUtils";
import * as auth from "./../auth/authenticationModel";

var _ = require("lodash");
var cacheFirst = false;

export async function getSections() {
  var result;
  var sectionList = [];
  var userType = await auth.userType();
  var isEd = await auth.isEd();
  var url;

  switch (userType) {
    case "edTeacher":
      url = "/api/identity/v4/teachers/${ref_id}/sections";
      break;
    case "edStudent":
      url = "/api/identity/v4/students/${ref_id}/sections";
      break;
    case "teacher":
      url =
        "/api/identity/v1/staffPersons/staffPerson/${ref_id}/section;contextId=${platform}";
      break;
    case "student":
      url =
        "/api/identity/v1/students/student/${ref_id}/section;contextId=${platform}";
      break;
    default:
      console.log("Unrecognized userType: " + userType);
  }

  if (isEd) {
    console.log("loading Ed sections");
  } else {
    console.log("loading Basal sections");
    sectionList = await loadBasalSections(url);
  }

  result = {
    sectionList: sectionList
  };
  return result;
}

async function loadBasalSections(url) {
  var data = await networkUtils.sync(
    url,
    null,
    storage.MANIFEST_LOCAL_PATH,
    cacheFirst,
    null,
    null
  );

  var result = null;
  if (data.sections) {
    result = data.sections.map(rawSection => {
      var name = rawSection.name || "";
      var period = (/(?:\^)([0-9]+)$/.exec(name) || [])[1] || "";
      name = name.replace(/\^[0-9]+$/, "");
      if (period) {
        name += " - Period " + period;
      }
      if (!rawSection.refId) {
        rawSection.refId = rawSection.sectionRefId;
      }
      return {
        period: period,
        name: name,
        refId: rawSection.refId
      };
    });

    var refIdQuery = "";
    result.forEach(item => {
      refIdQuery = refIdQuery + "," + item.refId;
    });

    refIdQuery = refIdQuery ? refIdQuery.substring(1) : "";
    var query = {
      sectionRefIds: encodeURIComponent(refIdQuery)
    };

    var programList = await networkUtils.sync(
      "/api/caes/v1/resourceAssociation;contextId=${platform}",
      query,
      storage.SECTION_ALL_LOCATION_PATH,
      cacheFirst
    );

    var imageServer = await envDetails.getContentServer();

    if (programList) {
      programList = _.groupBy(programList, function(sa) {
        return sa.sectionRefId;
      });

      result = result.map(item => {
        var programListSection = programList[item.refId];
        var programListDropDown = [];

        if (programListSection) {
          programListDropDown = programListSection.map(item => {
            return {
              key: item.isbn,
              label: item.courseTitle,
              itemData: item,
              imageUrl: item.imageUrl ? imageServer + item.imageUrl : ""
            };
          });
        }

        return {
          period: item.period,
          name: item.name,
          refId: item.refId,
          programList: programListSection,
          programListDropDown: programListDropDown
        };
      });
    }
  }
  return result;
}
