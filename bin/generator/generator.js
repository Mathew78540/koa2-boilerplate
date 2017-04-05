const stdio = require('stdio');
const fs = require('fs');
const ejs = require('ejs');
const pluralize = require('pluralize');
const chalk = require('chalk');

/**
 * Ask Questions
 */
const askQuestions = () => {
  const promise = new Promise((resolve, reject) => {
    stdio.question('Service\'s name in singular', (errModelName, modelName) => {
      stdio.question('Would you like a model ?', [ 'y', 'n' ], (errAnswer, answer) => {
        if (errModelName || errAnswer) {
          return reject();
        }

        return resolve({
          modelName: modelName.charAt(0).toUpperCase() + modelName.slice(1),
          serviceName: pluralize(modelName).toLowerCase(),
          createModel: answer === 'y',
        });
      });
    });
  });

  return promise;
};

/**
 * Create service folder
 */
const createServiceFolder = ({ serviceName }) => {
  try {
    fs.mkdirSync(`${__dirname}/../../src/api/services/${serviceName}`);
  } catch (err) {
    return false;
  }

  return true;
};

/**
 * Create files in the service folder
 */
const createServices = ({ serviceName, createModel, modelName }) => {
  const templatesFolder = `${__dirname}/templates`;
  const filesToCreate   = fs.readdirSync(`${templatesFolder}`);

  filesToCreate.forEach(fileName => {
    if (fileName !== 'model.ejs') {
      ejs.renderFile(`${templatesFolder}/${fileName}`, { serviceName, createModel, modelName }, {}, (err, str) => {
        fs.writeFileSync(`${ __dirname }/../../src/api/services/${ serviceName }/${ serviceName }.${fileName.replace('ejs', 'js')}`, str);
        displayMessage(`==>  ${fileName.replace('ejs', 'js')} created`, 'blue');
      });
    }
  });

  return true;
};

/**
 * Create model
 */
const createModel = ({ modelName }) => {
  const templatesFolder = `${__dirname}/templates`;
  try {
    ejs.renderFile(`${templatesFolder}/model.ejs`, { modelName }, {}, (err, str) => {
      fs.writeFileSync(`${__dirname}/../../src/api/models/${ modelName.toLowerCase() }.js`, str);
    });
  } catch (err) {
    return false;
  }

  displayMessage('==>  model.js created', 'blue');

  return true;
};

const displayMessage = (message, color = 'red') => {
  console.log(chalk[color](message)); // eslint-disable-line
};

askQuestions()
  .then(result => {
    if (!createServiceFolder(result)) {
      return displayMessage('Service with this name is already present');
    }

    if (!createServices(result)) {
      return displayMessage('Error during the creations of the services');
    }

    if (result.createModel) {
      if (!createModel(result)) {
        return displayMessage('Error during the creation of the model');
      }
    }

    return displayMessage('==> DONE', 'green');
  });
