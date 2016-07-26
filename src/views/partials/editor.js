const ipc = require('electron').ipcRenderer
const fs = require('fs')

// Utils
const smoothScroll = require('../../utils/smoothscroll')
const debounce = require('../../utils/debounce')
const charCount = require('../../utils/charCount')

// Editor deps
const CodeMirror = require('codemirror/lib/codemirror')
const markdown = require('codemirror/mode/markdown/markdown')
const closebrackets = require('codemirror/addon/edit/closebrackets')
const continuelist = require('codemirror/addon/edit/continuelist')

// Markdown preview
const linePos = document.getElementById('linePos')
const markdownPreview = document.getElementById('markdownRenderer')
const markdownPreviewContent = document.getElementById('markdownRendererContent')

let markdownEditor;
let previewHeight = 0
let editorHeight = 0

// Event listeners
ipc.on('selected-directory', function (event, path) {
  editor.loadFile(path)
})

const editor = {
  init: () => {
    markdownEditor = CodeMirror.fromTextArea(document.getElementById('markdownEditor'), {
      autofocus: true,
      mode: {
        name: "markdown",
        highlightFormatting: true
      },
      lineWrapping: true,
      theme: 'doogie',
      autoCloseBrackets: true,
      extraKeys: {
        'Enter': 'newlineAndIndentContinueMarkdownList'
      }
    })

    markdownEditor.on('change', editor.handleChange)
    markdownEditor.on('scroll', editor.handleScroll)
  },
  loadFile: (path) => {
    fs.readFile(path[0], 'utf-8', (err, result) => {
      editor.updateEditor(result)
    });
  },
  handleChange: () => {
    // Update word and char count
    linePos.innerHTML = `${markdownEditor.state.textStatistics.wordCount} | ${markdownEditor.state.textStatistics.charCount}`

    // Notify application that data has changed
    ipc.send('update-content', markdownEditor.getValue())
  },
  handleScroll: () => {
    debounce(function () {
      let totalHeight = markdownEditor.getScrollInfo().height
      let offset = markdownEditor.getScrollInfo().top
      let percentage = Math.round((offset / totalHeight) * 100)
      let siblingOffset = Math.round((percentage * markdownPreviewContent.offsetHeight) / 100)
      smoothScroll(markdownPreview, markdownPreview.scrollTop, siblingOffset, 500)
    }, 10)
  },
  updateEditor: (content) => {
    markdownEditor.setValue(content)
  }
}

module.exports = editor
