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
    <div>
      <Col xl={5} lg={6} md={7} sm={0} xs={0}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px', border:''}}>
          <Menu.Item key="1">专家</Menu.Item>
          <Menu.Item key="2">机构</Menu.Item>
          <Menu.Item key="3">论文</Menu.Item>
        </Menu> 
      </Col>
      <Col xl={8} lg={9} md={7} sm={0} xs={0}>
          <Search 
            placeholder="input search text"
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
export default AcSearch;