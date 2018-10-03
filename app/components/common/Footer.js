import React from 'react';
import { Link } from 'react-router-dom';
import chatMessage from '../../../services/chatMessageService';
import userHome from '../../../services/userHomeService';
import $ from 'jquery';

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openPropetyChatList:false,
      openChatBox:false,
      ChartLitst:[],
      ChatProperty:{},
      chatItineraryPropertyID:0,
      TextMessage:"",
      propertyChat:[],
      openChatboxPopup:false
    }

    this.chatUpdate = this.chatUpdate.bind(this);
    this.openChatList = this.openChatList.bind(this);
    this.closeChatList = this.closeChatList.bind(this);
    this.messageText = this.messageText.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.openChatboxPopup = this.openChatboxPopup.bind(this);
  }
  async componentWillMount() {
  

    await this.setState({
      ChartLitst : localStorage.getItem("OriginalPropertyDetails") !== null ? JSON.parse(localStorage.getItem("OriginalPropertyDetails")) : []
    })
    this.chatUpdate();
  }
  async componentWillReceiveProps(nextProps){
    if(nextProps.chatId > 0){
      this.openChatBox(nextProps.chatId);
    }

  }
  async chatUpdate(){
    
    if(this.state.chatItineraryPropertyID > 0 && this.state.openChatBox == true){
    
      let chatDetails = await chatMessage.getChatDetails({ItineraryPropertyID:this.state.chatItineraryPropertyID});
      if(chatDetails.recordset.length != this.state.propertyChat.length)
      await this.setState({propertyChat:chatDetails.recordset});
      
    }
    let _this = this;
    this.scrollDivBottom();
    setTimeout(function(){ _this.chatUpdate(); }, 3000);
  }
  async openChatList(){
    await this.setState({
      ChartLitst : localStorage.getItem("OriginalPropertyDetails") !== null ? JSON.parse(localStorage.getItem("OriginalPropertyDetails")) : []
    })
    await this.setState({openPropetyChatList:!this.state.openPropetyChatList,openChatBox:false});
  }
  async openChatBox(Id){
    console.log(Id);
    let ChatPropertyDetails = _.find(this.state.ChartLitst,{ItineraryPropertyID:Id});
    
    await this.setState({chatItineraryPropertyID:ChatPropertyDetails.ItineraryPropertyID,ChatProperty:ChatPropertyDetails,openChatBox:true,openPropetyChatList:false});
    $(".activeItem").removeClass('activeItem');
    $("#highlight"+this.state.chatItineraryPropertyID).addClass('activeItem');
    let chatDetails = await chatMessage.getChatDetails({ItineraryPropertyID:this.state.chatItineraryPropertyID});
    await this.setState({propertyChat:chatDetails.recordset});
    
    //console.log(this.state, this.state.propertyChat);
  }
  async openChatboxPopup(){
    $(".activeItem").removeClass('activeItem');
    $("#highlight"+this.state.chatItineraryPropertyID).addClass('activeItem');
    await this.setState({propertyChat:[]});
    this.openChatBox(this.state.chatItineraryPropertyID);

         await this.setState({
          openChatboxPopup:true,
          openPropetyChatList:false
         })
  }
  async closeChatList(){
    await this.setState({
      openPropetyChatList:false,
      openChatBox:false,
      openChatboxPopup:false,
      chatItineraryPropertyID:0
    })
  }
  async messageText(event){
    event.persist();
    let textMessage = event.target.value;
    await this.setState({TextMessage:textMessage});
  }
  async sendMessage(){
    if(this.state.TextMessage.trim() !== ""){
      let chartDetails = this.state.propertyChat;
      chartDetails.push({ChatMessage:this.state.TextMessage,FromPersonID:2,ToPersonID:1});
      this.scrollDivBottom();
      $("#InputMsg").val("");
      $("#InputMsg2").val("");
      await this.setState({propertyChat:chartDetails});
      let chatInsert = await chatMessage.inputChat({ItineraryPropertyID:this.state.chatItineraryPropertyID,From:2,To:1, TextMessage:this.state.TextMessage});
      let _this = this;
      setTimeout(async function(){
       await chatMessage.inputChat({ItineraryPropertyID:_this.state.chatItineraryPropertyID,From:1,To:2, TextMessage:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, totam.'})}, 3000);
      await this.setState({TextMessage:""});
      
      
    }
    
  }
  async scrollDivBottom(){
    var objDiv =$("#chatPopup").height();
    //console.log(objDiv);
    $("#chatPopup").scrollTop(objDiv*100);

    var objDiv2 =$("#chat_msgs").height();
    $("#chat_msgs").scrollTop(objDiv2*100);
  }
  _handleKeyPress(e){
    e.persist();
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }
  render() {

    return (    
    
<div className="chat_footer">
{this.state.openChatboxPopup == false ?
<div>  
{this.state.openPropetyChatList == false && this.state.openChatBox == false ?
	<a href="javascript:void(0)" className="chaticon" onClick={this.openChatList.bind(this)}>
		<img src="/images/Group 74.png" alt=""/>

	</a> : <a href="javascript:void(0)" className="chaticon" onClick={this.closeChatList.bind(this)}>
  <img src="/images/close.png" alt=""/>

</a> }
</div>:""}
	
{this.state.openChatBox == true && this.state.openChatboxPopup == false ?	<div className="communitie_single_item">
		<div className="communities_header d-flex align-items-center">
			<i className="fa fa-chevron-left" onClick={this.openChatList.bind(this)}></i>
			<p>Communities</p>
			<a href="javascript:void(0)" data-toggle="modal" data-target=".bd-example-modal-lg"><i className="fa fa-expand" onClick={this.openChatboxPopup.bind(this)}></i></a>
		</div>
    {Object.keys(this.state.ChatProperty).length > 0 ? 
		 <div className="item_full">
			<div className="chat_item d-flex align-items-center justify-content-start">
				<div className="item_img bd-highlight">
        <img src={'https://s3-us-west-1.amazonaws.com/destination-services-itinerary/'+this.state.ChatProperty.Photo+'.jpg'} alt=""/>
				</div>
				<div className="chat_dtls">
        <p>{this.state.ChatProperty.Community}</p>
        <span>{this.state.ChatProperty.Address}, {this.state.ChatProperty.City} {this.state.ChatProperty.StateCode} {this.state.ChatProperty.ZipCode}</span>
				</div>
			</div>
		</div> : "" }
		<div className="chat_msgs" id="chat_msgs">
			
      {this.state.propertyChat.map((row,index) =>{
			return <div key={index}>{row.FromPersonID == 2 ? <div  className="right_chat">{row.ChatMessage}</div> :<div key={index} className="left_chat">{row.ChatMessage}</div>}</div>
      })}
			
			<div className="clearfix"></div>
		</div>
    {this.state.chatItineraryPropertyID > 0 ?
		<div className="sent_box d-flex align-items-center">
			<input type="text" onKeyPress={this._handleKeyPress} id="InputMsg" defaultValue={this.state.TextMessage} placeholder="Type message here" onChange={this.messageText.bind(this)} />
			<span onClick={this.sendMessage.bind(this)}><i className="fa fa-paper-plane"></i></span>
		</div> : ""}
	</div> : "" }
	
	{this.state.openPropetyChatList == true ? <div id="chat">
		<div className="communities_header d-flex justify-content-between">
			<p>Communities</p>
			<a href="javascript:void(0)" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={this.openChatboxPopup.bind(this)}><i className="fa fa-expand"></i></a>
		</div>
		<div className="contacts_list">
    {this.state.ChartLitst.map((row,index) =>{
			return <div key={index} className="chat_item d-flex align-items-center justify-content-start" onClick={this.openChatBox.bind(this, row.ItineraryPropertyID)}>
				<div className="item_img bd-highlight">
					<img src={'https://s3-us-west-1.amazonaws.com/destination-services-itinerary/'+row.Photo+'.jpg'} alt=""/>
				</div>
				<div className="chat_dtls">
					<p>{row.Community}</p>
					<span>{row.Address}, {row.City} {row.StateCode} {row.ZipCode}</span>
				</div>
				<div className="msg_count">
					{/*<span className="badge">5</span>*/}
				</div>
			</div>
    })}
		</div>
		
  </div> : ""}
  
{this.state.openChatboxPopup == true ?
  <div className="modal fade bd-example-modal-lg communitie_pop">
	  <div className="modal-dialog modal-lg modal-dialog-centered">
		<div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalCenterTitle">Communities</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeChatList.bind(this)} aria-label="Close">
          <span aria-hidden="true" className="fa fa-times"></span>
        </button>
      </div>
      <div className="modal-body text-left p-0 ">
        <div className="d-flex">
			<div className="">
				<div className="contacts_list">
        {this.state.ChartLitst.map((row,index) =>{
			return <div key={index} className={"chat_item d-flex align-items-center justify-content-start"} id={"highlight"+row.ItineraryPropertyID} onClick={this.openChatBox.bind(this, row.ItineraryPropertyID)}>
						<div className="item_img bd-highlight">
            <img src={'https://s3-us-west-1.amazonaws.com/destination-services-itinerary/'+row.Photo+'.jpg'} alt=""/>
						</div>
						<div className="chat_dtls">
            <p>{row.Community}</p>
            <span>{row.Address}, {row.City} {row.StateCode} {row.ZipCode}</span>
						</div>
						<div className="msg_count">
						{/*<span className="badge">5</span>*/}
						</div>
					</div> })}
				</div>
			</div>  
			<div className="">
				
		<div className="chat_msgs" id="chatPopup">
    {this.state.propertyChat.map((row,index) =>{
			return <div key={index}>{row.FromPersonID == 2 ? <div  className="right_chat">{row.ChatMessage}</div> :<div key={index} className="left_chat">{row.ChatMessage}</div>}</div>
      })}
			<div className="clearfix"></div>
		</div>
		<div className="sent_box d-flex align-items-center">
    <input type="text" onKeyPress={this._handleKeyPress} id="InputMsg2" defaultValue={this.state.TextMessage} placeholder="Type message here" onChange={this.messageText.bind(this)} />
    <span onClick={this.sendMessage.bind(this)}><i className="fa fa-paper-plane"></i></span>
		</div>
			</div>  
		</div>
      </div>
      
    </div>
	  </div>
	</div> : ""}


</div>
    )
  }


}

export default Footer
