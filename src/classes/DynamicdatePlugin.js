'use strict'

var $ = window.jQuery
var DateTimeMenuItem = require('./DateTimeMenuItem')

module.exports = DynamicdatePlugin

function DynamicdatePlugin (editor) {
  var dateTimeMenuItemList = createDateTimeMenuItemList()

  editor.addMenuItem('dynamicdate', createDynamicdateMenuOptions(dateTimeMenuItemList))

  $('body').on('menusController:mceMenuItemRendered', setMenuItemsElementsOnRender(dateTimeMenuItemList))
}

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

function createDynamicdateMenuOptions (dateTimeMenuItemList) {
  return {
    context: 'insert',
    text: 'Dynamic date',
    type: 'menuitem',
    id: 'menu-dynamicdate',
    menu: dateTimeMenuItemList
  }
}

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
