var rows = 24;
var cols = 24;

var playing = false;

function initialize(){
    createTable();
    setupControlButtons();
}

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
    let classes = this.getAttribute("class");
    if(classes.indexOf('live') > -1){
        this.setAttribute("class", "dead")
    } else {
        this.setAttribute("class", "live")
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

window.onload = initialize;