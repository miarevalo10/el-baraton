import React, { Component } from 'react';
import './App.css';
import data from './products.json';
import { Layout,Breadcrumb,Table, Input,Slider,Switch,Button,Form,InputNumber } from 'antd';
import { Link } from 'react-router-dom'
import WrappedFilters from './filters';

const FormItem = Form.Item;
const Search = Input.Search;

const { Content } = Layout;

class ProductsTable extends Component {
    constructor(props) {
        super(props);
        const result =  data.filter(product => product.sublevel_id == this.props.match.params.sublevelid);

        this.state = {
          filterDropdownVisible: false,
          subleveldata: result,
          products:result,
          searchText: '',
          filtered: false,
          pricerange:[]
        };
        console.log(this.state.products);

      }

      /*
      *Actualiza el componente si se selecciona otra opcion en la navbar
      */
      componentWillReceiveProps(nextProps){
        console.log('sublevel id 1 --- ',data[0].sublevel_id);
        console.log('sublevel id 2 --- ',this.props.match.params.sublevelid);
        console.log('sublevel id nextproipsss --- ',nextProps.match.params.sublevelid);

        if (this.props!== nextProps) {
          const result2 =  data.filter(product => product.sublevel_id == nextProps.match.params.sublevelid);
          console.log('resultado next props',result2);
          this.setState({subleveldata: result2});
          this.setState({products: result2});
          };
          console.log('after the shit',this.subleveldata);
      }

      /*
      * Tiggered cuando se busca algo
      */
      handleSearch = (e) => {
        if(e.trim()!==''){
          console.log('searchingdude ', e);
          const result3 =  this.state.subleveldata.filter(product => product.name == e);
          console.log('resultado searching',result3);
          this.setState({products: result3});
        }
        else{
          const result3 =  this.state.subleveldata.filter(product => product.sublevel_id == this.props.match.params.sublevelid);
          console.log('resultado searching',result3);
          this.setState({products: result3});
        }
      }

      /*
      * Metodos para sorting
      */
      onChange(pagination, filters, sorter) {
        console.log('params', pagination, filters, sorter);
      }
      compareByAlph (a, b) {
         if (a > b) { return -1; }
         if (a < b) { return 1; }
         return 0;
        }
      comparePrice(a, b) {
        //Remover $ y ,
        var pricea = a.price.replace("$","").replace(",","");
        var priceb = b.price.replace("$","").replace(",","");
        /*console.log('añaña',pricea);
        console.log('biriri',priceb);*/

        return pricea-priceb;
      }

      render() {

        const columns = [{
          title: 'Name',
          dataIndex: 'name',
          defaultSortOrder: 'descend',
          key: 'name',
          sorter: (a, b) => this.compareByAlph(a.name, b.name),
         },
         {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',

          sorter: (a, b) => this.comparePrice(a,b),
          //onFilter: (value, record) => record.address.indexOf(value) === 0

        },
        {
         title: 'Quantity',
         dataIndex: 'quantity',
         key: 'quantity',

         //onFilter: (value, record) => record.address.indexOf(value) === 0,
         sorter: (a, b) => a.quantity-b.quantity,

       }];
        return <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                  <Breadcrumb.Item>{this.props.match.params.product}</Breadcrumb.Item>
                </Breadcrumb>

                <div style={{ background: '#ECECEC', padding: '30px' }}>
                  <h1>{this.props.match.params.product}</h1>
                  <div>
                    <WrappedFilters></WrappedFilters>
                    <Search
                      placeholder="What are you looking for?"
                      onSearch={this.handleSearch}
                      size="large"
                    />
                    <br /><br />
                  </div>
                  <Table columns={columns} dataSource={this.state.products} onChange={this.onChange} rowKey={record => record.id}  />
                </div>

              </Content>

      }
    }





export default ProductsTable;
