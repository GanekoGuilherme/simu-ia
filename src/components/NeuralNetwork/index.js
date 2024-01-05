import React,  { useState } from 'react';
import './index.css'; 

const x = [
  [-1,-1, 1, -1,-1,-1, 1,1, -1,-1,-1,-1, 1, -1,-1,-1,-1, 1, -1,-1,-1,-1, 1, -1,-1,-1,-1, 1, -1,-1,-1, 1,1,1, -1], //35
  [-1, 1,1,1, -1, 1, -1,-1,-1, 1, -1,-1,-1,-1, 1, -1,-1,-1, 1, -1,-1,-1, 1, -1,-1,-1, 1, -1,-1,-1, 1,1,1,1,1],
  [-1, 1,1,1, -1, 1, -1,-1,-1, 1, -1,-1,-1,-1, 1, -1,-1, 1,1, -1,-1,-1,-1,-1, 1,1, -1,-1,-1, 1, -1, 1,1,1, -1],
  [-1,-1,-1,-1, 1, -1,-1,-1, 1,1, -1,-1, 1, -1, 1, -1, 1, -1,-1, 1,1,1,1,1,1, -1,-1,-1,-1, 1, -1,-1,-1,-1, 1],
  [1,1,1,1,1,1, -1,-1,-1,-1, 1, -1,-1,-1,-1, 1,1,1,1, -1,-1,-1,-1,-1, 1, -1,-1,-1,-1, 1,1,1,1,1, -1],
  [-1, 1,1,1,1,1, -1,-1,-1,-1, 1, -1,-1,-1,-1, 1,1,1,1, -1, 1, -1,-1,-1, 1, 1, -1,-1,-1, 1, -1, 1,1,1, -1],
  [1,1,1,1,1, -1,-1,-1,-1, 1, -1,-1,-1, 1, -1,-1,-1,-1, 1, -1,-1,-1, 1, -1,-1,-1,-1, 1, -1,-1,-1, 1, -1,-1,-1],
  [-1, 1,1,1, -1, 1, -1,-1,-1, 1,1, -1,-1,-1, 1, -1, 1,1,1, -1, 1, -1,-1,-1, 1,1, -1,-1,-1, 1, -1, 1,1,1, -1],
  [-1, 1,1,1, -1, 1, -1,-1,-1, 1,1, -1,-1,-1, 1, -1, 1,1,1,1, -1,-1,-1,-1, 1, -1,-1,-1,-1, 1,1,1,1,1, -1],
  [-1, 1,1,1, -1, 1, -1,-1,-1, 1,1, -1,-1,-1, 1,1, -1,-1,-1, 1,1, -1,-1,-1, 1,1, -1,-1,-1, 1, -1, 1,1,1, -1]
];

const entradas = x[0].length;
const amostras = x.length;

const t = [[1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
          [-1,1,-1,-1,-1,-1,-1,-1,-1,-1],
          [-1,-1,1,-1,-1,-1,-1,-1,-1,-1],
          [-1,-1,-1,1,-1,-1,-1,-1,-1,-1],
          [-1,-1,-1,-1,1,-1,-1,-1,-1,-1],
          [-1,-1,-1,-1,-1,1,-1,-1,-1,-1],
          [-1,-1,-1,-1,-1,-1,1,-1,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,1,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,-1,1,-1],
          [-1,-1,-1,-1,-1,-1,-1,-1,-1,1],
];
const targets = t[0].length;
const numClasses = t.length;

const limiar = 0;
let alfa = 0.1;
let erroTolerado = 0.1;
let cicloLimite = 10;
let v = [
  [0,0, 0, 0,0,0, 0,0, 0,0,0,0, 0, 0,0,0,0, 0, 0,0,0,0, 0, 0,0,0,0, 0, 0,0,0, 0,0,0, 0],
  [0, 0,0,0, 0, 0, 0,0,0, 0, 0,0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0,0,0,0,0],
  [0, 0,0,0, 0, 0, 0,0,0, 0, 0,0,0,0, 0, 0,0, 0,0, 0,0,0,0,0, 0,0, 0,0,0, 0, 0, 0,0,0, 0],
  [0,0,0,0, 0, 0,0,0, 0,0, 0,0, 0, 0, 0, 0, 0, 0,0, 0,0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0],
  [0,0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0, 0,0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0, 0],
  [0, 0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0, 0, 0, 0,0,0, 0, 0, 0,0,0, 0, 0, 0,0,0, 0],
  [0,0,0,0,0, 0,0,0,0, 0, 0,0,0, 0, 0,0,0,0, 0, 0,0,0, 0, 0,0,0,0, 0, 0,0,0, 0, 0,0,0],
  [0, 0,0,0, 0, 0, 0,0,0, 0,0, 0,0,0, 0, 0, 0,0,0, 0, 0, 0,0,0, 0,0, 0,0,0, 0, 0, 0,0,0, 0],
  [0, 0,0,0, 0, 0, 0,0,0, 0,0, 0,0,0, 0, 0, 0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0, 0],
  [0, 0,0,0, 0, 0, 0,0,0, 0,0, 0,0,0, 0,0, 0,0,0, 0,0, 0,0,0, 0,0, 0,0,0, 0, 0, 0,0,0, 0]
]; // peso sinaptico
let v0 = [0,0,0,0,0,0,0,0,0,0]; // bias

let vetor1 = [];
let vetor2 = [];

let yin = [0,0,0,0,0,0,0,0,0,0]; // saida inicial
let y = [0,0,0,0,0,0,0,0,0,0];  // saida limiarizada

function pegaMaior(vet){
  console.log('vet: ', vet);
  const copiaVetor = vet.slice();

    // Ordena a cópia em ordem decrescente
    copiaVetor.sort((a, b) => b - a);

    // Obtém os índices dos 3 maiores valores na cópia
    const indicesDosMaiores = [];
    for (let i = 0; i < 3; i++) {
        const indice = vet.indexOf(copiaVetor[i]);
        indicesDosMaiores.push(indice);
    }

    return indicesDosMaiores;
}

function treinamento(paradaCiclo){
  
  console.log(v.length, v[0].length, entradas, numClasses)
  for(let i = 0; i < numClasses; i++){
    for(let j = 0; j < entradas; j++){
      
      console.log('before', i,j, v[i][j])
      v[i][j] = Math.random() * 0.2 - 0.1; // -0.1 até 0.1
      
      console.log('after', i,j, v[i][j])
    }
  }
  console.log('saiu',v[9][34])
  for (let j = 0; j < numClasses; j++){
    v0[j] = Math.random() * 0.2 - 0.1;
  }
  console.log('v0: ',v0);

  let erro = 10;
  let ciclo = 0;

  if(paradaCiclo){
    console.log('saiu',v[9][34])
    while(ciclo < cicloLimite){
      ciclo++;
      erro = 0;
      for (let i = 0; i < amostras; i++){
        let xaux = x[i];
        for (let m = 0 ; m < numClasses; m++){
          let soma = 0;
          for (let n = 0; n < entradas; n++){
            soma += xaux[n] * v[m][n];
          }
          console.log('saiu', soma, v0[m])
            
          yin[m] = soma + v0[m];
        }

        for (let j = 0; j < numClasses; j++){
          if (yin[j] >= limiar){
            y[j] = 1.0;
          } else {
            y[j] = -1.0;
          }
        }

        for (let j = 0; j < numClasses; j++){
          erro += 0.5*(t[i][j] - y[j])*(t[i][j] - y[j]);
        }

        let vanterior = v;

        for (let m = 0; m < numClasses; m++){
          for (let n = 0; n < entradas; n++){
            v[m][n] = vanterior[m][n] + alfa*(t[i][m] - y[m])*xaux[n] // peso sináptico = peso anterior + taxa de aprendizagem * (target - saida) * xaux
          }
        }
 
        let v0anterior = v0;

        for (let j = 0; j < numClasses; j++){
          v0[j] = v0anterior[j]+alfa*(t[j][i] - y[j]);
        }
      }
      console.log('yin: ', yin[0]);
      vetor1.push(ciclo);
      vetor2.push(erro);
    }
  } else{
    while(erro > erroTolerado){
      ciclo += 1;
      erro = 0;

      for (let i = 0; i < amostras; i++){
        let xaux = x[i];
        for (let m = 0; m < numClasses; m++){
          let soma = 0;
          for (let n = 0; n < entradas; n++){
            soma += xaux[n] * v[n][m];
          }
          yin[m] = soma + v0[m];
        }

        for (let j = 0; j < numClasses; j++){
          if(yin[j] >= limiar){
            y[j] = 1.0;
          } else {
            y[j] = -1.0;
          }
        }

        for (let j = 0; j < numClasses; j++) {
          erro += 0.5 * (t[j][i] - y[j]) * (t[j][i] - y[j]); 
        }

        let vanterior = v;

        for (let m = 0; m < entradas; m++){
          for (let n = 0; n < numClasses; n++){
            v[m][n] = vanterior[m][n] + alfa * (t[n][i] - y[n]) * xaux[m]
          }
        }

        let v0anterior = v0;

        for (let j = 0; j < numClasses; j++){
          v0[j] = v0anterior[j]+alfa*(t[j][i]-y[j]);
        }
      }
      vetor1.push(ciclo);
      vetor2.push(erro);
    }
  }
}

const NeuralNetwork = () => {
  const initialMatrixColors = Array.from({ length: 7 }, () => Array(5).fill('red'));
  const [matrixColors, setMatrixColors] = useState(initialMatrixColors);
  const [trainingData, setTrainingData] = useState({
    condition: 'cycle',
    learningRate: '',
    toleranceError: '',
    iterations: '',
  });

  const handleCellClick = (rowIndex, colIndex) => {
    const newMatrixColors = matrixColors.map((row, i) =>
      i === rowIndex ? row.map((color, j) => (j === colIndex ? toggleColor(color) : color)) : row
    );
    setMatrixColors(newMatrixColors);
  };

  const toggleColor = (color) => (color === 'red' ? 'green' : 'red');

  const handleTrainButtonClick = () => {
    console.log('Dados de Treinamento:', trainingData);
    v = [
      [0,0, 0, 0,0,0, 0,0, 0,0,0,0, 0, 0,0,0,0, 0, 0,0,0,0, 0, 0,0,0,0, 0, 0,0,0, 0,0,0, 0], //35
      [0, 0,0,0, 0, 0, 0,0,0, 0, 0,0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0,0,0,0,0],
      [0, 0,0,0, 0, 0, 0,0,0, 0, 0,0,0,0, 0, 0,0, 0,0, 0,0,0,0,0, 0,0, 0,0,0, 0, 0, 0,0,0, 0],
      [0,0,0,0, 0, 0,0,0, 0,0, 0,0, 0, 0, 0, 0, 0, 0,0, 0,0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0],
      [0,0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0, 0,0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0, 0],
      [0, 0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0, 0, 0, 0,0,0, 0, 0, 0,0,0, 0, 0, 0,0,0, 0],
      [0,0,0,0,0, 0,0,0,0, 0, 0,0,0, 0, 0,0,0,0, 0, 0,0,0, 0, 0,0,0,0, 0, 0,0,0, 0, 0,0,0],
      [0, 0,0,0, 0, 0, 0,0,0, 0,0, 0,0,0, 0, 0, 0,0,0, 0, 0, 0,0,0, 0,0, 0,0,0, 0, 0, 0,0,0, 0],
      [0, 0,0,0, 0, 0, 0,0,0, 0,0, 0,0,0, 0, 0, 0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0, 0],
      [0, 0,0,0, 0, 0, 0,0,0, 0,0, 0,0,0, 0,0, 0,0,0, 0,0, 0,0,0, 0,0, 0,0,0, 0, 0, 0,0,0, 0]
    ]; // peso sinaptico
    v0 = [0,0,0,0,0,0,0,0,0,0]; // bias
    
    vetor1 = [];
    vetor2 = [];
    
    yin = [0,0,0,0,0,0,0,0,0,0]; // saida inicial
    y = [0,0,0,0,0,0,0,0,0,0];  // saida limiarizada

    // Adicione lógica adicional conforme necessário
    // limiar = 0.0;
    alfa = Number(trainingData.learningRate);
    erroTolerado = Number(trainingData.toleranceError);
    cicloLimite = Number(trainingData.iterations);

    const paradaCiclo = trainingData.condition === "cycle";
    console.log('p: ', paradaCiclo)
    treinamento(paradaCiclo);
  };

  const handleTestButtonClick = () => {
    // Aqui você pode acessar os valores da matriz ('second-div')
    let xteste = [];
    const testMatrixValues = matrixColors.map((row) => row.map((color) => color));
    console.log('Valores da Matriz no Teste:', testMatrixValues);
    let index = 0;
    for (let i = 0; i < testMatrixValues.length; i++){
      for (let j = 0; j < testMatrixValues[i].length; j++){
        xteste[index] = testMatrixValues[i][j] === 'green';
        index++;
      }
    }

    for (let m2 = 0; m2 < numClasses; m2++){
      let soma = 0;
      for (let n2 = 0; n2 < entradas; n2++){
        soma += xteste[n2]*v[m2][n2];
        yin[m2] = soma + v0[m2];
      }
    }
    console.log('yin: ', yin);
    console.log('v: ', v)
    const maiorais = pegaMaior(yin);

    for (let j = 0; j < numClasses; j++){
      if(yin[j] >= limiar){
        y[j] = 1.0;
      } else{
        y[j] = -1.0;
      }
    }

    let indice = 0;
    console.log(maiorais)
    while(indice < 10){
      if(indice === maiorais[0]){
        console.log(`${(indice+1)%10} = ${yin[indice]} - Maior possibildade`);
      } else if(indice === maiorais[1]){
        console.log(`${(indice+1)%10} = ${yin[indice]} - 2º Maior possibildade`);
      } else if(indice === maiorais[2]){
        console.log(`${(indice+1)%10} = ${yin[indice]} - 3º Maior possibildade`);
      } else{
        console.log(`${(indice+1)%10} = ${yin[indice]}`);
      }
      indice++;
    }
    console.log('Seu número provavelmente é: ', (maiorais[0]+1)%10);

    // Adicione lógica adicional conforme necessário
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrainingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='section-neural'>
      <h2>Redes Neurais</h2>
      <div className='content'>
        <div className='first-div'>
          <div className='content-first-div'>
            <label style={{ paddingTop: 8 }}>
              Condição de Parada:
              <input type='radio' name='condition' value='cycle' onChange={handleInputChange} checked={trainingData.condition === 'cycle'} />
              Número de Ciclo
              <input type='radio' name='condition' value='error' onChange={handleInputChange} checked={trainingData.condition === 'error'} />
              Erro Tolerado
            </label>
            <label style={{ paddingTop: 8 }}>
              Taxa de Aprendizagem:
              <input type='number' name='learningRate' onChange={handleInputChange} value={trainingData.learningRate} />
            </label>
            <label style={{ paddingTop: 8 }}>
              Erro Tolerado:
              <input type='number' name='toleranceError' onChange={handleInputChange} value={trainingData.toleranceError} />
            </label>
            <label style={{ paddingTop: 8 }}>
              Iterações:
              <input type='number' name='iterations' onChange={handleInputChange} value={trainingData.iterations} />
            </label>
          </div>
          <button style={{ width: 100 }} onClick={handleTrainButtonClick}>
            treinar
          </button>
        </div>
        <div className='second-div'>
          {matrixColors.map((row, rowIndex) => (
            <div key={rowIndex} className='matrix-row'>
              {row.map((color, colIndex) => (
                <div
                  key={colIndex}
                  className='matrix-cell'
                  style={{ backgroundColor: color, width: '64px', height: '64px', display: 'inline-block', marginTop: '-4px' }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                ></div>
              ))}
            </div>
          ))}
          <button style={{ width: 100 }} onClick={handleTestButtonClick}>
            testar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetwork;