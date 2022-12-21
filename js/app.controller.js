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
window.onSearchLoc = onSearchLoc

function onInit() {
    mapService.initMap()
        .then(() => {
            // console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
    locController.onLocInit()
}

function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker(lat = 32.0749831, lng = 34.9120554) {
    console.log('Adding a marker')
    mapService.addMarker({ lat, lng })
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
            onPanTo(pos.coords.latitude, pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo(lat = 35.6895, lng = 139.6917) {
    console.log('Panning the Map')
    mapService.panTo(lat, lng)

    onAddMarker(lat, lng)
}

function onSearchLoc() {
    var elTxt = document.querySelector('.search-input').value
    console.log(elTxt)
}