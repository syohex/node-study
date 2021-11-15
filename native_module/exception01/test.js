const addon = require('./build/Release/exception01.node');
try {
  console.log(addon.error());
} catch (err) {
  console.log('###');
  console.log(err);
  console.log('###');
}
