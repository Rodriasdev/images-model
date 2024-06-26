/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
// import '@tensorflow/tfjs-backend-cpu';
// import '@tensorflow/tfjs-backend-webgl';

// import * as mobilenet from '@tensorflow-models/mobilenet';

const input = document.getElementById('imagenseleccionada');
const img = document.getElementById('img');
const botonint = document.getElementById('botonint');
const tabla = document.getElementById('tabla')

input.addEventListener('input', () => {
  if(input.files && input.files[0]){

    let reader = new FileReader();

    reader.onload = (e) => {
      img.setAttribute("src", e.target.result)
    };

    reader.readAsDataURL(input.files[0])
  };
});

botonint.addEventListener('click', async () => {
  if (input.value.length < 1) return alert('No hay ninguna imagen')
 

  const version = 2;
  const alpha = 0.5;

  const predict = await run(version,alpha,img)

  let resultPredict = ''
  let resultProbability = ''

  predict.forEach(value => {
    resultPredict += 
    `
     <p>${value.className}</p>

    `

    resultProbability += 
    `
    <p>${value.probability}</p>
    `
  });

  // predicciones.innerHTML = resultPredict
  // probabilidad.innerHTML = resultProbability

  let contenedroTabla = `
    <div class="contenedorTabla">
      <div class="columna1">
        <h3>Predicciones:</h3>
        <div class="predicciones">
            ${resultPredict}
        </div>
        </div>
      <div class="columna2">
        <h3>Probabilidad:</h3>
        <div class="probabilidad">
            ${resultProbability}
        </div>
      </div>
    </div>
  `
  tabla.innerHTML = contenedroTabla
});



async function run(version, alpha, img) {
  // Load the model.
  const model = await mobilenet.load({version, alpha});

  // Classify the image.
  const predictions = await model.classify(img);
  console.log('Predictions');
  console.log(predictions);

  // Get the logits.
  const logits = model.infer(img);
  console.log('Logits');
  logits.print(true);

  // Get the embedding.
  const embedding = model.infer(img, true);

  return predictions
  // console.log('Embedding');
  // embedding.print(true);
}

