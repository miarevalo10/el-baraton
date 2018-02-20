import React, { Component } from 'react';
import './App.css';
import data from './products.json';
import { Layout,Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import { List,Card, Col, Row , Input} from 'antd';

const Search = Input.Search;

const { Content } = Layout;

class Products extends Component {

  constructor(props) {
      super(props);
      const result =  data.filter(product => product.sublevel_id == this.props.match.params.sublevelid);

      this.state = {
          products: result
      }
      console.log(this.state.products);

      //console.log(result);

  }

  componentWillReceiveProps(nextProps){
    console.log('sublevel id 1 --- ',data[0].sublevel_id);
    console.log('sublevel id 2 --- ',this.props.match.params.sublevelid);
    console.log('sublevel id nextproipsss --- ',nextProps.match.params.sublevelid);

    if (this.props!== nextProps) {
      const result2 =  data.filter(product => product.sublevel_id == nextProps.match.params.sublevelid);
      console.log('resultado next props',result2);
      this.setState({products: result2});
      };
      console.log('after the shit',this.state.products);
    }

    handleSearch = (e) => {
      console.log('searchingdude ', e);
      const result3 =  this.state.products.filter(product => product.name == e);
      console.log('resultado searching',result3);
      this.setState({products: result3});
    }

  render() {
    return (
      <div>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{this.props.match.params.product}</Breadcrumb.Item>
          </Breadcrumb>




            <div style={{ background: '#ECECEC', padding: '30px' }}>
              <h1>{this.props.match.params.product}</h1>
              <div>
                <Search
                  placeholder="What are you looking for?"
                  onSearch={this.handleSearch}
                  size="large"
                />
                <br /><br />
              </div>
              <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                  dataSource={this.state.products}
                  renderItem={item => (
                    <List.Item>
                      <Card title={item.name} bordered={true}>
                        <p>Price: {item.price}</p>
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

export default Products;
