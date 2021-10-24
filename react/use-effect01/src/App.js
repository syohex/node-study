import './App.css';
import { useEffect, useState } from 'react';

function LifeCycleDemo() {
  useEffect(() => {
    console.log('render');
    return () => console.log('unmounting');
  });

  return "I'm a life cycle demo";
}

function App() {
  const [random, setRandom] = useState(Math.random());
  const [mounted, setMounted] = useState(true);
  const reRender = () => setRandom(Math.random());
  const toggle = () => setMounted(!mounted);

  useEffect(() => {
    document.title = `current value is ${random}`;
  }, [random]);

  console.log(random);
  return (
    <div className="App">
      <button onClick={reRender}>Re-Render</button>
      <button onClick={toggle}>Show/Hide Demo</button>
      {mounted && <LifeCycleDemo />}
    </div>
  );
}

export default App;
