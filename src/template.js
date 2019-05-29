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
      this.state = {logined: this.props.location.state.logined};
    } catch (error) {
        this.state = {logined: false};
    }
    
    /*
      初始化其他部分
    */
  }

  render() {
    return (
      <Layout className="temp-layout">
        <AcHeader logined={this.state.logined} homePage={false}/>
        <Content className="temp-content">
          {/*
              页面控件放置的地方



              以下是跳转的标准写法
              <Link to={{pathname: '/？？？', state: {lastUrl: this.props.location.pathname, logined: this.state.logined }}}>   
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
