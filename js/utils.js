function clearCanvas() {
    algorithm.context.clearRect(0,0, canvas.width, canvas.height);
}
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
function updateTimer() {
    clearInterval(timer);
    timer = setInterval(algorithm.update, speed);
}
function changeAlgoType() {
    var size = $('#dataSize')[0].value;
    var existingAlgorithm = algorithm.name;
    var selectedAlgorithm = $('#algorithmSelect')[0].value;
    console.log(existingAlgorithm + " : " + selectedAlgorithm);
    var data = algorithm.data;
    
    if( size > 0 && existingAlgorithm !== selectedAlgorithm ) {
        clearInterval(timer);
        algorithm.stopNote1();
        algorithm.stopNote2();
        switch(selectedAlgorithm){
            case 'bubble':
                console.log("new BubbleSort");
                algorithm = new BubbleSort(data, 'canvas');
                break;
            case 'insertion':
                console.log("new InsertionSort");
                algorithm = new InsertionSort(data, 'canvas');
                break;
            case 'selection':
                console.log("new SelectionSort");
                algorithm = new SelectionSort(data, 'canvas');
                break;
        }
        algorithm.generateData(size);
        algorithm.audioOn = parseInt(document.getElementById('soundToggle').value);
        algorithm.restart();
        timer = window.setInterval(algorithm.update, speed);
    }
    else if( size > 0 ) {
        console.log('change data only');
        algorithm.generateData(size);
        algorithm.restart();
    }
}