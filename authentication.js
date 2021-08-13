// let firebase create userID with
// createUserWithEmailAndPassword() method
// SET input limit to 30 characters! (except email)
const createLoginBox = () => {
  // remove any previous existence
  closeAuthenticationBox();

  let loginBox      = document.createElement('div');
  let emailInput    = document.createElement('input');
  let passwordInput = document.createElement('input');
  let submitButton  = document.createElement('button');
  let center        = document.createElement('center');


  loginBox.id             = 'authBoxDiv';
  emailInput.id           = 'emailInput';
  passwordInput.id        = 'passwordInput';

  passwordInput.type      = 'password';

  emailInput.className    = 'authInput';
  passwordInput.className = 'authInput';
  submitButton.className  = 'authButton';

  emailInput.placeholder    = 'Email';
  passwordInput.placeholder = 'Password';
  submitButton.innerText    = 'Submit'; 

  submitButton.onclick = handleLogin;
  center.appendChild(submitButton);

  inputs = [emailInput, passwordInput, center];
  
  inputs.forEach((input) => {
    loginBox.appendChild(input);
  });

  document.getElementById('landingPageBody').appendChild(loginBox);
}

const createSignUpBox = () => {
  // remove any previous existence
  closeAuthenticationBox();
  
  let signUpBox             = document.createElement('div');
  let firstNameInput        = document.createElement('input');
  let lastNameInput         = document.createElement('input');
  let emailInput            = document.createElement('input');
  let passwordInput         = document.createElement('input');
  let passwordConfirmInput  = document.createElement('input');
  let submitButton          = document.createElement('button');
  let center                = document.createElement('center');

  signUpBox.id                      = 'authBoxDiv';
  firstNameInput.id                 = 'firstNameInput';
  lastNameInput.id                  = 'lastNameInput';
  emailInput.id                     = 'emailInput';
  passwordInput.id                  = 'passwordInput';
  passwordConfirmInput.id           = 'passwordConfirmInput';

  passwordInput.type                = 'password';
  passwordConfirmInput.type         = 'password';
  
  firstNameInput.className          = 'authInput';
  lastNameInput.className           = 'authInput';
  emailInput.className              = 'authInput';
  passwordInput.className           = 'authInput';
  passwordConfirmInput.className    = 'authInput';
  submitButton.className            = 'authButton';

  firstNameInput.placeholder        = 'First Name';
  lastNameInput.placeholder         = 'Last Name';
  emailInput.placeholder            = 'Email';
  passwordInput.placeholder         = 'Password';
  passwordConfirmInput.placeholder  = 'Confirm Password';
  submitButton.innerText            = 'Submit'; 

  submitButton.onclick = handleSignUp;
  center.appendChild(submitButton);

  let inputs = 
    [ 
      firstNameInput, 
      lastNameInput,
      emailInput,
      passwordInput,
      passwordConfirmInput,
      center
    ];

  inputs.forEach( (input) => {
    signUpBox.appendChild(input);
  });

  document.getElementById('landingPageBody').appendChild(signUpBox);

}

const closeAuthenticationBox = () => {
  let landingPageBody = document.getElementById('landingPageBody');
  let authBoxDiv      = document.getElementById('authBoxDiv');

  if (authBoxDiv !== null){
    landingPageBody.removeChild(authBoxDiv);
  }
}

// firebase api call
const handleLogin = () => {
  let email = document.getElementById('emailInput').value;
  console.log('Email: ' + email);
  let password = document.getElementById('passwordInput').value;
  console.log('Password: ' + password);

  // allow 3 attempts
  // click forgot password, will send you an email with your original password!
}

// firebase api call
const handleSignUp = () => {
  let firstName = document.getElementById('firstNameInput').value;
  console.log('First Name: ' + firstName);
  let lastName = document.getElementById('lastNameInput').value;
  console.log('Last Name: ' + lastName);
  let email = document.getElementById('emailInput').value;
  console.log('Email: ' + email);
  let password = document.getElementById('passwordInput').value;
  console.log('Password: ' + password);
  let passwordConfirm = document.getElementById('passwordConfirmInput').value;
  console.log('Password confirm: ' + passwordConfirm);

  errorMessage = ''
  let passwordsMatch = password === passwordConfirm;
  if(!passwordsMatch){
    errorMessage += 'Passwords do not match\n'
  }
  console.log('Passwords match: ' + passwordsMatch);

  const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.][a-zA-Z]+/;
  let validEmail = email.match(emailFormat) ? true : false;
  if(!validEmail){
    errorMessage += 'Email is not valid\n';
  }
  console.log('Valid email: ' + validEmail);

  const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/; 
  let validPassword = password.match(passwordFormat);
  if (!validPassword){
    errorMessage += '\nPassword invalid for one or more of the following reasons:\n';
    errorMessage += 'Password must have 1 lowercase alphabetical character\n';
    errorMessage += 'Password must have 1 uppercase alphabetical character\n';
    errorMessage += 'Password must have 1 numerical character\n';
    errorMessage += 'Password must have 1 of the following special characters: !@#$%^&*\n';
    errorMessage += 'Password must be at least 8 characters long\n\n';
  }

  let exceedsCharLength = firstName.length > 25 || lastName.length > 25 || email.length > 100 || password.length > 50 || passwordConfirm.length > 50;
  if (exceedsCharLength){
    errorMessage += 'One or more of the entries are too long\n'
  }


  let emptyEntries = firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0 || passwordConfirm.length === 0;
  if (emptyEntries){
    errorMessage += 'One or more entries are empty\n'
  }

  if(!passwordsMatch || !validEmail || !validPassword || exceedsCharLength || emptyEntries){
    generateErrorMessage(errorMessage);
  }

  else{
    // call firebase function to create user with email + password
    // verify email is syntactically correct / legit
    // 1 uppercase, 1 number, 1 special character
    // hide/view password option when typing (hide by default)
    console.log('Payload correct for firebase api call');
  }

}

// @param: message is a string of form 'error <1> \nerror <2>\n ...'
const generateErrorMessage = (message) => {
  let errorMessage        = document.createElement('p');
  errorMessage.className  = 'errorMessage';
  alert(message);

  //TODO: Create the message under login/signup buttons
}
