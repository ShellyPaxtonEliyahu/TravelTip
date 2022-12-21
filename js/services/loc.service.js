import {storageService} from './storage.service.js'

export const locService = {
    getLocs,
    remove
}

const KEY = 'locDB'
var gCounterId = 0
var locs = storageService.load(KEY) || _createLocs()
console.log('locs', locs)

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
         }, 0)
    })
}

function remove(locId) {
    return storageService.remove(KEY, locId)
}


function _createLocs() {
    console.log('locs from _createLocs')
    locs = [
        _createLoc('Greatplace', 32.047104, 34.832384),
        _createLoc('Neveragain', 32.047201, 34.832581)
    ]
    storageService.save(KEY, locs)
}


function _createLoc(name, lat, lng, weather = 0) {
    var loc = {
        id: gCounterId,
        name,
        lat, 
        lng,
        weather,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    }
    gCounterId++
    return loc
}


