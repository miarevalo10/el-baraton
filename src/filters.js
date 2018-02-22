import React, { Component } from 'react';
import './App.css';
import {
  Form, InputNumber, Switch, Button
} from 'antd';
const FormItem = Form.Item;


class Filters extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.filters(values);
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Quantity"
        >
          {getFieldDecorator('quantity', { valuePropName: 'quantity' })(
            <InputNumber min={0} max={10000} />
          )}
          <span className="ant-form-text"> items </span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Lowest price"
        >
          {getFieldDecorator('minprice', { valuePropName: 'price1' })(
            <InputNumber min={1} max={100000} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Highest price"
        >
          {getFieldDecorator('maxprice', { valuePropName: 'price2' })(
            <InputNumber min={1} max={100000} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Available"
        >
          {getFieldDecorator('available', { valuePropName: 'checked', initialValue:true})(
            <Switch />
          )}
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">Apply filters</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedFilters = Form.create()(Filters);

export default WrappedFilters;
