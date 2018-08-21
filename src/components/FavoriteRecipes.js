import React from 'react';
import RecipeItem from './RecipeItem';

const FavoriteRecipes = ({recipes, favoriteRecipes, keywords, addToFavorites}) => {
    //console.log('[favorites]', favorites);
    
    const limitRecipeTitle = (title, limit = 17) => {
        const newTitle = [];
        if(title.length > limit) {
            title.split(' ').reduce((acc, curr) => {
                if (acc + curr.length <= limit) {
                    newTitle.push(curr);
                }
                return acc + curr.length;
            }, 0);
    
            // return result
            return `${newTitle.join(' ')} ...`;
        }
        return title;
    }

    return (
        <div>
            <h2 style={{textAlign:'center' }}>My Favorite Recipes</h2>

            {favoriteRecipes && favoriteRecipes.map(recipe => (
                <RecipeItem
                    key={recipe.title}
                    image_url={recipe.image_url}
                    title={recipe.title}
                    publisher_url={recipe.publisher_url}
                    publisher={recipe.publisher}
                    id={recipe.recipe_id}
                    keyId={recipe.recipe_id}
                    source_url={recipe.source_url}
                    recipes={recipes}
                    keywords={keywords}
                    addToFavorites={addToFavorites}
                    limitRecipeTitle={limitRecipeTitle}
                />
            ))}
            
        </div>
    )
}

export default FavoriteRecipes;