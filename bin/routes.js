import Table from 'cli-table';
import { singular } from 'pluralize';
import apiRoutes  from '../src/api/bin/routes';

// Define the table
const table = new Table({
  head: [ 'Method', 'URI', 'Method' ],
  colWidths: [ 20, 30, 30 ],
});

// Populate the table
apiRoutes.stack.forEach((stack) => {
  const className = stack.opts.prefix.replace('/', '');

  const methodName = stack.stack.reduce((acc, { name }) => {
    if (name !== 'middleware' && name !== '') {
      acc = `${singular(className)}Ctrl.${name}`; // eslint-disable-line
    }

    return acc;
  }, '');

  table.push(
    [ stack.methods.toString(), stack.path, methodName ]
  );
});

// Output
console.log(table.toString()); // eslint-disable-line
