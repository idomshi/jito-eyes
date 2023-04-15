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
    state.el = root.getElementById('id')
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
<div id="id">
  <strong>hello</strong>
</div>`, main)