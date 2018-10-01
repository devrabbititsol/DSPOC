'use strict'
import serviceBase from './serviceBase'

const chatMessageService = {
    
    inputChat:  (data) =>  serviceBase.post('/chatMessage/inputChat',data),
    getChatDetails:  (data) =>  serviceBase.post('/chatMessage/getChatDetails',data)
    
}
export default chatMessageService