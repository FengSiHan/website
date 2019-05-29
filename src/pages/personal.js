import React from 'react'
import { Layout, Switch, Card, Avatar } from 'antd';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import { withRouter } from 'react-router-dom';
import './css/personal.css'

const { Content } = Layout;
const { Meta } = Card;

//需要保存是否是专家以及用户名
class PersonalPage extends React.Component {
  constructor(props)
  { 
    super(props);

    try {
      console.log(this.props.location.state.lastUrl);
    } catch (error) {      
      window.location.href="/"; 
    }

   
    try {
      this.state = {logined: this.props.location.state.logined};
    } catch (error) {
        this.state = {logined: false};
    }

    this.state.loading = true;
  }

  onChange = checked => {
    this.setState({ loading: !checked });
  };

  render() {
    const { loading } = this.state;
    return (

      <Layout className="personal-layout">
        <AcHeader logined={this.state.logined} homePage={false}/>
        <Content className="personal-content">
          <div className="personal-outer-div">
            <Switch checked={!loading} onChange={this.onChange} />
            <Card style={{ width: 600, marginTop: '50px', textAlign:'center' }} loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="个人信息"
              />
              <br/>
              
              <p>1</p>
            </Card>
          </div>
        </Content>
        <AcFooter />
      </Layout>
    );
  }
}

export default withRouter(PersonalPage);