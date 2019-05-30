import React from 'react'
import { Col, Button, Icon, Divider, Drawer, Avatar } from 'antd';
import { Link } from 'react-router-dom'
import AcSearchBox from './acSearchBox'
import { withRouter } from 'react-router-dom';


class AcDrawer extends React.Component
{
  state = { visible : false }
  constructor(props)
  {
    super(props);
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
            {this.state.loginInfo ? 
            <div>
              <b style={{margin: "0px 10px 0px 10px"}}><font color='black'>Welcome!</font></b>
              <Link to={{pathname: '/personal', state: {lastUrl: this.props.location.pathname, loginInfo: this.state.loginInfo }}}>   
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
            <AcSearchBox type={this.props.type}/>   
        </Drawer>
      </Col>
    );
  }
}
export default withRouter(AcDrawer);