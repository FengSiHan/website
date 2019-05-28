import React from 'react'
import { Menu, Col, message, Input, Button, Icon, Divider, Drawer } from 'antd';
const Search = Input.Search;
class AcDrawer extends React.Component
{
  state = { visible : false }

  showDrawer = () =>
  {
    this.setState({visible:true});
  }

  onClose = () =>
  {
    this.setState({visible:false});
  }

  render()
  {
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
            <Button type="primary" shape="round">注册</Button>
            <Button type="primary" shape="round">登陆</Button>
          </div>
          <Divider/>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '20px', border:''}}>
           <Menu.Item key="1">专家</Menu.Item>
           <Menu.Item key="2">机构</Menu.Item>
           <Menu.Item key="3">论文</Menu.Item>
          </Menu> 
          <Search 
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={value => message.info(value + "  invalid")}
            style={{ lineHeight: '64px', border:'', verticalAlign:'middle'}}
          />
        </Drawer>
      </Col>
    );
  }
}
export default AcDrawer;