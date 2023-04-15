import { mount, compact, Main } from 'jito'
import { JitoEyes } from './JitoEyes';

const main: Main = () => {
  return [
    { 'jito-eyes': JitoEyes },
  ]
}

const component = compact(`
<div id="id">
  <jito-eyes />
</div>`, main)
mount('#app', component)