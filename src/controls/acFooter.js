import React from 'react'
import { Layout } from 'antd';
import './acFooter.css'
const { Footer } = Layout; 

function AcFooter(props)
{
    let {className} = props;
    if (className == undefined) className="footer";
    return (
        <Footer className={className}>
            <div>
                Academic Cloud @2019 Created by AC
            </div>
            <div>
                <a href="/">免责声明</a>
                <span>&nbsp;|&nbsp;</span>
                <a href="/">关于我们</a>
            </div>
            <div>
                联系我们 AC@163.com
            </div>
        </Footer>
    );
}
export default AcFooter;