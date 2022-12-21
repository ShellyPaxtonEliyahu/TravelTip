import { locService } from './services/loc.service.js'
export const locController = {
    onLocInit
}

function onLocInit() {

    locService.getLocs()
        .then(locs => {
            console.log('locs control', locs)
            // if (!locs.length) return
            // renderVideos(videos)
            renderPlaceList(locs)
        })
}



function renderPlaceList(locs) {
    const strHTML = locs.map(loc => 
    //  {id, name,lat, lng, weather, createdAt, updatedAt } = loc
    `
    <article data-list-id="${loc.id}" class="list-item" onclick="onPlaceClick(${loc.lat},${loc.lng})">
        <span class="list-title">${loc.name}</span>
        <span class="list-time">Saved: ${loc.createdAt}</span>
        <span class="btn-del-list" onclick="onRemovePlace('${loc.id}')">✕</span>
        </article>`)
    const elSavedContainer = document.querySelector('.places-container')
    elSavedContainer.innerHTML = strHTML.join('')


}
