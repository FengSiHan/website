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
  Modal,
  message
} from 'antd';
import './css/personal.css'
import TextArea from 'antd/lib/input/TextArea';

const { Content } = Layout;
const { Option } = Select;

const ChangePdModal = Form.create({ name: 'changePd' })( 
  class extends React.Component
  {
    constructor(props)
    {
      super(props);
      this.state = {confirmDirty: false};
    }

    handleConfirmBlur = e => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('newpd')) {
        callback('两次密码输入不一致！');
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

    render()
    {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return(
        <Modal visible={visible} title="修改密码" okText="确认修改" onCancel={onCancel} onOk={onCreate}>
          <Form layout="vertical">
              <Form.Item label="原密码">
                {getFieldDecorator('oldpd', {
                  rules: [{ required: true, message: '请输入原来的密码！' }],
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item label="新密码" hasFeedback>
                {getFieldDecorator('newpd',{rules: [
                      {
                        required: true,
                          message: '请输入新的密码！' },
                      {
                        validator: this.validateToNextPassword,
                      }
                    ],
                  })(<Input.Password/>)}
              </Form.Item>
              <Form.Item label="再次输入新密码" hasFeedback>
                {getFieldDecorator('confirm',{rules: [
                      {
                        required: true,
                          message: '请确认新的密码！' },
                      {
                        validator: this.compareToFirstPassword,
                      }
                    ],
                  })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
            </Form>
        </Modal>
      );
      
    }
  }
);

const ExpertApplyModal = Form.create({ name: 'expertApply' })( 
  class extends React.Component
  {
    render()
    {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return(
        <Modal visible={visible} title="专家认证" okText="认证" onCancel={onCancel} onOk={onCreate}>
          <Form layout="vertical">
              <Form.Item label="真实姓名">
                {getFieldDecorator('realName', {
                  rules: [{ required: true, message: '请输入真实姓名！' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="身份证号码">
                {getFieldDecorator('idCard')(<Input/>)}
              </Form.Item>
              <Form.Item label="所在机构" hasFeedback>
                {getFieldDecorator('org',{rules: [
                      {
                        required: true,
                        message: '请输入所在机构' 
                      }],
                  })(<Input />)}
              </Form.Item>
              <Form.Item label="个人简介">
                {getFieldDecorator('intro')(<TextArea style={{minHeight:'80px'}}/>)}
              </Form.Item>
              <Form.Item label="研究领域">
                {getFieldDecorator('filed',{rules: [
                      {
                        required: true,
                        message: '请输入擅长领域' 
                      }
                    ],
                  })(<TextArea style={{minHeight:'80px'}}/>)}
              </Form.Item>
            </Form>
        </Modal>
      );
    }
  }
);

//需要保存是否是专家以及用户名
class PersonalPageClass extends React.Component 
{
  constructor(props)
  { 
    super(props);

    try {
      console.log(this.props.location.state.lastUrl);
    } catch (error) {      
      window.location.href="/"; 
    }

    try {
      this.state = this.props.location.state;
    } catch (error) {
        this.state = {loginInfo: {isExpert: false, logined: false, un:''}};
    }
    if (this.state === undefined )
    {
        this.state = {loginInfo: {isExpert: false, logined: false, un:''}};
    }
    
    try {
      this.state.isExpert = this.props.location.state.isExpert;
    } catch (error) {
      this.state.isExpert = false;
    }
    this.state.changePdVisible = false;
    this.state.expertApplyVisible = false;
    console.log(this.state.loginInfo);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of change passward form: ', values);
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

  showChangePdModal = () =>
  {
    this.setState({changePdVisible: true});
  }
  handleChangePdCancel = () =>
  {
    this.setState({changePdVisible: false});
  }

  showExpertApplyModal = () =>
  {
    this.setState({expertApplyVisible: true});
  }
  handleExpertApplyCancel = () =>
  {
    this.setState({expertApplyVisible: false});
  }

  handleExpertApplyConfirm = () => {
    const form = this.EAformRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      message.info('申请中，请等待管理员验证');
      console.log('Received values of expert apply form: ', values);
      form.resetFields();
      this.setState({ expertApplyVisible: false });
    });
  };

  handleChangePdConfirm = () =>
  {
    const form = this.CPformRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (form.getFieldValue('oldpd') === form.getFieldValue('confirm'))
      {
        message.info('新密码和旧密码不能相同!');
        return;
      }
      message.info('修改成功，下次请用新密码登陆');
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ changePdVisible: false });
    });
  }
  saveCPFormRef = formRef => {
    this.CPformRef = formRef;
  };
  saveEAFormRef = formRef => {
    this.EAformRef = formRef;
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

    console.log(this.state.loginInfo);
    return (
      <Layout className="personal-layout">
        <AcHeader loginInfo={this.state.loginInfo} homePage={false}/>
        <Content className="personal-content">
          <div className="personal-left-div">
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
              <Button type="primary" onClick={this.showChangePdModal}>
                修改密码
              </Button>
            </div>
            <div style={{margin: '20px'}}>
              <Button type="primary" onClick={this.showExpertApplyModal}>
                专家认证
              </Button>
            </div>
            <div style={{margin: '20px'}}>
              <Button type="primary" disabled={!this.state.loginInfo.isExpert} onClick={()=>this.props.history.push({pathname:'/project', state: this.state})}>
                管理项目
              </Button>
            </div>
            <div style={{margin: '20px'}}>
              <Button type="primary" disabled={!this.state.loginInfo.isExpert} onClick={()=>this.props.history.push({pathname:'/thesis', state: this.state})}>
                管理论文
              </Button>
            </div>
            <div style={{margin: '20px'}}>
              <Button type="primary" disabled={!this.state.loginInfo.isExpert} onClick={()=>this.props.history.push({pathname:'/patent', state: this.state})}>
                管理专利
              </Button>
            </div>
          </div>
        </Content>
        <ChangePdModal 
          wrappedComponentRef={this.saveCPFormRef} visible={this.state.changePdVisible} 
          onCancel={this.handleChangePdCancel} onCreate={this.handleChangePdConfirm}/>
          <ExpertApplyModal 
            wrappedComponentRef={this.saveEAFormRef} visible={this.state.expertApplyVisible} 
            onCancel={this.handleExpertApplyCancel} onCreate={this.handleExpertApplyConfirm}/>
        <AcFooter />
      </Layout>
    );
  }
}

const PersonalPage = Form.create({ name: 'personal' })(PersonalPageClass);
export default withRouter(PersonalPage);