import { sendEmail } from './sendEmail.js';
import {login, userMail} from './globalVariable.js';
// import { geoLocatorON, modifyGeoLocatorON } from './globalVariable.js';

let removeLayer = [];
const client = stitch.Stitch.initializeDefaultAppClient("location_services-bakdh");
const db = client.getServiceClient(stitch.RemoteMongoClient.factory, "mongodb-atlas").db("location_services");

let currentLocationMarker;
let geoLocateButton;

client.auth.loginWithCredential(new stitch.AnonymousCredential());

// Add geolocate control to the map.
let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});


map.addControl(geolocate);

map.on('load', () => {
    geoLocateButton = document.getElementsByClassName('mapboxgl-ctrl-geolocate')[0];
    geoLocateButton.addEventListener('click', () => {
        if(geoLocateButton.getAttribute('aria-pressed') === 'false') {
            currentLocationMarker.remove();
            for(let i = 0; i < removeLayer.length; i++) {
                let layer = removeLayer[i];
                var mapLayer = map.getLayer(layer.name);
                if(typeof mapLayer !== 'undefined') {
                // Remove map layer & source.
                map.removeLayer(layer.name).removeSource(layer.name);
                }
            }
        }
    });

    geolocate.on('geolocate', async (e) => {
        // console.log(document.getElementById('user'));
        if(document.getElementById('user').style.display == 'none') {
            alert("Please Sign up for location based notification.");
            document.getElementsByClassName('mapboxgl-ctrl-geolocate')[0].click();
        }
        else {
            console.log(geoLocateButton);
            let long = e.coords.longitude;
            let lat = e.coords.latitude;
            let position = [long, lat];
            // console.log(position);
    
            if(currentLocationMarker == undefined) {
                currentLocationMarker = new mapboxgl.Marker({
                    draggable: true
                })
                .setLngLat([75.9638, 29.0973])
                .addTo(map);
            }
            else {
                currentLocationMarker.remove();
                currentLocationMarker = new mapboxgl.Marker({
                    draggable: true
                })
                .setLngLat([75.9638, 29.0973])
                .addTo(map);
            }
    
            
            currentLocationMarker.on('dragend', onDragEnd);
    
            let fences = await db.collection("geofences").find({
                region: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [75.9638, 29.0973]
                        },
                        $maxDistance: 50000000
                        
                    }
                }
            }).asArray();
    
            fences.forEach(fence => {
                removeLayer.push(fence);
                map.addSource(fence.name, {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "geometry": fence.region
                    }
                });
                /* for showing layers on the graph */
                map.addLayer({
                    "id": fence.name,
                    "type": "fill",
                    "source": fence.name,
                    "layout": {},
                    "paint": {
                        "fill-color": "#088",
                        "fill-opacity": 0.3
                    }
                });
            });
        }
    });
})




async function onDragEnd() {
    // currentLocationMarker.setLngLat([e.lngLat.lng, e.lngLat.lat]);
    var lngLat = currentLocationMarker.getLngLat();

    let result = await db.collection("geofences").find({
        region: {
            $geoIntersects: {
                $geometry: {
                    type: "Point",
                    coordinates: [lngLat.lng, lngLat.lat]
                }
            }
        }
    }, { projection: { name: 1, zone: 1 }}).asArray();
    if(result.length > 0) {
        sendEmail(result[0].name, result[0].zone);
    }
}

