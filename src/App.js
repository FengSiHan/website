import React from 'react'
import  logo from './logo.png'

import { Menu, Layout, Row, Col, Button, Input, message  } from 'antd';
//const { SubMenu } = Menu;
const {  Header, Content, Footer } = Layout;
const Search = Input.Search;

class MySearch extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {type: "expert"}
  }
  render()
  {
    return (
    <div>
      <Col xl={5} lg={6} md={7} sm={0} xs={0}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px', border:''}}>
          <Menu.Item key="1">专家</Menu.Item>
          <Menu.Item key="2">机构</Menu.Item>
          <Menu.Item key="3">论文</Menu.Item>
        </Menu> 
      </Col>
      <Col xl={10} lg={10} md={7} sm={0} xs={0}>
          <Search 
            placeholder="input search text(fshsb)"
            enterButton="Search"
            size="large"
            onSearch={value => message.info(value + "  invalid")}
            style={{ lineHeight: '64px', border:'', verticalAlign:'middle'}}
          />
      </Col>
    </div>
    );
  }
}
class MyHeader extends React.Component
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
        <Col>
          <b><font color='0xfff'>Welcome!</font></b>
        </Col>
      );
    }
    else
    {
      return (
        <Col xl={4} lg={4} md={6} sm={8} xs={13} offset={1}>
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
            <Col xl={3} xxs={8} xs={10} sm={14} md={3} lg={3}>
              <div className="logo" style={{verticalAlign:true, lineHeight: '64px'}}>
                <img src={logo} alt="logo" style={{height:'30px', weight:'30px'}}/>
                <b><font color='#fff'>云学术</font></b>
              </div>
            </Col>
            <MySearch/>
            {this.getRemainComponent()}
          </Row>
        </div>
      </Header>
    );
  }
}

function App()
{
  return (
    <Layout className="layout">
      <MyHeader/>
      <Content style={{ padding: '0 50px'}}>
        <div style={{ background:'#fff', padding: 24, minHeight:280}}>Content</div>
      </Content>
      <Footer style={{textAlign: "center"}}>
          ssad group @2019 Created by front-end
      </Footer>
    </Layout>
  );
}
export default App;