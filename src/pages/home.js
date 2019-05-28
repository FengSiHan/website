import React from 'react'
import { Layout } from 'antd';
import  AcHeader  from '../controls/acHeader'
import  AcFooter  from '../controls/acFooter'
import  AcSearchBox from '../controls/acSearchBox'
import logo from '../logo.png'
import './home.css'
const { Content } = Layout;
class HomePage extends React.Component
{
    render()
    {
        return (
            <Layout className="layout">
                <AcHeader homePage/>
                <Content style={{ padding: '0 50px', background:'white'}}>
                    <div className="body">
                        <img src={logo} style={{height: "100px", width: "147px"}} alt="logo"/>
                        <span><h1>Academic Cloud</h1></span>
                        <AcSearchBox/>
                    </div>
                </Content>
                <AcFooter className="footer"/>
            </Layout>
        );
    }
}
export default HomePage;