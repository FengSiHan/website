import React from 'react'
// eslint-disable-next-line
import { List, Avatar, Layout, Button, message, Table, Icon, Modal, Divider } from 'antd'
import { withRouter } from 'react-router-dom';
import AcHeader from '../controls/acHeader'
import AcFooter from '../controls/acFooter'
import AcThesisDetail from '../controls/acThesisDetail'
import './css/searchResult.css'

class ResultShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      thesisVisible: false,
      data: {},
      thesisData: {},
      counter: 0
    }
    this.thesisShow = this.thesisShow.bind(this);
    this.state.test = false;
  }
  componentDidMount() {
    this.setState({ test: true });
  }
  thesisShow(id) {
    //通过id获取论文详细信息
    var formData = new FormData();
    formData.append("PaperID", id);
    var objData = {};
    formData.forEach((value, key) => objData[key] = value);
    console.log(JSON.stringify(objData));
    console.log('sdf');
    fetch('http://94.191.58.148/show_paper.php', {
      method: 'POST',
      body: formData,
      dataType: 'text'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('??');
        console.log(data.data);
        if (data.data.length >= 1) {
          let dataItem=data.data[0]
          this.setState(
            {
              thesisData: {
                abstract: dataItem.Abstract, 
                etitle: dataItem.ETitle,
                author: dataItem.Author,
                year: dataItem.Year,
                publication: dataItem.Publication,
                epublication: dataItem.EPublication,
                source: dataItem.Source,
                keyword: dataItem.Keyword,
                ekeyword:dataItem.Ekeyword,
              },
              thesisVisible: true
            }
          )
          
        }
        else {
          //
        }
      })
      .catch(function (err) {
        message.info('查询失败：' + err);
      })
  
    
  }
  render() {
    //const listData = [];
    //this.state.counter++;
    //console.log(this.state.counter);
    //console.log(this.props.data);
    // eslint-disable-next-line
    if (this.props.type == 2) {
      const columns =
        [
          {
            title: '题名',
            dataIndex: 'Title',
            render: (text, record) =>
              (
                <span>
                  {// eslint-disable-next-line
                    <a><p style={{ textAlign: 'left' }} onClick={() => this.thesisShow(record.PaperID)}>{text}</p></a>
                  }
                </span>
              )
          },
          {
            title: '作者',
            dataIndex: 'RealName',
          },
          {
            title: '来源',
            dataIndex: 'Source'
          },
          {
            title: '发布时间',
            dataIndex: 'Year'
          },
          {
            title: '所属领域',
            dataIndex: 'Area'
          },
          {
            title: '引用',
            dataIndex: 'Quoted_Num'
          },
          {
            title: '下载',
            dataIndex: 'Download_Num',
          },
          {
            title: '',
            render: (text, record) =>
              (
                <span>
                  {// eslint-disable-next-line
                    <a><Icon type="download" onClick={() => { this.setState({ data: record, visible: true }) }} /></a>
                  }
                </span>
              )
          }
        ];
      // for (let i=0;i<25;i++)
      // {
      //     listData.push(
      //         {
      //             id:i,
      //             title:this.props.value+i,
      //             author:'laiyuan'+i,
      //             source:"kkkkk"+i,
      //             time:"20252522"+i,
      //             citation:i*11,
      //             download:i*5,
      //             points:i+3,
      //             field:'sfsdafasdf'+i
      //         }
      //     )
      // }
      if (this.props.done === false) {
        return null;
      }
      return (
        <span>
          <Table
            columns={columns} dataSource={this.props.data}
            rowKey='PaperID'
          />
          <Modal mask={false} keyboard={true} visible={this.state.visible} footer={null} onCancel={() => this.setState({ visible: false })}>
            <div className="project-detail-div">
              <div className="project-detail-left-span">题名:</div>
              <div className="project-detail-right-span">{this.state.data.Title}</div>
            </div>
            <Divider className="project-divider" />
            <div className="project-detail-div">
              <div className="project-detail-left-span">所需积分:</div>
              <div className="project-detail-right-span">{this.state.data.points}</div>
            </div>
            <Divider className="project-divider" />
            <div className="project-detail-div">
              <Button onClick={() => message.info('确认下载')}>确认下载</Button>
            </div>
          </Modal>

          <AcThesisDetail visible={this.state.thesisVisible} onCancel={() => this.setState({ thesisVisible: false })} data={this.state.thesisData} />

        </span>
      );
    }
    else {
      
      return (
        <List
          grid=
          {
            {
              gutter: 200,
              column: 2
            }
          }
          //loading
          itemLayout="vertical"
          size="large"
          pagination={{ pageSize: 6 }}
          dataSource={this.props.data}
          renderItem=
          {
            item =>
              (
                <List.Item
                  key={item.userID}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon="user" size={64} />}
                    // eslint-disable-next-line
                    title={<a><p style={{ textAlign: "left" }} onClick={() => this.props.toExpert(item.userID)}>{item.RealName+item.uesrID}</p></a>}
                    description={
                      <div style={{ textAlign: "left" }}>
                        <div style={{ float: "left" }}>
                          <p >{item.OrganizationName}</p>
                          <p style={{ whiteSpace: "pre-wrap" }}>发表文章：{item.Paper_Num}     被引次数：{item.Quoted_Num}</p>
                          <p>研究领域：{item.Area}</p>
                        </div>
                        <div style={{ float: "right" }}>
                          <Button type="default" onClick={() => this.props.toExpert(item.userID)}>详细信息</Button>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )
          }
        />
      );
    }
  }
}


const { Content } = Layout;
class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    try {
      this.state = this.props.location.state;
    } catch (error) {
      this.state = { loginInfo: { isExpert: false, logined: false, un: '' } };
    }
    if (this.state === undefined) {
      this.state = { loginInfo: { isExpert: false, logined: false, un: '' } };
    }
    this.state.id = 0;
    /*
      初始化其他部分
    */
    this.toExpert = this.toExpert.bind(this);
    this.getData = this.getData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state.data = [];
    this.state.done = false;
  }
  componentDidMount() {
    if (this.state.done===false) this.getData(this.state.value,this.state.type);
  //  this.setState({done:true});
  }
  getData(value,type) {
    type = type + 1;
    var formData = new FormData();
    var listData = [];
    formData.append("flag", type);
    formData.append("name", value);
    var objData = {};
    formData.forEach((value, key) => objData[key] = value);
    //console.log(JSON.stringify(objData));

    fetch('http://94.191.58.148/search.php', {
      method: 'POST',
      body: formData,
      dataType: 'text'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        if (data.data.length >= 1) {
          if (type===3)
          {
            for (let i = 0; i < data.data.length; i++) 
            {
              let dataItem = data.data[i];
              listData.push(
                {
                  Title: dataItem.Title,
                  RealName: dataItem.RealName,
                  Source: dataItem.Source,
                  Year: dataItem.Year,
                  Area: dataItem.Area,
                  Quoted_Num: dataItem.Quoted_Num,
                  Download_Num: dataItem.Download_Num,
                  PaperID: dataItem.PaperID,
                }
              )
            }
          }
          else 
          {
            for (let i = 0; i < data.data.length; i++) 
            {
              let dataItem = data.data[i];
              listData.push(
                {
                  Area: dataItem.Area,
                  OrganizationName: dataItem.OrganizationName,
                  Paper_Num: dataItem.Paper_Num,
                  Quoted_Num: dataItem.Quoted_Num,
                  RealName: dataItem.RealName,
                  userID: dataItem.userID,
                }
              )
            }
          }
        }
        else {
          this.setState({data:[]});
        }
        this.setState({ data: listData });
        console.log('this.state.done');
        this.setState({ done: true });
      })
      .catch(function (err) {
        message.info('查询失败：' + err);
      })
  
  }

  toExpert(id) {
    var newstate = this.state;
    newstate.id = id;
    console.log('to expert '+id);
    this.props.history.push({ pathname: '/expertDetail', state: newstate });
  }
  onacSearch = (val, ty) => {
    this.setState(
      {
        value: val,
        type: ty
      }
    )
  }
  render() {

    //message.info(this.state.value);
    /*
      获取数据传入listdata，名称如下两个for循环
    */


    //let resultlist;

    return (
      <Layout className="sr-layout">
        <AcHeader loginInfo={this.state.loginInfo} homePage={false} type={this.state.type} onacSearch={this.onacSearch} getData={this.getData}/>
        <Content className="sr-content">
          <ResultShow data={this.state.data} type={this.state.type} value={this.state.value} toExpert={this.toExpert} done={this.state.done} />
        </Content>
        <AcFooter className='sr-footer'/>
      </Layout>
    );
  }
}

export default withRouter(SearchResult);
