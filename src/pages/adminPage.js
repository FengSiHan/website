import React from 'react'
import { Layout, message,Table,Modal,Button } from 'antd';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import { withRouter } from 'react-router-dom';

import './css/adminPage.css'
const { Content } = Layout;


class AdminPage extends React.Component {
  constructor(props)
  { 
    super(props);

    try {
      this.state = this.props.location.state;
    } catch (error) {
      this.state = {loginInfo: {isExpert: false, logined: false, un:''}};
    }
    if (this.state === undefined )
    {
        this.state = {loginInfo: {isExpert: false, logined: false, un:''}};
    }
    this.state.visible=false;
    //获取审核数据
    /*
      初始化其他部分
    */
  }

  render() 
  {
    const listData=[];
    // eslint-disable-next-line
    const columns =
    [
    {
        title:'申请人',
        dataIndex:'applicant',
        key:'title',
    },
    {
        title:'类型',
        dataIndex:'type',
    },
    {
        title:'详细信息',
        dataIndex:'',  //
        render:(text,record)=>
        (
            <Button onClick={()=>message.info('详细信息')}> 详细信息</Button>
        )
    },
    {
        title:'操作',
        dataIndex:'',
        render:()=>
        (
            <span>
                <Button onClick={(e)=>message.info('通过')}> 通过</Button>
                <Button onClick={(e)=>this.setState({visible:true})}> 不通过</Button>
            </span>
        )
    },
    ];
    for (let i=0;i<13;i++)
    {
        listData.push(
            {
                id:i,
                applicant:'applicant'+i,
                type:i%3,
                detail:'sadfaf'+i,
                check:i%2===0?false:true,
                reasonForNo:'NoNoNo'
            }
        )
    }
    return (
    <Layout className="ap-layout">
        <AcHeader loginInfo={this.state.loginInfo} homePage={false}/>
        <Content className="ap-content">
        {/*
            页面控件放置的地方



            以下是跳转的标准写法
            <Link to={{pathname: '/？？？', state: {lastUrl: this.props.location.pathname, loginInfo: this.state.loginInfo }}}>   
                <其他控件>
            </Link>
        */}
        <Table
            columns={columns} dataSource={listData}
          />
        <Modal mask={false} keyboard={true} visible={this.state.visible} footer={null} onCancel={()=>this.setState({visible: false})}>
              <div >
                 <div >原因:</div>
                 <div>{listData.reasonForNo}</div>
              </div>
          </Modal>
        </Content>
        <AcFooter className='ap-footer'/>
    </Layout>
    );

    }
}
export default withRouter(AdminPage);
