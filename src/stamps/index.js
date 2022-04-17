import { toRelativeUrl } from '../shared'

// images marked as done have the filter property set to ""
const isDone = (elem) => elem.style.filter === ""

const icon = (bool) => bool ? "&check;" : ""

const url = "/collection/?category_id=22"

function handler() {
    const unmatched = []

    // parse the stamps on this page to an array of objects
    const stamps = Array.from(document.querySelectorAll(".inventoryitem")).map(e => {
        const img = e.children[0]
        const url = toRelativeUrl(img.src)
        let [name, rest] = img.title.split(" (r")
        let [rarity, description] = rest.split(") : ")
        name = name.trim()
        description = description.trim()
        rarity = parseInt(rarity, 10)
        let [ done, inventory, sdb, shop ] = [0, 4, 5, 6].map(i => e.children[i]).map(isDone)
        let images = Array.from(e.children).slice(4,7).map(e => e.outerHTML).join('')
        return { url, name, rarity, description, done, inventory, sdb, shop, images }
    })

    // move around old gui
    const form = document.querySelector(`form[action="/collection/"]`)
    form.parentElement.insertAdjacentElement('beforebegin', form.cloneNode(true))
    form.parentElement.removeChild(form.nextElementSibling)
    let table = document.querySelector("#center")
    table.parentElement.removeChild(table)

    // insret new gui
    const target = document.querySelector(".content")
    table = `<table id="userscript-stamps">
        <thead>
            <tr>
                <td></td>
                <td>Name</td>
                <td>Rarity</td>
                <td>Seen</td>
                <td>Locations</td>
            </tr>
        </thead>
        <tbody>
        ${
            stamps.sort((a,b) => a.done > b.done
                ? 1
                : b.done > a.done
                ? -1
                : a.rarity - b.rarity
            ).map(e => `<tr>
                <td><img src="${e.url}" title="${e.name} (r${e.rarity}) : ${e.description}"/></td>
                <td>${e.name}</td>
                <td>${e.rarity}</td>
                <td>${icon(e.done)}</td>
                <td>${e.done ? e.images : ""}</td>
            </tr>`).join('')
        }
        </tbody>
    </table>
    <style>
    #userscript-stamps thead tr {
        background-color: #efedc0
    }
    #userscript-stamps thead td,
    #userscript-stamps thead td > img {
        padding-right: 1em;
    }    
    #userscript-stamps tbody tr:nth-of-type(even) {
        background-color: #ffffaa;
    }
    
    #userscript-stamps {
        border-collapse: collapse;
    }
    </style>`
    target.insertAdjacentHTML('beforeend', table)
}

export default {
    url,
    handler
}