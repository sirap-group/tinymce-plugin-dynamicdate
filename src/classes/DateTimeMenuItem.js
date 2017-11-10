/**
 * @module DateTimeMenuItem
 * @description This module exports the DateTimeMenuItem class
 */

'use strict'

var $ = window.jQuery

// import underscore methods
var _ = window._ || {}
_.escape = _.escape || require('lodash.escape')
_.unescape = _.unescape || require('lodash.unescape')

var moment = require('moment')

var days = { 'Monday': 'Lundi', 'Tuesday': 'Mardi', 'Wednesday': 'Mercredi', 'Thursday': 'Jeudi', 'Friday': 'Vendredi', 'Saturday': 'Samedi', 'Sunday': 'Dimanche' }

var months = { 'January': 'Janvier', 'February': 'Février', 'March': 'Mars', 'April': 'Avril', 'May': 'Mai', 'June': 'Juin', 'July': 'Juillet', 'August': 'Août', 'September': 'Septembre', 'October': 'Octobre', 'November': 'Novembre', 'December': 'Decembre' }

module.exports = DateTimeMenuItem

/**
 * This class instances permit to manage the plugin menu items
 * @class
 * @param {string} mask
 * @param {tinymce.Editor} editor The tinymce instance
 */
function DateTimeMenuItem (mask, editor) {
  this.mask = mask
  this.editor = editor
  this.text = this.format()
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
  this.node = $element[0]

  // ensure there isnt any click handler before binding it (see #7)
  var listeners
  try {
    listeners = $._data($(this.node).get(0), 'events')
  } catch (e) {}
  if (!listeners || !listeners.click || !listeners.click.length) {
    $element.click(insertDateSpan.bind(this))
  }
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
  var id = (DateTimeMenuItem.PREFIX_ID + this.mask)
    .replace(/ /gi, '-space-')
    .replace(/\//gi, '-slash-')
    .replace(/:/gi, '-dots-')
    .replace(/,/gi, '-comma-')
    .replace(/'/gi, '-singlequote-')
    .replace(/\[/gi, '-left-square-bracket-')
    .replace(/\]/gi, '-right-square-bracket-')
  this.id = this.editor.id.concat('-', id)
}

/**
 * Formats and translate in french a new date against the date mask set to the instance
 * @method
 * @returns {string} the mask-formated now-date, in french
 */
DateTimeMenuItem.prototype.format = function () {
  var now = new Date()
  var formatted = moment(now).format(this.mask)
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

/**
 * Insert the date span HTML element
 * @method
 * @private
 * @return {undefined}
 */
function insertDateSpan () {
  var that = this
  var selectedNode = this.editor.selection.getNode()
  // search the closest font family and size
  var closestFontConfig = getClosestNodeWithFontConfig(selectedNode, 'Calibri', '12pt', this.editor)

  this.editor.undoManager.transact(function () {
    $('<span>' + that.format() + '</span>')
    .attr('contenteditable', false)
    .attr('data-dynamicdate', that.mask)
    .css(closestFontConfig)
    .appendTo(selectedNode)
  })
}

/**
 * @typedef FontConfig
 * @type object
 * @property {string} fontFamily The font-family name
 * @property {string} fontSize The font-size with unit (ex: "12pt")
 */

/**
 * Search the closest span element for wich font size and family is defined. Begins with previous, then next, and finally search through the ancestors and their children
 * @function
 * @param {DOMNode} the node from wich the search starts
 * @returns {null|FontConfig}
 */
function getClosestNodeWithFontConfig (node, defaultFamily, defaultSize, editor) {
  var $node = $(node)
  var $currentNode
  var found, $found

  // is node ok itself ?
  $currentNode = $node.filter(fontConfigFilter)
  if ($currentNode.length) {
    $found = $currentNode
  } else {
    var $allNodes = $('*', editor.getDoc())
    var nodePosition = $allNodes.index(node)

    var $allSpans = $('span', editor.getDoc()).filter(fontConfigFilter)
    var allSpanPositions = $allSpans.map(function (i, el) {
      return $allNodes.index(el)
    })

    var lowerPositions = []
    var greaterPositions = []
    $.each(allSpanPositions, function (i, documentPosition) {
      if (documentPosition < nodePosition) {
        lowerPositions.push(documentPosition)
      } else if (documentPosition > nodePosition) {
        greaterPositions.push(documentPosition)
      }
    })

    var prevIndex = Math.max.apply(null, lowerPositions)
    var nextIndex = Math.min.apply(null, greaterPositions)

    if (!isNaN(prevIndex) && isFinite(prevIndex)) {
      found = $allNodes[prevIndex]
    } else if (!isNaN(nextIndex) && isFinite(nextIndex)) {
      found = $allNodes[nextIndex]
    }
    if (found) {
      $found = $(found)
    }
  }

  if ($found) {
    return getConfigFromElement($found)
  } else {
    return {
      fontFamily: defaultFamily,
      fontSize: defaultSize
    }
  }
}

/**
 * A jquery filter to filter span elements having fontFamily and fontSize defined
 * @function
 * @returns {boolean} true|false
 */
function fontConfigFilter () {
  return (this.style.fontFamily && this.style.fontSize)
}

/**
 * A handy function to return a FontConfig type object from the element styles values
 * @function
 * @param {jQuery} $element A jQuery object from the element to lookup the font style rules
 * @returns {FontConfig} the resulting fontConfig object
 */
function getConfigFromElement ($element) {
  return {
    fontFamily: $element[0].style.fontFamily,
    fontSize: $element[0].style.fontSize
  }
}
