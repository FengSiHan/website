import React from 'react'
import { Menu, Col, message, Input } from 'antd';
const Search = Input.Search;
class AcSearch extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {type: "expert"}
  }
  render()
  {
    return (
      this.props.homePage === false ? 
        <div>
          <Col xl={5} lg={6} md={7} sm={0} xs={0}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px', border:''}}>
              <Menu.Item key="1">专家</Menu.Item>
              <Menu.Item key="2">机构</Menu.Item>
              <Menu.Item key="3">论文</Menu.Item>
            </Menu> 
          </Col>
          <Col xl={11} lg={9} md={7} sm={0} xs={0}>
              <Search 
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={value => message.info(value + "  invalid")}
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
export default AcSearch;