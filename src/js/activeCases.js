// import {reverseGeoCoding} from './reverseGeocoding';

let reverseGeoCoding = async (x, y) => {

    let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken })
    await mapboxClient.geocoding.reverseGeocode({
        query: [x, y]
    })
        .send()
        .then(response => {
            let ans = response.body.features[0].place_name;
            return (String(ans));
        });
}


let getTokens = (el) => {
    let tokens = el.split(',');
    for (let i = 0; i < tokens.length; i++) {
        tokens[i] = tokens[i].trim();
    }
    return tokens;
}


export let getActiveCases = async () => {
    const el = document.getElementsByClassName('mapboxgl-ctrl-geocoder');
    const src = el[0].childNodes[1].value;
    const dest = el[1].childNodes[1].value;

    let srcTokens = getTokens(src);
    let destTokens = getTokens(dest);

    let srcState, srcDist, destState, destDist;

    // if(isNaN(srcTokens[0])==false){  //it is a coordinate
    //     let long = parseFloat(srcTokens[0]);
    //     let lat = parseFloat(srcTokens[1]);
    //     srcState= await reverseGeoCoding(long, lat);
    //     console.log(srcState);
    //     // srcTokens = getTokens(srcState);
    // }
    // else{
    srcState = srcTokens[srcTokens.length - 2];

    if (srcTokens.length > 2)
        srcDist = srcTokens[srcTokens.length - 3];
    else
        srcDist = "null";
    // }



    // if(isNaN(destTokens[0])==false){  //it is a coordinate
    //     let long = parseFloat(destTokens[0]);
    //     let lat = parseFloat(destTokens[1]);
    //     destState= await reverseGeoCoding(long, lat);
    //     console.log(destState);
    //     // destTokens = getTokens(destState);
    // }
    // else{
    destState = destTokens[destTokens.length - 2];

    if (destTokens.length > 2)
        destDist = destTokens[destTokens.length - 3];
    else
        destDist = "null";
    // }


    let casesData = await fetch('https://api.covid19india.org/v2/state_district_wise.json');

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
    let srcLoc, destLoc;


    for (let i = 1; i < casesData.length; i++) {
        const obj = casesData[i];
        if (obj.state.toLowerCase() === srcState.toLowerCase()) {
            let flag = 0;
            if (srcDist !== "null")
                for (let j = 0; j < obj.districtData.length; j++) {
                    if (obj.districtData[j].district.toLowerCase() === srcDist.toLowerCase()) {
                        flag = 1;
                        srcActiveCases = obj.districtData[j].active;
                        srcLoc = srcDist;
                    }
                }
        }


        if (obj.state.toLowerCase() === destState.toLowerCase()) {
            let flag = 0;
            if (destDist !== "null")
                for (let j = 0; j < obj.districtData.length; j++) {
                    if (obj.districtData[j].district.toLowerCase() === destDist.toLowerCase()) {
                        flag = 1;
                        destActiveCases = obj.districtData[j].active;
                        destLoc = destDist;
                    }
                }
        }
    }


    // console.log(srcActiveCases);
    // console.log(destActiveCases);

    if (srcActiveCases == 0 || destActiveCases == 0) {
        let casesData = await fetch('https://api.covid19india.org/data.json');
        casesData = await casesData.json();

        if (srcActiveCases == 0) {
            for (let i = 1; i < casesData.statewise.length; i++) {
                const obj = casesData.statewise[i];
                if (obj.state.toLowerCase() === srcState.toLowerCase()) {
                    srcActiveCases = obj.active;
                    srcLoc = srcState;
                }
            }
        }

        if(destActiveCases === 0){
            for (let i = 1; i < casesData.statewise.length; i++) {
                const obj = casesData.statewise[i];
                if (obj.state.toLowerCase() === destState.toLowerCase()) {
                    destActiveCases = obj.active;
                    destLoc = destState;
                }
            }
        }
    }


    let cases = [srcLoc, srcActiveCases, destLoc, destActiveCases];
    // console.log(cases);
    return cases;
}
