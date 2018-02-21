import React, { Component } from 'react';
import './App.css';
import data from './products.json';
import { Layout,Breadcrumb,Table, Input,Button,Icon,message} from 'antd';
import { Link } from 'react-router-dom'
import WrappedFilters from './filters';

const Search = Input.Search;

const { Content } = Layout;

class ProductsTable extends Component {


    constructor(props) {
        super(props);
        localStorage.setItem('products', JSON.stringify(data));

      //console.log(JSON.parse(localStorage.getItem('products')));
      console.log(localStorage.getItem('fu'));

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
        this.applyFilters = this.applyFilters.bind(this);
        this.addToCart= this.addToCart.bind(this);
        this.removeFromCart= this.removeFromCart.bind(this);


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
      *
      */
      addToCart = (record) => {
        console.log('le record', record);
        record.quantity = (localStorage.getItem(record.id)===null) ? 1 : record.quantity+1;
        var shoppingcart=[];
        localStorage.setItem(record.id,JSON.stringify(record));
        if(localStorage.getItem('shoppingcart')===null)
        {
          shoppingcart=[record];
          localStorage.setItem('shoppingcart',JSON.stringify(shoppingcart));
        }
        else
        {
          shoppingcart= JSON.parse(localStorage.getItem('shoppingcart'));
          if(shoppingcart.find(function (obj) { return obj.id === record.id; })!=null)
          {
            var obj = shoppingcart.find(function (obj) { return obj.id === record.id; });
            shoppingcart.find(function (obj) { return obj.id == record.id; }).quantity=record.quantity;
            console.log(('el objetiño encotrado'), obj);

          }
          else{
            shoppingcart.push(record);
          }
          localStorage.setItem('shoppingcart',JSON.stringify(shoppingcart));
          console.log('final shopcart',JSON.parse(localStorage.getItem('shoppingcart')));
        }
        console.log('you just added ->',localStorage.getItem(record.id));
        message.success(record.quantity +' '+record.name + ' added to cart',2);
      }

      /*
      *
      */
      removeFromCart = (record) => {
        console.log('le record', record);
        if(localStorage.getItem(record.id)===null)
        {
          message.warning('cannot remove this');

        }

        record.quantity = (localStorage.getItem(record.id)===null) ? 0 : record.quantity-1;

        localStorage.setItem(record.id,JSON.stringify(record));
        console.log('you just removed ->',localStorage.getItem(record.id));
        message.success(record.quantity +' '+record.name + ' removed from cart',2);
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

      applyFilters(filter){

        if(filter.quantity===undefined){
          filter.quantity=0;
        }
        if(filter.minprice===undefined){
          filter.minprice=0;
        }
        if(filter.maxprice===undefined){
          filter.maxprice=20000;
        }
        const result4 =  this.state.subleveldata.filter(product => (
          product.quantity >= filter.quantity &&
          product.price.replace("$","").replace(",","")>=filter.minprice&&
          product.price.replace("$","").replace(",","")<=filter.maxprice)
        );
        this.setState({products: result4});

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
        },
        {
         title: 'Quantity',
         dataIndex: 'quantity',
         key: 'quantity',
         sorter: (a, b) => a.quantity-b.quantity,

       },
       {
         title: 'Shopping cart',
         key: 'addtocart',
         render: (text, record) => (
            <span>
              <Button title="Remove from shopping cart" onClick={this.removeFromCart.bind(this,record)} ><Icon type="minus" /></Button>

              <Button title="Add to shopping cart" onClick={this.addToCart.bind(this,record)} ><Icon type="plus" /></Button>
            </span>
          )
       }
     ];
        return <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                  <Breadcrumb.Item>{this.props.match.params.product}</Breadcrumb.Item>
                </Breadcrumb>

                <div style={{ background: '#ECECEC', padding: '30px' }}>
                  <h1>{this.props.match.params.product}</h1>
                  <div>
                    <WrappedFilters filters={this.applyFilters}></WrappedFilters>
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
