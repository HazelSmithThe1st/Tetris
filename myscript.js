class shape{
    name 
    state = []
    color
    points
    row
    coll
    row_num
    coll_num

    constructor(name, state, color, points) {
        this.name = name
        this.state = state      
        this.color = color
        this.row = 0
        this.coll = 3  
        this.points = points
        this.row_num = state.length
        this.coll_num = state[0].length
        // this.next_state = rotateMatrix_right()
       
    }

    rotateMatrix_right() { 
        if (this.name !== "O"){

            let M = this.state.length    
            let N = this.state[0].length
            let ret = new Array()
        
            for (let i = 0; i < N; i++){
                ret[i] = []
            }

            for (let r = 0; r < M; r++) { 
                for (let c = 0; c < N; c++) {
                    ret[c][M - 1 - r] = this.state[r][c]
                } 
            }       
            
            this.state = ret
            this.row_num = this.state.length
            this.coll_num = this.state[0].length        
        }        
    }

    // rotateMatrix_left() { 
    //     if (this.name !== "O"){

    //         let M = this.state.length    
    //         let N = this.state[0].length
    //         let ret = new Array()
        
    //         for (let i = 0; i < N; i++){
    //             ret[i]=[]
    //         }

    //         for (let r = 0; r < M; r++) { 
    //             for (let c = 0; c < N; c++) {
    //                 ret[N-c-1][r] = this.state[r][c]
    //             }
    //         }       
            
    //         this.state = ret 
    //         this.row_num = this.state.length
    //         this.coll_num = this.state[0].length      
    //     }        
    // }
}

let table
let nexttable
let corrent_shape
let next_shape
const tableshight = 22
const tableswidth = 10
const naexttable_size = 6
const arrow = { left: 37, up: 38, right: 39, down: 40, space: 32}
let start = false
let score = 0
let shapes = []
const default_color = "gray"
const colors = ["#F00","#0F0","#22F","#F0F", "#FF0","#F70","#0EE"]
//              red, green, blue, purple, yellow, orange, cyan
//               Z,   S,     J,    T,      O,      L,      I
// include('C:\Users\u135008\Desktop\חפיפה\Tetris\shape.js')

// function include(file) {   
//     var script  = document.createElement('script')
//     script.src  = file
//     script.type = 'text/javascript'
//     script.defer = true    
//     document.getElementsByTagName('head')[0].appendChild(script)
// }     

window.onload = function () { win_onload() }

function createTable() {    
    for (let i = 0; i < tableshight; i++){
        let row = table.insertRow(0)
        for (let j = 0; j < tableswidth; j++){
            let cell1 = row.insertCell(j) 
            cell1.style.backgroundColor = default_color
        }
    }    
    for (let i = 0; i < naexttable_size;i++){
        let row = nexttable.insertRow(0)
        for (let j = 0; j < naexttable_size; j++){
            let cell1 = row.insertCell(j)    
            cell1.style.backgroundColor = default_color
        }
    }  
}

function win_onload() {
    initializ()
    createTable()    
    set_shape_in_table(corrent_shape.row ,corrent_shape.coll)
    set_next_shape()
}

function initializ(){
    table = document.getElementById("myTable")
    nexttable = document.getElementById("nextTable")
    let tetromino_Z =  new shape("Z", [[1,1,0],[0,1,1]], "#F00", 15)
    let tetromino_S = new shape("S", [[0,1,1],[1,1,0]] , "#0F0", 15)
    let tetromino_T = new shape("T", [[0,1,0],[1,1,1]], "#F0F", 8)
    let tetromino_J = new shape("J", [[1,1,1],[0,0,1]], "#22F", 10)
    let tetromino_L = new shape("L", [[1,1,1],[1,0,0]], "#F70", 10)
    let tetromino_I = new shape("I", [[1,1,1,1]], "#0EE" , 4)
    let tetromino_O = new shape("O", [[1,1],[1,1]], "#FF0", 4)
    shapes = [tetromino_I, tetromino_J, tetromino_L, tetromino_O, tetromino_S, tetromino_T, tetromino_Z]
    next_shape = shapes[Math.floor(Math.random() * 7)]
    corrent_shape = shapes[Math.floor(Math.random() * 7)]
}

function start_game(){
    start = true
    document.getElementById("start_btn").style.visibility= 'hidden'
    movement()
}

function movement() {  
    // let id = setInterval(frame, 1000)  // clearInterval(id)
    setInterval(frame, 1000)
}

function frame() {
    let r_ = corrent_shape.row
    let c_ = corrent_shape.coll
    
    if ((r_ + corrent_shape.row_num) === (tableshight)) {               
        update_shape()                 
    }else {      
        if (check_down()){            
            delete_shape()                
            set_shape_in_table(r_ + 1, c_)
        }else{
            update_shape()
        }
    }       
}

function check_down(){
    if ((corrent_shape.row + corrent_shape.row_num) === (tableshight)) {  
        return false                 
    }
    for (let j = 0; j < corrent_shape.coll_num; j++){                          
        if (corrent_shape.state[corrent_shape.row_num - 1][j] === 1){     
            if (table.rows[corrent_shape.row + corrent_shape.row_num].cells[corrent_shape.coll + j].style.backgroundColor !== default_color ){               
                return false
            }
        }
    }       
    for (let i = (corrent_shape.row_num - 2); i >= 0; i--){
        for (let t  = 0; t < corrent_shape.coll_num; t++){
            if (corrent_shape.state[i][t] === 1 && corrent_shape.state[i + 1][t] === 0){
                if (table.rows[corrent_shape.row + i + 1].cells[corrent_shape.coll + t].style.backgroundColor !== default_color){ 
                    return false
                }
            }
        }
    }    
    return true   
}

function score_update(){
    document.getElementById('score').innerHTML =  score
}

function update_shape(){
    check_rows()
    score += corrent_shape.points
    score_update()
    corrent_shape = next_shape
    next_shape = shapes[Math.floor(Math.random() * 7)]
    set_shape_in_table(0,3)
    set_next_shape()
}

function set_next_shape(){    
    for (let i = 0; i < naexttable_size; i++){      
        for (let j = 0; j < naexttable_size; j++){                
            nexttable.rows[i].cells[j].style.backgroundColor = default_color
        }
    }
    for (let i = 0; i < next_shape.row_num; i++){
        for (let j = 0; j < next_shape.coll_num; j++){
            if (next_shape.state[i][j] === 1){
                nexttable.rows[1 + i].cells[1 + j].style.backgroundColor = next_shape.color
            }
        }
    }
}

function set_shape_in_table(r_,c_){ 
    for (let i = 0; i < corrent_shape.row_num; i++){
        for (let j = 0; j < corrent_shape.coll_num; j++){
            if (corrent_shape.state[i][j] === 1){
                table.rows[r_ + i].cells[c_ + j].style.backgroundColor = corrent_shape.color
            }
        }
    }
    corrent_shape.row = r_
    corrent_shape.coll = c_
}

function delete_shape(){
   for (let i = 0; i < corrent_shape.row_num; i++){    
       for (let j = 0; j < corrent_shape.coll_num; j++){        
            if (corrent_shape.state[i][j] === 1){                
                table.rows[i + corrent_shape.row].cells[j + corrent_shape.coll].style.backgroundColor = default_color
            }
       }
   }
}

function check_rows(){
    let rows_to_delete = []
    for (let i = 0; i < corrent_shape.row_num; i++){
        let check = true
        let j = 0
        while(j < 10 && check === true){
            if (table.rows[i + corrent_shape.row].cells[j].style.backgroundColor === default_color){
                check = false
            }
            j++
        }
        if (check){
            rows_to_delete.push(i+corrent_shape.row)
        }       
    }
   
    for (let t = 0; t < rows_to_delete.length; t++){
        table.deleteRow(rows_to_delete[t]) 
        let row = table.insertRow(0)
        for (let j = 0; j < 10; j++){
            let cell1 = row.insertCell(j)     
            cell1.style.backgroundColor = default_color
        }
  
    }
   
    if (0 < rows_to_delete.length){
        score += 100 * Math.pow(rows_to_delete.length ,1.3)
        score = Number(score.toFixed(2))   
    }

}

function check_left(){
    
    if (corrent_shape.coll === 0){
        return false
    }

    for (let i = 0; i < corrent_shape.row_num;i++){
        if (corrent_shape.state[i][0] === 1){
            if (table.rows[i + corrent_shape.row].cells[corrent_shape.coll - 1].style.backgroundColor !== default_color){
                return false
            }
        }
    }

    for (let j = 1; j < corrent_shape.coll_num; j++){
        for (let t = 0; t < corrent_shape.row_num; t++){
            if (corrent_shape.state[t][j] === 1 && corrent_shape.state[t][j - 1] === 0){
                if (table.rows[t + corrent_shape.row].cells[corrent_shape.coll + j - 1].style.backgroundColor !== default_color){
                    return false
                }
            }
        }
    }
    
    return true
}

function check_right(){
   
    if ((corrent_shape.coll + corrent_shape.coll_num) === tableswidth){
        return false
    }
   
    for ( let i = 0; i < corrent_shape.row_num; i++){
        if (corrent_shape.state[i][corrent_shape.coll_num] === 0){
            if (table.rows[i + corrent_shape.row].cells[corrent_shape.coll + corrent_shape.coll_num].style.backgroundColor !== default_color){
                return false
            }
        }
    }
   
    for (let j = (corrent_shape.coll_num - 2); j >= 0; j--){
        for (let t = 0; t < corrent_shape.row_num; t++){
            if (corrent_shape.state[t][j] === 1 && corrent_shape.state[t][j + 1] === 0){
                if (table.rows[t + corrent_shape.row].cells[corrent_shape.coll + j + 1].style.backgroundColor !== default_color){
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
    if (f === 0){
        for (let i = 0; i < corrent_shape.row_num; i++){
            for (let j = 0; j < corrent_shape.coll_num; j++){
                if (corrent_shape.state[i][j] === 1){
                    if (table.rows[i + corrent_shape.row].cells[corrent_shape.coll + j] !== default_color){
                        corrent_shape.otateMatrix_left()
                        set_shape_in_table(corrent_shape.row,corrent_shape.coll)
                        return false
                    }
                }
            }
        }
    }else if (f === 1) {
        for (let i = 0; i < corrent_shape.row_num; i++){
            for (let j = 0; j < corrent_shape.coll_num; j++){
                if (corrent_shape.state[i][j] === 1){
                    if (table.rows[i+tableshight - corrent_shape.row_num].cells[corrent_shape.coll + j] !== default_color){
                        corrent_shape.otateMatrix_left()
                        set_shape_in_table(corrent_shape.row,corrent_shape.coll)
                        return false
                    }
                }
            }
        }
    }
    return true

}

document.addEventListener('keydown', function(event) {
    
    if (start){
        switch (event.keyCode) {
            case arrow.left:{
                if (check_left()){
                    delete_shape()
                    set_shape_in_table(corrent_shape.row, corrent_shape.coll - 1)
                }                
                break
            }
            case arrow.right:{
                if (check_right()){
                    delete_shape()
                    set_shape_in_table(corrent_shape.row, corrent_shape.coll + 1)
                }
                break
            }
            case arrow.down:{
                if (check_down()){            
                    delete_shape()                
                    set_shape_in_table(corrent_shape.row+1,corrent_shape.coll)
                }else{
                    update_shape()
                }   
                break
            }
            case arrow.space:{
                // if (check_spin(){})
                if ((corrent_shape.coll_num + corrent_shape.row) <= tableshight){
                    delete_shape()
                    corrent_shape.rotateMatrix_right()
                    set_shape_in_table(corrent_shape.row, corrent_shape.coll)
                }else if ((corrent_shape.coll_num + corrent_shape.row) > tableshight){
                    delete_shape()
                    corrent_shape.rotateMatrix_right()
                    set_shape_in_table((tableshight - corrent_shape.row_num), corrent_shape.coll)
                }                
                break
            }
        }
    } 
});



