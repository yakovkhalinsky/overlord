
var app = angular.module('OverlordApp',[]);
 
app.controller('OverlordCtrl', ['$scope', function(scope) {
  scope.text1 = 'foo';
  scope.text2 = 'bar';
  scope.text3 = 'boo';
  scope.select1 = 'select1';
  scope.obj = {text1: 'abcd', text2: 'efgh'};
  
  var overlord = new ninebytes.Overlord();

  // Add a watcher
  // This will simply cause the source property to be added to the returned
  //  changes object when the WATCHER function is called
  overlord.addWatcher('text1');
  overlord.addWatcher('text2');
  overlord.addWatcher('obj');

  // We will use this as our generic callback function
  var cb = function (newVal) { 
    scope.text1 = newVal;
  };

  // Add a watcher with a callback that doesn't execute when the watch is called
  // In this example we are going to use the new value of select1 to update text1
  // The callback function is not executed by the WATCHER function of the overlord
  // This is useful if you wish to run the callback with any extra arguments or
  // handle any other cases that require local execution of the callback function.
  overlord.addWatcher('select1', cb);

  // Add a watcher with a callback that executes when the watch is called
  // In this example we are going to use the new value of text3 to update text1
  // The callback function is executed by the WATCHER function of the overlord
  // The arguments passed to the callback by Overlord are NEWVAL, OLDVAL
  overlord.addWatcher('text3', cb, true);

  scope.$watch(
    overlord.getWatchExpression(), 
    function(newVals, oldVals) { 
      executeWatchers(newVals, oldVals, overlord); 
    },
    true
  );

  executeWatchers = function(newVals, oldVals, overlord) {
    changes = overlord.WATCHER(newVals, oldVals);
    
    console.log('changes', changes);
    output = 'NEW: ' + JSON.stringify(newVals);
    output += '<br/>OLD: ' + JSON.stringify(oldVals);
    output += '<br/>CHANGES: ' + JSON.stringify(changes);
    consoleDiv(output, true);

    // Process any callbacks that haven't been called by the Overlord's WATCHER function
    processCallbacks(changes);
  };


  var processCallbacks = function(changes) {
    for (source in changes) {
      if(changes[source].cb) {
        changes[source].cb(changes[source].newVal, changes[source].oldVal);
      }
    }
  };

}]);


var consoleDiv = function(message, replace) {
  if(!replace) {
    message = $('#console').html() + '<br/>' + message;
  }
  $('#console').html(message);
}


$(document).ready(function(){
  $('#console').html('Output of watchers will appear here'); 
});
