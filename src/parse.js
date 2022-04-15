/**
 * The purpose of this file is to generate the list of avatars in ./avatars.json
 * 
 * 1. Go to this URL https://neo.mandilee.co.uk/avatars/list.php
 * 2. Open a browser console and execute this script
 * 3. Right click the object that is printed to the console and select 'Copy Object'
 * 4. Paste it into ./avatars.json
 */
const retiredAvatars = [
    "/images/avatars/tikiwanted.gif",
    "/images/avatars/tiki_trap.gif"    
]

function toRelativeUrl(s) {
    return s.replace(/https?:\/\/neopetsclassic.com/,"")
}

function parseFrom(trElement) {
    const url = toRelativeUrl(trElement.children[0].children[0].src)
    const avatar = trElement.children[1].childNodes[0].textContent.trim()
    const type = trElement.children[2].textContent.trim()
    const method = trElement.children[3].innerHTML.trim()
    const retired = retiredAvatars.includes(url)
    return {
        url,
        avatar,
        type,
        method,
        retired
    }
}

Array.from(document.querySelectorAll("table.avatars tr.avatar")).map(parseFrom)
