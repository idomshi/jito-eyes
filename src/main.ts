import {mount, compact } from 'jito'

const main = () => {
  const onMove = (ev: PointerEvent) => {
    console.log([ev.offsetX, ev.offsetY])
  }

  return [
    {
      onMove,
    }
  ]
}

const component = compact(`
<window onpointermove="onMove(event)" />
<strong>hello</strong>`, main)
mount('#app', component)