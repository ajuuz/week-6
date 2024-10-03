const email = document.getElementById('email')
const emailError = document.getElementById('emailError')

const username = document.getElementById('username')
const usernameError = document.getElementById('usernameError')

const form=document.getElementById('form');
const formError = document.getElementById('formError');

function validateEmail(){
    if(email.value.trim() === ''||email.value === null)
        {
            emailError.style.visibility="visible"
            return false
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


form.addEventListener('submit',(e)=>{
    if(!validateUsername()|!validateEmail())
    {
        e.preventDefault()
        formError.style.visibility="visible"
        setTimeout(()=>formError.style.visibility="hidden",3000)
    }
})


