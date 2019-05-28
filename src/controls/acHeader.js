import React from 'react';
import logo from '../logo.png'
import { Row, Col, Button, Layout, Avatar, message} from 'antd';
import AcSearch from './acSearch'
import AcDrawer from './acDrawer'
const { Header } = Layout
class AcHeader extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {logined:false};
  }

  getRemainComponent()
  {
    if (this.state.logined === false) 
    {
      return (
        <Col xs={10} sm={5} md={5} lg={3} xl={3} offset={2}>
          <b><font color='0xfff'>Welcome!</font></b>
          <span onClick={()=>{message.info("进入个人主页")}}>
            <Avatar src={logo}/>
          </span>
        </Col>
      );
    }
    else
    {
      return (
        <Col xl={4} lg={4} md={6} sm={0} xs={0} offset={1}>
            <Button type="primary" shape="round">注册</Button>
            <Button type="primary" shape="round">登陆</Button>
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
            <Col xl={3} xxs={12} xs={10} sm={12} md={3} lg={3}>
              <div className="logo" style={{verticalAlign:true, lineHeight: '64px'}}>
                <img src={logo} alt="logo" style={{height:'30px', weight:'30px'}}/>
                <b><font color='#fff'>云学术</font></b>
              </div>
            </Col>
            <AcDrawer/>
            <AcSearch homePage={ this.state.homePage }/>
            {this.getRemainComponent()}
          </Row>
        </div>
      </Header>
    );
  }
}
export default AcHeader;