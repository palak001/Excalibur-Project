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

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nvar clearances = {\n    type: \"FeatureCollection\",\n    features: [\n        {\n            type: \"Feature\",\n            geometry: {\n                type: \"Point\",\n                coordinates: [77.13909, 28.61142],\n            },\n            properties: {\n                clearance: \"13' 2\",\n            },\n        },\n        {\n            type: \"Feature\",\n            geometry: {\n                type: \"Point\",\n                coordinates: [77.15391, 28.65456],\n            },\n            properties: {\n                clearance: \"13' 7\",\n            },\n        },\n        {\n            type: \"Feature\",\n            geometry: {\n                type: \"Point\",\n                coordinates: [-84.60485, 38.12184],\n            },\n            properties: {\n                clearance: \"13' 7\",\n            },\n        },\n        {\n            type: \"Feature\",\n            geometry: {\n                type: \"Point\",\n                coordinates: [-84.61905, 37.87504],\n            },\n            properties: {\n                clearance: \"12' 0\",\n            },\n        },\n        {\n            type: \"Feature\",\n            geometry: {\n                type: \"Point\",\n                coordinates: [-84.55946, 38.30213],\n            },\n            properties: {\n                clearance: \"13' 6\",\n            },\n        },\n        {\n            type: \"Feature\",\n            geometry: {\n                type: \"Point\",\n                coordinates: [-84.27235, 38.04954],\n            },\n            properties: {\n                clearance: \"13' 6\",\n            },\n        },\n        {\n            type: \"Feature\",\n            geometry: {\n                type: \"Point\",\n                coordinates: [-84.27264, 37.82917],\n            },\n            properties: {\n                clearance: \"11' 6\",\n            },\n        }\n    ],\n};\n\nvar obstacle = turf.buffer(clearances, 0.25, { units: \"kilometers\" });  //2nd parameter is the radius of the circle\n\nmap.on(\"load\", function (e) {\n\n    map.addLayer({\n        id: \"clearances\",\n        type: \"fill\",\n        source: {\n            type: \"geojson\",\n            data: obstacle,\n        },\n        layout: {},\n        paint: {\n            \"fill-color\": \"#f03b20\",\n            \"fill-opacity\": 0.5,\n            \"fill-outline-color\": \"#f03b20\",\n        },\n    });\n\n\n    for (let i = 0; i <= 2; i++) {\n        map.addSource(\"route\" + i, {\n            type: \"geojson\",\n            data: {\n                type: \"Feature\",\n            },\n        });\n\n        map.addLayer({\n            id: \"route\" + i,\n            type: \"line\",\n            source: \"route\" + i,\n            layout: {\n                \"line-join\": \"round\",\n                \"line-cap\": \"round\",\n            },\n            paint: {\n                \"line-color\": \"#cccccc\",\n                \"line-opacity\": 0.5,\n                \"line-width\": 13,\n                \"line-blur\": 0.5,\n            },\n        });\n    }\n\n});\n\n\n//For navigation\n\nvar nav = new mapboxgl.NavigationControl();\n\nvar directions = new MapboxDirections({\n    accessToken: mapboxgl.accessToken,\n    unit: \"metric\",\n    profile: \"mapbox/driving\",\n    alternatives: \"true\",\n    geometries: \"geojson\",\n});\n\nmap.scrollZoom.enable();\nmap.addControl(directions, \"top-right\");\n\n\n\ndirections.on(\"route\", (e) => {\n    var reports = document.getElementById(\"reports\");\n    reports.innerHTML = \"\";\n    var report = reports.appendChild(document.createElement(\"div\"));\n    let routes = e.route;\n\n    //Hide all routes by setting the opacity to zero.\n    for (let i = 0; i < 3; i++) {\n        map.setLayoutProperty(\"route\" + i, \"visibility\", \"none\");\n    }\n\n    routes.forEach(function (route, i) {\n        route.id = i;\n    });\n\n    routes.forEach((e) => {\n        //Make each route visible, by setting the opacity to 50%.\n        map.setLayoutProperty(\"route\" + e.id, \"visibility\", \"visible\");\n\n        //Get GeoJson LineString feature of route\n        var routeLine = polyline.toGeoJSON(e.geometry);\n\n        //Update the data for the route, updating the visual.\n        map.getSource(\"route\" + e.id).setData(routeLine);\n\n        var collision = \"\";\n        var emoji = \"\";\n        var clear = turf.booleanDisjoint(obstacle, routeLine);\n        let detail;\n        if (clear == true) {\n            collision = \"is good!\";\n            detail = \"does not go\";\n            emoji = \"✔️\";\n            report.className = \"item\";\n            map.setPaintProperty(\"route\" + e.id, \"line-color\", \"#74c476\");\n        } else {\n            collision = \"is bad.\";\n            detail = \"goes\";\n            emoji = \"⚠️\";\n            report.className = \"item warning\";\n            map.setPaintProperty(\"route\" + e.id, \"line-color\", \"#de2d26\");\n        }\n\n        //Add a new report section to the sidebar.\n        // Assign a unique `id` to the report.\n        report.id = \"report-\" + e.id;\n\n        // Add the response to the individual report created above.\n        var heading = report.appendChild(document.createElement(\"h3\"));\n\n        // Set the class type based on clear value.\n        if (clear == true) {\n            heading.className = \"title\";\n        } else {\n            heading.className = \"warning\";\n        }\n\n        heading.innerHTML = emoji + \" Route \" + (e.id + 1) + \" \" + collision;\n\n        // Add details to the individual report.\n        var details = report.appendChild(document.createElement(\"div\"));\n        details.innerHTML = \"This route \" + detail + \" through an avoidance area.\";\n        report.appendChild(document.createElement(\"hr\"));\n    });\n\n\n    // Get the name of cities to show daily cases\n    let activeCases = async () => {\n        const el = document.getElementsByClassName('mapboxgl-ctrl-geocoder');\n        const src = el[0].childNodes[1].value;\n        const dest = el[1].childNodes[1].value;\n\n        let srcTokens = src.split(',');\n        for (let i = 0; i < srcTokens.length; i++) {\n            srcTokens[i] = srcTokens[i].trim();\n        }\n\n        let srcState = srcTokens[srcTokens.length - 2];\n        console.log(srcTokens);\n\n        let destTokens = dest.split(',');\n        for (let i = 0; i < destTokens.length; i++) {\n            destTokens[i] = destTokens[i].trim();\n        }\n\n        let destState = destTokens[destTokens.length - 2];\n        console.log(destTokens);\n\n\n        let casesData = await fetch('https://api.covid19india.org/data.json');\n\n        casesData = await casesData.json();\n\n\n        //if src and dest are Chandigarh Capital, Dadra and Nagar Haveli and Daman and Diu\n        if (srcState === \"Chandigarh capital\") {\n            srcState = \"Chandigarh\";\n        }\n        if (srcState === \"Daman and Diu\" || srcState === \"Dadra and Nagar Haveli\") {\n            srcState = \"Dadra and Nagar Haveli and Daman and Diu\";\n        }\n\n        if (destState === \"Chandigarh capital\") {\n            destState = \"Chandigarh\";\n        }\n        if (destState === \"Daman and Diu\" || destState === \"Dadra and Nagar Haveli\") {\n            destState = \"Dadra and Nagar Haveli and Daman and Diu\";\n        }\n\n\n        let srcActiveCases = 0, destActiveCases = 0;\n\n        for (let i = 1; i < 38; i++) {\n            const obj = casesData.statewise[i];\n            if (obj.state.toLowerCase() === srcState.toLowerCase()) {\n                srcActiveCases = obj.active;\n            }\n\n            if (obj.state.toLowerCase() === destState.toLowerCase()) {\n                destActiveCases = obj.active;\n            }\n\n        }\n\n\n        //Showing active cases for the states\n        let report = reports.appendChild(document.createElement(\"div\"));\n        report.className = \"item\";\n        report.id = \"navMap-report\";\n        let heading = report.appendChild(document.createElement(\"h3\"));\n\n        heading.innerHTML = \"Active Cases: \";\n        heading.className = \"navMap-casesHead\";\n\n        let details = report.appendChild(document.createElement(\"div\"));\n        details.innerHTML = srcState + \" : \" + srcActiveCases;\n        details = report.appendChild(document.createElement(\"div\"));\n        details.innerHTML = destState + \" : \" + destActiveCases;\n        report.appendChild(document.createElement(\"hr\"));\n        \n\n    }\n\n    activeCases();\n\n}); \n\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });