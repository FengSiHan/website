import React from 'react'
import { Layout } from 'antd';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import { withRouter } from 'react-router-dom';
import './css/personal.css'

const { Content } = Layout;


class PersonalPage extends React.Component {
  constructor(props)
  { 
    super(props);

    var paras = this.props.location.state;
    var result = !(!paras) && paras.hasOwnProperty("logined");
    var logined = false;
    if (result === true)
    {
        logined = paras.logined;
    }
    this.state = {logined: logined};
    
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
          */}
        </Content>
        <AcFooter />
      </Layout>
    );
  }
}

export default withRouter(PersonalPage);