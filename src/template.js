import React from 'react'
import { Layout, message } from 'antd';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import './css/register.css'

import {
  Form, 
  Input,
  Checkbox,
  Button,
} from 'antd';

const { Content } = Layout;


class RegisterPageClass extends React.Component {
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
  }

  render() {
    return (
      <Layout className="temp-layout">
        <AcHeader logined={this.state.logined} homePage={false}/>
        <Content className="temp-content">
         
        </Content>
        <AcFooter />
      </Layout>
    );
  }
}

export default XXXX;