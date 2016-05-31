'use strict'

module.exports = DynamicdatePlugin

function DynamicdatePlugin (editor) {
  editor.addMenuItem('dynamicdate', {
    context: 'insert',
    text: 'Dynamic date',
    type: 'menuitem',
    menu: [
      { text: 'sss' }
    ]
  })
}
