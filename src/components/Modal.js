import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';

import axios from 'axios';
import { PropagateLoader } from 'react-spinners';
import { Animated } from "react-animated-css";


class MyModal extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false,
        id: '',
        recipes: [],
        ingredients: [],
        loading: false
      };
    }

    getRecipe = (id) => {
      //const proxy = 'https://cryptic-headland-94862.herokuapp.com/';
      const proxy = 'https://cors-anywhere.herokuapp.com/';

      const API_KEY = '4921fea5b819539cd1fd95afc554ea9e';

      this.setState({loading: true});

      axios.get(`${proxy}http://food2fork.com/api/get?key=${API_KEY}&rId=${id}`)
        .then(response => {
          
          const fetchedIngredients = [];
          //console.log('[Ingredients]',response.data.recipe.ingredients);
          response.data.recipe.ingredients.map(ing => fetchedIngredients.push(ing));
          this.setState({ ingredients: fetchedIngredients });
          //console.log('[STATE INGREDIENTS]',this.state.ingredients)
          //console.log('[STATE RECIPES]:',this.state.recipes);
          this.setState({loading: false});
      })
      .catch(error => {
          console.log(error);
      });
    }

    handleClose() {
      this.setState({ show: false, ingredients: [] }); 
    }
  
    handleShow() {
      this.setState({ show: true, id: this.props.id });
      //console.log(this.state.id)
      this.getRecipe(this.props.id);
    }
  
    render() {
      //console.log('[INSIDE Modal.js]',this.props);
      //console.log('[PROPS RECIPIES]',this.state.recipies);
      
      //console.log('[INSIDE Modal.js STATE]',this.state.id);
      // console.log('[INSIDE Modal.js keywords]',this.props.keywords);
  
      return (
        <div>
          {/* <Button style={{backgroundColor:"#21a00b", color:"#fff", outline: "none", marginTop:"100px", marginBottom:"0px"}} onClick={this.handleShow} block> */}
          <Button className="btn" style={{backgroundColor:"#21a00b", color:"#fff", outline: "none", marginTop:"22px", marginBottom:"10px"}} onClick={this.handleShow} block>
            View Recipe
          </Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton style={{backgroundColor: "#9de88f"}}>
              {/* <Modal.Title></Modal.Title> */}
              <h3 className="text-center"><img className="food_logo" src="assets/img/food-logo.png" height="60px" alt=""/>{this.props.title}</h3>
            </Modal.Header>
            
            <div className="text-center">
              <img style={{
                    marginTop: '10px'
                  }} src={this.props.image_url}  height='400' width='94%' alt="" />
            </div>
            
            <Modal.Body>
            
              <h4 className="text-center">
                <img className="publisher_logo" src="assets/img/pub.jpg" height="60px" alt=""/>
                  Publisher: <a href={this.props.publisher_url} target="_blank">{this.props.publisher_name}</a>
              </h4>
                
              <a className="source_btn btn" style={{color:"#fff"}} href={this.props.source_url} target="_blank">
                  View Recipe Source 
              </a>
              
              <hr />
              <p className="text-center" style={{fontSize: "21px", backgroundColor: "#21a00b", color: "#fff", padding:"5px 0px"}}> *** Ingredients *** </p>
              <div className='propagate-loader-modal'>
                <PropagateLoader
                  color={'#21a00b'} 
                  loading={this.state.loading} 
                />
              </div>
              <ul>
                  {this.state.ingredients.map((ing, i) => (
                    <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true}>
                    <li className="leaf" key={i} style={{fontSize: "17px"}}>{ing}</li>
                    </Animated>
                  ))}
              </ul>
              
            </Modal.Body>
            <Modal.Footer>
              <Button style={{backgroundColor:"#21a00b", color:"#fff", outline:"none"}}  onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
 
export default MyModal;