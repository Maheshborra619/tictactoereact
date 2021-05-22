import React, { useState, useEffect } from "react";
import "./App.css";

const initialMatrix = [];
function App() {
  const [matrix, setMatrix] = useState(initialMatrix);
  const [matrixSize, setMatrixSize] = useState(3);
  const [currentPlayer, setCurrentPlayer] = useState("o");
  const [selR,setSelR] = useState(null);
  const [selC,setSelC] = useState(null);
  const [winner,setWinner] = useState(false);
  const [reset,setRest] = useState(false)

  useEffect(() => {
    setWinner(false)
    setSelC(null);
    setSelR(null);
    const buildrows = new Array(matrixSize).fill(null);

    const tempMatrix = [];
    for (let i = 0; i < matrixSize; i++) {
      tempMatrix.push([...buildrows]);
    }

    setMatrix(tempMatrix);
  }, [reset]);

  function clickHandler(r,c){
   if(!matrix[r][c] && !winner){
   setSelC(c);
   setSelR(r);

   const setPlayer =   currentPlayer === "x"?"o":"x";
   setCurrentPlayer(setPlayer);
   const matrixcopy = [...matrix];
   matrixcopy[r][c] = setPlayer;
   setMatrix(matrixcopy);
   }
  }


  function isWinner(){
    let vertical = true;
    let horizantal = true;
    let diag1 = true;
    let diag2 = true;

   if(selC === null || selR === null){
     return
   }
    for(let i=0;i<matrixSize;i++){
        if(matrix[i][selC] !== currentPlayer){
          vertical = false;
        }
        if(matrix[selR][i] !== currentPlayer){
          horizantal = false;
        }
        if(matrix[i][i] !== currentPlayer){
          diag1 = false;
        }
        if(matrix[i][matrixSize-i-1] !== currentPlayer){
          diag2 = false;
        }

        
    }
    if(vertical || horizantal || diag1 || diag2){
      setWinner(true)
    }
  }


  useEffect(()=>{
    if(!winner){
      isWinner();
    }
  })



  function resetGame(){
    setRest(!reset);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={resetGame}>Reset the game</button>
        <div >
          {matrix.map((eachrow, c) => (
            <div key={c} className="c">
              {eachrow.map((ele,r) => (
                <div onClick={()=>clickHandler(r,c)} key={r} className="r">{matrix[r][c]}</div>
              ))}
            </div>
          ))}
        </div>
        <h2>{winner ?  `Player ${currentPlayer} is winner`:""}</h2>
      </header>
    </div>
  );
}

export default App;
