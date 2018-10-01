'use strict'

import Constants from '../constants'
require('es6-promise').polyfill();
require('isomorphic-fetch');

const credentials = {
  credentials: 'same-origin'
}

async function checkStatus(response) {

  let dataResponce;
  if (response.status >= 200 && response.status < 300) {

    dataResponce = await response;
  } else {

    let error = new Error(response.statusText);
    error.response = await response.json();

    dataResponce = Promise.reject(error);
  }
  return dataResponce;
}

function getJwtToken() {
  //return appController.jwtToken
}

function getHeaders(url) {
  return url.includes('login') ? {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'origin',
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  } :
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'origin',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }
}

function getUrl(url) {

  const timestamp = new Date().getTime()
  let separator = url.includes('?') ? '&' : ''
  separator = separator.replace(/&([^&]*)$/, '$1');
  //noinspection JSUnresolvedVariable

  return `${url}${separator}`

}

/**
 * Base functionality for the server request communications (GET, POST, ...).
 * @type {{get: (function()), postPutDelete: (function()), post: (function()), put: (function()), delete: (function())}}
 */
const serviceBase = {

  get: async url => {
    credentials.headers = getHeaders(url)
    let response = await fetch(getUrl(url), credentials).then(function (response) {
      return response;
    }).catch(function () {
      return null;
    })
    response = response ? response : null;
    if (response === null) {
      return null;
    }

   if (response.status >= 200 && response.status < 300) {
     response = await checkStatus(response)

     return response.json()
   } else {
     return null;
   }

  },

  postPutDelete: async (url, method, request) => {

    const options = {
      headers: getHeaders(url),
      method: method,
      body: JSON.stringify(request)
    }
 
    let response = await fetch(getUrl(url), Object.assign(options, credentials)).then(function (response) {
      return response;
    }).catch(function () {
      return null;
    })
    response = response ? response : null;
    if (response === null) {
      return null;
    }
    if (response.status >= 200 && response.status < 300) {
      response = await checkStatus(response)

      return response.json()
    } else {
      return null;
    }
  },

  post: (url, request) => serviceBase.postPutDelete(url, 'POST', request),

  put: async (url, request) => serviceBase.postPutDelete(url, 'PUT', request),

  delete: (url, request) => serviceBase.postPutDelete(url, 'DELETE', request)
}

export default serviceBase
