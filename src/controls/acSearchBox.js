import React from 'react';
import { Input } from 'antd'

const Search=Input.Search
//type代表搜索类型：学者、机构、领域、论文（成果）
//handleSearch 响应搜索
//width 宽度
class AcSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state={type:props.type,handleSearch:props.handleSearch,width:props.width,value:""}
  }

  render(){
    return  <div>
               <Search
                placeholder={"搜"+this.state.type}
                onSearch={value=>this.state.handleSearch(value)}
                style={{width:this.state.width}}
                allowClear
                enterButton
              />
            </div>
  } 
}
export default AcSearchBox;