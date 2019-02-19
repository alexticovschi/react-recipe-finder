import React, { Fragment, Component } from 'react';
import { Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardDeck } from 'reactstrap';
import ScrollAnimation from 'react-animate-on-scroll';
import Modal from './Modal';

import { connect } from 'react-redux';
import { favoriteRecipe } from '../actions';


class RecipeItem extends Component {
    state = {
        favorited: false
    }

    favorite(recipe) {
        this.props.favoriteRecipe(recipe);
        this.setState({ favorited: true });
    }
    
    render() {
        const {
            id, 
            keyId, 
            recipe, 
            image_url, 
            title, 
            publisher_url, 
            publisher, 
            source_url, 
            keywords, 
            limitRecipeTitle} = this.props; 

        return (
          <Fragment>
              <Col md={3} sm={6} xs={4}>
                  <ScrollAnimation animateIn="zoomIn" animateOnce>
                      <CardDeck>
                          <Card body className="text-center">
                              <CardImg top width="100%" src={image_url} alt="Card image cap" />
                              <CardBody>
                                  <CardTitle style={{ fontSize: "15.5px", marginTop:"16px"}}>{limitRecipeTitle(title)}</CardTitle>
                                  <CardSubtitle 
                                      style={{fontSize: "13px"}}>
                                      Publisher: <a href={publisher_url} target="_blank">{publisher}</a>
                                      {
                                          this.props.favoriteButton ? 
                                                this.state.favorited ? 
                                                    <div className="yellow-star" title="Already Added to Favorites">
                                                        <span> &#9733; </span>
                                                    </div>
                                                : 
                                                    <div className="star" title="Add to Favorites" onClick={() => this.favorite(recipe)}>
                                                        <span> &#9733; </span>
                                                    </div>
                                            : 
                                                <div></div>
                                      }
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
                                      
                                  </CardSubtitle>
                                                    
                              </CardBody>
                          </Card>
                      </CardDeck>
                  </ScrollAnimation>
              </Col>
          </Fragment>
        )
    }
  
}

export default connect(null, { favoriteRecipe })(RecipeItem);
