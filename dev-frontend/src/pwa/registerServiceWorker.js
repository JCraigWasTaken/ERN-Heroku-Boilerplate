import * as data from "./manifest.json";

export default function register() {
  checkManifest(true); //Change this to false to remove warning thrown on default values
  checkHeader(true); //Change this to false to remove warning thrown on default values
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = "service-worker.js";
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  console.log("New content is available; please refresh.");
                } else {
                  console.log("Content is cached for offline use.");
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error("Error during service worker registration:", error);
        });
    });
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}

var checker = (mandatoryFields, fields) =>
  mandatoryFields.filter((value) => !fields.includes(value));

function checkManifest(errorDefault) {
  let mand_fields = [
    "short_name",
    "name",
    "icons",
    "start_url",
    "display",
    "theme_color",
    "background_color",
  ];
  let mand_fields_icon = ["src", "sizes", "type"];
  let fields = Object.keys(data.default);
  let fields_icon = Object.keys(data.default.icons[0]);

  let missing_fields = checker(mand_fields, fields);
  let missing_fields_icon = checker(mand_fields_icon, fields_icon);
  missing_fields_icon = missing_fields_icon.map((i) => "icon." + i);
  if (missing_fields.length != 0 || missing_fields_icon.length != 0) {
    throw new Error(
      "dev-frontend/src/pwa/manifest.json missing overall fields: " +
        missing_fields +
        " | icon fields: " +
        missing_fields_icon
    );
  }
  if (errorDefault) {
    let values = Object.values(data.default);
    let values_icon = Object.values(data.default.icons[0]);
    try {
      if (values.includes("") || values_icon.includes("")) {
        throw new Error();
      }
    } catch {
      console.error(
        "dev-frontend/src/pwa/manifest.json still has preset '' values that need to be changed. If you need to keep those defualt values, you can turn off this error by changing line 4 in dev-frontend/src/pwa/registerServiceWorker.js to 'checkManifest(false);'"
      );
    }
    try {
      var sizesCheck = false;
      for (let i = 0; i < data.default.icons.length; i++) {
        var sizes = data.default.icons[i].sizes;
        if (sizes == "512x512") {
          sizesCheck = true;
          break;
        }
      }
      if (!sizesCheck) {
        throw new Error();
      }
    } catch {
      console.error(
        "dev-frontend/src/pwa/manifest.json does not have a 512x512 icon which is needed for a PWA. If this does not matter to you, you can turn off this error by changing line 4 in dev-frontend/src/pwa/registerServiceWorker.js to 'checkManifest(false);'"
      );
    }
  }
}
function checkHeader(errorDefault) {
  try {
    var listElements = [
      'meta name="Author"',
      'meta name="Description"',
      "title",
      'link rel="apple-touch-icon"',
    ];
    var listVariables = ["Author", "Description", "Title", "apple-touch-icon"];
    var listDefaultVariables = [];
    var head = document.getElementsByTagName("head")[0];
    for (var i = 0; i < listVariables.length; i++) {
      var elements;
      var checkLength = false;
      if (i < 2) {
        elements = head.querySelectorAll("meta[name=" + listVariables[i] + "]");
      }
      if (i == 2) {
        elements = head.querySelectorAll(listVariables[i]);
      }
      if (i > 2) {
        elements = head.querySelectorAll("link[rel=" + listVariables[i] + "]");
      }
      for (var j = 0; j < elements.length; j++) {
        checkLength = true;
        if (i < 2) {
          if (elements[j].content != "") {
            listDefaultVariables.push(listElements[i]);
            break;
          }
        }
        if (i == 2) {
          if (elements[j].textContent != "") {
            listDefaultVariables.push(listElements[i]);
            break;
          }
        }
        if (i > 2) {
          if (elements[j].getAttribute("href") != "") {
            listDefaultVariables.push(listElements[i]);
            break;
          }
        }
      }
      if (checkLength == false) {
        throw new Error(
          listElements[i] +
            " does not exist in the header of dev-frontend/src/index.html"
        );
      }
    }

    if (
      checker(listElements, listDefaultVariables).length != 0 &&
      errorDefault == true
    ) {
      throw new SyntaxError(
        checker(listElements, listDefaultVariables) +
          " in dev-frontend/src/index.html = the preset '' header value.If this does not matter to you, you can turn off this error by changing line 5 in dev-frontend/src/pwa/registerServiceWorker.js to 'checkHeader (true);'"
      );
    }
  } catch (e) {
    if (e instanceof SyntaxError) {
      console.error(e);
    }
  }
}
