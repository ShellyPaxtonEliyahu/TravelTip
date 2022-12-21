export const locService = {
    getLocs
}

var gCounterId = 0
const locs = []
_createLocs()
// [
//     { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
//     { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
// ]



function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function _createLocs() {
    locs = [
        _createLoc('Greatplace', 32.047104, 34.832384),
        _createLoc('Neveragain', 32.047201, 34.832581)
    ]
}


function _createLoc(name, lat, lng, weather = 0) {
    var loc = {
        id: gCounterId,
        name,
        pos: { lat, lng },
        weather,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    gCounterId++
    return loc
}


