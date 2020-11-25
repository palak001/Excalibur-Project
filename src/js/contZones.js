export let red_zone = {
    type: "FeatureCollection",
    features: []
};

export let orange_zone = {
    type: "FeatureCollection",
    features: []
};

export let green_zone = {
    type: "FeatureCollection",
    features: []
};




export let red_clearances = "red_clearances";
export let orange_clearances = "orange_clearances";
export let green_clearances = "green_clearances";


/* Fetch Containment Zones */
export const getContaimentZones = async () => {
    const containmentZones = await fetch(`https://api.covid19india.org/zones.json`);
    const containment_zones = await containmentZones.json();
    await getGeocodedDistrict(containment_zones);
}


export const getGeocodedDistrict = async (containment_zones) => {
    let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    
    for (let i = 1; i < containment_zones.zones.length; i++) {
        const district = JSON.stringify(containment_zones.zones[i].district);
        await mapboxClient.geocoding.forwardGeocode({
            query: district,
            autocomplete: false,
            limit: 1
        })
            .send()
            .then(function (response) {
                if (response.body.features[0] != undefined) {

                    const zone_color = (containment_zones.zones[i].zone);
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


export const toggleRedZones = () => {
    if (map.getLayoutProperty(red_clearances, 'visibility') == 'none') {
        map.setLayoutProperty(red_clearances, 'visibility', 'visible');
    }
    else {
        map.setLayoutProperty(red_clearances, 'visibility', 'none');
    }
}

export const toggleOrangeZones = () => {
    if (map.getLayoutProperty(orange_clearances, 'visibility') == 'none') {
        map.setLayoutProperty(orange_clearances, 'visibility', 'visible');
    }
    else {
        map.setLayoutProperty(orange_clearances, 'visibility', 'none');
    }
}

export const toggleGreenZones = () => {
    if (map.getLayoutProperty(green_clearances, 'visibility') == 'none') {
        map.setLayoutProperty(green_clearances, 'visibility', 'visible');
    }
    else {
        map.setLayoutProperty(green_clearances, 'visibility', 'none');
    }
}
