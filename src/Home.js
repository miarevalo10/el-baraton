import React, { Component } from 'react';
import './App.css';


import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;



class Home extends Component {
  render() {
    return (
      <div>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>

          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>

            <h1>Welcome!</h1>
          </div>

        </Content>

      </div>
    );
  }
}

export default Home;
