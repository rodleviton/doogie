const remote = require('electron').remote

const titlebar = {
  init: () => {
    document.getElementById('minimizeBtn').addEventListener('click', (event) => {
      const window = remote.getCurrentWindow()
      console.log(window)
      window.minimize()
    });

    document.getElementById('maximizeBtn').addEventListener('click', (event) => {

      const window = remote.getCurrentWindow()
      if (!window.isMaximized()) {
        window.maximize()
      } else {
        window.unmaximize()
      }
    })

    document.getElementById('closeBtn').addEventListener('click', (event) => {
      const window = remote.getCurrentWindow()
      window.close()
    })
  }
}

module.exports = titlebar
