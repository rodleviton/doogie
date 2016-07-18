const CodeMirror = require('codemirror/lib/codemirror')

CodeMirror.defineInitHook(function (cm) {
  cm.state.textStatistics = {
    charCount: 0,
    wordCount: 0
  };
  const updateStatisticsFunc = function (cm) {
    let charCount = 0
    let wordCount = 0

    cm.eachLine(function (line) {
      let text = line.text
      charCount += text.length + 1
      text = text.trim()

      if (text.length > 0) {
        wordCount += (text.match(/\s+/g) || []).length + 1
      }

    })

    cm.state.textStatistics.charCount = charCount
    cm.state.textStatistics.wordCount = wordCount
  };

  cm.on('change', updateStatisticsFunc)

  updateStatisticsFunc(cm);
})
