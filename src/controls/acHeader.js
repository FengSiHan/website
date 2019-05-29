import React from 'react';
import { Row, Col, Button, Layout, Avatar, message} from 'antd';
import { Link, withRouter } from 'react-router-dom'

import AcSearch from './acSearch'
import AcDrawer from './acDrawer'
import logo from '../logo.png'

const { Header } = Layout
class AcHeader extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {logined:this.props.logined, homePage:this.props.homePage};
  }

  getRemainComponent()
  {
    if (this.state.logined === true) 
    {
      return (
        <Col xs={0} sm={0} md={5} lg={4} xl={3} offset={2}>
          <b style={{margin: "0px 10px 0px 10px"}}><font color='#fff'>Welcome!</font></b>
          <span onClick={()=>{message.info("进入个人主页")}}>
            <Avatar />
          </span>
        </Col>
      );
    }
    else
    {
      return (
        <Col xl={4} lg={4} md={6} sm={0} xs={0} offset={1}>
            <Link to={{pathname: '/register', state: {lastUrl: this.props.location.pathname }}}>
              <Button type="primary" shape="round">注册</Button>
            </Link>
            <Link to={{pathname: '/login', state: {lastUrl: this.props.location.pathname}}}>
              <Button type="primary" shape="round">登陆</Button>
            </Link>
        </Col>
      );
    }
  }
  render()
  {
    return (
      <Header className="header">       
        <div>
          <Row>
            <Col xl={3} xxs={20} xs={20} sm={20} md={3} lg={3}>
              <Link to={{pathname: '/', state: {lastUrl: this.props.location?this.props.location.pathname:'/'}}}>
                <div className="logo" style={{verticalAlign:true, lineHeight: '64px', float:'left'}}>
                  <img src={logo} alt="logo" style={{height:'30px', weight:'30px'}}/>
                  <b><font color='white'>云学术</font></b>
                </div>
              </Link>
            </Col>
            <AcDrawer logined={ this.state.logined }/>
            <AcSearch homePage={ this.state.homePage }/>
            {this.getRemainComponent()}
          </Row>
        </div>
      </Header>
    );
  }
}
export default withRouter(AcHeader);