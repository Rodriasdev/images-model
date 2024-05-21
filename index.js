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
const input = document.getElementById("imagenseleccionada")

function readURL(input) {
  if (input.files && input.files[0]) { //Revisamos que el input tenga contenido
    var reader = new FileReader(); //Leemos el contenido
    
    reader.onload = function(e) { //Al cargar el contenido lo pasamos como atributo de la imagen de arriba
      $('#blah').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}

$("#imgInp").change(function() { //Cuando el input cambie (se cargue un nuevo archivo) se va a ejecutar de nuevo el cambio de imagen y se verá reflejado.
  readURL(this);
});



const img = document.getElementById('img');
const version = 2;
const alpha = 0.5;



async function run() {
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
  console.log('Embedding');
  embedding.print(true);
}

run();