/**
 * @module DateTimeMenuItem
 * @description This module exports the DateTimeMenuItem class
 */

'use strict'

var dateformat = require('dateformat')

var days = { 'Monday': 'Lundi', 'Tuesday': 'Mardi', 'Wednesday': 'Mercredi', 'Thursday': 'Jeudi', 'Friday': 'Vendredi', 'Saturday': 'Samedi', 'Sunday': 'Dimanche' }

var months = { 'January': 'Janvier', 'February': 'Février', 'March': 'Mars', 'April': 'Avril', 'May': 'Mai', 'June': 'Juin', 'July': 'Juillet', 'August': 'Août', 'September': 'Septembre', 'October': 'Octobre', 'November': 'November', 'December': 'Decembre' }

module.exports = DateTimeMenuItem

/**
 * This class instances permit to manage the plugin menu items
 * @class
 * @param {string} mask
 * @param {tinymce.Editor} editor The tinymce instance
 */
  this.mask = mask
  this.editor = editor
  this.title = mask
  this.setId()
}

/**
 * Set an menu item element to its object instance
 * @method
 * @param {DOMElement} element The element to set to its object instance (as a jquery set of one element)
 * @returns {undefined}
 */
DateTimeMenuItem.prototype.setElement = function ($element) {
  var that = this
  this.node = $element[0]
  $element.click(function () {
    var selectedNode = that.editor.selection.getNode()
    var dateNode = $('<span contenteditable="false" data-dynamicdate="' + that.mask + '">' + that.format() + '</span>')
    $(selectedNode).append(dateNode)
    console.log('selectedNode', selectedNode)
  })
}

/**
 * Shared prefix for all menu item element's id
 * @constant
 * @static
 */
DateTimeMenuItem.PREFIX_ID = 'dynamicdate-'

/**
 * Computes and encodes the id for the menu item element, then set it in the id property
 * @method
 * @returns {undefined}
 */
DateTimeMenuItem.prototype.setId = function () {
  var id = (this.PREFIX_ID + this.mask)
    .replace(/ /gi, '-space-')
    .replace(/\//gi, '-slash-')
    .replace(/:/gi, '-dots-')
    .replace(/,/gi, '-comma-')
    .replace(/'/gi, '-singlequote-')
  this.id = id
}

/**
 * Formats and translate in french a new date against the given date mask
 * @method
 * @param {string} mask The given mask
 * @returns {string} the mask-formated now-date, in french
 */
DateTimeMenuItem.prototype.format = function (mask) {
  var now = new Date()
  var formatted = dateformat(now, mask)
  // replace english days by french days
  for (var enDay in days) {
    var frDay = days[enDay]
    formatted = formatted.replace(enDay, frDay)
  }
  // replace english months by french ones
  for (var enMonth in months) {
    var frMonth = months[enMonth]
    formatted = formatted.replace(enMonth, frMonth)
  }
  return formatted
}
