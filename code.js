var rows = 24;
var cols = 24;

function initialize(){
    createTable();
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
            let cell = documnet.createElement("td");
            cell.setAttribute("id", i + '_' + j);
            cell.setAttribute("class", 'dead');
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}

window.onload = initialize;