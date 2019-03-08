
const userDetails = {
    userName : 'ashok@suiteamerica.com',
    passWord : 'ashok@123!',
    type : 'guest',
    FirstName : 'John Doe'
}
const clientDetails = {
    userName : 'client@suiteamerica.com',
    passWord : 'ashok@123!',
    type : 'client',
    FirstName : 'Ashok k'
}
const consultantDetails = {
    userName : 'consultant@suiteamerica.com',
    passWord : 'ashok@123!',
    type : 'consultant',
    FirstName : 'Consultant k'
}
const constants = {
    NO_DATA_FOUND: 'Oops No Data Found !!',
    SERVICE_DOWN: 'Oops something went wrong !! Please try after some time.',
    LOGIN_ERROR_MSG: 'Please enter valid Email Id / Password'
}
export default { CLIENT_LOGIN: clientDetails, CONSULTANT_LOGIN:consultantDetails, USER_LOGIN: userDetails, DS_CONSTANTS:constants}
