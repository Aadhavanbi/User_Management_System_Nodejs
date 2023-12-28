const MailValidator =  require('domain-mail-verify');

module.exports.isValidEmail = async function(email){

  const emailProps = MailValidator.verifyEmail(email);

  if (emailProps.isPublicMail) {
    console.log('Valid email address');
    return  true
  } else {
    console.log('Invalid email address');
    return false
  }
}


module.exports.isPasswordStrong = function(password) {
  // console.log("password check");
  // console.log(password);
     const minLength = 8; // Minimum length
     const hasUpperCase = /[A-Z]/.test(password); // At least one uppercase letter
     const hasLowerCase = /[a-z]/.test(password); // At least one lowercase letter
     const hasDigit = /\d/.test(password); // At least one digit
     const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password); // At least one special character
        const isStrong =
       password.length >= minLength &&
       hasUpperCase &&
       hasLowerCase &&
       hasDigit &&
       hasSpecialChar;
   
     return isStrong;
};