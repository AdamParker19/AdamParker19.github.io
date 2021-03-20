import { React, useState } from 'react';

import './App.scss';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'

import 'animate.css';
function LoginForm() {

    const history = useHistory();

    const [User, setUser] = useState();
    const [Pass, setPass] = useState();

    if (localStorage.getItem('token') != null) {
        history.push('/dashboard');
    }
    const changeUser = (e) => {
        setUser(e.target.value);
    }

    const changePass = (e) => {
        setPass(e.target.value);
    }



    return (
        <>

            <div id="loginform">
                <h2 id="headerTitle" style={{
                    color: '#000'
                }}>Login Form</h2>
                <div class="row">
                    <label>Username</label>
                    <input type="text" placeholder="Enter your username" value={User} onChange={changeUser} />
                </div>
                <div class="row">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" value={Pass} onChange={changePass} />
                </div>
                <div id="button" class="row">
                    <button onClick={
                        () => {
                            if (User === 'User' && Pass === '12345') {
                                localStorage.setItem('token', 'User');
                                let timerInterval
                                Swal.fire({
                                    title: 'Success!',
                                    icon: 'success',

                                    showClass: {
                                        popup: 'animate__animated animate__fadeInDown'
                                    },
                                    html: 'Redirecting to dashboard in <b></b>',
                                    hideClass: {
                                        popup: 'animate__animated animate__fadeOutUp',

                                    },
                                    timer: 3000,
                                    didOpen: () => {
                                        timerInterval = setInterval(() => {
                                            const content = Swal.getContent()
                                            if (content) {
                                                const b = content.querySelector('b')
                                                if (b) {
                                                    b.textContent = Swal.getTimerLeft() / 1000
                                                }
                                            }
                                        }, 100)
                                    },
                                    willClose: () => {
                                        clearInterval(timerInterval)
                                    }
                                }).then((result) => {
                                    /* Read more about handling dismissals below */
                                    if (result.dismiss === Swal.DismissReason.timer) {
                                    }
                                }
                                )
                                setTimeout(() => {
                                    history.push('/dashboard');

                                }, 3000)
                            }

                            else {

                                Swal.fire({
                                    title: 'Oops!',
                                    icon: 'error',
                                    showClass: {
                                        popup: 'animate__animated animate__fadeInDown'
                                    },
                                    html: '<b>It looks like you entered incorrect credentials</b>',
                                    hideClass: {
                                        popup: 'animate__animated animate__fadeOutUp',
                                    },
                                    timer: 3000,

                                })

                            }
                        }}>Sign In</button>
                </div>
            </div>
        </>)


}

export default LoginForm;




