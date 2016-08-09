/**
 * @module
 * @description This module exports the DynamicdatePlugin class
 */

'use strict'

var $ = window.jQuery
var DateTimeMenuItem = require('./DateTimeMenuItem')

module.exports = DynamicdatePlugin

/**
 * This is the DynamicdatePlugin class
 * @class DynamicdatePlugin
 * @param {tinymce.Editor} editor The current tinymce editor instance
 */
function DynamicdatePlugin (editor) {
  var dateTimeMenuItemList = createDateTimeMenuItemList(editor)
  editor.addMenuItem('dynamicdate', createDynamicdateMenuOptions(dateTimeMenuItemList))

  // Handle all `menusController:mceMenuItemRendered:<menuItem.id>` events
  $.each(dateTimeMenuItemList, bindEachMenuItemToItsRenderedEventHandler)
}

/**
 * Create the DateTimeMenuItem list
 * @function
 * @param {tinymce.Editor} the current editor
 * @returns {Array<DateTimeMenuItem>} the list if DateTimeMenuItem instances
 */
function createDateTimeMenuItemList (editor) {
  return [
    new DateTimeMenuItem("dd/mm/yyyy, HH'h'MM'''ss", editor),
    new DateTimeMenuItem("dd/mm/yyyy, HH'h'''MM", editor),
    new DateTimeMenuItem('dd/mm/yyyy', editor),
    new DateTimeMenuItem("HH'h'MM'''ss", editor),
    new DateTimeMenuItem("HH'h'MM", editor),
    new DateTimeMenuItem('dddd', editor),
    new DateTimeMenuItem('dd', editor),
    new DateTimeMenuItem('mm', editor),
    new DateTimeMenuItem('mmmm', editor),
    new DateTimeMenuItem('yy', editor),
    new DateTimeMenuItem('yyyy', editor)
  ]
}

/**
 * Create the dynamicdate menu options to pass to editor#addMenuItem()
 * @function
 * @param {Array<DateTimeMenuItem>} dateTimeMenuItemList The list of DateTimeMenuItem instances
 * @returns {object} the menu item options literal object
 */
function createDynamicdateMenuOptions (dateTimeMenuItemList) {
  return {
    context: 'insert',
    text: 'Dynamic date',
    type: 'menuitem',
    id: 'menu-dynamicdate',
    menu: dateTimeMenuItemList
  }
}

/**
 * Bind each menu item to its rendered event handler
 * @function
 * @description
 * Handle all `menusController:mceMenuItemRendered:<menuItem.id>` events
 * @param {number} i Integer forEach itarator
 * @param {DateTimeMenuItem} menuItem Menu item forEach iterator
 */
function bindEachMenuItemToItsRenderedEventHandler (i, menuItem) {
  var evtName = 'menusController:mceMenuItemRendered:' + menuItem.id
  var $menuElement = null
  $('body').on(evtName, function () {
    $menuElement = $('#' + menuItem.id)
    menuItem.setElement($menuElement)
  })
}
