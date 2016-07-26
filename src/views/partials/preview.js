const ipc = require('electron').ipcRenderer
const markdownRenderer = document.getElementById('markdownRenderer')
const markdownRendererContent = document.getElementById('markdownRendererContent')
const markdownit = require('markdown-it')
let md;

// Event listeners
ipc.on('updated-content', function (event, content) {
  preview.renderPreview(content)
})

const preview = {
  init: () => {
    md = markdownit({
      html: true,
      linkify: true,
      typographer: true
    })
  },
  renderPreview: (content) => {
    // Render markdown to HTML
    markdownRendererContent.innerHTML = md.render(content)
  }
}

module.exports = preview
