import React from 'react'
import { Col, message, Button, Icon, Divider, Drawer, Avatar } from 'antd';
import { Link } from 'react-router-dom'
import AcSearchBox from './acSearchBox'
import { withRouter } from 'react-router-dom';


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
              <Link to={{pathname: '/personal', state: {lastUrl: this.props.location.pathname, logined: this.state.logined }}}>   
                <Avatar />
              </Link>
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
            <AcSearchBox type={0/*type应被传入页面，指示搜索类型*/}/>   
        </Drawer>
      </Col>
    );
  }
}
export default withRouter(AcDrawer);