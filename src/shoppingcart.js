import React, { Component } from 'react';
import './App.css';
import { Layout,Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import { List,Card,Button,message, InputNumber,Popconfirm} from 'antd';

const { Content } = Layout;

class ShoppingCart extends Component {

  constructor(props) {
      super(props);
      var result=[];
      if(localStorage.getItem('shoppingcart')!=null)
        result =  JSON.parse(localStorage.getItem('shoppingcart'));

      this.state = {
          products: result
      }
      //console.log(this.state.products);

      this.addToCart= this.addToCart.bind(this);
      this.removeFromCart= this.removeFromCart.bind(this);
      this.onChange= this.onChange.bind(this);
      this.onClick= this.onClick.bind(this);


  }

  /*
  * Saves in localStorage json object for each product (with all the values ),
  * quantity according to number of times '+' is clicked
  */
  addToCart = (record) => {
    //console.log('le record', record);
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
        //console.log(('found object'), obj);

      }
      else{
        shoppingcart.push(record);
      }
      localStorage.setItem('shoppingcart',JSON.stringify(shoppingcart));
      //console.log('final shopcart',JSON.parse(localStorage.getItem('shoppingcart')));
    }
    //console.log('you just added ->',localStorage.getItem(record.id));
    message.success(record.quantity +' '+record.name + ' added to cart',2);
  }

  /*
  * Decreases quantity in 1, of a given record.
  * If quantity reaches 0, record is removed from localStorage
  */
  removeFromCart = (record) => {
    //console.log('le record', record);
    var stringshoppingcart =localStorage.getItem('shoppingcart');
    if(stringshoppingcart===null || JSON.parse(stringshoppingcart).find(function (obj) { return obj.id === record.id; })==null )
    {
      message.warning('This item is not in your shopping cart');
    }

    else
    {
      var shoppingcart= JSON.parse(localStorage.getItem('shoppingcart'));

      var obj = shoppingcart.find(function (obj) { return obj.id === record.id; });
      if(obj.quantity<=1){
        //Remove item from shopping cart cause quantity will be 0 or negative
        //console.log('halo');
        shoppingcart.splice(shoppingcart.indexOf(obj), 1);
      }
      else{
        shoppingcart.find(function (obj) { return obj.id == record.id; }).quantity--;
      //  console.log(('el objetiño encotrado'), obj);
      }

      localStorage.setItem('shoppingcart',JSON.stringify(shoppingcart));
      //console.log('final shopcart',JSON.parse(localStorage.getItem('shoppingcart')));
    }
    //console.log('you just added ->',localStorage.getItem(record.id));
  }

  onChange(record,value){

    var shoppingcart = JSON.parse(localStorage.getItem('shoppingcart'));
    //console.log('shopcart',shoppingcart);

    shoppingcart.find(function (obj) { return obj.id == record.id; }).quantity=value;
    localStorage.setItem('shoppingcart',JSON.stringify(shoppingcart));
    this.setState({products:shoppingcart});

  }

  onClick= (e) =>{
    //console.log('levente',e);
    var shoppingcart= JSON.parse(localStorage.getItem('shoppingcart'));

    var obj = shoppingcart.find(function (obj) { return obj.id === e.id; });
    shoppingcart.splice(shoppingcart.indexOf(obj), 1);
    localStorage.setItem('shoppingcart',JSON.stringify(shoppingcart));
    this.setState({products:shoppingcart})

  }

  onCancel= (e) =>{
    console.log('canceled',e);
  }


  render() {
    return (
      <div>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Shopping cart</Breadcrumb.Item>
          </Breadcrumb>

            <div style={{ background: '#ECECEC', padding: '30px' }}>
              <h2>Shopping Cart</h2>
              <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                  dataSource={this.state.products}
                  renderItem={item => (
                    <List.Item>
                      <Card title={item.name} bordered={true}>
                        <p>Unit Price: {item.price}</p>
                        <p>Quantity:</p> <InputNumber min={0} defaultValue={item.quantity} onChange={this.onChange.bind(this,item)}></InputNumber>
                        <p>Total: ${item.quantity * item.price.replace("$","").replace(",","")}</p>

                        <div>
                          <Popconfirm title="Are you sure you want to remove this item?" onConfirm={this.onClick.bind(this,item)} onCancel={this.onCancel} okText="Yes" cancelText="No">
                            <Button type="danger" >Remove</Button>
                          </Popconfirm>
                          <Popconfirm title="Are you sure you want to buy this item?" onConfirm={this.onClick.bind(this,item)} onCancel={this.onCancel} okText="Yes" cancelText="No">
                            <Button type="primary">Buy</Button>
                          </Popconfirm>
                          </div>
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
