const titlebar = require('./partials/titlebar')
const editor = require('./partials/editor')
const preview = require('./partials/preview')

function initApp() {
  titlebar.init()
  editor.init()
  preview.init()
}

initApp();
