import React from 'react'
import { Layout, message } from 'antd';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import { withRouter } from 'react-router-dom';
import './css/register.css'

import {
  Form, 
  Input,
  Checkbox,
  Button,
} from 'antd';

const { Content } = Layout;


class RegisterPageClass extends React.Component {
  
  constructor(props)
  {
    super(props);
    
    this.state = {
      confirmDirty: false,
      autoCompleteResult: []
    };
    
    try {
      this.state = this.props.location.state;
    } catch (error) {
      this.state = {lastUrl: '/'}
    }
    if (this.state.lastUrl === '/login')
    {
        this.state.lastUrl = '/';
    }
    if (this.state.lastUrl === undefined) this.state.lastUrl = '/';
    this.state.loginInfo = {isExpert: false, logined: false, un:''}
  }

  handleSubmit = (e) =>
  {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => 
    {
      if (!err) 
      {
        var formData = new FormData();
        formData.append("un", values['un']);
        formData.append("pd", values['pd']);

        // eslint-disable-next-line
        this.state.loginInfo.un = values['un'];
        console.log(values);
        fetch('http://94.191.58.148/register.php',{
            method: 'POST',
            body: formData,
            dataType: 'text'
        })
        .then((response)=>response.text())
        .then((data)=>{
          console.log(data);
          if (data.result2 === true)
          {
            message.info('注册成功');
            
            // eslint-disable-next-line
            this.state.loginInfo.userid = data.UID;
            // eslint-disable-next-line
            this.state.loginInfo.isExpert = data.isExpert;
            // eslint-disable-next-line
            this.state.loginInfo.point = 0;
            // eslint-disable-next-line
            this.state.loginInfo.logined = true;
            this.props.history.push({pathname: this.state.lastUrl, state: this.state});
          }
          else
          {
            message.info('注册失败: '+ data.err);
          }
        })
        .catch(function(err){
            message.info('注册失败: '+err);
        })
      }
    })
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('pd')) {
      callback('两次密码输入不一致，请重新输入！');
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
  handleAgreement = (rule, value, callback) => {
    if (this.props.form.getFieldValue('agreement') === false)
    {
      callback('注册需要同意协议');
    }
    else
    {
      callback();
    }
  }



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
        <AcHeader loginInfo={this.state.loginInfo} homePage={false}/>
        <Content className="reg-content">
          <div className="reg-div-form">
            <Form {...formItemLayout} className="reg-form" onSubmit={this.handleSubmit}>
              <Form.Item label="Username">
                {getFieldDecorator('un', {
                  rules: [
                    {
                      required: true,
                      message: '请输入合法的用户名',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('pd', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码！',
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
                      message: '请确认密码！',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator('agreement',{
                  rules: [
                    {
                      required: true,
                      message: '注册需要同意协议'
                    },
                    {
                      validator: this.handleAgreement
                    }
                  ]
                })(<Checkbox>
                    I have read the <a href="/agreement">agreement</a>
                  </Checkbox>)}
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

export default withRouter(RegisterPage);