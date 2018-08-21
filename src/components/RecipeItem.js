import React, { Fragment } from 'react';
import { Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardDeck } from 'reactstrap';
import ScrollAnimation from 'react-animate-on-scroll';
import Modal from './Modal';

import { connect } from 'react-redux';
import { favoriteRecipe } from '../actions';


const RecipeItem = (props) => {
  const {id, keyId, recipe, image_url, title, publisher_url, publisher, source_url, keywords, limitRecipeTitle} = props; 
  
  return (
    <Fragment>
        <Col md={4} sm={6} xs={4}>
            <ScrollAnimation animateIn="zoomIn" animateOnce>
                <CardDeck style={{border: "1px solid #ccc", padding:"20px 5px"}}>
                    <Card body className="text-center">
                        <CardImg top width="100%" src={image_url} alt="Card image cap" />
                        <CardBody  style={{ padding: "10px"}}>
                            <CardTitle style={{ fontSize: "14px", marginTop:"16px"}}>{limitRecipeTitle(title)}</CardTitle>
                            <CardSubtitle 
                                style={{fontSize: "13px"}}>
                                Publisher: <a href={publisher_url} target="_blank">{publisher}</a>
                                <div className="star" onClick={() => props.favoriteRecipe(recipe)}>
                                    <span> &#9733; </span>
                                </div>
                            </CardSubtitle>
                            <Modal
                                key={keyId}
                                keywords={keywords}
                                id={id}
                                title={title}
                                publisher_url={publisher_url}
                                publisher_name={publisher}
                                image_url={image_url}
                                source_url={source_url}
                                />                   
                        </CardBody>
                    </Card>
                </CardDeck>
            </ScrollAnimation>
        </Col>
    </Fragment>
  )
}

export default connect(null, { favoriteRecipe })(RecipeItem);
