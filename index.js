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
const mostrar = document.getElementById('img');
const botonint = document.getElementById('botonint');
const predicciones = document.getElementById('predicciones')
const probabilidad = document.getElementById('probabilidad')

input.addEventListener('input', () => {
  if(input.files && input.files[0]){

    let reader = new FileReader();

    reader.onload = (e) => {
      mostrar.setAttribute("src", e.target.result)
    };

    reader.readAsDataURL(input.files[0])
  };
});

botonint.addEventListener('click', async () => {
  const img = document.getElementById('img');
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
    <p>${value.probability}</P>
    `
  });

  predicciones.innerHTML = resultPredict
  probabilidad.innerHTML = resultProbability
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

