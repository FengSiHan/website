import React from 'react'
// eslint-disable-next-line
import { Menu, Col, Input, message } from 'antd';
import { withRouter } from 'react-router-dom';
const Search = Input.Search;
class AcSearch extends React.Component
{
  constructor(props)
  {
    super(props);
    var type=this.props.type;
    if (type===undefined) type=0
    this.state = {type: type}  //
    this.state.loginInfo = this.props.loginInfo;
  }

  handleSearch(value)
  {
    var path=this.props.location.pathname;
    if (path==='/searchResult') 
    {
      //message.info(value+this.state.type);
      this.props.onacSearch(value,this.state.type); 
    }
    else 
    {
      var newstate = this.state;
      newstate.value = value;
      this.props.history.push({pathname:'/searchResult', state:{ state:newstate}});
    }
  }

  handleClick= e=>
  {
    this.setState(
      {
        type:e.key
      }
    )
  }

  render()
  {
    var typelist=["专家","机构","论文"];
    return (
      this.props.homePage === false ? 
        <div>
          <Col xl={5} lg={6} md={7} sm={0} xs={0}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[this.state.type]} onClick={this.handleClick} style={{ lineHeight: '64px', border:''}}>
              <Menu.Item key={0}>专家</Menu.Item>
              <Menu.Item key={1}>机构</Menu.Item>
              <Menu.Item key={2}>论文</Menu.Item>
            </Menu> 
          </Col>
          <Col xl={11} lg={9} md={7} sm={0} xs={0}>
              <Search 
                placeholder={"搜"+typelist[this.state.type]}
                enterButton
                allowClear
                size="large"
                onSearch={value =>this.handleSearch(value)}
                style={{ lineHeight: '64px', border:'', verticalAlign:'middle'}}
              />
              
          </Col>
        </div>
    :<div>
      <Col xl={16} lg={15} md={14} sm={0} xs={0}>
        <div style={{textAlign: "center"}}>
          <b><font color='white'>&nbsp;&nbsp;&nbsp;Welcome to the Academic Cloud~</font></b>
        </div>
      </Col>
    </div>
    );
  }
}
export default withRouter(AcSearch);