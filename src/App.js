import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { setRecipes } from './actions';
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';

import axios from 'axios';
import RecipeList from './components/RecipeList';
import { PropagateLoader } from 'react-spinners';
import './App.css';

const API_KEY = '4921fea5b819539cd1fd95afc554ea9e';

class App extends Component {
  state = {
    loading: false,
    recipes: [],
    trendingRecipes: []
  }

  componentDidMount() {
    this.getTrendingRecipes();

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

  getTrendingRecipes = () => {
    this.setState({
      trendingRecipes: [],
    });

    const proxy = 'https://cors-anywhere.herokuapp.com/';
    // const proxy = 'https://cryptic-headland-94862.herokuapp.com/';
    
    axios.get(`${proxy}https://food2fork.com/api/search?key=${API_KEY}&trending`)
      .then(response => {
        const fetchedRecipes = [];
        response.data.recipes.map(recipe => fetchedRecipes.push(recipe));
        this.props.setRecipes(response.data.recipes);
        this.setState({loading: false});
      })
      .catch(error => {
        console.log(error);
    })  
  }

  getRecipe = (event) => {
    event.preventDefault();
    this.setState({recipes: []});

    const proxy = 'https://cors-anywhere.herokuapp.com/';
    // const proxy = 'https://cryptic-headland-94862.herokuapp.com/';
      
    this.setState({loading: true});
      axios.get(`${proxy}https://food2fork.com/api/search?key=${API_KEY}&q=${this.state.keywords}`)
        .then(response => {
          const fetchedRecipes = [];
          console.log(response);
          response.data.recipes.map(recipe => fetchedRecipes.push(recipe));
          this.props.setRecipes(response.data.recipes);

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
            <div className="app-title">Recipe Finder</div>
            <div className="box">
                                  
              <Form inline className="search" ref={(el) => this.myFormRef = el}>
                <FormGroup sm={12} md={12} lg={12}>
                  <Input type="text" placeholder="Search recipe or enter ingredients..." onChange={this.onInputChange}  />
                </FormGroup>{' '}
                
                <Button 
                  style={{backgroundColor:"#21a00b", color:"#fff", outline:"none"}} 
                  onClick={this.getRecipe} type="submit">
                    <img className="search-icon" src="/assets/img/search-icon.png" alt=""/>
                  </Button>   
              </Form>                                   
            </div>
          </header>

          <div className='propagate-loader'>
              <PropagateLoader 
                color={'#21a00b'} 
                loading={this.state.loading} />
          </div>
                      
          <RecipeList /> 
                  
        </Container>
      </Fragment>
    )
  }

}

const actions = {
  setRecipes
}

export default connect(null, actions)(App);
