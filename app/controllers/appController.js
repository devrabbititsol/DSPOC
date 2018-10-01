import $ from "jquery";
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert';
import Constants from '../../constants';

import userHome from '../../services/userHomeService';
/**
 * Application controller - controls application state and interaction among various components.
 */

const appController = {
   async getIndividualWalkscore(data, latitude, longitude) {
    console.log(data, latitude, longitude);
    const finalData = {address: data.Address, latitude: latitude, longitude: longitude};
    const walkscore = await userHome.getwalksckore(finalData);
    return (walkscore.walkscore);
  }
}

export default appController
