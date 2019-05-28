import React from 'react';
import { Input,Radio } from 'antd'

const Search=Input.Search
//type代表搜索类型：专家、机构、论文（成果）
//handleSearch 响应搜索
//class 样式名
class AcSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state={type:0,handleSearch:props.handleSearch,class:props.class,value:""}
  }

  handleTypeChange= e=>{
    this.setState({type:e.target.value})
  }
  render(){
    var typelist=["专家","机构","论文"];//
    const {type} =this.state.type;
    return  <div>
                <div style={{textAlign:"left"}} class={this.state.class}>
                 <Radio.Group value={type} onChange={this.handleTypeChange} >
                 <Radio.Button value={0}>专家</Radio.Button>
                 <Radio.Button value={1}>机构</Radio.Button>
                 <Radio.Button value={2}>论文</Radio.Button>
                 </Radio.Group>
                </div>
                <div>
                  <Search
                    placeholder={"搜"+typelist[this.state.type]}
                    onSearch={value=>this.state.handleSearch(value)}
                    style={{width:this.state.width,float:"left"}}
                    allowClear
                    enterButton
                  />
                </div>
               
            </div>
  } 
}
export default AcSearchBox;