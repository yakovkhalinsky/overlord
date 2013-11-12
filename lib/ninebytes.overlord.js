/*
  APPLICATION
  ninebytes.Overlord

  VERSION
  0.0.1

  CONTRIBUTORS
  Yakov Khalinsky yakov@ninebyt.es

  LICENSE
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

var ninebytes = ninebytes || {};

ninebytes.Overlord = function() {
  this.WATCHERS = {};
 

  this.addWatcher = function(source, cb, execute) {
    this.WATCHERS[source] = {source: source};
    if (cb) {
      this.WATCHERS[source].cb = cb;
      this.WATCHERS[source].execute = execute;
    }
  };


  this.getWatchExpression = function() {
    var inside = [];
    for(var source in this.WATCHERS) { inside.push(source); }
    return '[' + inside.join(', ') + ']';
  };


  this.WATCHER = function(newValues, oldValues) {
    var sources = Object.keys(this.WATCHERS);
    var changes = {};
    for (var index=0; index < sources.length; index++) {
      if (oldValues[index] !== newValues[index]) {
        changes[sources[index]] = {
          source: sources[index],
          newVal: newValues[index],
          oldVal: oldValues[index]
        };
        var cb = this.WATCHERS[sources[index]].cb;
        if (this.WATCHERS[sources[index]].execute) {
          cb(newValues[index], oldValues[index]);
        } else {
          changes[sources[index]].cb = cb;
        }
      }
    }
    return changes;
  };


};
