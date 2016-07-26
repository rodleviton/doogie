let data = {}

// Data store
const store = {
  getFilename: () => {
    return data.filename
  },
  setFilename (filename) {
    data.filename = filename
  },
  getContent: () => {
    return data.content
  },
  setContent (event, content) {
    data.content = content
    event.sender.send('updated-content', content)
  }
}

module.exports = store
