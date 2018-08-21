import React from 'react';
import RecipeItem from './RecipeItem';
import { connect } from 'react-redux';

const FavoriteRecipes = ({ favoriteRecipes, keywords }) => {
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
            {
                favoriteRecipes.length > 0 ?
                    <h2 style={{textAlign:'center' }}>My Favorite Recipes</h2>
                :
                    <div></div>
            }

            {favoriteRecipes && favoriteRecipes.map((recipe, index) => (
                <RecipeItem
                    key={index}
                    image_url={recipe.image_url}
                    title={recipe.title}
                    publisher_url={recipe.publisher_url}
                    publisher={recipe.publisher}
                    id={recipe.recipe_id}
                    keyId={recipe.recipe_id}
                    source_url={recipe.source_url}
                    keywords={keywords}
                    limitRecipeTitle={limitRecipeTitle}
                    favoriteButton={false}
                />
            ))}
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        favoriteRecipes: state.favoriteRecipes
    }
}

export default connect(mapStateToProps, null)(FavoriteRecipes);