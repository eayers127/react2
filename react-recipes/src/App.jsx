
import React, { useState } from "react";
import "./App.css"


const App = () => {
const [editing, setEditing] = useState(false);
  let viewMode = {};
  let editMode = {};
  editMode.className = "editing"
  if (editing) {
    viewMode.display = 'none';
    
  } else {
    editMode.display = 'none';
  }


  const [favRecipes, setFavRecipes] = useState([])
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Chicken Alfredo",
      calories: 800,
      servings: 5,
      ingredients: ["Noodles, ", "Chicken, ", "Cheese, ", "Milk"]
    },
    {
      id: 2,
      name: "Sandwich",
      calories: 400,
      servings: 1,
      ingredients: ["Bread, ", "Ham, ", "Cheese, ", "Mayo"]
    }
  ])



const handleUpdatedDone = (event) => {
  if (event.key === 'Enter') {
    setEditing(false);
  }
};

const toggleEdit = () => {
  setEditing(!editing);
  handleUpdatedDone();
  // updateName();
  // updateCalories();
};



   const recipeList = recipes.map(recipe => (
      <div id="recipeCard">
          <h2 key={recipe.name}>{recipe.name} <input type="text" defaultValue={recipe.name} class="textInput" style={editMode} onKeyDown={handleUpdatedDone} onChange={(e) => updateName(e.target.value, recipe.id)}/></h2>  
          <div id="cardInfo">
          <ul>
            <li key={recipe.calories}>Calories: {recipe.calories} <input type="text"
             defaultValue={recipe.calories} class="textInput" style={editMode} onKeyDown={handleUpdatedDone}
             onChange={(e) => updateCalories(e.target.value, recipe.id)} /></li>
            <li key={recipe.servings}>Servings: {recipe.servings} <input type="text"
             defaultValue={recipe.servings} class="textInput" style={editMode} onKeyDown={handleUpdatedDone}
             onChange={(e) => updateServings(e.target.value, recipe.id)}/></li>
            <li key={recipe.ingredients}>Ingredients: {recipe.ingredients} <input type="text" 
            defaultValue={recipe.ingredients} class="textInput" style={editMode} onKeyDown={handleUpdatedDone}
            onChange={(e) => updateIngredients(e.target.value, recipe.id)}/></li>
          </ul>
          </div>
          <div id="buttons">
          <button onClick={() => deleteRecipe(recipe.name)}>Delete</button>
          <button onClick={() => addToFavorites(recipe.name)}>Add to Favorites</button>
          <button onClick={toggleEdit}>Edit/Save</button>
          </div>
          </div>
        ))

         
  function deleteRecipe(name) {
    setRecipes(recipes.filter(recipe => recipe.name !== name))
  }
  
  const favRecipesList = favRecipes.map(favRecipie => (
    <li iclass="favorites">{favRecipie}<button onClick={() => removeFav(recipe.name)}>Remove from List</button></li>
  ))

   function addToFavorites(name) {
    setFavRecipes(current => [...current, name])
  }

  function removeFav(favRecipe) {
    setFavRecipes(favRecipe.pop())
  }

  const updateName = (updatedInformation, id) => {
      setRecipes(
        recipes.map((recipe) => {
          if (recipe.id === id) {
            recipe.name = updatedInformation;
          }
          return recipe;
        })
      );
    };
    const updateCalories = (updatedInformation, id) => {
      setRecipes(
        recipes.map((recipe) => {
          if (recipe.id === id) {
            recipe.calories = updatedInformation;
          }
          return recipe;
        })
      );
    };
    const updateServings = (updatedInformation, id) => {
      setRecipes(
        recipes.map((recipe) => {
          if (recipe.id === id) {
            recipe.servings = updatedInformation;
          }
          return recipe;
        })
      );
    };
    const updateIngredients = (updatedInformation, id) => {
      setRecipes(
        recipes.map((recipe) => {
          if (recipe.id === id) {
            recipe.ingredients = updatedInformation;
          }
          return recipe;
        })
      );
    };



        function Form() {
          const [form, setForm] = useState(false);
          const [calories, setCalories] = useState(0);
          const [name, setName] = useState('');
          const [servings, setServings] = useState(0);
          const [ingredients, setIngredients] = useState('');
        
        
          const toggleForm = () => {
            setForm(!form);
          };
        
        
          const getInformation = (e) => {
            e.preventDefault();
            console.log(calories,name,servings,ingredients)

            setRecipes(current => [...current, {
                  id: recipes.length +1,
                  name: name,
                  calories: calories,
                  servings: servings,
                  ingredients: ingredients
                }])
        
          }
        
          return (
            <>
                <button onClick={toggleForm} className="btn-form">
                Add a Recipe
              </button>
              {form && (
                <div className="form">
                  <div onClick={toggleForm} className="overlay"></div>
                  <div className="form-content">
                   <h2>Add a Recipe</h2>
                   <form onSubmit={getInformation}>
       
                    <label for="recipe-name">Name:</label>
                    <input type="text" id="recipe-name" required onChange={(event) => setName(event.target.value)}/>< br/>
                    <label for="recipe-name">Calories:</label>
                    <input type="number" id="recipe-calories" required onChange={(event) => setCalories(event.target.value)}/>< br/>
                    <label for="recipe-servings">Number of Servings:</label>
                    <input type="number" id="recipe-name" required onChange={(event) => setServings(event.target.value)}/>< br/>
                    <label for="recipe-ingredients">Ingredients:</label>
                    <input type="text" id="recipe-name" required onChange={(event) => setIngredients(event.target.value)}/>< br/>
        
                    <button type="submit">Add Recipe</button>
        
                  </form>
                    <button className="close-form" onClick={toggleForm}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
                </>
            );
        }






  return (
    <div class="App">
      <h1 id="header">Recipe App</h1>
      <Form />
      <div id="appRecipes">
        {recipeList}
        </div>
        <h3>Favorite Recipes:</h3>
        <div id="favoriteRecipes">
        {favRecipesList}
        </div>
    </div>

  );
};


export default App;
