import { useState, useEffect } from 'react';
import './App.css';
function App() {
//useState->state management (as react deals with immutable objects so cannot directly mutate objects to reflect changes on ui)
//array destructuring ->assigning array elemnts to variables(on use of useState it return array....)
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true); 
//asynchrnous function:->network request(api calls)
// first way(prefer nowdays): Use try/catch with async/await: Wrap your await calls in try/catch blocks to handle errors gracefully. 
//second way: use fetch.then().catch()
//fetch() ->async function return promise object if that is resolved we get response if reject then error.....
  const getJoke = async () => {
    setLoading(true); 
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
      const data = await response.json();
      setJoke(data); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching joke:', error);
      setLoading(false); 
    }
  };
//useEffect React hook:useEffect is a React hook that lets you perform side effects in function components, such as fetching data, updating the DOM, or setting timers and  it will also clean up before the next effect run if return function..... 
//The dependency array ([dependencies]) controls when the effect runs:
// [] → runs once after first render.
// [var1, var2] → runs when var1 or var2 changes.
// No array → runs after every render.
  useEffect(() => {
    getJoke(); 
  }, []); 

  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!joke) {
    return <div className="error">No joke available</div>;
  }

  return (
    <div className="App">
      <h1>Random Joke</h1>
      {/* passing props to child component from parent component..... */}
      <DisplayJoke joke={joke} />
      <button onClick={getJoke}>Get Another Joke</button>
    </div>
  );
}
// to ways of receving props:
//first entire prop object:   func d(prop)....then access prop.name,prop.phone nd all feilds...
//object destructuring pattern: func d({name,age,phoneno})
function DisplayJoke({ joke }) {
  return (
    <div className="card">
      {joke.type === 'single' ? (
        <p>{joke.joke}</p> 
      ) : (
        <div>
          <p>{joke.setup}</p>
          <p>{joke.delivery}</p>
        </div>
      )}
    </div>
  );
}

export default App;
