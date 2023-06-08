//Input fields
let username = document.querySelector("#name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirm-password");

//Error messages
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

// let isAllFieldsCorrect = true;
let checkFormStatus = {
    userName : false,
    email: false,
    password: false,
    confirmPassword: false
}

//Helper functions

function hasNumber(str) {
    return /[0-9]/.test(str);
}

function hasSpecialChar(str) {

    for(i = 0; i < str.length; i++){
        if(str[i] == '!' || 
            str[i] == '@' || 
            str[i] == '#' || 
            str[i] == '$' || 
            str[i] == '%' || 
            str[i] == '^' || 
            str[i] == '&' || 
            str[i] == '*'
        ){
            return true;
        }
    }

    return false;
}

function AreCheckFormStatusPropstrue(){
    if(checkFormStatus.userName === true 
        && checkFormStatus.email === true
        && checkFormStatus.password === true 
        && checkFormStatus.confirmPassword === true 
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
        usernameError.innerText = "Username cannot be blank";
        this.classList.remove("correct-border");
        this.classList.add("wrong-border");
        checkFormStatus.userName = false;
    }else if(this.value.length < 3){
        usernameError.innerText = "Username must have atleast 3 characters";
        this.classList.remove("correct-border");
        this.classList.add("wrong-border");
        checkFormStatus.userName = false;
    }else if(this.value.length > 25){
        usernameError.innerText = "Username cannot exceed 25 characters";
        this.classList.remove("correct-border");
        this.classList.add("wrong-border");
        checkFormStatus.userName = false;
    }else{
        usernameError.classList.add("hide");
        this.classList.add("correct-border");
        this.classList.remove("wrong-border");
        checkFormStatus.userName = true;
    }

    enableDisableBtn();
}

function validateEmail(evt){
    emailError.classList.remove("hide")

    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if(regex.test(this.value) === false){
        emailError.innerText = "Enter valid address";
        this.classList.remove("correct-border");
        this.classList.add("wrong-border");
        checkFormStatus.email = false;
    }else{
        emailError.classList.add("hide");
        this.classList.add("correct-border");
        this.classList.remove("wrong-border");
        checkFormStatus.email = true;
    }

    enableDisableBtn();
}

function validatePassword(evt){
    passwordError.classList.remove("hide");

    if(this.value.length < 8){
        passwordError.innerText = "Password must have atleast 8 characters";
        this.classList.remove("correct-border");
        this.classList.add("wrong-border");
        checkFormStatus.password = false;
    }
    else if(!(this.value.toUpperCase() != this.value)){
        passwordError.innerText = "Password must have atleast one lowercase character";
        this.classList.remove("correct-border");
        this.classList.add("wrong-border");
        checkFormStatus.password = false;
    }else if(!(this.value.toLowerCase() != this.value)){
        passwordError.innerText = "Password must have atleast one uppercase character";
        this.classList.remove("correct-border");
        this.classList.add("wrong-border");
        checkFormStatus.password = false;
    }else if(!hasNumber(this.value)){
        passwordError.innerText = "Password must have atleast one number";
        this.classList.remove("correct-border");
        this.classList.add("wrong-border");
        checkFormStatus.password = false;
    }
    else if(!hasSpecialChar(this.value)){
        passwordError.innerText = "Password must have atleast one special character from the set (!@#$%^&*)";
        this.classList.remove("correct-border");
        this.classList.add("wrong-border");
        checkFormStatus.password = false;
    }else{
        passwordError.classList.add("hide");
        this.classList.add("correct-border");
        this.classList.remove("wrong-border");
        checkFormStatus.password = true;
    }

    enableDisableBtn();
}

function validateConfirmPassword(evt){
    confirmPasswordError.classList.remove("hide");

    if(this.value !== password.value){
        confirmPasswordError.innerText = "Confirm Password must match the previous password";
        this.classList.remove("correct-border");
        this.classList.add("wrong-border");
        checkFormStatus.confirmPassword = false;
    }else{
        confirmPasswordError.classList.add("hide");
        this.classList.add("correct-border");
        this.classList.remove("wrong-border");
        checkFormStatus.confirmPassword = true;
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



