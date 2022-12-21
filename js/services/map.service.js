export const mapService = {
    initMap,
    addMarker,
    panTo,
    // addMapListener
}


// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    
    return _connectGoogleApi()
        .then(() => {
            
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            

            let infoWindow = new google.maps.InfoWindow({
                content: "Click",
                position: gMap.center,
            })
            infoWindow.open(gMap)
            gMap.addListener('click', (ev) => {
                infoWindow.close()

                infoWindow = new google.maps.InfoWindow({
                    position: ev.latLng,
                })

                infoWindow.setContent(
                    JSON.stringify(ev.latLng.toJSON(), null, 2)
                )
                infoWindow.open(gMap)
            }
            )
        })
}



function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyD-lGFKH01AmUgcetHm4ArZKyGjo0-MEsw' //done: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}