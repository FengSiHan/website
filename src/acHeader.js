import React from 'react';
import logo from './logo.png'
import { Row, Col, Button, Layout} from 'antd';
import AcSearch from './acSearch'
import AcDrawer from './acDrawer'
const { Header } = Layout
class AcHeader extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {logined:"yes"};
  }
  getRemainComponent()
  {
    if (this.state.logined === "no") 
    {
      return (
        <Col sm={2} md={2} lg={3} xl={3}>
          <b><font color='0xfff'>Welcome!</font></b>
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
            <Col xl={3} xxs={16} xs={18} sm={18} md={3} lg={3}>
              <div className="logo" style={{verticalAlign:true, lineHeight: '64px'}}>
                <img src={logo} alt="logo" style={{height:'30px', weight:'30px'}}/>
                <b><font color='#fff'>云学术</font></b>
              </div>
            </Col>
            <AcDrawer/>
            <AcSearch/>
            {this.getRemainComponent()}
          </Row>
        </div>
      </Header>
    );
  }
}
export default AcHeader;