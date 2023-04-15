import { mount, compact, Main } from 'jito'
import { JitoEyes } from './JitoEyes';

const main: Main = () => {
  return [
    { 'jito-eyes': JitoEyes },
  ]
}

const component = compact(`
<div id="id">
  <jito-eyes style="position: absolute;top: 200px; left: 150px;" />
</div>`, main)
mount('#app', component)