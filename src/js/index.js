import { getActiveCases } from './activeCases';
import * as contZones from './contZones';
import {initApp} from './authentication';


let red_obstacle = {};
let orange_obstacle = {};
let green_obstacle = {};

document.querySelector('#navmap-btn-red').addEventListener('click', () => {  
    contZones.toggleRedZones();    
});

document.querySelector('#navmap-btn-orange').addEventListener('click', () => {  
    contZones.toggleOrangeZones();    
});

document.querySelector('#navmap-btn-green').addEventListener('click', () => {  
    contZones.toggleGreenZones();    
});


/*To get containment zones */
map.on("load", function (e) {

    contZones.getContaimentZones().then(() => {

        red_obstacle = turf.buffer(contZones.red_zone, 10, { units: "kilometers" });
        orange_obstacle = turf.buffer(contZones.orange_zone, 10, { units: "kilometers" });
        green_obstacle = turf.buffer(contZones.green_zone, 10, { units: "kilometers" });


        console.log('layer added');
        map.addLayer({
            id: contZones.red_clearances,
            type: "fill",
            source: {
                type: "geojson",
                data: red_obstacle,
            },
            layout: {},
            paint: {
                "fill-color": "#FF0000",
                "fill-opacity": 0.8,
                "fill-outline-color": "#FF0000",
            },
        });


        map.addLayer({
            id: contZones.orange_clearances,
            type: "fill",
            source: {
                type: "geojson",
                data: orange_obstacle,
            },
            layout: {},
            paint: {
                "fill-color": "#ff4500",
                "fill-opacity": 0.8,
                "fill-outline-color": "#ff4500",
            },
        });

        map.addLayer({
            id: contZones.green_clearances,
            type: "fill",
            source: {
                type: "geojson",
                data: green_obstacle,
            },
            layout: {},
            paint: {
                "fill-color": "#74c476",
                "fill-opacity": 0.8,
                "fill-outline-color": "#74c476",
            },
        });


        contZones.toggleRedZones();
        contZones.toggleOrangeZones();
        contZones.toggleGreenZones();

    });


    /*For displaying routes */
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

    initApp();

});


// For navigation

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

    // console.log('in direction1');
    var reports = document.getElementById("reports");
    reports.innerHTML = "";
    var report = reports.appendChild(document.createElement("div"));
    let routes = e.route;
    report.className="item";

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
        // console.log(routeLine);
        //Update the data for the route, updating the visual.
        map.getSource("route" + e.id).setData(routeLine);

        var collision = "";
        var emoji = "";
        var red_danger = !(turf.booleanDisjoint(red_obstacle, routeLine));
        var orange_danger = !(turf.booleanDisjoint(orange_obstacle, routeLine));
        let detail;

        // console.log('in direction2');

        if (red_danger == true) {
            collision = "is bad.";
            detail = "passes through a red zone. Avoid if possible";
            emoji = ":(";
            report.classList.add("warning");
            map.setPaintProperty("route" + e.id, "line-color", "#de2d26");

        }
        else if (orange_danger == true) {
            collision = "is not good";
            detail = "passes through an orange zone. Please take all the necessary precautions";
            emoji = ":(";
            report.classList.add("warning");
            map.setPaintProperty("route" + e.id, "line-color", "#ff4500");
        }
        else {
            collision = "is good!";
            detail = "does not pass through an orange or a red zone. Have a safe journey!";
            emoji = "✔️";
            map.setPaintProperty("route" + e.id, "line-color", "#74c476");
        }

        //Add a new report section to the sidebar.
        // Assign a unique `id` to the report.
        report.id = "report-" + e.id;

        // Add the response to the individual report created above.

        var heading = report.appendChild(document.createElement("h5"));


        // Set the class type based on clear value.
        if (red_danger == true || orange_danger == true) {
            heading.className = "warning";
        } 
        else {
            heading.className = "title";
        }

        heading.innerHTML = emoji + " Route " + (e.id + 1) + " " + collision;

        // console.log('in direction3');

        // Add details to the individual report.
        var details = report.appendChild(document.createElement("div"));
        details.innerHTML = "This route " + detail;

        report.appendChild(document.createElement("p"));


    });


    // console.log("reached");
    //To show active cases
    let renderActiveCases = () => {
        getActiveCases().then((cases) => {
            let report = reports.appendChild(document.createElement("div"));
            report.className = "item";
            report.id = "navMap-report";

            let heading = report.appendChild(document.createElement("h5"));


            heading.innerHTML = "Active Cases: ";
            heading.className = "navMap-casesHead";

            let details = report.appendChild(document.createElement("div"));
            details.innerHTML = cases[0] + " : " + cases[1];    //src
            details = report.appendChild(document.createElement("div"));
            details.innerHTML = cases[2] + " : " + cases[3];    //dest

            report.appendChild(document.createElement("p"));

        });
    }

    renderActiveCases();

});