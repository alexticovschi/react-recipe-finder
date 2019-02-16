import React from 'react';
import RecipeItem from './RecipeItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container} from 'reactstrap';

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
        <Container>
            <h4 className="link"><Link to='/'>Home</Link></h4>

            <h2 className="fav-link app-title" style={{textAlign:'center', color: '#21a00b', marginBottom: '60px' }}>My Favorite Recipes</h2>

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
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        favoriteRecipes: state.favoriteRecipes
    }
}

export default connect(mapStateToProps, null)(FavoriteRecipes);