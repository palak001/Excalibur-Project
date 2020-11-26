
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/activeCases.js":
/*!*******************************!*\
  !*** ./src/js/activeCases.js ***!
  \*******************************/
/*! exports provided: getActiveCases */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getActiveCases\", function() { return getActiveCases; });\n\nlet getActiveCases = async () => {\n    const el = document.getElementsByClassName('mapboxgl-ctrl-geocoder');\n    const src = el[0].childNodes[1].value;\n    const dest = el[1].childNodes[1].value;\n\n    let srcTokens = src.split(',');\n    for (let i = 0; i < srcTokens.length; i++) {\n        srcTokens[i] = srcTokens[i].trim();\n    }\n\n    let srcState = srcTokens[srcTokens.length - 2];\n    // console.log(srcTokens);\n\n    let destTokens = dest.split(',');\n    for (let i = 0; i < destTokens.length; i++) {\n        destTokens[i] = destTokens[i].trim();\n    }\n\n    let destState = destTokens[destTokens.length - 2];\n    // console.log(destTokens);\n\n\n    let casesData = await fetch('https://api.covid19india.org/data.json');\n\n    casesData = await casesData.json();\n\n\n    //if src and dest are Chandigarh Capital, Dadra and Nagar Haveli and Daman and Diu\n    if (srcState === \"Chandigarh capital\") {\n        srcState = \"Chandigarh\";\n    }\n    if (srcState === \"Daman and Diu\" || srcState === \"Dadra and Nagar Haveli\") {\n        srcState = \"Dadra and Nagar Haveli and Daman and Diu\";\n    }\n\n    if (destState === \"Chandigarh capital\") {\n        destState = \"Chandigarh\";\n    }\n    if (destState === \"Daman and Diu\" || destState === \"Dadra and Nagar Haveli\") {\n        destState = \"Dadra and Nagar Haveli and Daman and Diu\";\n    }\n\n\n    let srcActiveCases = 0, destActiveCases = 0;\n\n    for (let i = 1; i < 38; i++) {\n        const obj = casesData.statewise[i];\n        if (obj.state.toLowerCase() === srcState.toLowerCase()) {\n            srcActiveCases = obj.active;\n        }\n\n        if (obj.state.toLowerCase() === destState.toLowerCase()) {\n            destActiveCases = obj.active;\n        }\n\n    }\n\n    let cases = [srcState, srcActiveCases, destState, destActiveCases];\n    return cases;\n}\n\n\n\n//# sourceURL=webpack:///./src/js/activeCases.js?");

/***/ }),


/***/ "./src/js/authentication.js":
/*!**********************************!*\
  !*** ./src/js/authentication.js ***!
  \**********************************/
/*! exports provided: initApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initApp\", function() { return initApp; });\nvar firebaseConfig = {\r\n            apiKey: \"AIzaSyA33Udlq8psM8SiNN9zB9AtVg8eHAtuFiE\",\r\n            authDomain: \"excaliber-87adf.firebaseapp.com\",\r\n            databaseURL: \"https://excaliber-87adf.firebaseio.com\",\r\n            projectId: \"excaliber-87adf\",\r\n            storageBucket: \"excaliber-87adf.appspot.com\",\r\n            messagingSenderId: \"143499356337\",\r\n            appId: \"1:143499356337:web:5426b346158cda00b3da90\",\r\n            measurementId: \"G-7VT848HZDE\"\r\n          };\r\n          // Initialize Firebase\r\n          firebase.initializeApp(firebaseConfig);\r\n          firebase.analytics();\r\n            \r\n          \r\n            \r\n         function toggleSignIn() {\r\n          if (firebase.auth().currentUser) {\r\n            firebase.auth().signOut();\r\n          } else {\r\n            var email = document.getElementById('email').value;\r\n            var password = document.getElementById('password').value;\r\n            if (email.length < 4) {\r\n              alert('Please enter an email address.');\r\n              return;\r\n            }\r\n            if (password.length < 4) {\r\n              alert('Please enter a password.');\r\n              return;\r\n            }\r\n            // Sign in with email and pass.\r\n            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {\r\n              // Handle Errors here.\r\n              var errorCode = error.code;\r\n              var errorMessage = error.message;\r\n              if (errorCode === 'auth/wrong-password') {\r\n                alert('Wrong password.');\r\n              } else {\r\n                alert(errorMessage);\r\n              }\r\n              console.log(error);\r\n              document.getElementById('quickstart-sign-in').disabled = false;\r\n            });\r\n          }\r\n          document.getElementById('quickstart-sign-in').disabled = true;\r\n        }\r\n            \r\n            \r\n        function handleSignUp() {\r\n          var email = document.getElementById('email').value;\r\n          var password = document.getElementById('password').value;\r\n          if (email.length < 4) {\r\n            alert('Please enter an email address.');\r\n            return;\r\n          }\r\n          if (password.length < 4) {\r\n            alert('Please enter a password.');\r\n            return;\r\n          }\r\n          // Create user with email and pass.\r\n          firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {\r\n            // Handle Errors here.\r\n            var errorCode = error.code;\r\n            var errorMessage = error.message;\r\n            if (errorCode == 'auth/weak-password') {\r\n              alert('The password is too weak.');\r\n            } else {\r\n              alert(errorMessage);\r\n            }\r\n            console.log(error);\r\n          });\r\n        }\r\n\r\n        \r\n        function sendEmailVerification() {\r\n          firebase.auth().currentUser.sendEmailVerification().then(function() {\r\n            // Email Verification sent!\r\n            alert('Email Verification Sent!');\r\n          });\r\n        }\r\n         \r\n        \r\n        \r\n        function sendPasswordReset() {\r\n          var email = document.getElementById('email').value;\r\n          firebase.auth().sendPasswordResetEmail(email).then(function() {\r\n            // Password Reset Email Sent!\r\n            alert('Password Reset Email Sent!');\r\n          }).catch(function(error) {\r\n            // Handle Errors here.\r\n            var errorCode = error.code;\r\n            var errorMessage = error.message;\r\n            if (errorCode == 'auth/invalid-email') {\r\n              alert(errorMessage);\r\n            } else if (errorCode == 'auth/user-not-found') {\r\n              alert(errorMessage);\r\n            }\r\n            console.log(error);\r\n          });\r\n        }\r\n            \r\n        \r\n      function initApp() {\r\n          console.log(\"init app function called\");\r\n          // Listening for auth state changes.\r\n          firebase.auth().onAuthStateChanged(function(user) {\r\n            document.getElementById('quickstart-verify-email').disabled = true;\r\n            if (user) {\r\n              // User is signed in.\r\n              var displayName = user.displayName;\r\n              var email = user.email;\r\n              var emailVerified = user.emailVerified;\r\n              var photoURL = user.photoURL;\r\n              var isAnonymous = user.isAnonymous;\r\n              var uid = user.uid;\r\n              var providerData = user.providerData;\r\n              //document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';\r\n              document.getElementById('quickstart-sign-in').textContent = 'Sign out';\r\n          //   document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');\r\n              if (!emailVerified) {\r\n                document.getElementById('quickstart-verify-email').disabled = false;\r\n              }\r\n            } else {\r\n              // User is signed out.\r\n             // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';\r\n              document.getElementById('quickstart-sign-in').textContent = 'Sign in';\r\n              //document.getElementById('quickstart-account-details').textContent = 'null';\r\n            }\r\n            document.getElementById('quickstart-sign-in').disabled = false;\r\n          });\r\n          // [END authstatelistener]\r\n\r\n          document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);\r\n          document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);\r\n          document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);\r\n          document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);\r\n        }\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/authentication.js?");

/***/ }),


/***/ "./src/js/contZones.js":
/*!*****************************!*\
  !*** ./src/js/contZones.js ***!
  \*****************************/
/*! exports provided: red_zone, orange_zone, green_zone, red_clearances, orange_clearances, green_clearances, getContaimentZones, getGeocodedDistrict, toggleRedZones, toggleOrangeZones, toggleGreenZones */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"red_zone\", function() { return red_zone; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"orange_zone\", function() { return orange_zone; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"green_zone\", function() { return green_zone; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"red_clearances\", function() { return red_clearances; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"orange_clearances\", function() { return orange_clearances; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"green_clearances\", function() { return green_clearances; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getContaimentZones\", function() { return getContaimentZones; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getGeocodedDistrict\", function() { return getGeocodedDistrict; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggleRedZones\", function() { return toggleRedZones; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggleOrangeZones\", function() { return toggleOrangeZones; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggleGreenZones\", function() { return toggleGreenZones; });\nlet red_zone = {\n    type: \"FeatureCollection\",\n    features: []\n};\n\nlet orange_zone = {\n    type: \"FeatureCollection\",\n    features: []\n};\n\nlet green_zone = {\n    type: \"FeatureCollection\",\n    features: []\n};\n\n\n\n\nlet red_clearances = \"red_clearances\";\nlet orange_clearances = \"orange_clearances\";\nlet green_clearances = \"green_clearances\";\n\n\n/* Fetch Containment Zones */\nconst getContaimentZones = async () => {\n    const containmentZones = await fetch(`https://api.covid19india.org/zones.json`);\n    const containment_zones = await containmentZones.json();\n    await getGeocodedDistrict(containment_zones);\n}\n\n\nconst getGeocodedDistrict = async (containment_zones) => {\n    let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });\n    \n    for (let i = 1; i < containment_zones.zones.length; i++) {\n        const district = JSON.stringify(containment_zones.zones[i].district);\n        await mapboxClient.geocoding.forwardGeocode({\n            query: district,\n            autocomplete: false,\n            limit: 1\n        })\n            .send()\n            .then(function (response) {\n                if (response.body.features[0] != undefined) {\n\n                    const zone_color = (containment_zones.zones[i].zone);\n                    if (zone_color === \"Red\") {\n\n\n                        red_zone.features.push({\n                            type: \"Feature\",\n                            geometry: {\n                                type: \"Point\",\n                                coordinates: response.body.features[0].center,\n                            },\n                            properties: {\n                                clearance: \"13' 2\",\n                            },\n                        });\n\n\n                    }\n\n                    else if (zone_color === \"Orange\") {\n\n                        orange_zone.features.push({\n                            type: \"Feature\",\n                            geometry: {\n                                type: \"Point\",\n                                coordinates: response.body.features[0].center,\n                            },\n                            properties: {\n                                clearance: \"13' 2\",\n                            },\n                        });\n\n                    }\n                    else if (zone_color === \"Green\") {\n\n                        green_zone.features.push({\n                            type: \"Feature\",\n                            geometry: {\n                                type: \"Point\",\n                                coordinates: response.body.features[0].center,\n                            },\n                            properties: {\n                                clearance: \"13' 2\",\n                            },\n                        });\n\n                    }\n                }\n            });\n    }\n}\n\n\nconst toggleRedZones = () => {\n    if (map.getLayoutProperty(red_clearances, 'visibility') == 'none') {\n        map.setLayoutProperty(red_clearances, 'visibility', 'visible');\n    }\n    else {\n        map.setLayoutProperty(red_clearances, 'visibility', 'none');\n    }\n}\n\nconst toggleOrangeZones = () => {\n    if (map.getLayoutProperty(orange_clearances, 'visibility') == 'none') {\n        map.setLayoutProperty(orange_clearances, 'visibility', 'visible');\n    }\n    else {\n        map.setLayoutProperty(orange_clearances, 'visibility', 'none');\n    }\n}\n\nconst toggleGreenZones = () => {\n    if (map.getLayoutProperty(green_clearances, 'visibility') == 'none') {\n        map.setLayoutProperty(green_clearances, 'visibility', 'visible');\n    }\n    else {\n        map.setLayoutProperty(green_clearances, 'visibility', 'none');\n    }\n}\n\n\n//# sourceURL=webpack:///./src/js/contZones.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _activeCases__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./activeCases */ \"./src/js/activeCases.js\");\n/* harmony import */ var _contZones__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contZones */ \"./src/js/contZones.js\");\n/* harmony import */ var _authentication__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./authentication */ \"./src/js/authentication.js\");\n\n\n\n\nlet red_obstacle = {};\nlet orange_obstacle = {};\nlet green_obstacle = {};\n\ndocument.querySelector('#navmap-btn-red').addEventListener('click', () => {  \n    _contZones__WEBPACK_IMPORTED_MODULE_1__[\"toggleRedZones\"]();    \n});\n\ndocument.querySelector('#navmap-btn-orange').addEventListener('click', () => {  \n    _contZones__WEBPACK_IMPORTED_MODULE_1__[\"toggleOrangeZones\"]();    \n});\n\ndocument.querySelector('#navmap-btn-green').addEventListener('click', () => {  \n    _contZones__WEBPACK_IMPORTED_MODULE_1__[\"toggleGreenZones\"]();    \n});\n\n\n/*To get containment zones */\nmap.on(\"load\", function (e) {\n\n    _contZones__WEBPACK_IMPORTED_MODULE_1__[\"getContaimentZones\"]().then(() => {\n\n        red_obstacle = turf.buffer(_contZones__WEBPACK_IMPORTED_MODULE_1__[\"red_zone\"], 10, { units: \"kilometers\" });\n        orange_obstacle = turf.buffer(_contZones__WEBPACK_IMPORTED_MODULE_1__[\"orange_zone\"], 10, { units: \"kilometers\" });\n        green_obstacle = turf.buffer(_contZones__WEBPACK_IMPORTED_MODULE_1__[\"green_zone\"], 10, { units: \"kilometers\" });\n\n\n        console.log('layer added');\n        map.addLayer({\n            id: _contZones__WEBPACK_IMPORTED_MODULE_1__[\"red_clearances\"],\n            type: \"fill\",\n            source: {\n                type: \"geojson\",\n                data: red_obstacle,\n            },\n            layout: {},\n            paint: {\n                \"fill-color\": \"#FF0000\",\n                \"fill-opacity\": 0.8,\n                \"fill-outline-color\": \"#FF0000\",\n            },\n        });\n\n\n        map.addLayer({\n            id: _contZones__WEBPACK_IMPORTED_MODULE_1__[\"orange_clearances\"],\n            type: \"fill\",\n            source: {\n                type: \"geojson\",\n                data: orange_obstacle,\n            },\n            layout: {},\n            paint: {\n                \"fill-color\": \"#ff4500\",\n                \"fill-opacity\": 0.8,\n                \"fill-outline-color\": \"#ff4500\",\n            },\n        });\n\n        map.addLayer({\n            id: _contZones__WEBPACK_IMPORTED_MODULE_1__[\"green_clearances\"],\n            type: \"fill\",\n            source: {\n                type: \"geojson\",\n                data: green_obstacle,\n            },\n            layout: {},\n            paint: {\n                \"fill-color\": \"#74c476\",\n                \"fill-opacity\": 0.8,\n                \"fill-outline-color\": \"#74c476\",\n            },\n        });\n\n\n        _contZones__WEBPACK_IMPORTED_MODULE_1__[\"toggleRedZones\"]();\n        _contZones__WEBPACK_IMPORTED_MODULE_1__[\"toggleOrangeZones\"]();\n        _contZones__WEBPACK_IMPORTED_MODULE_1__[\"toggleGreenZones\"]();\n\n    });\n\n\n    /*For displaying routes */\n    for (let i = 0; i <= 2; i++) {\n        map.addSource(\"route\" + i, {\n            type: \"geojson\",\n            data: {\n                type: \"Feature\",\n            },\n        });\n\n        map.addLayer({\n            id: \"route\" + i,\n            type: \"line\",\n            source: \"route\" + i,\n            layout: {\n                \"line-join\": \"round\",\n                \"line-cap\": \"round\",\n            },\n            paint: {\n                \"line-color\": \"#cccccc\",\n                \"line-opacity\": 0.5,\n                \"line-width\": 13,\n                \"line-blur\": 0.5,\n            },\n        });\n    }\n    Object(_authentication__WEBPACK_IMPORTED_MODULE_2__[\"initApp\"])();\n});\n\n\n// For navigation\n\nvar nav = new mapboxgl.NavigationControl();\n\nvar directions = new MapboxDirections({\n    accessToken: mapboxgl.accessToken,\n    unit: \"metric\",\n    profile: \"mapbox/driving\",\n    alternatives: \"true\",\n    geometries: \"geojson\",\n});\n\nmap.scrollZoom.enable();\nmap.addControl(directions, \"top-right\");\n\n\n\ndirections.on(\"route\", (e) => {\n\n    // console.log('in direction1');\n    var reports = document.getElementById(\"reports\");\n    reports.innerHTML = \"\";\n    var report = reports.appendChild(document.createElement(\"div\"));\n    let routes = e.route;\n    report.className=\"item\";\n\n    //Hide all routes by setting the opacity to zero.\n    for (let i = 0; i < 3; i++) {\n        map.setLayoutProperty(\"route\" + i, \"visibility\", \"none\");\n    }\n\n    routes.forEach(function (route, i) {\n        route.id = i;\n    });\n\n    routes.forEach((e) => {\n        //Make each route visible, by setting the opacity to 50%.\n        map.setLayoutProperty(\"route\" + e.id, \"visibility\", \"visible\");\n\n        //Get GeoJson LineString feature of route\n        var routeLine = polyline.toGeoJSON(e.geometry);\n        // console.log(routeLine);\n        //Update the data for the route, updating the visual.\n        map.getSource(\"route\" + e.id).setData(routeLine);\n\n        var collision = \"\";\n        var emoji = \"\";\n        var red_danger = !(turf.booleanDisjoint(red_obstacle, routeLine));\n        var orange_danger = !(turf.booleanDisjoint(orange_obstacle, routeLine));\n        let detail;\n\n        // console.log('in direction2');\n\n        if (red_danger == true) {\n            collision = \"is bad.\";\n            detail = \"passes through a red zone\";\n            emoji = \":(\";\n            report.classList.add(\"warning\");\n            map.setPaintProperty(\"route\" + e.id, \"line-color\", \"#de2d26\");\n\n        }\n        else if (orange_danger == true) {\n            collision = \"is not good\";\n            detail = \"passes through an orange zone\";\n            emoji = \":(\";\n            report.classList.add(\"warning\");\n            map.setPaintProperty(\"route\" + e.id, \"line-color\", \"#ff4500\");\n        }\n        else {\n            collision = \"is good!\";\n            detail = \"does not pass through an orange or a red zone\";\n            emoji = \"✔️\";\n            map.setPaintProperty(\"route\" + e.id, \"line-color\", \"#74c476\");\n        }\n\n        //Add a new report section to the sidebar.\n        // Assign a unique `id` to the report.\n        report.id = \"report-\" + e.id;\n\n        // Add the response to the individual report created above.\n        var heading = report.appendChild(document.createElement(\"h5\"));\n\n        // Set the class type based on clear value.\n        if (red_danger == true || orange_danger == true) {\n            heading.className = \"warning\";\n        } \n        else {\n            heading.className = \"title\";\n        }\n\n        heading.innerHTML = emoji + \" Route \" + (e.id + 1) + \" \" + collision;\n\n        // console.log('in direction3');\n\n        // Add details to the individual report.\n        var details = report.appendChild(document.createElement(\"div\"));\n        details.innerHTML = \"This route \" + detail;\n        report.appendChild(document.createElement(\"p\"));\n\n    });\n\n\n    // console.log(\"reached\");\n    //To show active cases\n    let renderActiveCases = () => {\n        Object(_activeCases__WEBPACK_IMPORTED_MODULE_0__[\"getActiveCases\"])().then((cases) => {\n            let report = reports.appendChild(document.createElement(\"div\"));\n            report.className = \"item\";\n            report.id = \"navMap-report\";\n            let heading = report.appendChild(document.createElement(\"h5\"));\n\n            heading.innerHTML = \"Active Cases: \";\n            heading.className = \"navMap-casesHead\";\n\n            let details = report.appendChild(document.createElement(\"div\"));\n            details.innerHTML = cases[0] + \" : \" + cases[1];    //src\n            details = report.appendChild(document.createElement(\"div\"));\n            details.innerHTML = cases[2] + \" : \" + cases[3];    //dest\n            report.appendChild(document.createElement(\"p\"));\n        });\n    }\n\n    renderActiveCases();\n\n});\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });

