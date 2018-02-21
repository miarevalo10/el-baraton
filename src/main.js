import React from 'react'
import Home from './Home';

import { Switch, Route } from 'react-router-dom'
import ProductsTable from './table'
import ShoppingCart from './shoppingcart'

const Main = () => (
  <main>

        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/shoppingcart' component={ShoppingCart}/>
          <Route path='/table/:product/:sublevelid' component={ProductsTable}/>
        </Switch>

  </main>
)

export default Main
