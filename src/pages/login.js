import React from 'react'
import { Layout, message } from 'antd';
import  AcHeader  from '../controls/acHeader'
import  AcFooter  from '../controls/acFooter'
import { withRouter } from 'react-router-dom';

import './css/login.css'

import { Form, Icon, Input, Button, Checkbox } from 'antd';

const { Content } = Layout;
class LoginPageClass extends React.Component
{
    constructor(props)
    {
        super(props);
        
        try {
            this.state = this.props.location.state;
        } catch (error) {
            this.state = {lastUrl: '/'}
        }
        if (this.state === undefined )
        {
            this.state = {lastUrl: '/'}
        }
        else if (this.state.lastUrl === '/register')
        {
            this.state.lastUrl = '/';
        }
        if (this.state.lastUrl === undefined) this.state.loginInfo.lastUrl = '/';
        this.state.loginInfo = {isExpert: false, logined: false, un:''};
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

                fetch('http://94.191.58.148/login.php',{
                    method: 'POST',
                    body: formData,
                    dataType: 'text'
                })
                .then((response)=>response.json())
                .then((data)=>{
                    if (data.data.length === 1)
                    {
                        message.info('登录成功');
                        // eslint-disable-next-line
                        this.state.loginInfo.UID = data.data[0].UID;
                        // eslint-disable-next-line
                        this.state.loginInfo.isExpert = data.data[0].IsExpert === '1';
                        // eslint-disable-next-line
                        this.state.loginInfo.point = data.data[0].Points;
                        // eslint-disable-next-line
                        this.state.loginInfo.logined = true;
                        this.props.history.push({pathname: this.state.lastUrl, state: this.state});
                    }
                    else
                    {
                        message.info('登录失败: '+ data.err);
                    }
                    })
                .catch(function(err){
                    message.info('登录失败: '+err);
                })
            }
        })
    };

    render()
    {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout className="login-layout">
                <AcHeader loginInfo={this.state.loginInfo} homePage={false}/>
                <Content className="login-content">
                    <div className="login-form">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                            {getFieldDecorator('un', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                />,
                            )}
                            </Form.Item>
                            <Form.Item>
                            {getFieldDecorator('pd', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                />,
                            )}
                            </Form.Item>
                            <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox className="login-form-checkbox">Remember me</Checkbox>)}
                            <a className="login-form-forgot" href="/forgetpd">
                                Forgot password
                            </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            <a href="/register" style={{float:"left"}}>Or register now!</a>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
                <AcFooter/>
            </Layout>
        );
    }
}
const LoginPage = Form.create({ name: 'Login' })(LoginPageClass);
export default withRouter(LoginPage);