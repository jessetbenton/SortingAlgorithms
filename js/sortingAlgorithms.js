function SortingAlgorithm() {
    this.canvas;
    this.context;
    this.hasAudio = true;
    this.audioOn = -1;
    this.name = "SortingAlgorithm";
    this.data; 
    this.dataSetCopy;
    this.comparisons = 0;
    this.swaps = 0;
    this.done = false;
    this.startTime = new Date();
    this.endTime;
    this.totalTime;
    this.index = 1;
    this.cursor = this.index;
    this.initAudio = function() {
        if(typeof AudioContext === "undefined" && typeof webkitAudioContext === "undefined") {
            this.hasAudio = false;
            console.log('AudioContext not supported. :(');
            $('#soundToggle').hide();
        }
        if(this.hasAudio) {
            this.oscillator_1 = audioContext.createOscillator();
            this.oscillator_1.type = 3;
            this.oscillator_2 = audioContext2.createOscillator();
            this.oscillator_2.type = 3; // sine wave
        }
    }
    this.playNote1 = function(value) {
        if(this.hasAudio && this.audioOn === 1) {
            this.oscillator_1.frequency.value = 300 + value * 500;
            this.oscillator_1.connect(audioContext.destination);
            this.oscillator_1.noteOn && this.oscillator_1.noteOn(0);
        }
    }
    this.stopNote1 = function() {
        if(this.hasAudio) {
            this.oscillator_1.disconnect();
        }
    }
    this.playNote2 = function(value) {
        if(this.hasAudio && this.audioOn === 1) {
            this.oscillator_2.frequency.value = 300 + (value * 500);
            this.oscillator_2.connect(audioContext2.destination);
            this.oscillator_2.noteOn && this.oscillator_2.noteOn(0);
        }
    }
    this.stopNote2 = function() {
        if(this.hasAudio) {
            this.oscillator_2.disconnect();
        }    
    }
    this.restart = function() {
        this.restartMore();
        this.data = copy(this.dataSetCopy);
        this.done = false;
        this.swaps = 0;
        this.cursor = 0;
        this.index = 0;
        this.comparisons = 0;
        this.startTime = new Date();
    }
    this.generateData = function(size) {
        var randData = new Array(parseInt(size));
        initArray(randData);
        this.data = randData;
        this.dataSetCopy = copy(randData);
    }
    this.update = function() {
        if( !algorithm.done ) {
            /*update*/
            algorithm.step();
            /*draw*/
            clearCanvas();
            algorithm.draw();
        }
    }
}

/******************
 * BUBBLE SORT *
 ******************/
BubbleSort.prototype = new SortingAlgorithm();
BubbleSort.prototype.constructor = BubbleSort;
function BubbleSort(dataSet, canvasId) {
    this.data = dataSet;
    this.dataSetCopy = copy(dataSet);
    this.name = "bubble";
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.swapped = true;
    this.lastSwapped = this.data.length;
    this.initAudio();
}
BubbleSort.prototype.draw = function () {
    var sortWidth, width, height, x, y;
    for (var i = 0; i < this.data.length; i++) {
      sortWidth = this.canvas.width;
      width = sortWidth / this.data.length;
      height = -this.data[i] * this.canvas.height;
    
      y = canvas.height;
      x = i * width + (this.canvas.width - sortWidth);
      
      if (i === this.cursor || i === this.index) {
        this.context.fillStyle = "blue";
      }
      else {
        this.context.fillStyle = "red";    
      }
      if( i >= this.lastSwapped || this.done ) {
        this.context.fillStyle = "green";
      }
      this.context.fillRect(x, y, width * .95, height);
    }
};
BubbleSort.prototype.step = function() {   
    if(this.index < this.lastSwapped) {
        if( this.data[this.index - 1] > this.data[this.index] ) {
            //sound
            this.stopNote1();
            this.stopNote2();
            this.playNote1(this.data[this.index-1]);
            this.playNote2(this.data[this.index]);
            this.cursor = this.index;
            swap(this.data, this.index-1, this.index);
            this.swapped = true;
            this.swaps++;
        }
    else {
        this.index++;
        this.swapped = false;
    }
    this.comparisons++;
    }
    else {
        this.lastSwapped = this.cursor;
        this.index = 0;
        this.cursor = this.index;
    }
    if( this.cursor === this.lastSwapped ) {
        this.done = true;
        this.swapped = false;
        this.stopNote1();
        this.stopNote2();
        this.stopTime = new Date();
        this.totalTime = this.stopTime - this.startTime;
        console.log("Insertion Sort\nSet Size: " + this.data.length + "\nComparisons: " + this.comparisons + "\nSwaps: " + this.swaps + "\nTime: " + this.totalTime / 1000 + " seconds");
    }
};
BubbleSort.prototype.restartMore = function() {
    this.lastSwapped = this.data.length;
    this.swapped = true;
};

/******************
 * SELECTION SORT *
 ******************/
SelectionSort.prototype = new SortingAlgorithm();
SelectionSort.prototype.constructor = SelectionSort;
function SelectionSort(dataSet, canvasId) {
    this.data = dataSet;
    this.dataSetCopy = copy(dataSet);
    this.name = "selection";
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.min = 0;
    this.index = 0;
    this.cursor = this.index;
    this.initAudio();
}
SelectionSort.prototype.draw = function() {
    var sortWidth, width, height, x, y;
      
    for (var i = 0; i < this.data.length; i++) {
        sortWidth = this.canvas.width;
        width = sortWidth / this.data.length;
        height = -this.data[i] * this.canvas.height;
        
        y = this.canvas.height;
        x = i * width + (this.canvas.width - sortWidth);
        
        if (i === this.index) {
            this.context.fillStyle = "white";
        }
        else {
            this.context.fillStyle = "red";
        }
        if (i < this.cursor) {
            this.context.fillStyle = "blue";
        }
        if (i === this.min) {
            this.context.fillStyle = "green";
        }
        if (this.done) {
            this.context.fillStyle = "green";
        }
        this.context.fillRect(x, y, width * .95, height);
    }
};
SelectionSort.prototype.step = function() {
    this.oscillator_1.disconnect();
    this.oscillator_2.disconnect();
    if (this.index < this.data.length) {
        this.comparisons++;
        if (this.data[this.index] < this.data[this.min]) {
            this.playNote1(this.data[this.min]);
            this.min = this.index;
        }
        this.playNote2(this.data[this.index]);
    }
    else {
        this.comparisons++;
        swap(this.data, this.cursor, this.min);
        this.swaps++;
        this.cursor++;
        this.min = this.cursor;
        this.index = this.cursor;
    }
    //end condition
    if (this.cursor === this.data.length) {
        this.done = true;
        this.stopNote1();
        this.stopNote2();
        this.stopTime = new Date();
        this.totalTime = this.stopTime - this.startTime;
        console.log("Selection Sort\nSet Size: " + this.data.length + "\nComparisons: " + this.comparisons + "\nSwaps: " + this.swaps + "\nTime: " + this.totalTime / 1000 + " seconds");
    }
    this.index++;
};
SelectionSort.prototype.restartMore = function() {
    this.min = 0;
    this.index = 0;
};

/******************
 * INSERTION SORT *
 ******************/
InsertionSort.prototype = new SortingAlgorithm();
InsertionSort.prototype.constructor = InsertionSort;
function InsertionSort(dataSet, canvasId) {
    this.data = dataSet;
    this.name = "insertion";
    this.dataSetCopy = copy(dataSet);
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.initAudio();
}
InsertionSort.prototype.draw = function() {
    var sortWidth, width, height, x, y;

    for (var i = 0; i < this.data.length; i++) {
        sortWidth = this.canvas.width;
        width = sortWidth / this.data.length;
        height = -this.data[i] * this.canvas.height;
        
        y = this.canvas.height;
        x = i * width + (this.canvas.width - sortWidth);
        
        if (i === this.index) {
            this.context.fillStyle = "white";
        }
        else {
            this.context.fillStyle = "red";
        }
        if (i === this.cursor || i === this.cursor - 1) {
            this.context.fillStyle = "blue";
        }
        if (this.done) {
            this.context.fillStyle = "green";
        }
        this.context.fillRect(x, y, width * .95, height);
    }
};
InsertionSort.prototype.step = function() {
    if( this.cursor > 0 ) {
        if( this.data[this.cursor] < this.data[this.cursor -1] ) {
            //sound
            this.stopNote1();
            this.stopNote2();
            this.playNote2(this.data[this.cursor-1]);
            this.playNote1(this.data[this.cursor]);
            swap(this.data,this.cursor, this.cursor-1);
            this.cursor--;
            this.swaps++;
        }
        else {
            this.index++;
            this.cursor = this.index;
        }
        this.comparisons++;
    }
    else {
        this.index++;
        this.cursor = this.index;
    }
    if( this.index > this.data.length ) {
        this.done = true;
        this.stopNote1();
        this.stopNote2();
        this.stopTime = new Date();
        this.totalTime = this.stopTime - this.startTime;
        console.log("Insertion Sort\nSet Size: " + this.data.length + "\nComparisons: " + this.comparisons + "\nSwaps: " + this.swaps + "\nTime: " + this.totalTime / 1000 + " seconds\n");
    }
};
InsertionSort.prototype.restartMore = function() {
    //nothing extra
};
