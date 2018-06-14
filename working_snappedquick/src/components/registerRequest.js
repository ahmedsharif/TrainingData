const url = 'http://192.168.100.13:8080/snapped_quick_api_and_admin/public/api/users';


const getUserData = (state) => {
  let username = state.username;
  let fname = state.username;
  let lname = state.username;
  let email = state.email;
  let password = state.password;
  let role = 'client';
  let device = '12345';
  let personal_contact = state.phoneNumber;
  let OS = 2;
  let device_token = '13259785947';
  let queryUrl = `${url}?fname=${username}&lname=${username}&email=${email}&password=${password}&role=${role}&device=${device}&personal_contact=${personal_contact}&OS=${OS}&device_token=${device_token}`;
  // return fetch(queryUrl) 
  //   .then ( response => {
  //     if ( ! response.ok ) { throw response }
  //       return response.json();
  //   })

  fetch(url, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    'fname': username,
    "lname": usename,
    'email': email,
    'password': password,
    'role': role,
    'device': device,
    'personal_contact': personal_contact,
    'OS': OS,
    'device_token': device_token,   
  })
})
.then ( response => {
    if ( ! response.ok ) { throw response }
      return response.json();
  })
};

export const userData = (state) => getUserData(state);