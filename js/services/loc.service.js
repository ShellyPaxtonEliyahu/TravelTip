import { storageService } from './storage.service.js'

export const locService = {
    getLocs,
    remove
}

const KEY = 'locDB'
var gCounterId = 1
var gLocs 
_createLocs()

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs)
        }, 0)
    })
}

function remove(locId) {
    return storageService.remove(KEY, locId)
}

function get(locId) {
    return storageService.get(KEY, locId)
}

function save(loc) {
    if (loc.id) {
        return storageService.put(KEY, loc)
    } else {
        return storageService.post(KEY, loc)
    }
}

function _createLocs() {
    gLocs = storageService.load(KEY)
    if (!gLocs || !gLocs.length) {
        _createDemoLocs()
    }
}

function _createDemoLocs() {
    var locs = [
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


