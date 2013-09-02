function initArray(a) {
  for( var i = 0; i < a.length; i++ ) {
      a[i] = Math.random();
  }
}
  
function swap(array, one, two) { 
  var temp = array[one];
  array[one] = array[two];
  array[two] = temp;

}
function copy(array) {
  var copy = new Array(array.length);
  for (var i = 0; i < array.length; i++) {
      copy[i] = array[i];
  }
  return copy;
}
printVal = function(slider, textBox) {
  var x = document.getElementById(slider);
  var y = document.getElementById(textBox);
  y.value = x.value;
  
};
function setDynamicTimeout( callback ) {
  var internalCallback = function()
  {
    return function()
    {
        window.setTimeout( internalCallback, speed );
        callback();
    };
  }();

  window.setTimeout( internalCallback, speed );
}
function changeAlgoType(algorithm) {
    var size = $('#dataSize')[0].value;
    var existingAlgorithm = algorithm.sort;
    // var selectedAlgorithm = $('#algorithmSelect')[0].value;
    var data = algorithm.data;
    
    if( size > 0 && existingAlgorithm !== selectedAlgorithm ) {
        // algorithm = null;
        // delete(algorithm);

        algorithm = new BubbleSort(algorithm.data, algorithm.canvas);
        // switch(selectedAlgorithm){
        //     case 'bubble':
        //         console.log("new BubbleSort");
        //         algorithm = new BubbleSort(data, $('#canvas'));
        //         break;
        //     case 'insertion':
        //         console.log("new InsertionSort");
        //         algorithm = new InsertionSort(data, $('#canvas'));
        //         break;
        //     case 'selection':
        //         console.log("new SelectionSort");
        //         algorithm = new SelectionSort(data, $('#canvas'));
        //         break;
        // }
        algorithm.generateData(size);
        algorithm.restart();
    }
    else if( size > 0 ) {
        console.log('change data only');
        algorithm.generateData(size);
        algorithm.restart();
    }
}