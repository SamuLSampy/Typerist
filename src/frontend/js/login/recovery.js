const axios = require('axios')

const urlParams = new URLSearchParams(window.location.search)
const resetToken = urlParams.get('token')

const recoveryContainer = document.querySelector('.recovery')
const statusMessage = document.querySelector('.status-message')
const sendButton = document.querySelector('.send')
let lock = true

sendButton.addEventListener('click', async e =>{
    e.preventDefault();
    const password = document.querySelector('#password').value
    const passwordRepeat = document.querySelector('#password-repeat').value
    if(password === passwordRepeat && lock === false){
        try {
            const send = await setPassword(resetToken, password)
            if(send){
                recoveryContainer.classList.add('hidden')
                statusMessage.textContent = 'Senha redefinida, você pode fazer login novamente.'
                statusMessage.classList.remove('hidden')
                lock = true
                setTimeout(() => {
                    window.location.href = '/login'
                }, 2000)
            }
        } catch(e){
            console.error('Error setting password', e)
            statusMessage.textContent = 'O link atual não existe ou o token expirou. Tente novamente.'
            statusMessage.classList.remove('hidden')
            recoveryContainer.classList.add('hidden')
            lock = true
        }
    }
})

async function init(token) {
    statusMessage.textContent = 'Um momento'
    statusMessage.classList.remove('hidden')

    if(token){
        try{
            const data = await verifyToken(token)
            if(data.success === true){
                const email = data.user.email
                const emailEl = document.querySelector(".user-email");
                emailEl.innerHTML = email;
                statusMessage.classList.add('hidden')
                recoveryContainer.classList.remove('hidden')
                lock = false
            } else{
                statusMessage.textContent = 'O link atual não existe ou o token expirou. Tente novamente.'
            }
        } catch(e){
            console.error(e)
            statusMessage.textContent = 'O link atual não existe ou o token expirou. Tente novamente.'
        }
    } else{
        statusMessage.textContent = 'O link atual não existe ou o token expirou. Tente novamente.'
    }
}

async function verifyToken(token){
    try{
        const send = await axios.post('api/user/check-token', { token });
        return send.data
    } catch(e){
        throw e
    }
}

async function setPassword(token, password) {
    try{
        const send = await axios.post('api/user/set-password', { token, password });
        return send.status === 200
    } catch(e){
        throw e
    }
}

init(resetToken)
