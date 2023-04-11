import {mount, compact } from 'jito'

const component = compact(`<strong>hello</strong>`)
mount('#app', component)