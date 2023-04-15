import { compact, watch, Main } from 'jito'

const main: Main = ({ root }) => {
  const state = watch<{
    elo: HTMLElement | null;
    eli: HTMLElement | null;
    left: number;
    top: number;
    border: number;
  }>({
    elo: null,
    eli: null,
    left: 0,
    top: 0,
    border: 10,
  })

  const onMove = (ev: PointerEvent) => {
    const recto = state.elo?.getBoundingClientRect()
    const recti = state.eli?.getBoundingClientRect()
    if (recto === undefined) return;
    if (recti === undefined) return;

    const center = {
      x:recto.left + recto.width / 2,
      y:recto.top + recto.height / 2,
    }
    const vec = {
      x: ev.clientX - center.x,
      y: ev.clientY - center.y,
    }
    const r1 = recto.width * 0.25;
    const r2 = recto.height * 0.25;
    const x = Math.min(
      Math.sqrt((vec.x * r1 * r2) ** 2 / ((vec.x * r2) ** 2 + (vec.y * r1) ** 2)),
      Math.abs(vec.x)
    ) * Math.sign(vec.x)
    const pos = {
      x: x,
      y: vec.x === 0 ? Math.min(r2, vec.y) : x * vec.y / vec.x,
    }
    state.left = pos.x + recto.width / 2 - recti.width / 2 - state.border
    state.top = pos.y + recto.height / 2 - recti.height / 2 - state.border
  }

  const patched = () => {
    state.elo = root.getElementById('outer')
    state.eli = root.getElementById('inner')
    const recto = state.elo?.getBoundingClientRect()
    const recti = state.eli?.getBoundingClientRect()
    if (recto === undefined) return;
    if (recti === undefined) return;
    state.left = recto.width / 2 - recti.width / 2 - state.border
    state.top =  recto.height / 2 - recti.height / 2 - state.border
  }

  return [
    state,
    {
      onMove,
      patched,
    }
  ]
}

export const JitoEye = compact(`
<style>
.outer {
  width: 90px;
  height: 150px;
  border: {{ border }}px black solid;
  border-radius: 50%;
}
.inner {
  position: relative;
  left: {{ left }}px;
  top: {{ top }}px;
  width: 25px;
  height: 25px;
  background-color: black;
  border-radius: 50%;
}
</style>
<window onpointermove="onMove(event)" />
<root onpatch="patched(event)" @if="!elo" />
<div id="outer" class="outer">
<div id="inner" class="inner"></div>
</div>`, main)
