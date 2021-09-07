const fs = require('fs');

function readFile(path) {
  if (!fs.existsSync(path)) {
    new Promise((resolve, reject) => {
      fs.writeFile('signal.json', JSON.stringify({}), 'utf8', function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

module.exports.writeFile = async function (path, newSignal) {

  const fileContent = JSON.parse(await readFile(path));
  const signalLength = Object.keys(fileContent).length + 1;
  fileContent[signalLength] = newSignal;

  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(fileContent), 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
