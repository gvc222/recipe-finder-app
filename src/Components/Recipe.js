import React from 'react'
import style from '../recipe.module.css'

export const Recipe = ({title, calories, image, ingredients}) => {
  return (
    <div className={style.recipe}>
        <h1>{title}</h1>
        
        <p>Calories: {Math.floor(calories)}</p>
        <img src={image} alt={title} className={style.image} />
        <h2>Ingredients</h2>
        <ul>
            {ingredients.map(ingredient => (
                <li>{ingredient.text}</li>
            ))}
        </ul>
    </div>
  )
}
