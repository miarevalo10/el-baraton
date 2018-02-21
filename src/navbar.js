import React, { Component } from 'react';
import data from './categories.json';
import {Menu} from 'antd/lib'
import {Link } from 'react-router-dom'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Navbar extends Component {

  constructor(props) {
      super(props);

      this.state = {
          items: data
      }
      console.log(this.state.items);

  }

  handleClick = (e) => {
    console.log('click ', e);
  }

  /*
  *Checks if it's final sublevel
  */
  isLast(item) {
    return !item.sublevels;
  }

  render() {
    let globcomp = this;
    return (
      <div>
        <Menu onClick={this.handleClick}
           mode="horizontal">

           {this.state.items.map(function(item){
             return   <SubMenu key={item.id} title={item.name}>
                        {//Validar si el subnivel siguiente es final para decidir si es menu items o menu item group
                            item.sublevels.every(globcomp.isLast.bind(this))&&
                              item.sublevels.map(function(sublevel){

                                return <Menu.Item key={sublevel.id}><Link to={'/table/'+item.name+'-'+sublevel.name+'/'+sublevel.id}>{sublevel.name}</Link></Menu.Item>
                              })
                        }
                        {
                            !item.sublevels.every(globcomp.isLast.bind(this))&&
                              item.sublevels.map(function(sublevel1){
                                return <MenuItemGroup key={sublevel1.id} title={sublevel1.name}>
                                          {
                                            sublevel1.sublevels.map(function(sublevel12){
                                              if(sublevel12.sublevels){
                                                return <SubMenu key={sublevel12.id} title={sublevel12.name}>
                                                        {sublevel12.sublevels.map(function(sublevel123){
                                                            return <Menu.Item key={sublevel123.id}><Link to={'/table/'+item.name+'-'+sublevel1.name+'-'+sublevel12.name+'-'+sublevel123.name+"/"+sublevel123.id}>{sublevel123.name}</Link></Menu.Item>
                                                          })
                                                        }
                                                       </SubMenu>;
                                                }
                                              else {
                                                return <Menu.Item key={sublevel12.id}><Link to={'/table/'+item.name+'-'+sublevel1.name+'-'+sublevel12.name+"/"+sublevel12.id}>{sublevel12.name}</Link></Menu.Item>;
                                              }
                                            })
                                          }
                                      </MenuItemGroup>
                              })
                        }
                      </SubMenu>;
            })
            }
         </Menu>
      </div>
    );
  }
}

export default Navbar;
