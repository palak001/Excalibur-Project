import { sendEmail } from './sendEmail.js';

const client = stitch.Stitch.initializeDefaultAppClient("location_services-bakdh");
const db = client.getServiceClient(stitch.RemoteMongoClient.factory, "mongodb-atlas").db("location_services");

let currentLocationMarker;

client.auth.loginWithCredential(new stitch.AnonymousCredential());

// Add geolocate control to the map.
let geolocate = new mapboxgl.GeolocateControl();
map.addControl(geolocate);

geolocate.on('geolocate', async (e) => {
    let long = e.coords.longitude;
    let lat = e.coords.latitude;
    let position = [long, lat];
    console.log(position);

    let fences = await db.collection("geofences").find({
        region: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [73.3119, 28.0229]
                },
                $maxDistance: 50000000
                
            }
        }
    }).asArray();

    currentLocationMarker = new mapboxgl.Marker().setLngLat([73.3119, 28.0229]).addTo(map);
    fences.forEach(fence => {
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
                "fill-opacity": 0.8
            }
        });
    });
})


map.on("click", async (e) => {
    currentLocationMarker.setLngLat([e.lngLat.lng, e.lngLat.lat]);
    let result = await db.collection("geofences").find({
        region: {
            $geoIntersects: {
                $geometry: {
                    type: "Point",
                    coordinates: [e.lngLat.lng, e.lngLat.lat]
                }
            }
        }
    }, { projection: { name: 1, zone: 1 }}).asArray();
    if(result.length > 0) {
        // console.log(result);
        sendEmail("palak7372@gmail.com", result[0].name, result[0].zone);
    }

});