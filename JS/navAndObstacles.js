

let red_zone = {
    type: "FeatureCollection",
    features: []
};

let orange_zone = {
    type: "FeatureCollection",
    features: []
};

let green_zone = {
    type: "FeatureCollection",
    features: []
};
let red_obstacle = {};
let orange_obstacle = {};
let green_obstacle = {};

let red_clearances = "red_clearances";
let orange_clearances = "orange_clearances";
let green_clearances = "green_clearances";


const toggleRedZones = () => {
    if(map.getLayoutProperty(red_clearances, 'visibility')=='none'){
        map.setLayoutProperty(red_clearances, 'visibility', 'visible');
    }
    else{
        map.setLayoutProperty(red_clearances, 'visibility', 'none');
    }
}


const toggleOrangeZones = () => {
    if(map.getLayoutProperty(orange_clearances, 'visibility')=='none'){
        map.setLayoutProperty(orange_clearances, 'visibility', 'visible');
    }
    else{
        map.setLayoutProperty(orange_clearances, 'visibility', 'none');
    }
}


const toggleGreenZones = () => {
    if(map.getLayoutProperty(green_clearances, 'visibility')=='none'){
        map.setLayoutProperty(green_clearances, 'visibility', 'visible');
    }
    else{
        map.setLayoutProperty(green_clearances, 'visibility', 'none');
    }
}
        


/* Fetch Containment Zones */
const getContaimentZones = async() => {
    const containmentZones = await fetch(`https://api.covid19india.org/zones.json`);
    const containment_zones = await containmentZones.json();
    await getGeocodedDistrict(containment_zones);
    // console.log(clearances);
}


const getGeocodedDistrict = async(containment_zones) => {
    let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    console.log(containment_zones.zones.length);
    for(i = 1; i < containment_zones.zones.length; i++) {
        // console.log(clearances);
        const district = JSON.stringify(containment_zones.zones[i].district);
        await mapboxClient.geocoding.forwardGeocode({
            query: district,
            autocomplete: false,
            limit: 1
        })
        .send()
        .then(function (response) {
            // console.log(response);
            if(response.body.features[0] != undefined) {
                
                const zone_color = (containment_zones.zones[i].zone);
                //console.log(typeof(zone_color));
                if(zone_color==="Red")
                    {
                        
                        
                        red_zone.features.push({
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: response.body.features[0].center,
                        },
                        properties: {
                            clearance: "13' 2",
                        },
                    });
                        
                        
                    }
                
                else if(zone_color==="Orange")
                    {
                        
                        orange_zone.features.push({
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: response.body.features[0].center,
                        },
                        properties: {
                            clearance: "13' 2",
                        },
                    });
                        
                    }
                else if(zone_color==="Green")
                    {
                        
                        green_zone.features.push({
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: response.body.features[0].center,
                        },
                        properties: {
                            clearance: "13' 2",
                        },
                    });
                        
                    }
            }
        });
    }
    
    
    //console.log(red_zone.features);
    //console.log(orange_zone.features);
   // console.log(green_zone.features);
}



const reverseGeoCoding = async(x, y) => {
    
    let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken })
    await mapboxClient.geocoding.reverseGeocode({
      query: [x, y]
    })
      .send()
      .then(response => {
        
        
        console.log(response)
      });
    
}

map.on("load", function (e) {
    
    
    reverseGeoCoding(77.38181,29.01822);
    
    
    getContaimentZones().then(() => {
        //console.log(clearances);
        red_obstacle = turf.buffer(red_zone, 50, { units: "kilometers" });
        orange_obstacle = turf.buffer(orange_zone, 50, { units: "kilometers" });
        green_obstacle = turf.buffer(green_zone, 50, { units: "kilometers" });
        // console.log("obstacle");
        // console.log(obstacle);
        map.addLayer({
        id: red_clearances,
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
        id: orange_clearances,
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
        id: green_clearances,
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
        
        
        toggleRedZones();
	toggleOrangeZones();
	toggleGreenZones();
       // map.setLayoutProperty(red_clearances, 'visibility', 'none');
     //  map.setLayoutProperty(orange_clearances, 'visibility', 'none');
     //   map.setLayoutProperty(green_clearances, 'visibility', 'none');
        
        
    });

    for (i = 0; i <= 2; i++) {
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
for (i = 0; i < 3; i++) {
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
    var red_danger = !(turf.booleanDisjoint(red_obstacle, routeLine));
    var orange_danger = !(turf.booleanDisjoint(orange_obstacle, routeLine));

    if (red_danger == true) {
        collision = "is bad.";
        detail = "passes through red zone";
        emoji = ":(";
        report.className = "item warning";
        map.setPaintProperty("route" + e.id, "line-color", "#de2d26");
    
    } 
    else if(orange_danger == true){
        collision = "is not good";
        detail = "passes through orange zone";
        emoji = ":(";
        report.className = "item warning";
        map.setPaintProperty("route" + e.id, "line-color", "#ff4500");
    }
    else {
         collision = "is good!";
        detail = "does not pass through orange or red zone";
        emoji = "✔️";
        report.className = "item";
        map.setPaintProperty("route" + e.id, "line-color", "#74c476");
    }

    //Add a new report section to the sidebar.
    // Assign a unique `id` to the report.
    report.id = "report-" + e.id;

    // Add the response to the individual report created above.
    var heading = report.appendChild(document.createElement("h2"));

    // Set the class type based on clear value.
    if (red_danger == true|| orange_danger==true) {
        heading.className = "warning";
    } 
    else {
        heading.className = "title";
    }

    heading.innerHTML = emoji + " Route " + (e.id + 1) + " " + collision;

    // Add details to the individual report.
    var details = report.appendChild(document.createElement("div"));
        details.innerHTML = "This route " + detail;
        report.appendChild(document.createElement("hr"));
    });
});


