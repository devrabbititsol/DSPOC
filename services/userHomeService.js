'use strict'
import serviceBase from './serviceBase'

const userHomeService = {
    
    getDetails:  (data) =>  serviceBase.post('/userHome/getDetails',data),
    propertyDetails:  (data) =>  serviceBase.post('/userHome/propertyDetails',data),
    getwalksckore:  (data) =>  serviceBase.post('/userHome/getwalksckore',data)
    
}
export default userHomeService