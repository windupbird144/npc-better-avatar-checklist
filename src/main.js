import avatars from './avatars.json'

// iterate over the avatars found on the page
const images = Array.from(document.querySelectorAll(`img[src*="avatars"]`))

// list of avatars found on the page but are not in the list of avatars. this is relevant after a name change, url change or when a new avatar is added.
let notFound = []

for (let image of images) {
    // completed avatars have the filter property set to an empty string
    const done = !image.style.filter
    const info = avatars.findIndex(e => e.url === image.src || e.avatar === image.title)
    if (info > -1) {
        avatars[info].done = done
    } else {
        notFound.push({ avatar: image.title, done })
        console.warn("the following image was found on the neoboards page, but is not in avatars.json. check for a url change, name change or new avatars and update the script.")
        console.log(image)
    }
}

const table = `
<section id="userscript-avatars">
    ${(() => {
        if (notFound.length) {
            return `The following avatar are unknown, please check for userscript updates. <ul>
                ${
                    notFound.map(e => `<li>${e.avatar} (${e.done ? 'completed' : 'missing'})</li>`).join('')
                }
            </ul>`
        }
        return ""
    })()}
    <fieldset>
        <label><input type="radio" name="userscript-show" value="all">Show all</label>
        <label><input type="radio" name="userscript-show" value="completed">Show completed</label>
        <label><input type="radio" name="userscript-show" value="missing">Show missing</label>
    </fieldset>
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Avatar</th>
                <th>Type</th>
                <th>Method</th>
            </tr>
        </thead>
        <tbody>
            ${
                avatars.map(e => `<tr data-done="${e.done}" data-retired="${e.retired}">
                    <td><img src="${e.url}" /></td>
                    <td>${e.avatar}</td>
                    <td>${e.type}</td>
                    <td>${e.method}</td>
                </tr>`).join('')
            }
        </tbody>
    </table>
</section>
<style>
#userscript-avatars label {
    cursor: pointer;
}
#userscript-avatars label:hover {
    text-decoration: underline
}
#userscript-avatars td {
    border: 1px solid #aaa;
}
[data-done="true"] {
    background: lightgreen;
}
[data-done="false"][data-retired="true"][data-done="false"] {
    background: repeating-linear-gradient(-45deg, #ccc, #ccc 10px, #ddd 10px, #ddd 20px)
}
#userscript-avatars[data-show="completed"] [data-done="false"],
#userscript-avatars[data-show="missing"] [data-done="true"] {
    display: none;
}
</style>`


// add HTML to page
const target = document.querySelector("#center")
target.insertAdjacentHTML("beforebegin", table)

const settings = {
    get showPreference() {
        return localStorage.getItem("show-preference") ?? "all"
    },
    set showPreference(value) {
        // when this value is changed, update the table
        localStorage.setItem("show-preference", value)
        document.querySelector("#userscript-avatars").dataset.show = value
    }
}


// listen to changes to the show all/completed/missing preference
document.querySelector("#userscript-avatars fieldset").addEventListener("change", (e) => {
    settings.showPreference = e.target.value
})

// initialize UI
settings.showPreference = settings.showPreference // this updates the dataset with the preference
document.querySelector(`#userscript-avatars input[value="${settings.showPreference}"]`).checked = true

// remove old avatar list if the script has executed successfully until here
target.parentElement.removeChild(target.nextElementSibling)
