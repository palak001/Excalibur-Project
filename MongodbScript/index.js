const { MongoClient } = require("mongodb");
const fetch = require("node-fetch");
 
let districtData = {};
let ImpData = {};
let ZoneData = {};
const fs = require('fs');
fs.readFile('dists11.json', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    ImpData = JSON.parse(data);
});

fs.readFile('zones.json', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    ZoneData = JSON.parse(data);
});

                                                                                                  
const url = mongoURI;
const client = new MongoClient(url);
 const dbName = "location_services";
     
 let district = [];
 async function run() {
    try {
            await client.connect();
            console.log("Connected correctly to server");
            const db = client.db(dbName);
            const col = db.collection("geofences");

            for(let i = 7; i < ImpData.features.length; i++) {
            // for(let i = 0; i <= 6; i++) {
                console.log(i);
                let imp = ImpData.features[i];
                
                if(imp.properties.DISTRICT != undefined) {
                    let m, flag = 0;
                    for(m = 0; m < ZoneData.zones.length; m++) {
                        if(imp.properties.DISTRICT === ZoneData.zones[m].district) {
                            if(ZoneData.zones[m].zone.toLowerCase() === "green")
                                flag = 0;
                            else flag = 1;
                            break;
                        }
                    }
                    if(m == ZoneData.zones.length || flag == 0)
                        continue;
                    districtData = {
                        "name": imp.properties.DISTRICT,
                        "zone": ZoneData.zones[m].zone,
                        "region": {
                            "type": "Polygon",
                            "coordinates": imp.geometry.coordinates
                        }
                    }
                    console.log(districtData.name);
                    console.log(districtData.zone);
                    try {
                        const p = await col.insertOne(districtData);
                        const myDoc = await col.findOne();
                    }
                    catch(err) {
                        console.log(err.stack);
                    }
                    
                }
            }
            await getContaimentZones()
            .then(() => {
            });
        } 
        catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}


run().catch(console.dir);


/* Fetch Containment Zones */
const getContaimentZones = async() => {
    const containmentZones = await fetch(`https://api.covid19india.org/zones.json`);
    const containment_zones = await containmentZones.json();
    await getDistrictNames(containment_zones);
}

const getDistrictNames = async(containment_zones) => {
    for(let i = 1; i < containment_zones.zones.length; i++) {
        const districtName = JSON.stringify(containment_zones.zones[i].district);
        district.push(districtName);
    }
}