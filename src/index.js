import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FavoriteRecipe from './components/FavoriteRecipes';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);
store.subscribe(() => console.log('store', store.getState()))

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/favorites" component={FavoriteRecipe} />
        </Switch>
    </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
