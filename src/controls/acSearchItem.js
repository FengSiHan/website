import React from 'react'
import {message, Avatar} from 'antd';

class AcSearchItem extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      // img:this.props.img,
      // name:this.props.name,
      // org:this.props.org,
      // papernum:this.props.papernum,
      // citations:this.props.citations,
      // field:this.props.field,
      // id:this.props.id
    }  
  } 
  handlerClick(url)
  {  
    message.info(url)
  }
  render()
    {
      //var url="url"
      return (
        <div>
          <div>
            <Avatar size={64} icon='user'  />
          </div>
          <div>
            
          </div>

        </div>
        

      );
    }
}


export default acSearchItem;