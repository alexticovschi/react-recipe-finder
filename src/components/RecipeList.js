import React, { Component } from 'react';
import RecipeItem from './RecipeItem';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class RecipeList extends Component {
    
    render() {
        console.log('this.props', this.props);
        const { recipes, keywords, favorites, addToFavorites } = this.props;
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
            <div className="recipe-list-container">
                {
                    this.props.favoriteRecipes.length > 0 ?
                        <h4 className="link" style={{textAlign: 'center', marginBottom: '10px'}}><Link to='/favorites'>Favorite Recipes</Link></h4>
                    :
                        <div></div>
                }

                {recipes.map((recipe, index) => (
                    <RecipeItem
                        key={index}
                        image_url={recipe.image_url}
                        title={recipe.title}
                        publisher_url={recipe.publisher_url}
                        publisher={recipe.publisher}
                        id={recipe.recipe_id}
                        keyId={recipe.recipe_id}
                        source_url={recipe.source_url}
                        recipes={recipes}
                        recipe={recipe}
                        keywords={keywords}
                        favorites={favorites}
                        addToFavorites={addToFavorites}
                        limitRecipeTitle={limitRecipeTitle}
                        favoriteButton={true}
                    />
                ))}
                
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, null)(RecipeList);