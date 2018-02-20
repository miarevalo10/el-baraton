import React, { Component } from 'react';
import './App.css';
import Navbar from './navbar';
import Main from './main';


import { Layout, Icon } from 'antd';

const { Header,Footer } = Layout;



class App extends Component {
  render() {
    return (
      <div>
        <Layout className="layout">
          <Header style={{ background: '#fff', padding: 0} }>
            <div className="logo" />
            <Navbar></Navbar>

          </Header>

          <Main></Main>
          <Footer style={{ textAlign: 'center' }}>
            Made with <Icon type="heart" /> by Maria
          </Footer>
        </Layout>

      </div>
    );
  }
}

export default App;
