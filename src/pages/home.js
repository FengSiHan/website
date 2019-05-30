import React from 'react';
import { Layout, message } from 'antd';
import  AcHeader  from '../controls/acHeader'
import  AcFooter  from '../controls/acFooter'
import  AcSearchBox from '../controls/acSearchBox'
import logo from '../logo.png'
import './css/home.css'
import { withRouter } from 'react-router-dom';

const { Content } = Layout;
class HomePage extends React.Component
{
    constructor(props)
    {
        super(props);
        try {
            this.state = {loginInfo: this.props.location.state.loginInfo};
        } catch (error) {
            this.state = {loginInfo: {isExpert: false, logined: false, un:''}};
        }
    }
    tryConnect = () =>
    {
        var json=[];
        var row = {key:'2', secret_key: '3', telephone: 'yes'};
        json.push(row);
        fetch('http://94.191.58.148/test.php',{
            method: 'POST',
            body: row,
            dataType: "text"
        }).then(
            function (response)
            {
                if (response.status !== 200)
                {
                    message.info('return status error '+ response.status);
                    return;
                }
                response.text().then(function (data){
                    console.log(data);
                })
            }
        ).catch(function(err){
            message.info('Fetch error: '+err);
        });
    }
    render()
    {
        return (
            <Layout className="layout">
                <AcHeader homePage loginInfo={this.state.loginInfo}/>
                <Content style={{ padding: '0 50px', background:'white'}}>
                    <div className="body">
                        <div style={{margin:"30px"}}>
                            <img src={logo} style={{height: "100px", width: "147px"}} alt="logo"/>
                            <span><h1>Academic Cloud</h1></span>
                        </div>
                        <AcSearchBox type={0}/>
                    </div>
                </Content>
                <AcFooter/>
            </Layout>
        );
    }
}

export default withRouter(HomePage);