const {sha256_string} = require('./index.node');

const ret = sha256_string('hello world');
console.log(`input 'hello_world', sha256 '${ret}'`);
