var rows = 24;
var cols = 24;

var playing = false;

var grid = new Array(rows);
var nextGrid = new Array(rows);

function initializeGrid(){
    for(var i=0; i<rows; i++){
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}

function resetGrids(){
    for(var i=0; i<rows; i++){
        for(var j=0; j<cols; j++){
            grid[i][j] = new Array(cols);
            nextGrid[i][j] = new Array(cols);
        }
    }
}

function initialize(){
    createTable();
    initializeGrid();
    resetGrids();
    setupControlButtons();
}


// layout the board
function createTable(){
    let gridContainer = document.getElementById("gridContainer");
    if(!gridContainer){
        // throe error
        console.error("Problem: no div for the grid table!")
    }

    let table = document.createElement("table");

    for(let i = 0; i < rows; i++){
        let tr = document.createElement("tr");
        for(let j = 0; j < cols; j++){
            let cell = document.createElement("td");
            cell.setAttribute("id", i + '_' + j);
            cell.setAttribute("class", 'dead');
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}

function cellClickHandler(){
    var rowcol = this.id.split("_");
    var row = rowcol[0];
    var col = rowcol[1];


    let classes = this.getAttribute("class");
    if(classes.indexOf('live') > -1){
        this.setAttribute("class", "dead");
        grid[row][col] = 0;
    } else {
        this.setAttribute("class", "live")
        grid[row][col] = 1;
    }
}

function setupControlButtons(){
    //button to start
    let startButton = document.getElementById('start');
    startButton.onclick = startButtonHandler;

    //button to clear
    let clearButton = document.getElementById('clear');
    clearButton.onclick = clearButtonHandler;
}

function clearButtonHandler(){
    playing = false;
    let startButton = document.getElementById('start');
    startButton.innerHTML = "start";
}

function startButtonHandler(){
    if(playing){
        playing = false;
        this.innerHTML = "continue"
    } else{
        playing = true;
        this.innerHTML = "pause";
        play();
    }
}

function play(){

}

function computeNextGen(){
    for(var i = 0; i<rows; i++){
        for(var j = 0; j<rows; j++){
            applyRules(i,j)
        }

    }
}

function play(){

}

function play(){

}

window.onload = initialize;