const adminname = document.getElementById('adminname')
const adminError = document.getElementById('adminError')
const password = document.getElementById('password')
const passwordError = document.getElementById('passwordError')
const formError = document.getElementById('formError')
const form = document.getElementById('form')


function validateAdminName(){
    if(adminname.value === ''||null)
    {
        adminError.style.visibility="visible"
        return false;
    }
    else
    {
        adminError.style.visibility="hidden";
        return true;
    }
}

function validatePassword(){
    if(password.value === ''||null)
        {
            passwordError.style.visibility="visible"
            return false;
        }
        else
        {
            passwordError.style.visibility="hidden";
            return true;
        }
}

form.addEventListener('submit',(e)=>{
    if(!validateAdminName() || !validatePassword())
    {
        e.preventDefault();
        formError.style.visibility="visible"
        setTimeout(()=>formError.style.visibility="hidden",3000)
    }
})