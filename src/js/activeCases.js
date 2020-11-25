
export let getActiveCases = async () => {
    const el = document.getElementsByClassName('mapboxgl-ctrl-geocoder');
    const src = el[0].childNodes[1].value;
    const dest = el[1].childNodes[1].value;

    let srcTokens = src.split(',');
    for (let i = 0; i < srcTokens.length; i++) {
        srcTokens[i] = srcTokens[i].trim();
    }

    let srcState = srcTokens[srcTokens.length - 2];
    // console.log(srcTokens);

    let destTokens = dest.split(',');
    for (let i = 0; i < destTokens.length; i++) {
        destTokens[i] = destTokens[i].trim();
    }

    let destState = destTokens[destTokens.length - 2];
    // console.log(destTokens);


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

    let cases = [srcState, srcActiveCases, destState, destActiveCases];
    return cases;
}

