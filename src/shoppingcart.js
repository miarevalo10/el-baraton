import React, { Component } from 'react';
import './App.css';
import { Layout,Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import { List,Card, Col, Row , Input} from 'antd';

const Search = Input.Search;

const { Content } = Layout;

class ShoppingCart extends Component {

  constructor(props) {
      super(props);
      const result =  JSON.parse(localStorage.getItem('shoppingcart'));

      this.state = {
          products: result
      }
      console.log(this.state.products);
  }

  render() {
    return (
      <div>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Shopping cart'</Breadcrumb.Item>
          </Breadcrumb>

            <div style={{ background: '#ECECEC', padding: '30px' }}>
              <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                  dataSource={this.state.products}
                  renderItem={item => (
                    <List.Item>
                      <Card title={item.name} bordered={true}>
                        <p>Unit Price: {item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      </Card>
                    </List.Item>
                  )}
                />

          </div>

        </Content>


      </div>
    );
  }
}

export default ShoppingCart;
