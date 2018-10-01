'use strict'

import serviceBase from './serviceBase'
import Constants from '../constants'

const agnService = {

  login: (data) => serviceBase.post(`/Login`, {data}),

}
export default agnService
