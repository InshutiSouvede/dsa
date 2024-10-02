const fs = require("fs");
const path = require("path");
function readInput(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const lines = data.split("\n").filter((line) => line.trim());
    const rows = parseInt(lines[0].split("=")[1]);
    const cols = parseInt(lines[1].split("=")[1]);
    const matrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

    lines.forEach((line, index) => {
      if (index > 1) {
        const [row, col, value] = line
          .slice(1, line.length - 1)
          .split(",")
          .map((x) => parseInt(x));
        matrix[row][col] = value;
      }
    });

    return matrix;
  } catch (error) {
    console.log("Could not read input into a valid matrix");
  }
}
function matrixOperation(matrix1, matrix2) {
  const matrix1Rows = matrix1.length;
  const matrix1Cols = matrix1[0].length;
  const matrix2Rows = matrix2.length;
  const matrix2Cols = matrix2[0].length;

  if (matrix1Rows !== matrix2Rows || matrix1Cols !== matrix2Cols) {
    throw new Error("The two matrices do not have the same dimensions");
  }

  const result = {
    additionMatrix: [],
    subtractionMatrix: [],
    multiplicationMatrix: [],
  };

  for (let i = 0; i < matrix1Rows; i++) {
    result.additionMatrix.push([]);
    result.subtractionMatrix.push([]);
    result.multiplicationMatrix.push([]);

    for (let j = 0; j < matrix1Cols; j++) {
      result.additionMatrix[i][j] = matrix1[i][j] + matrix2[i][j];
      result.subtractionMatrix[i][j] = matrix1[i][j] - matrix2[i][j];
      result.multiplicationMatrix[i][j] = matrix1[i][j] * matrix2[i][j];
    }
  }

  return result;
}

function getMatrixOperations(matrix1Path, matrix2Path) {
  matrix1 = readInput(matrix1Path);
  matrix2 = readInput(matrix2Path);
  return matrixOperation(matrix1, matrix2);
}

// Write results of getMatrixOperation in a file
const writeFile = (filePath, data) => {
  try {
    console.log(filePath);
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        throw err;
      }
      console.log("The Matrices have been saved in",filePath);
    })

  } catch (error) {
    console.log("Could not write results in a file");
  }
};

const filePath = path.join(
  __dirname,
  "./../../sample_inputs/Copy of easy_sample_02_1.txt"
);

writeFile(
  path.join(__dirname, "./", "results.json"),
  JSON.stringify(getMatrixOperations(filePath, filePath))
);
