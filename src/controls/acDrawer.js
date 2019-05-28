import React from 'react'
import { Menu, Col, message, Input, Button, Icon, Divider, Drawer, Avatar } from 'antd';
import { Link } from 'react-router-dom'
import AcSearchBox from './acSearchBox'

const Search = Input.Search;
class AcDrawer extends React.Component
{
  state = { visible : false }
  constructor(props)
  {
    super(props);
    this.state.logined =  this.props.logined;
  }
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
            {this.state.logined ? 
            <div>
              <b style={{margin: "0px 10px 0px 10px"}}><font color='black'>Welcome!</font></b>
              <span onClick={()=>{message.info("进入个人主页")}}>
                <Avatar />
              </span>
            </div>
            :<div>
              <Link to={{pathname: '/register', state: {lastUrl: this.props.location?this.props.location.pathname:'/'}}}>
                <Button type="primary" shape="round">注册</Button>
              </Link>
              <Link to={{pathname: '/login', state: {lastUrl: this.props.location?this.props.location.pathname:'/'}}}>
                <Button type="primary" shape="round">登陆</Button>
              </Link>
            </div>}
          </div>
          <Divider/>
            {/* <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '20px', border:''}}>
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
            /> */}
            <AcSearchBox/>
        </Drawer>
      </Col>
    );
  }
}
export default AcDrawer;