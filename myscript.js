class shape{
    name; 
    state = [];
    next_state = []
    color;
    points;
    row;
    coll;
    row_num;
    coll_num;

    constructor(name,state , color, points) {
        this.name = name; 
        this.state=state;         
        this.color = color;
        this.row = 0;
        this.coll = 3;  
        this.points = points
        this.row_num=state.length;
        this.coll_num=state[0].length;
        // this.next_state = rotateMatrix_right()
       
    }
    getPoints(){
        return this.points
    }

    getRow_num(){
        return this.row_num;
    }
    getColl_num(){
        return this.coll_num;
    }
    getName(){
        return this.name;
    }
    setRow(value) {       
        this.row = value;
    }
    
    getRow() {
        return this.row;
    }
    setColl(value) {       
        this.coll = value;
    }
    
    getColl() {
        return this.coll;
    }
    getColor(){
        return this.color;
    }
    getState(){ 
        return this.state;
    }
    getState_somewhere(r,c){ 
        return this.state[r][c];
    }
    rotateMatrix_right() { 
        if(this.name != "O"){

            var M = this.state.length;    
            var N = this.state[0].length;
            var ret = new Array();
        
            for(var i = 0 ; i < N; i++){
                ret[i]=[];
            }

            for (var r = 0; r < M; r++) { 
                for (var c = 0; c < N; c++) {
                    ret[c][M-1-r] = this.state[r][c];
                }
            }       
            
            this.state = ret;
            this.row_num = this.state.length;
            this.coll_num = this.state[0].length;        
        }        
    }
    rotateMatrix_left() { 
        if(this.name != "O"){

            var M = this.state.length;    
            var N = this.state[0].length;
            var ret = new Array();
        
            for(var i = 0 ; i < N; i++){
                ret[i]=[];
            }

            for (var r = 0; r < M; r++) { 
                for (var c = 0; c < N; c++) {
                    ret[N-c-1][r] = this.state[r][c];
                }
            }       
            
            this.state = ret; 
            this.row_num = this.state.length;
            this.coll_num = this.state[0].length;       
        }        
    }
}

var tetromino_Z =  new shape("Z", [[1,1,0],[0,1,1]], "#F00",15)
var tetromino_S = new shape("S", [[0,1,1],[1,1,0]] , "#0F0",15)
var tetromino_T = new shape("T", [[0,1,0],[1,1,1]], "#F0F", 8)
var tetromino_J = new shape("J", [[1,1,1],[0,0,1]], "#22F",10)
var tetromino_L = new shape("L", [[1,1,1], [1,0,0]], "#F70",10)
var tetromino_I =new shape("I", [[1,1,1,1]], "#0EE" , 4)
var tetromino_O =new shape("O", [[1,1], [1,1]], "#FF0", 4)
var next_shape;
var corrent_shape;
var shapes = [tetromino_I,tetromino_J,tetromino_L,tetromino_O,tetromino_S,tetromino_T,tetromino_Z]
var tableshight = 22
var score = 0;
var colors = ["#F00","#0F0","#22F","#F0F", "#FF0","#F70","#0EE"]
//              red, green, blue, purple, yellow, orange, cyan
//               Z,   S,     J,    T,      O,      L,      I


function createTable() {
    // document.getElementById("demo").innerHTML = "Found " + x + " tr elements in the table.";
    //   document.getElementById("myTable").rows[1].cells[0].style.backgroundColor ="red";
    //   document.getElementById("myTable").rows =5;    
    var table = document.getElementById("myTable");
    for(var i = 0; i < tableshight ;i++){
        var row = table.insertRow(0);
        for(var j=0; j<10;j++){
            var cell1 = row.insertCell(j);     
            cell1.style.backgroundColor ="gray";
        }
    }
    var nexttable = document.getElementById("nextTable");
    for(var i = 0; i < 5 ;i++){
        var row = nexttable.insertRow(0);
        for(var j=0; j<6;j++){
            var cell1 = row.insertCell(j);     
            cell1.style.backgroundColor ="gray";
        }
    }
    // document.getElementById("myTable").rows[0].cells[0].style.backgroundColor ="red";


}
start = false
window.onload = function () { win_onload(); }

function win_onload() {
    createTable()
    next_shape = shapes[Math.floor(Math.random() * 7)]
    corrent_shape = shapes[Math.floor(Math.random() * 7)]
//   alert( document.getElementById("myTable").rows[0].cells[0].style.backgroundColor == "gray")
    set_shape_in_table(corrent_shape.getRow(),corrent_shape.getColl())
    set_next_shape()
}

function start_game(){
    start == true
    document.getElementById("start_btn").style.visibility= 'hidden';
    movement()
}

function movement() {     
   
    var id = setInterval(frame, 1250);  // clearInterval(id)

    function frame() {
        var r_ = corrent_shape.getRow();
        var c_ = corrent_shape.getColl();
        
        if ((r_ + corrent_shape.getRow_num() - 1) == (tableshight - 1)) {  
            // //check row               
            update_shape()                 
        }else {      
            if(check_down()){            
                delete_shape()                
                set_shape_in_table(r_ + 1, c_)
            }else{
                update_shape()
            }
        }        
    }
}

function check_down(){
    for(var j = 0 ; j < corrent_shape.getColl(); j++){                          
        if(corrent_shape.getState_somewhere(corrent_shape.getRow_num() - 1, j ) == 1){     
            if(document.getElementById("myTable").rows[corrent_shape.getRow() + corrent_shape.getRow_num()].cells[corrent_shape.getColl() + j].style.backgroundColor != "gray" ){               
                return false
            }
        }
    } 
    if ((corrent_shape.getRow() + corrent_shape.getRow_num() - 1) == (tableshight - 1)) {  
       return false                 
    }
    //////
    // for(var i = (corrent_shape.getRow_num() - 2); i >= 0  ; i--){
    //     for(var t  = 0; t<corrent_shape.getColl_num();t++){
    //         if (corrent_shape.getState_somewhere(i,t) == 1 && corrent_shape.getState_somewhere(i+1,t) == 0){
    //             if(document.getElementById("myTable").rows[corrent_shape.getRow() + i+1].cells[corrent_shape.getColl()+t].style.backgroundColor != "gray"){ 
    //                 return false
    //             }
    //         }
    //     }
    // }
    return true   
}

function score_update(){
    document.getElementById('score').innerHTML =  score;
}

function update_shape(){
    score += corrent_shape.getPoints()
    score_update()
    corrent_shape = next_shape
    next_shape = shapes[Math.floor(Math.random() * 7)]
    set_shape_in_table(0,3)
    set_next_shape()
}

function set_next_shape(){
    var nexttable = document.getElementById("nextTable");
    for(var i = 0; i < 5 ;i++){      
        for(var j=0; j<6;j++){                
            nexttable.rows[i].cells[j].style.backgroundColor ="gray";
        }
    }
    for(var i = 0; i < next_shape.getRow_num(); i++){
        for(var j = 0; j < next_shape.getColl_num(); j++){
            if(next_shape.getState_somewhere(i, j) == 1){
                document.getElementById("nextTable").rows[1 + i].cells[1+ j].style.backgroundColor = next_shape.getColor();
            }
        }
    }
}

function set_shape_in_table(r_,c_){ 
    for(var i = 0; i < corrent_shape.getRow_num(); i++){
        for(var j = 0; j < corrent_shape.getColl_num(); j++){
            if(corrent_shape.getState_somewhere(i, j) == 1){
                document.getElementById("myTable").rows[r_ + i].cells[c_ + j].style.backgroundColor = corrent_shape.getColor();
            }
        }
    }
    corrent_shape.setRow(r_);
    corrent_shape.setColl(c_);
}

function delete_shape(){
   for(var i = 0; i < corrent_shape.getRow_num(); i++){    
       for(var j = 0; j < corrent_shape.getColl_num(); j++){        
            if(corrent_shape.getState_somewhere(i, j) == 1){                
                document.getElementById("myTable").rows[i + corrent_shape.getRow()].cells[j + corrent_shape.getColl()].style.backgroundColor = "gray";
            }
       }
   }
}

function check_rows(){
//     var temp = 0;
//     var row = 0;
//     for(var i = 0; i < tableshight ; i++){
//         var check = true;
//         for(var j = 0 ; j < 10 ; i++){
//             if(document.getElementById("myTable").rows[i].cells[j].style.backgroundColor == "gray"){
//                 check = false;
//             }
//         }
//         if (!check){
//             temp += 1;
        
//         }

//     }
}

function check_left(){
    if(corrent_shape.getColl() == 0){
        return false
    }
    for(var i = 0; i < corrent_shape.getRow_num() ;i++){
        if(corrent_shape.getState_somewhere(i, 0) == 1){
            if(document.getElementById("myTable").rows[i+corrent_shape.getRow()].cells[corrent_shape.getColl() - 1].style.backgroundColor != "gray"){
                return false
            }
        }
    }
    for (var j = 1; j < corrent_shape.getColl_num(); j++){
        for (var t = 0; t < corrent_shape.getRow_num(); t++){
            if(corrent_shape.getState_somewhere(t,j) == 1 && corrent_shape.getState_somewhere(t,j - 1) == 0){
                if(document.getElementById("myTable").rows[t + corrent_shape.getRow()].cells[corrent_shape.getColl()+ j - 1].style.backgroundColor != "gray"){
                    return false
                }
            }
        }
    }
    return true
}

function check_right(){
    if((corrent_shape.getColl() + corrent_shape.getColl_num() - 1) == 9){
        return false
    }
    for( var i = 0; i < corrent_shape.getRow_num();i++){
        if(corrent_shape.getState_somewhere(i,(corrent_shape.getColl_num() - 1)) == 1){
            if(document.getElementById("myTable").rows[i + corrent_shape.getRow()].cells[corrent_shape.getColl() + corrent_shape.getColl_num()].style.backgroundColor != "gray"){
                return false
            }
        }
    }
    for (var j = (corrent_shape.getColl_num()-2); j >= 0; j--){
        for (var t = 0; t < corrent_shape.getRow_num(); t++){
            if(corrent_shape.getState_somewhere(t,j) == 1 && corrent_shape.getState_somewhere(t,j + 1) == 0){
                if(document.getElementById("myTable").rows[t + corrent_shape.getRow()].cells[corrent_shape.getColl()+ j + 1].style.backgroundColor != "gray"){
                    return false
                }
            }
        }
    }
    return true
}

function check_spin(){
    delete_shape()
    corrent_shape.rotateMatrix_right()
    if(f==0){
        for(var i = 0 ; i < corrent_shape.getRow_num(); i++){
            for(var j = 0 ; j < corrent_shape.getColl_num(); j++){
                if(corrent_shape.getState_somewhere(i , j) == 1){
                    if(document.getElementById("myTable").rows[i+corrent_shape.getRow()].cells[corrent_shape.getColl() + j] != "gray"){
                        corrent_shape.otateMatrix_left()
                        set_shape_in_table(corrent_shape.getRow(),corrent_shape.getColl())
                        return false
                    }
                }
            }
        }
    }else if (f ==1) {
        for(var i = 0 ; i < corrent_shape.getRow_num(); i++){
            for(var j = 0 ; j < corrent_shape.getColl_num(); j++){
                if(corrent_shape.getState_somewhere(i , j) == 1){
                    if(document.getElementById("myTable").rows[i+tableshight - corrent_shape.getRow_num()].cells[corrent_shape.getColl() + j] != "gray"){
                        corrent_shape.otateMatrix_left()
                        set_shape_in_table(corrent_shape.getRow(),corrent_shape.getColl())
                        return false
                    }
                }
            }
        }
    }
    return true

}

document.addEventListener('keydown', function(event) {
    var arrow = { left: 37, up: 38, right: 39, down: 40, space: 32};
    if(start){
        switch (event.keyCode) {
            case arrow.left:{
                if(check_left()){
                    delete_shape();
                    set_shape_in_table(corrent_shape.getRow(), corrent_shape.getColl() - 1);
                }
                
                break;
            }
            case arrow.right:{
                if(check_right()){
                    delete_shape();
                    set_shape_in_table(corrent_shape.getRow(), corrent_shape.getColl() + 1);
                }
                break;
            }
            case arrow.down:{
                if(check_down()){            
                    delete_shape()                
                    set_shape_in_table(corrent_shape.getRow()+1,corrent_shape.getColl())
                }else{
                    update_shape()
                }   
                break;
            }
            case arrow.space:{
                // if(check_spin(){})
                if((corrent_shape.getColl_num() + corrent_shape.getRow()) <= tableshight){
                    delete_shape();
                    corrent_shape.rotateMatrix_right();
                    set_shape_in_table(corrent_shape.getRow(), corrent_shape.getColl());
                }else if((corrent_shape.getColl_num() + corrent_shape.getRow()) > tableshight){
                    delete_shape();
                    corrent_shape.rotateMatrix_right();
                    set_shape_in_table((tableshight - corrent_shape.getRow_num()), corrent_shape.getColl())
                }
                ////////
                // alert("this is for the git")
                break;
            }
        }
    }
  
});







