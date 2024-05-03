import './assets/css/root.scss'
import * as components from "./components";
export * from './components/useDraggable';
export default {
  install: (app: any) => {
    for (const key in components) {
      const componentConfig = components[key];
      app.component(componentConfig.name, componentConfig);
    }
  },
};
