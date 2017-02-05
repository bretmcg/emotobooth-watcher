/**
 * @license
 *      Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var config = require('./config.js');
var request = require('request');
var chokidar = require('chokidar');
var fs = require('fs');

var config = require('./config.js');
//var watchDir = './photos-watch/';
//var uploadUsername = 'gdg-kc';
//var uploadPassword = 'gdg-kc-r0xx';
//var uploadUrl = 'http://104.198.217.115:8080/photo';

var watcher = chokidar.watch(config.watchDir, {
  ignored: /(^|[\/\\])\../,
  ignoreInitial: true
});

watcher.on('add', path => {
  console.log('New file added: ' + path + ', sending to Emotobooth...');
  var formData = {
    username: config.uploadUsername,
    password: config.uploadPassword,
    photo: fs.createReadStream(path)
  }
  request.post({url: config.uploadUrl, formData: formData}, 
    (err, response, body) => {
      if (err) {
        return console.error('Photo upload failed: ', err);
      }
      console.log(body);
  });
});

console.log('Watching ' + config.watchDir + ' for new files...');
