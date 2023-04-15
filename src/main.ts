import { mount, compact, Main } from 'jito'
import { JitoEyes } from './JitoEyes';

const main: Main = () => {
  return [
    { 'jito-eyes': JitoEyes },
  ]
}

const component = compact(`
<div id="id">
  <jito-eyes style="position: absolute;top: 250px; left: 80px;" />
  <jito-eyes style="position: absolute;top: 30px; left: 640px;" />
</div>`, main)
mount('#app', component)