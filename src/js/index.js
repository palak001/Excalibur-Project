
var clearances = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [77.13909, 28.61142],
            },
            properties: {
                clearance: "13' 2",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [77.15391, 28.65456],
            },
            properties: {
                clearance: "13' 7",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [-84.60485, 38.12184],
            },
            properties: {
                clearance: "13' 7",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [-84.61905, 37.87504],
            },
            properties: {
                clearance: "12' 0",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [-84.55946, 38.30213],
            },
            properties: {
                clearance: "13' 6",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [-84.27235, 38.04954],
            },
            properties: {
                clearance: "13' 6",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [-84.27264, 37.82917],
            },
            properties: {
                clearance: "11' 6",
            },
        }
    ],
};

var obstacle = turf.buffer(clearances, 0.25, { units: "kilometers" });  //2nd parameter is the radius of the circle

map.on("load", function (e) {

    map.addLayer({
        id: "clearances",
        type: "fill",
        source: {
            type: "geojson",
            data: obstacle,
        },
        layout: {},
        paint: {
            "fill-color": "#f03b20",
            "fill-opacity": 0.5,
            "fill-outline-color": "#f03b20",
        },
    });


    for (let i = 0; i <= 2; i++) {
        map.addSource("route" + i, {
            type: "geojson",
            data: {
                type: "Feature",
            },
        });

        map.addLayer({
            id: "route" + i,
            type: "line",
            source: "route" + i,
            layout: {
                "line-join": "round",
                "line-cap": "round",
            },
            paint: {
                "line-color": "#cccccc",
                "line-opacity": 0.5,
                "line-width": 13,
                "line-blur": 0.5,
            },
        });
    }

});


//For navigation

var nav = new mapboxgl.NavigationControl();

var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: "metric",
    profile: "mapbox/driving",
    alternatives: "true",
    geometries: "geojson",
});

map.scrollZoom.enable();
map.addControl(directions, "top-right");



directions.on("route", (e) => {
    var reports = document.getElementById("reports");
    reports.innerHTML = "";
    var report = reports.appendChild(document.createElement("div"));
    let routes = e.route;

    //Hide all routes by setting the opacity to zero.
    for (let i = 0; i < 3; i++) {
        map.setLayoutProperty("route" + i, "visibility", "none");
    }

    routes.forEach(function (route, i) {
        route.id = i;
    });

    routes.forEach((e) => {
        //Make each route visible, by setting the opacity to 50%.
        map.setLayoutProperty("route" + e.id, "visibility", "visible");

        //Get GeoJson LineString feature of route
        var routeLine = polyline.toGeoJSON(e.geometry);

        //Update the data for the route, updating the visual.
        map.getSource("route" + e.id).setData(routeLine);

        var collision = "";
        var emoji = "";
        var clear = turf.booleanDisjoint(obstacle, routeLine);
        let detail;
        if (clear == true) {
            collision = "is good!";
            detail = "does not go";
            emoji = "✔️";
            report.className = "item";
            map.setPaintProperty("route" + e.id, "line-color", "#74c476");
        } else {
            collision = "is bad.";
            detail = "goes";
            emoji = "⚠️";
            report.className = "item warning";
            map.setPaintProperty("route" + e.id, "line-color", "#de2d26");
        }

        //Add a new report section to the sidebar.
        // Assign a unique `id` to the report.
        report.id = "report-" + e.id;

        // Add the response to the individual report created above.
        var heading = report.appendChild(document.createElement("h3"));

        // Set the class type based on clear value.
        if (clear == true) {
            heading.className = "title";
        } else {
            heading.className = "warning";
        }

        heading.innerHTML = emoji + " Route " + (e.id + 1) + " " + collision;

        // Add details to the individual report.
        var details = report.appendChild(document.createElement("div"));
        details.innerHTML = "This route " + detail + " through an avoidance area.";
        report.appendChild(document.createElement("hr"));
    });


    // Get the name of cities to show daily cases
    let activeCases = async () => {
        const el = document.getElementsByClassName('mapboxgl-ctrl-geocoder');
        const src = el[0].childNodes[1].value;
        const dest = el[1].childNodes[1].value;

        let srcTokens = src.split(',');
        for (let i = 0; i < srcTokens.length; i++) {
            srcTokens[i] = srcTokens[i].trim();
        }

        let srcState = srcTokens[srcTokens.length - 2];
        console.log(srcTokens);

        let destTokens = dest.split(',');
        for (let i = 0; i < destTokens.length; i++) {
            destTokens[i] = destTokens[i].trim();
        }

        let destState = destTokens[destTokens.length - 2];
        console.log(destTokens);


        let casesData = await fetch('https://api.covid19india.org/data.json');

        casesData = await casesData.json();


        //if src and dest are Chandigarh Capital, Dadra and Nagar Haveli and Daman and Diu
        if (srcState === "Chandigarh capital") {
            srcState = "Chandigarh";
        }
        if (srcState === "Daman and Diu" || srcState === "Dadra and Nagar Haveli") {
            srcState = "Dadra and Nagar Haveli and Daman and Diu";
        }

        if (destState === "Chandigarh capital") {
            destState = "Chandigarh";
        }
        if (destState === "Daman and Diu" || destState === "Dadra and Nagar Haveli") {
            destState = "Dadra and Nagar Haveli and Daman and Diu";
        }


        let srcActiveCases = 0, destActiveCases = 0;

        for (let i = 1; i < 38; i++) {
            const obj = casesData.statewise[i];
            if (obj.state.toLowerCase() === srcState.toLowerCase()) {
                srcActiveCases = obj.active;
            }

            if (obj.state.toLowerCase() === destState.toLowerCase()) {
                destActiveCases = obj.active;
            }

        }


        //Showing active cases for the states
        let report = reports.appendChild(document.createElement("div"));
        report.className = "item";
        report.id = "navMap-report";
        let heading = report.appendChild(document.createElement("h3"));

        heading.innerHTML = "Active Cases: ";
        heading.className = "navMap-casesHead";

        let details = report.appendChild(document.createElement("div"));
        details.innerHTML = srcState + " : " + srcActiveCases;
        details = report.appendChild(document.createElement("div"));
        details.innerHTML = destState + " : " + destActiveCases;
        report.appendChild(document.createElement("hr"));
        

    }

    activeCases();

}); 

