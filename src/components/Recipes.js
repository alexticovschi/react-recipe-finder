import React, { Fragment } from 'react';
import { Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardDeck } from 'reactstrap';
import ScrollAnimation from 'react-animate-on-scroll';

import Modal from './Modal';

const recipes = (props) => {
    
    //console.log('[props.recipes]', props.recipes);
    
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
            {props.recipes.map(recipe => {
                //console.log(recipe);

                return (
                    <Fragment key={recipe.recipe_id}>
                        <Col md={4} sm={6} xs={4}>
                            <ScrollAnimation animateIn="zoomIn" animateOnce>
                                <CardDeck style={{border: "1px solid #ccc", padding:"20px 5px"}}>
                                    <Card body className="text-center">
                                        <CardImg top width="100%" src={recipe.image_url} alt="Card image cap" />
                                        <CardBody  style={{ padding: "10px"}}>
                                            <CardTitle style={{ fontSize: "14px", marginTop:"16px"}}>{limitRecipeTitle(recipe.title)}</CardTitle>
                                            <CardSubtitle 
                                                style={{fontSize: "13px"}}>
                                                Publisher: <a href={recipe.publisher_url} target="_blank">{recipe.publisher}</a>
                                            </CardSubtitle>
                                            <Modal
                                                key={recipe.recipe_id}
                                                keywords={props.keywords}
                                                id={recipe.recipe_id}
                                                title={recipe.title}
                                                publisher_url={recipe.publisher_url}
                                                publisher_name={recipe.publisher}
                                                image_url={recipe.image_url}
                                                source_url={recipe.source_url}
                                                />                   
                                        </CardBody>
                                    </Card>
                                </CardDeck>
                            </ScrollAnimation>
                        </Col>
                    </Fragment>
                )
            })}
            
        </div>
    )
}

export default recipes;