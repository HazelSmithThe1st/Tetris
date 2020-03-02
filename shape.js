
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
