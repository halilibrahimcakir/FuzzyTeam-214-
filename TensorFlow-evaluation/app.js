// const tf = require('@tensorflow/tfjs-node');

// const data = require(".\\combinedData.json");

// const xTrain = tf.tensor2d(data.map(item => item.slice(0,3))); 
// const yTrain = tf.tensor2d(data.map(item => [item[2]])); 

// const model = tf.sequential(); 
// model.add(tf.layers.dense({ units: 1, inputShape: [3], activation: 'relu' }));

// model.compile({ loss: 'meanSquaredError', optimizer: 'adam',  metrics: ['accuracy']
// });

// model.fit(xTrain, yTrain, {
//   epochs: 100,
// }).then(info => {
//   console.log('Eğitim tamamlandı:', info);
//   console.log("xtrain : "+xTrain);
//   console.log("ytrain : "+yTrain);

//   const xTest = tf.tensor2d([[1 ,1, 3]]);
//   const predictions = model.predict(xTest);

//   (predictions).print()
// });



const tfs = require('@tensorflow/tfjs-node');

const data2 = require(".\\combinedData.json");

const sTrain = tfs.tensor(data2); 
const rTrain = tfs.tensor(data2.map(item => item[2])); 

const model2 = tfs.sequential(); 
model2.add(tfs.layers.dense({ units: 1, inputShape: [3], activation: 'relu' }));

model2.compile({ loss: 'meanSquaredError', optimizer: 'adam',  metrics: ['accuracy']
});

model2.fit(sTrain, rTrain, {
  epochs: 100,
}).then(info => {
//   console.log('Eğitim tamamlandı:', info);
//   console.log("strain : "+sTrain);
//   console.log("rtrain : "+rTrain);
  const xTest = tfs.tensor([[500.0,100.0,100.0]]);
  const predictions = model2.predict(xTest);

  (predictions).print()
});
