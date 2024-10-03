
const firstname = document.getElementById('Firstname');
const firstnameError = document.getElementById('FirstnameError');

const lastname=document.getElementById('Lastname');
const lastnameError= document.getElementById('LastnameError');

const email = document.getElementById('email')
const emailError = document.getElementById('emailError')

const username = document.getElementById('username')
const usernameError = document.getElementById('usernameError')

const password = document.getElementById('password');
const passwordError = document.getElementById('passwordError');

const form=document.getElementById('form');
const formError = document.getElementById('formError');

function validateFirstname(){
    if(firstname.value.trim() === '' || firstname.value === null)
    {
        firstnameError.style.visibility="visible";
        return false;
    }
    else
    {
        firstnameError.style.visibility="hidden";
        return true;
    }
}

function validateLastname(){
    if(lastname.value.trim() === '' || lastname.value === null)
        {
            lastnameError.style.visibility="visible";
            return false;
        }
        else
        {
            lastnameError.style.visibility="hidden";
            return true;
        }
}


function validateEmail(){
    if(email.value.trim() === ''||email.value === null)
        {
            emailError.style.visibility="visible"
            return false
        }
        else if(!email.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            emailError.style.visibility="visible";
            emailError.innerHTML="enter a valid email"
        }
        else
        {
            emailError.style.visibility="hidden"
            return true
        }
}


function validateUsername(){
    if(username.value.trim() ===''|| username.value === null)
    {
        usernameError.style.visibility="visible"
        return false
    }
    else
    {
        usernameError.style.visibility="hidden"
        return true
    }
}


function validatePassword(){
    if(password.value.trim() === '' ||password.value === null)
        {
            passwordError.style.visibility="visible";
            return false
        }
        else
        {
            passwordError.style.visibility="hidden";
            return true;
        }
}

form.addEventListener('submit',(e)=>{
    if( !validateFirstname() || !validateUsername() || !validatePassword() || !validateEmail())
    {
        e.preventDefault()
        formError.style.visibility="visible"
        setTimeout(()=>formError.style.visibility="hidden",3000)
    }
})