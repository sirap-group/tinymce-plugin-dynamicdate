/**
 * plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 2015 SIRAP SAS All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

'use strict'

var tinymce = window.tinymce
var DynamicdatePlugin = require('./classes/DynamicdatePlugin')

tinymce.PluginManager.add('dynamicdate', DynamicdatePlugin)
