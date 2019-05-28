import React from 'react'
import { Layout } from 'antd';
import  AcHeader  from '../controls/acHeader'
import  AcFooter  from '../controls/acFooter'
import './home.css'
const { Content } = Layout;
class HomePage extends React.Component
{
    render()
    {
        return (
            <Layout className="layout">
                <AcHeader/>
                <Content className="content">
                    <div className="container">
                        
                    </div>
                </Content>
                <AcFooter/>
            </Layout>
        );
    }
}
export default HomePage;