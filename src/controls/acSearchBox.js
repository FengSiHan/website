import React from 'react';
import { Input,Radio,message } from 'antd'
import { withRouter } from 'react-router-dom';

const Search=Input.Search
//type代表搜索类型：专家、机构、论文（成果）
//handleSearch 响应搜索
class AcSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state={type:this.props.type,value:""}
    this.state.loginInfo=this.props.loginInfo;
    this.handleSearch=this.handleSearch.bind(this);
  }

  handleTypeChange= e=>{
    this.setState({type:e.target.value})
  }

  handleSearch(value)
  {
    var newstate = this.state;
    newstate.value = value;
    this.props.history.push({pathname:'/searchResult', state:newstate});
  }
  render(){
    var typelist=["专家","机构","论文"];//
    const {type} =this.state.type;
    return  <div>
                <div style={{textAlign:"left"}} >
                 <Radio.Group defaultvalue={type} onChange={this.handleTypeChange} buttonStyle="solid">
                 <Radio.Button value={0}>专家</Radio.Button>
                 <Radio.Button value={1}>机构</Radio.Button>
                 <Radio.Button value={2}>论文</Radio.Button>
                 </Radio.Group>
                </div>
                <div>
                  <Search
                    placeholder={"搜"+typelist[this.state.type]}
                    onSearch={value=>this.handleSearch(value)}
                    style={{width:this.state.width,float:"left"}}
                    allowClear
                    enterButton
                  />
                </div>
               
            </div>
  } 
}
export default withRouter(AcSearchBox);