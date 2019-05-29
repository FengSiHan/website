import React from 'react';
import { Layout, Button, message } from 'antd';
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
        var paras = this.props.location.state;
        
        var result = !(!paras) && paras.hasOwnProperty("logined");

        var logined = false;

        if (result === true)
        {
            logined = paras.logined;
        }
        
        this.state = {logined: logined};
    }
    tryConnect = () =>
    {
        let formData = new FormData();
        formData.append("key", "123456");
        formData.append("secret_key", "123456");
        formData.append("telephone", "12345678900");
        
        fetch('http://94.191.58.148/ssad/test/',{
            method: 'POST',
            body: formData,
            dataType: "text"
        }).then(
            function (response)
            {
                if (response.status !== 200)
                {
                    message.info('return status error '+ response.status);
                    return;
                }
                response.json().then(function (data){
                    message.info(data);
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
                <AcHeader homePage logined={this.state.logined}/>
                <Content style={{ padding: '0 50px', background:'white'}}>
                    <div className="body">
                        <div style={{margin:"30px"}}>
                            <img src={logo} style={{height: "100px", width: "147px"}} alt="logo"/>
                            <span><h1>Academic Cloud</h1></span>
                        </div>
                        <AcSearchBox type={0}/>
                        <Button type="primary" onClick={this.tryConnect}>
                            Test connect
                        </Button>
                    </div>
                </Content>
                <AcFooter/>
            </Layout>
        );
    }
}

export default withRouter(HomePage);