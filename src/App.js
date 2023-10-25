import './App.css';
import React, { useEffect, useState } from 'react';
import { Recipe } from './Components/Recipe';
const API_KEY = process.env.REACT_APP_API_KEY;
const API_ID = process.env.REACT_APP_API_ID;

console.log(API_KEY)

const App = () => {
  const [ recipes, setRecipes ] = useState([]);
  //the finished "text" that I put in the search input
  const [search, setSearch] = useState("");
  const [ query, setQuery ] = useState('chicken')

//async
const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`);
  // formats api
  const data = await response.json();
  // log to console to check data being fetched
  console.log(data.hits)
  setRecipes(data.hits);
}

useEffect(() => {
  getRecipes();

  // the empty array as second argument of useEffect makes it run only once
  // Otherwise, the useEffect runs whenever something re-renders
  // If you add the state in the array, it will give you what will trigger the useEffect
  // for Example, if you put [counter], it will run when there are changes to the counter
  // remember, you can only fetch from the API i think 10 times a minute or something? so dont rerender each time
  //useEffect to fetch data everytime I click the search button
  // eslint-disable-next-line
}, [query])

const updateSearch = (e) => {
  setSearch(e.target.value);
  // console.log(search)
}

const submitButton = (e) => {
  // stop page refresh
  e.preventDefault();
  // sets the final typed search input to the query which user submits
  setQuery(search);
  setSearch("");
}
  return (
    <div className="App">
    <form className="search-form" onSubmit={submitButton}>
      <input type="text" className='search-bar' value={search} onChange={updateSearch}/>
      <button type="submit" className='search-button'>
        Search
      </button>
    </form>
      <div className='recipes'>
        {recipes.map((recipe, index) => (
          <Recipe key={index} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
        ))}
      </div>
    </div>
  )
}

export default App;
