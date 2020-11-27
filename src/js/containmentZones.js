export const { red_obstacle, orange_obstacle, green_obstacle };
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


export const showContainmentZones = () => {
    const toggleRedZones = () => {
        if (map.getLayoutProperty(red_clearances, 'visibility') == 'none') {
            map.setLayoutProperty(red_clearances, 'visibility', 'visible');
        }
        else {
            map.setLayoutProperty(red_clearances, 'visibility', 'none');
        }
    }
    const toggleOrangeZones = () => {
        if (map.getLayoutProperty(orange_clearances, 'visibility') == 'none') {
            map.setLayoutProperty(orange_clearances, 'visibility', 'visible');
        }
        else {
            map.setLayoutProperty(orange_clearances, 'visibility', 'none');
        }
    }
    const toggleGreenZones = () => {
        if (map.getLayoutProperty(green_clearances, 'visibility') == 'none') {
            map.setLayoutProperty(green_clearances, 'visibility', 'visible');
        }
        else {
            map.setLayoutProperty(green_clearances, 'visibility', 'none');
        }
    }
    /* Fetch Containment Zones */
    const getContaimentZones = async () => {
        const containmentZones = await fetch(`https://api.covid19india.org/zones.json`);
        const containment_zones = await containmentZones.json();
        await getGeocodedDistrict(containment_zones);
        // console.log(clearances);
    }
    const getGeocodedDistrict = async (containment_zones) => {
        let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
        // console.log(containment_zones.zones.length);
        for (i = 1; i < containment_zones.zones.length; i++) {
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
                if (response.body.features[0] != undefined) {
                    const zone_color = (containment_zones.zones[i].zone);
                    //console.log(typeof(zone_color));
                    if (zone_color === "Red") {
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
                    else if (zone_color === "Orange") {
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
                    else if (zone_color === "Green") {
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

    }

    const reverseGeoCoding = async (x, y) => {
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
        reverseGeoCoding(77.38181, 29.01822);
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
                    "fill-color": "#972D07",
                    "fill-opacity": 0.5,
                    "fill-outline-color": "#972D07",
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
                    "fill-color": "#FF773D",
                    "fill-opacity": 0.5,
                    "fill-outline-color": "#FF773D",
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
                    "fill-color": "#313628",
                    "fill-opacity": 0.5,
                    "fill-outline-color": "#313628",
                },
            });
            toggleRedZones();
            toggleOrangeZones();
            toggleGreenZones();
        });
    }
    )
}
