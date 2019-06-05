import React from 'react'
import { Layout, List, Spin, message, Avatar, Button, Modal, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import './css//project.css'
import AcPatentDetail from '../controls/acPatentDetail'

const { Content } = Layout;
const CreatePatentModal = Form.create({ name: 'patentCreate' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
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
              {getFieldDecorator('org')(<Input />)}
            </Form.Item>
            <Form.Item label="年份">
              {getFieldDecorator('year')(<Input />)}
            </Form.Item>
            <Form.Item label="简介">
              {getFieldDecorator('intro')(<TextArea style={{ minHeight: '80px' }} />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class PatentPage extends React.Component {
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
    this.state.patentCreateVisible = false;
    this.state.patentDetailData = {
      title: '分离的多肽及其应用', year: '2015年',
      org: '清华大学', no: 'CN103319574A',
      intro: '本发明涉及分离的多肽及其应用。多肽包含：多个重复氨基酸序列，重复氨基酸序列为：LTPDQVVAIASX1X2GGKQALETVQRLLPVLCQAHG，其中，X1为H或N，X2为选自I、L、M、W、C、T、P、H、S、N、E、Q、H、K和R的之一。该多肽能够特异性地识别碱基。'
    };
  }

  componentDidMount() {
    var formData = new FormData();
    formData.append("un", this.state.loginInfo.un);
    formData.append("UID", this.state.loginInfo.UID);
    fetch('https://acphp.madao.bid/get_patent.php', {
      method: 'POST',
      body: formData,
      dataType: 'text'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ data: data.data });

        for (var i = 0; i < this.state.data.length; ++i) {
          // eslint-disable-next-line
          this.state.data[i].id = i;
        }
      })
      .catch(function (err) {
        message.info('获取数据失败: ' + err);
      })
  }
  handleInfiniteOnLoad = () => {
    return;
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
      var formData = new FormData();
      formData.append("PatentName", values['title']);
      formData.append("Year", values['year']);
      formData.append("Org", values['org']);
      formData.append("Intro", values['intro']);
      formData.append("PatentID", values['no']);
      formData.append("UID", this.state.loginInfo.UID);

      fetch('https://acphp.madao.bid/patent_apply.php', {
        method: 'POST',
        body: formData,
        dataType: 'text'
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.res === 1) {
            message.info('申请中，请等待管理员验证');
            form.resetFields();
            this.setState({ patentCreateVisible: false });
          }
          else {
            message.info('申请时出现错误');
          }
        })
        .catch(function (err) {
          console.log('申请时出现错误: ' + err);
        })
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
                      title={item.PatentName}
                      description={item.Intro}
                    /><Button onClick={() => {
                      let data1 = this.state.data[item.id];
                      this.setState({
                        patentDetailData: {
                          title: data1.PatentName, year: data1.Year,
                          org: data1.Org, no: data1.PatentID,
                          intro: data1.Intro
                        }
                      })
                      this.setState({ detailVisible: true });
                      // var formData = new FormData();
                      // formData.append("patentID", this.state.data[item.id].PatentID);
                      // fetch('https://acphp.madao.bid/show_patent.php', {
                      //   method: 'POST',
                      //   body: formData,
                      //   dataType: 'text'
                      // })
                      //   .then((response) => response.json())
                      //   .then((data) => {
                      //     console.log(data.data[0]);
                      //     let data1 = data.data[0];
                      //     this.setState({
                      //       patentDetailData: {
                      //         title: data1.Title, year: data1.Time,
                      //         org: data1.Org, no: data1.PatentID,
                      //         intro: data1.Intro
                      //       }
                      //     })
                      //     this.setState({ detailVisible: true });
                      //   })
                      //   .catch(function (err) {
                      //     message.info('获取数据错误: ' + err);
                      //   })
                    }}>详细信息</Button>
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
            <Button type='primary' onClick={() => { this.setState({ patentCreateVisible: true }) }}>新建专利</Button>
          </div>
        </Content>
        <AcPatentDetail data={this.state.patentDetailData} visible={this.state.detailVisible} onCancel={() => this.setState({ detailVisible: false })} />
        <CreatePatentModal wrappedComponentRef={this.savePatentFormRef} visible={this.state.patentCreateVisible}
          onCancel={() => { this.setState({ patentCreateVisible: false }) }} onCreate={this.handlePatentCreateConfirm} />
        <AcFooter />
      </Layout>
    );
  }
}

export default withRouter(PatentPage);
