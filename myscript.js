let id
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
const default_color = "rgb(128, 128, 128)"

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
  
    initialize()
    createTable()    
    set_shape_in_table(corrent_shape.row ,corrent_shape.coll)
    set_next_shape()
}

function initialize(){
    table = document.getElementById("myTable")
    nexttable = document.getElementById("nextTable")
    let tetromino_Z =  new shape("Z", [[1,1,0],[0,1,1]], "rgb((255, 0, 0)", 15)
    let tetromino_S = new shape("S", [[0,1,1],[1,1,0]] , "rgb(0, 255, 0)", 15)
    let tetromino_T = new shape("T", [[0,1,0],[1,1,1]], "rgb(255, 0, 255)", 8)
    let tetromino_J = new shape("J", [[1,1,1],[0,0,1]], "rgb(34, 34, 255)", 10)
    let tetromino_L = new shape("L", [[1,1,1],[1,0,0]], "rgb(255, 119, 0)", 10)
    let tetromino_I = new shape("I", [[1,1,1,1]], "rgb(0, 238, 238)" , 4)
    let tetromino_O = new shape("O", [[1,1],[1,1]], "rgb(255, 255, 0)", 4)
    shapes = [tetromino_I, tetromino_J, tetromino_L, tetromino_O, tetromino_S, tetromino_T, tetromino_Z]
    next_shape = shapes[Math.floor(Math.random() * 7)]
    corrent_shape = shapes[Math.floor(Math.random() * 7)]
}

function start_game(){
    start = true    
    movement()   
}

function movement() {  
    id = setInterval(frame, 1000)  // clearleterval(id)
    // setleterval(frame, 1000)
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
    let i = 0
    corrent_shape.row = 0
    corrent_shape.coll = 3
    corrent_shape = next_shape
    next_shape = shapes[Math.floor(Math.random() * 7)]
    // while( i < corrent_shape.row_num && start){
    //     let j = 0
    //     while( j < corrent_shape.coll_num && start ){
    //         if (corrent_shape.state[i][j] === 1){
    //             if (table.rows[i + corrent_shape.row].cells[j + corrent_shape.coll].style.backgroundColor !== default_color){
    //                 start = false
    //                 document.getElementById("end_img").style.visibility = 'visible'
    //                 nexttable.style.visibility = "hidden"
    //                 clearleterval(id)
                    
    //             }
    //         }
    //         j++
    //     }
    //     i++
    // }
    
    // if (start){
        set_shape_in_table(0,3)
        set_next_shape()
    // }
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

function set_shape_in_table(r_, c_){ 
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
    let count = 0 
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
            table.deleteRow(i + corrent_shape.row) 
            let row = table.insertRow(0)
            count += 1
            for (let j = 0; j < 10; j++){
                let cell1 = row.insertCell(j)     
                cell1.style.backgroundColor = default_color
            }
        }       
    }         
    score += 100 * Math.pow(count ,1.3)
    score = score.toFixed(2)
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

    for (let j =  1; j < corrent_shape.coll_num; j++){
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
        if (corrent_shape.state[i][corrent_shape.coll_num - 1] === 1){
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
    let flag = true 
    let r_ = corrent_shape.row
    let c_ = corrent_shape.coll

   
    let M = corrent_shape.state.length    
    let N = corrent_shape.state[0].length
    let ret = new Array()

    for (let i = 0; i < N; i++){
        ret[i] = []
    }

    for (let r = 0; r < M; r++) { 
        for (let c = 0; c < N; c++) {
            ret[c][M - 1 - r] = corrent_shape.state[r][c]
        } 
    }           
    
    let i = 0
    while (flag && i < N){
        let j = 0
        while (flag && j < M){
            if (ret[i][j] === 1){
                if (table.rows[r_ + i].cells[c_ + j].style.backgroundColor !== default_color){                 
                    if (table.rows[r_ + i].cells[c_ + j].style.backgroundColor !== corrent_shape.color){
                        flag = false
                    }
                }
            }
            j ++
        }
        i ++
    }

    if (flag){
        delete_shape()
        corrent_shape.rotateMatrix_right()       
        set_shape_in_table(r_, c_)
    } 
}

function key_pressed(event){
    if (start){
        switch (event.which) {
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
                if (corrent_shape.name !== "O"){                     
                    check_spin()
                    }                        
                break                               
                
            }
        } 
    }
}

