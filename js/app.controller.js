import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { locController } from './loc.controller.js'

export const appController = {
    onPanTo
}

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.getPosition = getPosition

function onInit() {
    mapService.initMap()
        .then(() => {
            // console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
    locController.onLocInit()
}


// function onShowMyPlace(){
    
// }

// This function provides a Promise API to the callback-based-api of getCurrentPosition
// function getPosition() {
//     console.log('Getting Pos')
//     return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject)
//     })
// }

function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(function (position) {
            let latitude = position.coords.latitude
            let longitude = position.coords.longitude
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`)
                .then(response => response.json())
        })
    })
}


function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo(lat, lng) {
    console.log('Panning the Map')
    mapService.panTo(lat, lng)
}