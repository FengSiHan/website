import React from 'react'
import { Layout, List, Spin, message, Avatar, Button, Modal, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import AcThesisDetail from '../controls/acThesisDetail'
import './css/project.css'

const { Content } = Layout;



const CreateThesisModal = Form.create({ name: 'thesisCreate' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal visible={visible} title="创建论文" okText="申请" onCancel={onCancel} onOk={onCreate}>
          <Form layout="vertical">
            <Form.Item label="论文名">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入论文名！' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="英文论文名">
              {getFieldDecorator('etitle', {
                rules: [{ required: true, message: '请输入英文论文名！' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="作者">
              {getFieldDecorator('author', {
                rules: [{ required: true, message: '请输入作者名字！' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="关键字">
              {getFieldDecorator('keyword', {
                rules: [{ required: true, message: '请输入关键字！' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="英文关键字">
              {getFieldDecorator('ekeyword', {
                rules: [{ required: true, message: '请输入英文关键字！' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="年份">
              {getFieldDecorator('year')(<Input />)}
            </Form.Item>
            <Form.Item label="出版物">
              {getFieldDecorator('publication', {
                rules: [
                  {
                    required: true,
                    message: '请输入论文出版物!'
                  }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="英文出版物">
              {getFieldDecorator('epublication')(<Input />)}
            </Form.Item>
            <Form.Item label="摘要">
              {getFieldDecorator('abstract')(<TextArea style={{ minHeight: '80px' }} />)}
            </Form.Item>
            <Form.Item label="来源">
              {getFieldDecorator('source')(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class ThesisPage extends React.Component {
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
    this.state.thesisCreateVisible = false;
    this.state.thesisDetailData = {
      title: '如今的社会,关注点狭窄到不可思议', etitle: 'Incredible Focus in Today\'s Society',
      author: 'sss1998', year: '2015年',
      publication: '新理财（政府理财）',
      keyword: 'keyword',
      ekeyword: 'ekeyword',
      epublication: 'GOVERNMENT FINANC;',
      abstract: '肠道微生物通过口服进入消化道，经过胃时要处于PH值1.5-2的极酸环境，氢离子大量进入细菌，威胁其生存。为了适应这种极端环境，保持细胞内正常的PH值，肠道微生物进化出了一系列的抗酸系统。这些抗酸系统通常是通过膜反向转运蛋白，交换细胞内外质子化程度不同的底物来消耗细胞内的氢离子，从而维持细胞内正常PH值。我们已经得到了大肠杆菌抗酸系统中重要膜转运蛋白AdiC不同构象的高分辨率三维结构，通过比较分析这些结构，我们对细菌抗酸性的分子机制有了初步的了解，但还有一系列的基本问题有待回答。我们计划在已有的生化和结构分析的基础上，针对上述问题，综合多种研究手段探索肠道微生物适应强酸性极端环境的分子机制，并期望在此基础上设计特异性抑制肠道病原微生物的小分子。',
      source: 'http://www.wanfangdata.com.cn/details/detail.do?_type=perio&id=xlc-zf201610030'
    };
  }

  componentDidMount() {
    var formData = new FormData();
    formData.append("un", this.state.loginInfo.un);
    formData.append("UID", this.state.loginInfo.UID);
    fetch('http://94.191.58.148/get_paper.php', {
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

  saveThesisFormRef = formRef => {
    this.ThesisFormRef = formRef;
  };
  handleThesisCreateConfirm = () => {
    const form = this.ThesisFormRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      var formData = new FormData();
      formData.append("Title", values['title']);
      formData.append("ETitle", values['etitle']);
      formData.append("Author", values['author']);
      formData.append("Year", values['year']);
      formData.append("Keyword", values['keyword']);
      formData.append("EKeyword", values['ekeyword']);
      formData.append("Publication", values['publication']);
      formData.append("EPublication", values['epublication']);
      formData.append("Abstract", values['abstract']);
      formData.append("Source", values['source']);
      formData.append("UID", this.state.loginInfo.UID);

      var objData = {};
      formData.forEach((value, key) => objData[key] = value);
      console.log(JSON.stringify(objData));
      fetch('http://94.191.58.148/add_paper.php', {
        method: 'POST',
        body: formData,
        dataType: 'text'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.res === true) {
            console.log(data);
            message.info('申请中，请等待管理员验证');
            form.resetFields();
            this.setState({ projCreateVisible: false });
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
                专家论文管理页面
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
                      title={<a href="https://ant.design">{item.Title}</a>}
                      description={item.Keyword}
                    />
                    <Button onClick={() => {
                      var formData = new FormData();
                      formData.append("paperID", this.state.data[item.id].PaperID);
                      fetch('http://94.191.58.148/show_paper.php', {
                        method: 'POST',
                        body: formData,
                        dataType: 'text'
                      })
                        .then((response) => response.json())
                        .then((data) => {
                          console.log(data.data[0]);
                          let data1 = data.data[0];
                          this.setState({
                            thesisDetailData: {
                              title: data1.Title,
                              year: data1.Time,
                              etitle: data1.ETitle,
                              keyword: data1.Keyword,
                              ekeyword: data1.KeywordEn,
                              publication: data1.Publication,
                              epublication: data1.EPublication,
                              abstract: data1.Abstract,
                              source: data1.Source,
                              author: data1.Author
                            }
                          })
                          this.setState({ detailVisible: true });
                        })
                        .catch(function (err) {
                          message.info('获取数据错误: ' + err);
                        })
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
            <Button type='primary' onClick={() => { this.setState({ thesisCreateVisible: true }) }}>新建论文</Button>
          </div>
        </Content>
        <AcThesisDetail data={this.state.thesisDetailData} visible={this.state.detailVisible} onCancel={() => this.setState({ detailVisible: false })} />
        <CreateThesisModal wrappedComponentRef={this.saveThesisFormRef} visible={this.state.thesisCreateVisible}
          onCancel={() => { this.setState({ thesisCreateVisible: false }) }} onCreate={this.handleThesisCreateConfirm} />
        <AcFooter />
      </Layout>
    );
  }
}

export default withRouter(ThesisPage);
