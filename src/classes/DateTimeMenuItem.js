'use strict'

var dateformat = require('dateformat')

var days = { 'Monday': 'Lundi', 'Tuesday': 'Mardi', 'Wednesday': 'Mercredi', 'Thursday': 'Jeudi', 'Friday': 'Vendredi', 'Saturday': 'Samedi', 'Sunday': 'Dimanche' }

var months = { 'January': 'Janvier', 'February': 'Février', 'March': 'Mars', 'April': 'Avril', 'May': 'Mai', 'June': 'Juin', 'July': 'Juillet', 'August': 'Août', 'September': 'Septembre', 'October': 'Octobre', 'November': 'November', 'December': 'Decembre' }

module.exports = DateTimeMenuItem

/**
 * @class
 * @param {string} mask
 */
function DateTimeMenuItem (mask) {
  this.text = this.format(mask)
  this.mask = mask
  this.title = mask
  this.setId()
}

/**
 * @method
 * @param {DOMElement} element
 */
DateTimeMenuItem.prototype.setElement = function ($element) {
  this.node = $element[0]
  console.log(this.node)
}

DateTimeMenuItem.prototype.PREFIX_ID = 'dynamicdate-'

DateTimeMenuItem.prototype.setId = function () {
  var id = (this.PREFIX_ID + this.mask)
    .replace(/ /gi, '-space-')
    .replace(/\//gi, '-slash-')
    .replace(/:/gi, '-dots-')
    .replace(/,/gi, '-comma-')
    .replace(/'/gi, '-singlequote-')
  this.id = id
}

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
