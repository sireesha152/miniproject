import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import FeaturedList from './components/FeaturedList'
import OnClickgenre from './components/OnClickgenre'
import OnClickRelease from './components/OnClickRelease'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// write your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/playlist/:playlistId"
        component={FeaturedList}
      />
      <ProtectedRoute
        exact
        path="/category/:categoryId/playlists"
        component={OnClickgenre}
      />
      <ProtectedRoute exact path="/album/:albumId" component={OnClickRelease} />
      <Route path="/bad-path" component={NotFound} />

      <Redirect to="/bad-path" />
    </Switch>
  </BrowserRouter>
)

export default App
