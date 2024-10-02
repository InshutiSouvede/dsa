const fs = require('fs');
const path = require('path');
function readInput(filePath) {
    try {
        
        const data = fs.readFileSync(filePath, 'utf-8');
        
        // Get lines with that are not empty
        const lines = data.split('\n').filter(line => line.trim() );
        
        const rows = parseInt(lines[0].split('=')[1]);
        const cols = parseInt(lines[1].split('=')[1]);
        const matrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
        
        lines.forEach((line,index )=> {
            
            if(index > 1){
                const splitLine = line.slice(1,line.length-1).split(',');
                const row = parseInt(splitLine[0]);
                const col = parseInt(splitLine[1]);
                const value = parseInt(splitLine[2]);
                matrix[row][col] = value;
            }            
        })
        
        return matrix;
    } catch (error) {
        console.log("Could not read input into a valid matrix")
    }
}
const filePath = path.join(__dirname, './../../sample_inputs/Copy of easy_sample_02_1.txt')
console.log(JSON.stringify(readInput(filePath)))