import React, { Component } from 'react';
import './App.css';


import { Layout, Breadcrumb,Row,Col,Icon,Button } from 'antd';
import { Link } from 'react-router-dom';


const { Content } = Layout;



class Home extends Component {
  render() {
    return (
      <div>
        <Content style={{ padding: '0 50px' }}>
          <Row>
            <Col span={22}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={2}>
              <Button title='Go to Shopping Cart'style={{ margin: '16px 0' }}><Link to='/shoppingcart'><Icon type="shopping-cart" /></Link></Button>
            </Col>
          </Row>

          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>

            <h1>Welcome!</h1>
          </div>

        </Content>

      </div>
    );
  }
}

export default Home;
