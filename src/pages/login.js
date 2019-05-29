import React from 'react'
import { Layout, message } from 'antd';
import  AcHeader  from '../controls/acHeader'
import  AcFooter  from '../controls/acFooter'
import './css/login.css'

import { Form, Icon, Input, Button, Checkbox } from 'antd';

const { Content } = Layout;
class LoginPageClass extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            logined: false
        };
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            console.log('Received values of form: ', values);
            message.info("登陆成功");
            this.state.logined = true;
            this.props.history.push({pathname:'/',state: this.state});
            }
        });
    };

    render()
    {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout className="login-layout">
                <AcHeader logined={false}/>
                <Content className="login-content">
                    <div className="login-form">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                />,
                            )}
                            </Form.Item>
                            <Form.Item>
                            {getFieldDecorator('password', {
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
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            <a href="" style={{float:"left"}}>Or register now!</a>
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
export default LoginPage;