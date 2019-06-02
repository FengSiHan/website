import React from 'react'
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import { withRouter } from 'react-router-dom';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  Layout,
  Avatar,
  Modal,
  message
} from 'antd';
import './css/personal.css'
import TextArea from 'antd/lib/input/TextArea';

const { Content } = Layout;

const ChangePdModal = Form.create({ name: 'changePd' })(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { confirmDirty: false };
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

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal visible={visible} title="修改密码" okText="确认修改" onCancel={onCancel} onOk={onCreate}>
          <Form layout="vertical">
            <Form.Item label="原密码">
              {getFieldDecorator('oldpd', {
                rules: [{ required: true, message: '请输入原来的密码！' }],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="新密码" hasFeedback>
              {getFieldDecorator('newpd', {
                rules: [
                  {
                    required: true,
                    message: '请输入新的密码！'
                  },
                  {
                    validator: this.validateToNextPassword,
                  }
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="再次输入新密码" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请确认新的密码！'
                  },
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
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal visible={visible} title="专家认证" okText="认证" onCancel={onCancel} onOk={onCreate}>
          <Form layout="vertical">
            <Form.Item label="真实姓名">
              {getFieldDecorator('realName', {
                rules: [{ required: true, message: '请输入真实姓名！' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="身份证号码">
              {getFieldDecorator('idCard')(<Input />)}
            </Form.Item>
            <Form.Item label="所在机构" hasFeedback>
              {getFieldDecorator('org', {
                rules: [
                  {
                    required: true,
                    message: '请输入所在机构'
                  }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="个人简介">
              {getFieldDecorator('intro')(<TextArea style={{ minHeight: '80px' }} />)}
            </Form.Item>
            <Form.Item label="获得奖项">
              {getFieldDecorator('award')(<TextArea style={{ minHeight: '80px' }} />)}
            </Form.Item>
            <Form.Item label="研究领域">
              {getFieldDecorator('filed', {
                rules: [
                  {
                    required: true,
                    message: '请输入擅长领域'
                  }
                ],
              })(<TextArea style={{ minHeight: '80px' }} />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

//需要保存是否是专家以及用户名
class PersonalPageClass extends React.Component {
  constructor(props) {
    super(props);

    try {
      console.log(this.props.location.state.lastUrl);
    } catch (error) {
      window.location.href = "/";
    }

    try {
      this.state = this.props.location.state;
    } catch (error) {
      this.state = { loginInfo: { isExpert: false, logined: false, un: '' } };
    }
    if (this.state === undefined) {
      this.state = { loginInfo: { isExpert: false, logined: false, un: '' } };
    }

    try {
      this.state.isExpert = this.props.location.state.isExpert;
    } catch (error) {
      this.state.isExpert = false;
    }
    this.state.changePdVisible = false;
    this.state.expertApplyVisible = false;
  }

  componentDidMount = () => {
    var formData = new FormData();
    formData.append("uid", this.state.loginInfo.UID);
    formData.append("un", this.state.loginInfo.un);
    fetch('http://94.191.58.148/getInfor.php', {
      method: 'POST',
      body: formData,
      dataType: 'text'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status.length !== 0) {
          this.props.form.setFieldsValue({ 'email': data.status[0].statusemail });
          this.props.form.setFieldsValue({ 'nickname': data.status[0].nickname });
          this.props.form.setFieldsValue({ 'phone': data.status[0].phone });
          this.props.form.setFieldsValue({ 'intro': data.status[0].intro });
        }
        else {
          message.info('数据获取失败: ' + data.err);
        }
      })
      .catch(function (err) {
        console.log('数据获取失败2: ' + err);
      })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      var formData = new FormData();
      formData.append("uid", this.state.loginInfo.UID);
      formData.append("un", this.state.loginInfo.un);
      formData.append('email', values['email']);
      formData.append("nickname", values['nickname']);
      formData.append("intro", values['intro']);
      formData.append("phone", values['phone']);

      fetch('http://94.191.58.148/changeInfor.php', {
        method: 'POST',
        body: formData,
        dataType: 'text'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === true) {
            message.info('修改成功');
          }
          else {
            message.info('修改失败: ' + data.err);
          }
        })
        .catch(function (err) {
          console.log('登录失败2: ' + err);
        })
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  showChangePdModal = () => {
    this.setState({ changePdVisible: true });
  }
  handleChangePdCancel = () => {
    this.setState({ changePdVisible: false });
  }

  showExpertApplyModal = () => {
    this.setState({ expertApplyVisible: true });
  }
  handleExpertApplyCancel = () => {
    this.setState({ expertApplyVisible: false });
  }

  handleExpertApplyConfirm = () => {
    const form = this.EAformRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      var formData = new FormData();
      formData.append("uid", this.state.loginInfo.UID);
      formData.append("un", this.state.loginInfo.un);
      formData.append("idCard", values['idCard']);
      formData.append("org", values['org']);
      formData.append("realName", values['realName']);
      formData.append("intro", values['intro']);
      formData.append("field", values['field']);
      formData.append("award", values['award']);




      fetch('http://94.191.58.148/expert_apply.php', {
        method: 'POST',
        body: formData,
        dataType: 'text'
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === true) {
            message.info('申请中，请等待管理员验证');
            form.resetFields();
            this.setState({ expertApplyVisible: false });
          }
          else {
            message.info('申请时出现问题: ' + data.err);
          }
        })
        .catch(function (err) {
          console.log('申请失败2: ' + err);
        })
    });
  };

  handleChangePdConfirm = () => {
    const form = this.CPformRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (form.getFieldValue('oldpd') === form.getFieldValue('confirm')) {
        message.info('新密码和旧密码不能相同!');
        return;
      }
      var formData = new FormData();
      formData.append("uid", this.state.loginInfo.UID);
      formData.append('pd', values['oldpd']);
      formData.append("npd", values['newpd']);

      fetch('http://94.191.58.148/changePassword.php', {
        method: 'POST',
        body: formData,
        dataType: 'text'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result1 === true) {
            message.info('修改成功，下次请用新密码登陆');
            form.resetFields();
            this.setState({ changePdVisible: false });
          }
          else {
            message.info('修改失败: ' + data.err);
          }
        })
        .catch(function (err) {
          console.log('登录失败2: ' + err);
        })
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


    return (
      <Layout className="personal-layout">
        <AcHeader loginInfo={this.state.loginInfo} homePage={false} />
        <Content className="personal-content">
          <div className="personal-left-div">
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className='personal-form'>
              <Form.Item label="头像">
                {getFieldDecorator('avatar', {
                })(<Avatar /*src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" */ />)}
              </Form.Item>
              <Form.Item label="用户名" disabled>
                {getFieldDecorator('un', {
                  initialValue: this.state.loginInfo.un
                })(<Input disabled />)}
              </Form.Item>
              <Form.Item label="积分" disabled>
                {getFieldDecorator('point', {
                  initialValue: this.state.loginInfo.point
                })(<Input disabled />)}
              </Form.Item>
              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: '请输入合法的Email格式!',
                    },
                    {
                      required: true,
                      message: '请输入正确的邮箱作为找回密码的凭据！'
                    }
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    昵称&nbsp;
                    <Tooltip title="你想要别人怎么称呼你">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('nickname', {
                  rules: [{ whitespace: true }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="电话号码">
                {getFieldDecorator('phone', {
                })(<Input style={{ width: '100%' }} />)}
              </Form.Item>
              <Form.Item label="个人简介">
                {getFieldDecorator('intro', {
                })(<TextArea style={{ minHeight: "100px" }} />)}
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
            <div style={{ margin: '20px' }}>
              <Button type="primary" onClick={this.showChangePdModal}>
                修改密码
              </Button>
            </div>
            <div style={{ margin: '20px' }}>
              <Button type="primary" disabled={this.state.loginInfo.isExpert} onClick={this.showExpertApplyModal}>
                专家认证
              </Button>
            </div>
            <div style={{ margin: '20px' }}>
              <Button type="primary" disabled={!this.state.loginInfo.isExpert} onClick={() => this.props.history.push({ pathname: '/project', state: this.state })}>
                管理项目
              </Button>
            </div>
            <div style={{ margin: '20px' }}>
              <Button type="primary" disabled={!this.state.loginInfo.isExpert} onClick={() => this.props.history.push({ pathname: '/thesis', state: this.state })}>
                管理论文
              </Button>
            </div>
            <div style={{ margin: '20px' }}>
              <Button type="primary" disabled={!this.state.loginInfo.isExpert} onClick={() => this.props.history.push({ pathname: '/patent', state: this.state })}>
                管理专利
              </Button>
            </div>
            <div style={{ margin: '20px' }}>
              <Button type="primary" onClick={() => this.props.history.push({ pathname: '/kejin', state: this.state })}>
                积分充值
              </Button>
            </div>
            <div style={{ margin: '20px' }}>
              <Button type="primary" disabled={!this.state.loginInfo.isExpert} onClick={() => this.props.history.push({ pathname: '/withdraw', state: this.state })}>
                积分提现
              </Button>
            </div>
          </div>
        </Content>
        <ChangePdModal
          wrappedComponentRef={this.saveCPFormRef} visible={this.state.changePdVisible}
          onCancel={this.handleChangePdCancel} onCreate={this.handleChangePdConfirm} />
        <ExpertApplyModal
          wrappedComponentRef={this.saveEAFormRef} visible={this.state.expertApplyVisible}
          onCancel={this.handleExpertApplyCancel} onCreate={this.handleExpertApplyConfirm} />
        <AcFooter />
      </Layout>
    );
  }
}

const PersonalPage = Form.create({ name: 'personal' })(PersonalPageClass);
export default withRouter(PersonalPage);