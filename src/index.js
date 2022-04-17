import stamps from './stamps'
import avatars from './avatars'

const scripts = [stamps, avatars]

const script = scripts.find(e => window.location.href.includes(e.url))

if (script) {
    script.handler()
}