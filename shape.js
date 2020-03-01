
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


// function check_spin(){  
//     let flag = true 
//     let r_ = corrent_shape.row
//     let c_ = corrent_shape.coll

//     if ((corrent_shape.coll_num + corrent_shape.row) > tableshight){
//         r_ = tableshight - corrent_shape.coll_num
//     } else {
//         if ((corrent_shape.coll + corrent_shape.row_num) > tableswidth){                              
//             c_ = tableswidth - corrent_shape.row_num
//         }        
//     } 
   
//     let M = corrent_shape.state.length    
//     let N = corrent_shape.state[0].length
//     let ret = new Array()

//     for (let i = 0; i < N; i++){
//         ret[i] = []
//     }

//     for (let r = 0; r < M; r++) { 
//         for (let c = 0; c < N; c++) {
//             ret[c][M - 1 - r] = corrent_shape.state[r][c]
//         } 
//     }           
    
//     let i = 0
//     while (flag && i < N){
//         let j = 0
//         while (flag && j < M){
//             if (ret[i][j] === 1){
//                 if (table.rows[r_ + i].cells[c_ + j].style.backgroundColor !== default_color){
//                     if(i >= corrent_shape.row_num || j >= corrent_shape.coll_num){
//                         flag = false
//                     }
//                     if (flag){
//                         if (table.rows[r_ + i].cells[c_ + j].style.backgroundColor !== corrent_shape.color){
//                             flag = false
//                         } else {                 
//                             if (corrent_shape.state[r_ + i - corrent_shape.row][c_ + j - corrent_shape.coll] !== 1){
//                                 flag = false
//                             }
//                         }
//                     }
//                 }
//             }
//             j += 1
//         }
//         i += 1
//     }

//     if (flag){
//         delete_shape()
//         corrent_shape.rotateMatrix_right()       
//         set_shape_in_table(r_, c_)
//     } 
// }