import './assets/css/root.scss'
import * as components from "./components";
export default {
  install: (app: any) => {
    for (const key in components) {
      console.log(components)
      const componentConfig = components[key];
      app.component(componentConfig.name, componentConfig);
    }
  },
};
