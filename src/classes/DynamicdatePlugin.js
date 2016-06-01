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
  var dateTimeMenuItemList = createDateTimeMenuItemList()

  editor.addMenuItem('dynamicdate', createDynamicdateMenuOptions(dateTimeMenuItemList))

  $('body').on('menusController:mceMenuItemRendered', setMenuItemsElementsOnRender(dateTimeMenuItemList))
}

/**
 * Create the DateTimeMenuItem list
 * @function
 * @returns {Array<DateTimeMenuItem>} the list if DateTimeMenuItem instances
 */
function createDateTimeMenuItemList () {
  return [
    new DateTimeMenuItem('dd/mm/yyyy, HH\'h\'MM\'\'\'ss'),
    new DateTimeMenuItem('dd/mm/yyyy, HH\'h\'MM'),
    new DateTimeMenuItem('dd/mm/yyyy'),
    new DateTimeMenuItem('HH\'h\'MM\'\'\'ss'),
    new DateTimeMenuItem('HH\'h\'MM'),
    new DateTimeMenuItem('dddd'),
    new DateTimeMenuItem('dd'),
    new DateTimeMenuItem('mm'),
    new DateTimeMenuItem('mmmm'),
    new DateTimeMenuItem('yy'),
    new DateTimeMenuItem('yyyy')
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
 * Set all menu items elements when each one is rendered
 * @function
 * @param {Array<DateTimeMenuItem>} dateTimeMenuItemList The list of DateTimeMenuItem instances
 * @returns {function} the setMenuItemsElements() event handler
 */
function setMenuItemsElementsOnRender (dateTimeMenuItemList) {
  return function setMenuItemsElements (evt, menuId) {
    if (menuId.indexOf(DateTimeMenuItem.prototype.PREFIX_ID) === 0) {
      var $menuElement = $('#' + menuId)
      $.each(dateTimeMenuItemList, function (i, item) {
        if (item.id === $menuElement.attr('id')) {
          item.setElement($menuElement)
        }
      })
    }
  }
}
