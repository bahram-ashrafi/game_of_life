var rows = 24;
var cols = 24;

var playing = false;

var grid = new Array(rows);
var nextGrid = new Array(rows);

var timer;
var reproductionTime = 500;

function initializeGrid(){
    for(let i=0; i<rows; i++){
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}

function resetGrids(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

function copyAndResetGrids(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
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

function updateView(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            let cell = document.getElementById(i+"_"+j)
            if(grid[i][j]==0){
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class","live")
            }
        }
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
        this.innerHTML = "continue";
        clearTimeout(timer);
    } else{
        playing = true;
        this.innerHTML = "pause";
        play();
    }
}

function play(){
    console.log("Play the game");
    computeNextGen();

    if(playing){
        timer = setTimeout(play, reproductionTime);
    }
}

function computeNextGen(){
    for(let i = 0; i<rows; i++){
        for(let j = 0; j<cols; j++){
            applyRules(i,j)
        }
    }
    copyAndResetGrids();
    updateView();
}

function applyRules(row, col){
    let numNeighbors = countNeighbors(row, col);
    if(grid[row][col] == 1){
        if(numNeighbors < 2){
            nextGrid[row][col] = 0;
        } else if(numNeighbors == 2 || numNeighbors == 3) {
            nextGrid[row][col] = 1;
        } else if(numNeighbors > 3){
            nextGrid[row][col] = 0;
        }
    }

    else if(grid[row][col] == 0){
        if(numNeighbors == 3){
            nextGrid[row][col] = 1;
        }
    }
}

function countNeighbors(row, col){
    let count = 0;
    if(row-1 >= 0){
        if(grid[row-1][col] == 1) count++;
    }
    if(row-1 >= 0 && col-1 >= 0){
        if(grid[row-1][col-1] == 1) count++;
    }
    if(row-1 >= 0 && col+1 < cols){
        if(grid[row-1][col+1] == 1) count++;
    }
    if(col-1 >= 0){
        if(grid[row][col-1] == 1) count++;
    }
    if(col+1 < cols){
        if(grid[row][col+1] == 1) count++;
    }
    if(row+1 < rows){
        if(grid[row+1][col] == 1) count++;
    }
    if(row+1 < rows && col-1 >=0){
        if(grid[row+1][col-1] == 1) count++;
    }
    if(row+1 < rows && col+1 < cols){
        if(grid[row+1][col+1] == 1) count++;
    }
    return count;
}

window.onload = initialize;