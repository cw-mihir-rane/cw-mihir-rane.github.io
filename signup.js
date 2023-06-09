//Input fields
let username = document.querySelector("#name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirm-password");

//Error messages p tags
let usernameError = document.querySelector("#nameError");
let emailError = document.querySelector("#emailError");
let passwordError = document.querySelector("#passwordError");
let confirmPasswordError = document.querySelector("#confirmPasswordError");
 
//toggle password icons
let togglePasswordIcon = document.querySelector("#togglePassword");
let toggleConfirmPasswordIcon = document.querySelector("#toggleConfirmPassword");

let submitButton = document.querySelector("#submit-btn");

let modal = document.querySelector(".modal");
let modalCloseBtn = document.querySelector(".close-button");

let checkFormStatus = {
    userName : false,
    email: false,
    password: false,
    confirmPassword: false
}

//Helper functions
function updateFieldsBordersAndValidation(field, removeClass, addClass, checkFormStatusField, fieldState){
    field.classList.remove(removeClass);
    field.classList.add(addClass);
    checkFormStatus[checkFormStatusField] = fieldState;
}

function hasNumber(str) {
    return /[0-9]/.test(str);
}

function hasSpecialChar(str) {
    for(i = 0; i < str.length; i++){
        if(str[i] == '!' || str[i] == '@' || str[i] == '#' || str[i] == '$' || str[i] == '%' || str[i] == '^' || str[i] == '&' || str[i] == '*'
        ){
            return true;
        }
    }

    return false;
}

function AreCheckFormStatusPropstrue(){
    console.log(checkFormStatus);

    if(checkFormStatus.userName === true && checkFormStatus.email === true&& checkFormStatus.password === true && checkFormStatus.confirmPassword === true 
    ){
        return true;
    }else{
        return false;
    }
}

function enableDisableBtn(){
    if(AreCheckFormStatusPropstrue() && submitButton.disabled == true){
        submitButton.toggleAttribute("disabled");
    }

    if(AreCheckFormStatusPropstrue() == false && submitButton.disabled == false){
        submitButton.toggleAttribute("disabled");
    }
}

// Fields Validation functions
function validateUsername(evt){
    usernameError.classList.remove("hide");

    if(this.value === ""){
        updateFieldsBordersAndValidation(this, "correct-border", "wrong-border", "userName", false);
        usernameError.innerText = "Username cannot be blank";
    }else if(this.value.length < 3){
        updateFieldsBordersAndValidation(this, "correct-border", "wrong-border", "userName", false);
        usernameError.innerText = "Username must have atleast 3 characters";
    }else if(this.value.length > 25){
        updateFieldsBordersAndValidation(this, "correct-border", "wrong-border", "userName", false);
        usernameError.innerText = "Username cannot exceed 25 characters";
    }else{
        updateFieldsBordersAndValidation(this, "wrong-border", "correct-border", "userName", true);
        usernameError.classList.add("hide");
    }

    enableDisableBtn();
}

function validateEmail(evt){
    emailError.classList.remove("hide")

    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if(regex.test(this.value) === false){
        updateFieldsBordersAndValidation(this, "correct-border", "wrong-border", "email", false);
        emailError.innerText = "Enter valid address";
    }else{
        updateFieldsBordersAndValidation(this, "wrong-border", "correct-border", "email", true);
        emailError.classList.add("hide");
    }

    enableDisableBtn();
}

function validatePassword(evt){
    passwordError.classList.remove("hide");

    if(this.value.length < 8){
        updateFieldsBordersAndValidation(this, "correct-border", "wrong-border", "password", false);
        passwordError.innerText = "Password must have atleast 8 characters";
    }
    else if(!(this.value.toUpperCase() != this.value)){
        updateFieldsBordersAndValidation(this, "correct-border", "wrong-border", "password", false);
        passwordError.innerText = "Password must have atleast one lowercase character";
    }else if(!(this.value.toLowerCase() != this.value)){
        updateFieldsBordersAndValidation(this, "correct-border", "wrong-border", "password", false);
        passwordError.innerText = "Password must have atleast one uppercase character";
    }else if(!hasNumber(this.value)){
        updateFieldsBordersAndValidation(this, "correct-border", "wrong-border", "password", false);
        passwordError.innerText = "Password must have atleast one number";
    }
    else if(!hasSpecialChar(this.value)){
        updateFieldsBordersAndValidation(this, "correct-border", "wrong-border", "password", false);
        passwordError.innerText = "Password must have atleast one special character from the set (!@#$%^&*)";
    }else{
        passwordError.classList.add("hide");
        updateFieldsBordersAndValidation(this, "wrong-border", "correct-border", "password", true);
    }

    enableDisableBtn();
}

function validateConfirmPassword(evt){
    confirmPasswordError.classList.remove("hide");

    if(this.value !== password.value){
        updateFieldsBordersAndValidation(this, "correct-border", "wrong-border", "confirmPassword", false);
        confirmPasswordError.innerText = "Confirm Password must match the previous password";
    }else{
        confirmPasswordError.classList.add("hide");
        updateFieldsBordersAndValidation(this, "wrong-border", "correct-border", "confirmPassword", true);
    }

    enableDisableBtn();
}


// Toggling password display
function togglePassword(passwordEle, icon) {
    const type = passwordEle.getAttribute("type") === "password" ? "text" : "password";
    passwordEle.setAttribute("type", type);
    
    icon.classList.toggle("bi-eye");
}


username.addEventListener('input', validateUsername);
email.addEventListener('input', validateEmail);
password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', validateConfirmPassword);

togglePasswordIcon.addEventListener("click", () => {togglePassword(password, togglePasswordIcon)});
toggleConfirmPasswordIcon.addEventListener("click",() => {togglePassword(confirmPassword, toggleConfirmPasswordIcon)});

submitButton.addEventListener("click", function(e){
    e.preventDefault();
    modal.classList.add("show-modal");
});

modalCloseBtn.addEventListener("click", function(){
    modal.classList.remove("show-modal");
});



