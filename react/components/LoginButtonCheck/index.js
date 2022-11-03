import { useEffect } from 'react'



const LoginButtonCheck = () => {

    function prepareInputs() {
        var allInputs = document.querySelectorAll('.vtex-login-2-x-inputContainer .vtex-styleguide-9-x-input');
        var loginButton = document.querySelector('.vtex-login-2-x-sendButton .vtex-button');

        if(allInputs[0].value) {
            if(allInputs[1].value) {
                loginButton.classList.add('vtex-button--buttonActive')
            }
        }
        

        allInputs[0].addEventListener("keyup", function() {
            if(allInputs[0].value) {
                if(allInputs[1].value) {
                    loginButton.classList.add('vtex-button--buttonActive')
                    return
                }
            }
            loginButton.classList.remove('vtex-button--buttonActive')
        });

        allInputs[0].addEventListener("change", function() {
            if(allInputs[0].value) {
                if(allInputs[1].value) {
                    loginButton.classList.add('vtex-button--buttonActive')
                    return
                }
            }
            loginButton.classList.remove('vtex-button--buttonActive')
        });

        allInputs[1].addEventListener("keyup", function() {
            if(allInputs[1].value) {
                if(allInputs[0].value) {
                    loginButton.classList.add('vtex-button--buttonActive')
                    return
                }
            }
            loginButton.classList.remove('vtex-button--buttonActive')
        });

        allInputs[1].addEventListener("change", function() {
            if(allInputs[1].value) {
                if(allInputs[0].value) {
                    loginButton.classList.add('vtex-button--buttonActive')
                    return
                }
            }
            loginButton.classList.remove('vtex-button--buttonActive')
        });
    }

    useEffect(() => {

        setTimeout(() => {prepareInputs()}, 2000);

    },[]);    

    return null
}

export default LoginButtonCheck