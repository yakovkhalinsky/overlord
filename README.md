**OVERVIEW**

Overlord was designed as a utility to help manage aggregate watches in Angular.

As it just compares collections of values or objects, it could in theory be used for monitoring changes on generic collections.

Overlord provides a couple of options in regards to managing callbacks on changes.


**DEPENDENCIES**

Overlord depends on having either the lodash or underscore library to do equality checking.

lodash website: <http://lodash.com/>
underscore website: <http://underscorejs.org/>


**USAGE**

*Creating an overlord before adding your watchers*
<pre><code>var overlord = new ninebytes.Overlord();</code></pre>


*Adding a basic watcher basic*
<pre><code>overlord.addWatcher('watchedProperty');</code></pre>


*Adding a watcher with a callback*

Don't execute the callback when the WATCHER function is called.
<pre><code>overlord.addWatcher('watchedProperty', cb);</code></pre>

Execute the callback when the WATCHER function is called.
<pre><code>overlord.addWatcher('watchedProperty', cb, true);</code></pre>


*Get the watch expression for an Angular watch*
<pre><code>overlord.getWatchExpression()</code></pre>

Returns a valid Angular watch expression, e.g. <code>['foo', 'bar', 'boo']<code>.


*Calling the watcher*
<pre><code>overlord.WATCHER(newValues, oldValues);</code></pre>

<code>newValues</code> and <code>oldValues</code> will be a collection of values corresponding to the named <code>watchProperty</code>.


**CHANGES**

Calling <code>overlord.WATCHER(newValues, oldValues);</code> returns a <code>changes</code> object.

<pre><code>{
  watchedProperty: { 
    source: 'watchedProperty',
    newVal: 'newValue',
    oldVal: 'oldValue',
    cb: callbackFunction
  }
}</code></pre>

**NOTE:** If a watch is added without setting the <code>execute</code> flag on the callback, e.g. by setting the callback like this: <code>overlord.addWatcher('watchedProperty', cb);</code>, the <code>cb</code> property will be set to ```undefined```.


**EXAMPLES**

A working set of examples can be found in the ```/example``` directory.


**TO DO**
-  Add unit tests
-  Better documentation


**CONTRIBUTION**

Contributions are more than welcome!

Please fork and add pull requests, or add issues if you feel something is missing.


**LICENSE**

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
