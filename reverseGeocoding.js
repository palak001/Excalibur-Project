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