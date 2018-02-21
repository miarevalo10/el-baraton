import React, { Component } from 'react';
import './App.css';

import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

/*
* Extraer del localStorage la info para el shopping cart star
*/

class Home extends Component {
  render() {
    return (
      <div>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Shopping Cart</Breadcrumb.Item>
          </Breadcrumb>

          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>

            <h1>Shopping cart!</h1>
          </div>

        </Content>

      </div>
    );
  }
}

export default Home;
