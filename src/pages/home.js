import React from 'react';
import { Layout } from 'antd';
import  AcHeader  from '../controls/acHeader'
import  AcFooter  from '../controls/acFooter'
import  AcSearchBox from '../controls/acSearchBox'
import logo from '../logo.png'
import './css/home.css'

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
                        <AcSearchBox />
                    </div>
                </Content>
                <AcFooter/>
            </Layout>
        );
    }
}

export default HomePage;