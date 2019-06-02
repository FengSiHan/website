import React from 'react'
import { Col, Button, Icon, Divider, Drawer, Avatar, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom'
import AcSearchBox from './acSearchBox'
import { withRouter } from 'react-router-dom';


class AcDrawer extends React.Component
{
  state = { visible : false }
  constructor(props)
  {
    super(props);
    var type=this.props.type;
    if (type===undefined) type=0
    this.state = {type: type}
    this.state.loginInfo =  this.props.loginInfo;
  }
  showDrawer = () =>
  {
    this.setState({visible:true});
  }

  onClose = () =>
  {
    this.setState({visible:false});
  }
  logOut = () =>
  {
    // eslint-disable-next-line
    this.state.loginInfo = {isExpert: false, logined: false, un:''};
    this.props.history.push({pathname: '/', state: this.state});
  }

  render()
  {
    const menu = (
      <Menu>
        <Menu.Item>
          <Button onClick={this.logOut}>
            退出登录
          </Button>
        </Menu.Item>
      </Menu>
    );
    return (
      <Col xl={0} lg={0} md={0} sm={4} xs={1}>
        <Button type="primary" shape="circle" onClick={this.showDrawer}>
          <Icon type="unordered-list"/>
        </Button>
        <Drawer
          title=""
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <div style={{margin:"20 20 20 20", padding:"20 20 20 20"}}>
            {this.state.loginInfo.logined ? 
              <div>
                <b style={{margin: "0px 10px 0px 10px"}}><font color='black'>Welcome!</font></b>
                <Dropdown overlay={menu}>
                  <Link to={{pathname: '/personal', state: {lastUrl: this.props.location.pathname, loginInfo: this.state.loginInfo }}}>
                    <Avatar />
                  </Link>
                </Dropdown>
              </div>
              :<div>
                <Link to={{pathname: '/register', state: {lastUrl: this.props.location.pathname }}}>
                  <Button type="primary" shape="round">注册</Button>
                </Link>
                <Link to={{pathname: '/login', state: {lastUrl: this.props.location.pathname}}}>
                  <Button type="primary" shape="round">登陆</Button>
                </Link>
              </div>}
          </div>
          <Divider/>
            <AcSearchBox type={this.state.type} onacSearch={this.props.onacSearch}/>   
        </Drawer>
      </Col>
    );
  }
}
export default withRouter(AcDrawer);