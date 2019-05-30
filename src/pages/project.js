import React from 'react'
import { Layout } from 'antd';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import { withRouter } from 'react-router-dom';

import './css/template.css'

const { Content } = Layout;


class Template extends React.Component {
  constructor(props)
  { 
    super(props);

    try {
      this.state = this.props.location.state;
    } catch (error) {
        this.state = {loginInfo: {isExpert: false, logined: false, un:''}};
    }
    if (this.state === undefined )
    {
        this.state = {loginInfo: {isExpert: false, logined: false, un:''}};
    }
    /*
      初始化其他部分
    */
  }

  render() {
    return (
      <Layout className="temp-layout">
        <AcHeader loginInfo={this.state.loginInfo} homePage={false}/>
        <Content className="temp-content">
          {/*
              页面控件放置的地方



              以下是跳转的标准写法
              <Link to={{pathname: '/？？？', state: {lastUrl: this.props.location.pathname, loginInfo: this.state.loginInfo }}}>   
                <其他控件>
              </Link>
          */}
        </Content>
        <AcFooter />
      </Layout>
    );
  }
}

export default withRouter(Template);
