import { compact, watch, Main } from 'jito'

const main: Main = ({ root }) => {
  const state = watch<{
    el: HTMLElement | null;
  }>({
    el: null,
  })

  const onMove = (ev: PointerEvent) => {
    const rect = state.el?.getBoundingClientRect()
    if (rect === undefined) return;
    console.log([rect.left, rect.top, rect.width, rect.height])
    console.log([ev.offsetX, ev.offsetY])
  }

  const patched = () => {
    state.el = root.getElementById('jitoeyes')
  }

  return [
    state,
    {
      onMove,
      patched,
    }
  ]
}

export const JitoEyes = compact(`
<window onpointermove="onMove(event)" />
<root onpatch="patched(event)" @if="!el" />
<div id="jitoeyes" style="width: 400px; height: 400px;">
  <svg width="300" height="300" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" stroke="red" fill="grey">
    <circle cx="50" cy="50" r="40" />
    <circle cx="150" cy="50" r="4" />
  </svg>
</div>`, main)