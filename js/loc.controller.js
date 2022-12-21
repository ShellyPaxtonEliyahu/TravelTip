import { locService } from './services/loc.service.js'
import { appController } from './app.controller.js'

export const locController = {
    onLocInit,
    onLocGo
}

window.onLocGo = onLocGo
window.onDelete = onDelete

function onLocInit() {

    locService.getLocs()
        .then(locs => {
            console.log('locs control', locs)
            renderPlaceList(locs)
        })
}



function renderPlaceList(locs) {
    const strHTML = locs.map(loc =>
        `
    <article data-list-id="${loc.id}" class="list-item" >
        <span class="list-title">${loc.name}</span>
        <span class="list-time">${loc.createdAt}</span>
        <button onclick="onLocGo(${loc.lat},${loc.lng})" class="btn-go">Go</button>
        <button onclick="onDelete('${loc.id}')" class="btn-del">Delete</button>
        
        </article>`)
    const elSavedContainer = document.querySelector('.places-container')
    elSavedContainer.innerHTML = strHTML.join('')


}

function onDelete(locId) {
    console.log('remove', locId)
    locService.remove(locId)
    onLocInit()
}

function onLocGo(lat, lng) {
    console.log('onLocGo')
    appController.onPanTo(lat, lng)
}
