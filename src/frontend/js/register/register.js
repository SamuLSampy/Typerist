const password = document.querySelector('#password')
const repeatPassword = document.querySelector('#repeatPass')
const errorMessage = document.querySelector('.error-message')

password.addEventListener('input', (e)=>{
    if(password.value !== repeatPassword.value){
        repeatPassword.classList.add('error')
        errorMessage.classList.remove('off')
    } else{
        repeatPassword.classList.remove('error')
        errorMessage.classList.add('off')
    }
})

repeatPassword.addEventListener('input', (e)=>{
    if(password.value !== repeatPassword.value){
        repeatPassword.classList.add('error')
        errorMessage.classList.remove('off')
    } else{
        repeatPassword.classList.remove('error')
        errorMessage.classList.add('off')
    }
})
