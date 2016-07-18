const fs = require('fs')
const smoothScroll = require('../../lib/smoothscroll')
const debounce = require('../utils/debounce')

const markdownRenderer = document.getElementById('markdownRenderer')
const markdownRendererContent = document.getElementById('markdownRendererContent')

const markdownit = require('markdown-it')
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
})

const CodeMirror = require('codemirror/lib/codemirror')
require('codemirror/mode/markdown/markdown')
require('codemirror/addon/edit/closebrackets')
require('codemirror/addon/edit/continuelist')
require('../utils/charCount')

const markdownEditor = document.getElementById('markdownEditor')
const editor = CodeMirror.fromTextArea(markdownEditor, {
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

const linePos = document.getElementById('linePos')

// Render HTML
function renderPreview() {
  // Update word and char count
  linePos.innerHTML = `${editor.state.textStatistics.wordCount} | ${editor.state.textStatistics.charCount}`

  // Render md to HTML
  let html = md.render(editor.getValue());
  markdownRendererContent.innerHTML = html
}

let rendererHeight = 0
let editorHeight = 0

const handleEditorScroll = debounce(function() {
  let totalHeight = editor.getScrollInfo().height
  let offset = editor.getScrollInfo().top
  let percentage =  Math.round((offset / totalHeight) * 100)
  let siblingOffset = Math.round((percentage * markdownRendererContent.offsetHeight) / 100)
  smoothScroll(markdownRenderer, markdownRenderer.scrollTop, siblingOffset, 500)
}, 10)

/**
 * Binds the ace component to the editor div
 */
function initAce() {
  editor.on('change', renderPreview)
  editor.setValue(require('../../testData')())
  editor.on('scroll', handleEditorScroll)
  // createTitleBarControls()
}

// bind ace component to the editor div
initAce();

function createTitleBarControls () {
  const remote = require('electron').remote

  document.getElementById('min-btn').addEventListener('click', function (e) {
    const window = remote.getCurrentWindow()
    console.log(window);
    window.minimize()
  });

  document.getElementById('max-btn').addEventListener('click', function (e) {
    const window = remote.getCurrentWindow()
    if (!window.isMaximized()) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  })

  document.getElementById('close-btn').addEventListener('click', function (e) {
    const window = remote.getCurrentWindow()
    window.close()
  })
}
