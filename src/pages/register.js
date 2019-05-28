import React from 'react'
import { Layout } from 'antd';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import './css/register.css'

import {
  Form, 
  Input,
  Checkbox,
  Button,
} from 'antd';

const { Content } = Layout;


class RegisterPageClass extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };



  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Layout className="reg-layout">
        <AcHeader logined={false} />
        <Content className="reg-ontent">
          <div className="reg-div-form">
            <Form {...formItemLayout} className="reg-form" onSubmit={this.handleSubmit}>
              <Form.Item label="Username">
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                })(
                  <Checkbox>
                    I have read the <a href="">agreement</a>
                  </Checkbox>,
                )}
              </Form.Item>
              <Form.Item style={{margin: '0 auto 0 auto', textAlign: 'center', display:'inline-block'}}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <AcFooter />
      </Layout>
    );
  }
}

const RegisterPage = Form.create({ name: 'register' })(RegisterPageClass);

export default RegisterPage;