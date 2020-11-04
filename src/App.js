import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppHeader from './AppHeader';
import MicroFrontend from './MicroFrontend';
import About from './About';

const {
  REACT_APP_BROWSE_HOST: browseHost,
  REACT_APP_RESTAURANT_HOST: restaurantHost,
} = process.env;

let numRestaurants = 0;
fetch(`${process.env.REACT_APP_CONTENT_HOST}/restaurants.json`)
  .then(res => res.json())
  .then(restaurants => {
    numRestaurants = restaurants.length;
  });
const getRandomRestaurantId = () =>
  Math.floor(Math.random() * numRestaurants) + 1;

const parsePathRoot = (url) => {
  if (url === '/') {
    return url;
  }
  return `/${url.split('/')[1]}/`;
}

const Browse = ({ history, match }) => {
  return (
    <MicroFrontend
      history={history}
      host={browseHost}
      pathRoot={parsePathRoot(match.url)}
      name="Browse" />
  );
}

const Restaurant = ({ history, match }) => {
  return (
    <MicroFrontend
      history={history}
      host={restaurantHost}
      pathRoot={parsePathRoot(match.url)}
      name="Restaurant" />
  );
}
const Random = () => <Redirect to={`/restaurant/${getRandomRestaurantId()}`} />;

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <AppHeader />
      <Switch>
        <Route exact path="/" component={Browse} />
        <Route path="/restaurant/*" component={Restaurant} />
        <Route exact path="/random" render={Random} />
        <Route exact path="/about" render={About} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default App;
