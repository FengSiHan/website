import React from 'react'
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import { withRouter } from 'react-router-dom';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Button,
  Layout,
  Avatar,
  message
} from 'antd';
import './css/personal.css'
import TextArea from 'antd/lib/input/TextArea';

const { Content } = Layout;
const { Option } = Select;

//需要保存是否是专家以及用户名
class PersonalPageClass extends React.Component {
  constructor(props)
  { 
    super(props);

    try {
      console.log(this.props.location.state.lastUrl);
    } catch (error) {      
      window.location.href="/"; 
    }

    try {
      this.state = {logined: this.props.location.state.logined};
    } catch (error) {
      this.state = {logined: false};
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    console.log(this.state.logined);
    return (
      <Layout className="personal-layout">
        <AcHeader logined={this.state.logined} homePage={false}/>
        <Content className="personal-content">
          <div className="personal-outer-div">
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="Avatar">  
                {getFieldDecorator('avatar', {
                })(<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />)}
              </Form.Item>
              <Form.Item label="Username" disabled>  
                {getFieldDecorator('un', {
                  initialValue: 'InitialValue',
                  rules: [
                    {
                      type: 'un',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: 'true',
                      message: 'Please input username'
                    }
                  ],
                })(<Input disabled/>)}
              </Form.Item>
              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    }
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Nickname&nbsp;
                    <Tooltip title="What do you want others to call you?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('nickname', {
                  rules: [{ whitespace: true }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Phone Number">
                {getFieldDecorator('phone', {
                })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
              </Form.Item>
              <Form.Item label="Introduction">  
                {getFieldDecorator('intro', {
                })(<TextArea style={{minHeight: "100px"}}/>)}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <div>
                  <Button type="primary" htmlType="submit">
                  确认修改
                </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
          <div className='personal-right-div'>
            <div style={{margin: '20px'}}>
              <Button type="primary">
                修改密码
              </Button>
            </div>
            <div style={{margin: '20px'}}>
              <Button type="primary">
                申请专家
              </Button>
            </div>
          </div>
        </Content>
        <AcFooter />
      </Layout>
    );
  }
}

const PersonalPage = Form.create({ name: 'personal' })(PersonalPageClass);
export default withRouter(PersonalPage);