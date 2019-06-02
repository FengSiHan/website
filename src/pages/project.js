import React from 'react'
import { Layout, List, Spin, message, Avatar, Button, Modal, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import AcProjectDetail from '../controls/acProjectDetail'
import reqwest from 'reqwest';
import './css//project.css'
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const { Content } = Layout;


const CreateProjectModal = Form.create({ name: 'projectCreate' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal visible={visible} title="创建项目" okText="申请" onCancel={onCancel} onOk={onCreate}>
          <Form layout="vertical">
            <Form.Item label="项目名">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入项目名！' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="领导">
              {getFieldDecorator('leader', {
                rules: [{ required: true, message: '请输入领导名字！' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="负责单位" hasFeedback>
              {getFieldDecorator('org', {
                rules: [
                  {
                    required: true,
                    message: '请输入项目负责单位!'
                  }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="年份">
              {getFieldDecorator('year')(<Input />)}
            </Form.Item>
            <Form.Item label="关键字">
              {getFieldDecorator('keyword')(<Input />)}
            </Form.Item>
            <Form.Item label="英文关键字">
              {getFieldDecorator('ekeyword')(<Input />)}
            </Form.Item>
            <Form.Item label="摘要">
              {getFieldDecorator('abstract')(<TextArea style={{ minHeight: '80px' }} />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);

    try {
      this.state = this.props.location.state;
    } catch (error) {
      this.state = { loginInfo: { isExpert: false, logined: false, un: '' } };
    }
    if (this.state === undefined) {
      window.location.href = "/";
      //this.state = {loginInfo: {isExpert: false, logined: false, un:''}};
    }
    this.state.data = [];
    this.state.loading = false;
    this.state.hasMore = true;
    this.state.detailVisible = false;
    this.state.projCreateVisible = false;
    this.state.projNumber = 0;
    this.state.projectDetailData = {
      title: 'test', leader: 'sss1998', year: '2015年',
      org: '清华大学', keyword: '细菌抗酸性系统; 反向转运蛋白; 结构生物学;',
      ekeyword: 'bacterial acid resistance (AR) systems; antiporter; structural biology; ;',
      abstract: '肠道微生物通过口服进入消化道，经过胃时要处于PH值1.5-2的极酸环境，氢离子大量进入细菌，威胁其生存。为了适应这种极端环境，保持细胞内正常的PH值，肠道微生物进化出了一系列的抗酸系统。这些抗酸系统通常是通过膜反向转运蛋白，交换细胞内外质子化程度不同的底物来消耗细胞内的氢离子，从而维持细胞内正常PH值。我们已经得到了大肠杆菌抗酸系统中重要膜转运蛋白AdiC不同构象的高分辨率三维结构，通过比较分析这些结构，我们对细菌抗酸性的分子机制有了初步的了解，但还有一系列的基本问题有待回答。我们计划在已有的生化和结构分析的基础上，针对上述问题，综合多种研究手段探索肠道微生物适应强酸性极端环境的分子机制，并期望在此基础上设计特异性抑制肠道病原微生物的小分子。',
    };

  }

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results,
      });
      for (var i = 0; i < this.state.data.length; ++i) {
        // eslint-disable-next-line
        this.state.data[i].id = i;
      }
      console.log(res.results);
    });

    var formData = new FormData();
    formData.append("un", this.state.loginInfo.un);
    formData.append("UID", this.state.loginInfo.UID);
    fetch('http://94.191.58.148/get_project.php', {
      method: 'POST',
      body: formData,
      dataType: 'text'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // this.setState({ projNumber: data.nu });
        // this.setState({ data: data.array });
        // for (var i = 0; i < this.state.data.length; ++i) {
        //   this.state.data[i].id = i;
        // }
      })
      .catch(function (err) {
        message.info('注册失败: ' + err);
      })
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
    if (this.state.hasMore === true) return;
    this.setState({
      hasMore: false
    });
    let data = this.state.data;
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
    return;
    // let data = this.state.data;
    // this.setState({
    //   loading: true,
    // });
    // if (data.length > 100) {
    //   message.warning('Infinite List loaded all');
    //   this.setState({
    //     hasMore: false,
    //     loading: false,
    //   });
    //   return;
    // }
    // this.fetchData(res => {
    //   data = data.concat(res.results);
    //   this.setState({
    //     data,
    //     loading: false,
    //   });
    // });
  };

  saveProjFormRef = formRef => {
    this.ProjFormRef = formRef;
  };
  handlePorjCreateConfirm = () => {
    const form = this.ProjFormRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      message.info('申请中，请等待管理员验证');
      console.log('Received values of create project form: ', values);
      form.resetFields();
      this.setState({ projCreateVisible: false });
    });
  };
  render() {
    return (
      <Layout className="project-layout">
        <AcHeader loginInfo={this.state.loginInfo} homePage={false} />
        <Content className="project-content">
          <div style={{ margin: '40px 0 0 0' }}>
            <b>
              <h1>
                专家项目管理页面
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
                      title={item.email}
                      description={item.email}
                    />
                    <Button onClick={() => console.log(item.id)}>详细信息</Button>
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
            <Button type='primary' onClick={() => { this.setState({ projCreateVisible: true }) }}>新建项目</Button>
          </div>
        </Content>
        <AcProjectDetail data={this.state.projectDetailData} visible={this.state.detailVisible} onCancel={() => this.setState({ detailVisible: false })} />
        <CreateProjectModal wrappedComponentRef={this.saveProjFormRef} visible={this.state.projCreateVisible}
          onCancel={() => { this.setState({ projCreateVisible: false }) }} onCreate={this.handlePorjCreateConfirm} />
        <AcFooter />
      </Layout >
    );
  }
}

export default withRouter(ProjectPage);
