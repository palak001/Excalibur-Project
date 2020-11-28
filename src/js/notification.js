import { sendEmail } from './sendEmail.js';
import {login, userMail} from './globalVariable.js';
// import { geoLocatorON, modifyGeoLocatorON } from './globalVariable.js';

const client = stitch.Stitch.initializeDefaultAppClient("location_services-bakdh");
const db = client.getServiceClient(stitch.RemoteMongoClient.factory, "mongodb-atlas").db("location_services");

let currentLocationMarker;


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
 
    geolocate.on('geolocate', async (e) => {
        // console.log(document.getElementById('user'));
        if(document.getElementById('user').style.display == 'none') {
            alert("Please Sign up for location based notification.");
            document.getElementsByClassName('mapboxgl-ctrl-geolocate')[0].click();
        }
        else {
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
        }
    });
})




async function onDragEnd() {
    // currentLocationMarker.setLngLat([e.lngLat.lng, e.lngLat.lat]);
    var lngLat = currentLocationMarker.getLngLat();
    console.log("dragend");
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

