import { App } from 'vue'
import copy from './copy'
import clickoutside from './clickoutside'
import draggable from './draggable'

const directivesList: any = {
  // Custom directives
  copy,
  clickoutside,
  draggable
}

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key])
    })
  }
}

export default directives
