import React from 'react'
import { Layout, List, Spin, message, Avatar, Button, Modal, Divider, Form, Input} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import reqwest from 'reqwest';
import './css//project.css'
import AcPatentDetail from '../controls/acPatentDetail'
import logo from '../logo.png'

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const { Content } = Layout;
const CreatePatentModal = Form.create({ name: 'patentCreate' })( 
  class extends React.Component
  {
    render()
    {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return(
        <Modal visible={visible} title="创建专利" okText="创建" onCancel={onCancel} onOk={onCreate}>
          <Form layout="vertical">
              <Form.Item label="专利名">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入专利名！' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="专利号">
                {getFieldDecorator('no', {
                  rules: [{ required: true, message: '请输入专利名号！' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="负责单位" hasFeedback>
                {getFieldDecorator('org',)(<Input />)}
              </Form.Item>
              <Form.Item label="年份">
                {getFieldDecorator('year')(<Input/>)}
              </Form.Item>
              <Form.Item label="简介">
                {getFieldDecorator('intro')(<TextArea style={{minHeight:'80px'}}/>)}
              </Form.Item>
            </Form>
        </Modal>
      );
    }
  }
);

class PatentPage extends React.Component 
{
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
      window.location.href="/"; 
      //this.state = {loginInfo: {isExpert: false, logined: false, un:''}};
    }
    this.state.data = [];
    this.state.loading = false;
    this.state.hasMore = true;
    this.state.detailVisible = false;
    this.state.patentCreateVisible = false;
    this.state.patentDetailData = {title: '分离的多肽及其应用', year:'2015年',
                                    org: '清华大学', no: 'CN103319574A',
                                    intro: '本发明涉及分离的多肽及其应用。多肽包含：多个重复氨基酸序列，重复氨基酸序列为：LTPDQVVAIASX1X2GGKQALETVQRLLPVLCQAHG，其中，X1为H或N，X2为选自I、L、M、W、C、T、P、H、S、N、E、Q、H、K和R的之一。该多肽能够特异性地识别碱基。'};
  }

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results,
      });
    });
  }
  fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res);
      },
    });
  };
  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 100) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  };

  savePatentFormRef = formRef => {
    this.PatentFormRef = formRef;
  };
  handlePatentCreateConfirm = () => {
    const form = this.PatentFormRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      message.info('申请中，请等待管理员验证');
      console.log('Received values of create patent form: ', values);
      form.resetFields();
      this.setState({ patentCreateVisible: false });
    });
  };
  render() {
    return (
      <Layout className="project-layout">
        <AcHeader loginInfo={this.state.loginInfo} homePage={false}/>
        <Content className="project-content">
          <div style={{margin: '40px 0 0 0'}}>
            <b>
              <h1>
                专家专利管理页面
              </h1>
            </b>
          </div>
          <div className="project-infinite-container">
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!this.state.loading && this.state.hasMore}
              useWindow={false}
            >
              <List
                dataSource={this.state.data}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={
                        //<Avatar src={logo} style={{height:'15px', width:'22px'}}/>
                        <Avatar /*src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" */ />
                      }
                      title={<a href="https://ant.design">{item.name.last}</a>}
                      description={item.email}
                    />
                    <Button onClick={()=>this.setState({detailVisible: true})}>详细信息</Button>
                  </List.Item>
                )}
              >
                {this.state.loading && this.state.hasMore && (
                  <div className="project-loading-container">
                    <Spin />
                  </div>
                )}
              </List>
            </InfiniteScroll>
          </div>
          <div className="project-operate-div">
            <Button type='primary' onClick={()=>{this.setState({patentCreateVisible: true})}}>新建专利</Button>
          </div>
        </Content>
        <AcPatentDetail data={this.state.patentDetailData} visible={this.state.detailVisible} onCancel={()=>this.setState({detailVisible: false})}/>
        <CreatePatentModal wrappedComponentRef={this.savePatentFormRef} visible={this.state.patentCreateVisible}
                            onCancel={()=>{this.setState({patentCreateVisible: false})}} onCreate={this.handlePatentCreateConfirm}/>
        <AcFooter />
      </Layout>
    );
  }
}

export default withRouter(PatentPage);
