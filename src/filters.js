import React, { Component } from 'react';
import './App.css';
import {
  Form, InputNumber, Switch,
  Slider, Button
} from 'antd';
const FormItem = Form.Item;


class Filters extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
          {getFieldDecorator('input-number', { initialValue: 3 })(
            <InputNumber min={1} max={10} />
          )}
          <span className="ant-form-text"> items </span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Available"
        >
          {getFieldDecorator('switch', { valuePropName: 'checked' })(
            <Switch />
          )}
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedFilters = Form.create()(Filters);

export default WrappedFilters;
