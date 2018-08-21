import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { setRecipes } from './actions';
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';

import axios from 'axios';
import RecipeList from './components/RecipeList';
import FavoriteRecipes from './components/FavoriteRecipes'
import { ClipLoader } from 'react-spinners';

import './App.css';


class App extends Component {
  state = {
    recipes: [],
    favorites: [],
    keywords: '',
    loading: false
}

componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    //   when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    //window.onload = this.getRecipe();
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  addToFavorites = (recipe) => {

    this.setState({
      favorites: [...this.state.favorites, recipe]
    });

    console.log('[FAVORITE RECIPES]:', this.state.favorites);

  }

  getRecipe = (event) => {
      event.preventDefault();
      this.setState({recipes: []});
      
      //const proxy = 'https://cors-anywhere.herokuapp.com/';
      // const proxy = 'https://cryptic-headland-94862.herokuapp.com/';
      const API_KEY = '4921fea5b819539cd1fd95afc554ea9e';
      //const API_KEY2 = '462b1cc8d4f2730081462fbc65136320';
      
      this.setState({loading: true});
      
    //   axios.get(`http://food2fork.com/api/search?key=${API_KEY}&q=${this.state.keywords}`)
    //       .then(response => {
    //           const fetchedRecipes = [];
    //           console.log(response.data.recipes);
    //           response.data.recipes.map(recipe => fetchedRecipes.push(recipe));
    //           this.setState({recipes: fetchedRecipes});

    //           this.setState({loading: false});
              
    //           console.log('[STATE RECIPES]:',this.state.recipes);
    //   })
    //   .catch(error => {
    //       console.log(error);
    //   });
        axios.get(`http://food2fork.com/api/search?key=${API_KEY}&q=${this.state.keywords}`)
            .then(response => {
                const fetchedRecipes = [];
                //console.log(response.data.recipes);
                response.data.recipes.map(recipe => fetchedRecipes.push(recipe));
                this.props.setRecipes(response);

                this.setState({loading: false});
                
                //console.log('[STATE RECIPES]:',this.state.recipes);
        })
        .catch(error => {
            console.log(error);
        })
      
  }

  clearInput = (e) => { 
      e.target.value= '';
      this.setState({recipes: []});
  }

  onInputChange = (event) => {
      this.setState({ keywords: event.target.value });
      
      //console.log('[State keywords]', this.state.keywords);
  }

  render() {
    
      return (
          <Fragment>
              <Container>
                  {/* <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}> */}
                      <header className="App-header">
                          {/* <img src="assets/img/background2.jpg" width="100%" alt=""/> */}
                          <div className="logo">Recipe Finder</div>
                          <div className="box">
                                  
                              <Form inline className="search" ref={(el) => this.myFormRef = el}>
                                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                      <Input type="text" placeholder="Search recipe..." onChange={this.onInputChange}  />
                                  </FormGroup>{' '}
                                  <Button 
                                      className="btn" 
                                      style={{backgroundColor:"#21a00b", color:"#fff", outline:"none"}} 
                                      onClick={this.getRecipe} type="submit">Search Recipe</Button>   
                              </Form>                                   
                          </div>
                      </header>

                      <div className='sweet-loading'>
                          <ClipLoader 
                              size={100}
                              color={'#21a00b'} 
                              loading={this.state.loading} />
                      </div>
                      
                      <RecipeList 
                          keywords={this.state.keywords} 
                          recipes={this.state.recipes}
                          favorites={this.state.favorites} 
                          addToFavorites={this.addToFavorites} /> 

         
                          
                      <div>
                      </div>
                    
                      {/* <FavoriteRecipes
                        keywords={this.state.keywords} 
                        recipes={this.state.recipes}
                        favorites={this.state.favorites}
                        addToFavorites={this.addToFavorites}
                      /> */}
                  
              </Container>
          </Fragment>
      )
  }

}

const actions = {
    setRecipes
}

export default connect(null, actions)(App);
