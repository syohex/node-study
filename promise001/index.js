let val = 0;

function test() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(++val);
    }, 100);
  });
}

async function f() {
  for (let i = 0; i < 10; ++i) {
    console.log(`val=${await test()}`);
  }
}

f().then(() => {
  console.log('ok');
}).catch(() => {
  console.log('error');
});