import React from 'react'
import Home from './Home';

import { Switch, Route } from 'react-router-dom'
//import Products from './products'
import ProductsTable from './table'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>

        <Switch>
          <Route exact path='/' component={Home}/>
        {      /*  <Route path='/:product/:sublevelid' component={Products}/>
      */}          <Route path='/table/:product/:sublevelid' component={ProductsTable}/>
        </Switch>

  </main>
)

export default Main
