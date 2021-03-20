import './App.scss';
import { Link, Switch, Router, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Table, PieChart } from './Chart';
import 'animate.css';
import Swal from 'sweetalert2';


function Dashboard() {


    let chart;
    const history = useHistory();
    if (localStorage.getItem('token') == null) {
        Swal.fire({
            title: 'Oops!',
            icon: 'error',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            html: '<b>Unauthorized access detected</b>',
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp',


            },
            timer: 1000

        })
        setTimeout(() => {
            history.push("/");

        }, 1000)
    }




    const [currentTab, setCurrentTab] = useState('tab1');
    const tabList = [
        {
            name: 'tab1',
            label: 'Tabular',
            content: (
                <div className="tab-content">
                    <h2>Tabular form</h2>
                    <Table />
                </div>
            )
        },
        {
            name: 'tab2',
            label: 'Pie Chart',
            content: (<div className="tab-content">
                <h2>Pie Chart form</h2>
                <PieChart />
            </div>
            )
        }
    ];
    return (

        <div className="App">
            <header className="App-header">

                <h1 style={{
                    padding: 20,
                    fontFamily: 'monospace'
                }} class="animate__animated animate__fadeInLeftBig">Welcome {localStorage.getItem('token')}</h1>

                <div className="simple-tabs">

                    <div className="tabs">
                        {
                            tabList.map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentTab(tab.name)}
                                    style={{ borderRadius: '20px', margin: '5px' }}
                                    className={(tab.name === currentTab) ? 'active' : ''}>
                                    {tab.label}

                                </button>
                            ))
                        }
                    </div>

                    {
                        tabList.map((tab, i) => {
                            if (tab.name === currentTab) {
                                return <div key={i}>{tab.content}</div>;
                            } else {
                                return null;
                            }
                        })
                    }
                </div>
                <div id="button" class="row" style={
                    {
                        width: '150px'
                    }
                }><button class="animate__animated animate__fadeIn" style={{
                    animationDelay: '2s'
                }} onClick={() => {
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-success',
                            cancelButton: 'btn btn-danger'
                        },
                        buttonsStyling: true
                    })

                    swalWithBootstrapButtons.fire({
                        title: 'Are you sure?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        reverseButtons: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.removeItem('token')
                            Swal.fire({
                                title: 'Logged out',
                                icon: 'success',

                                showClass: {
                                    popup: 'animate__animated animate__fadeInDown'
                                },
                                html: '<b>See you next time!</b>',
                                hideClass: {
                                    popup: 'animate__animated animate__fadeOutUp',

                                },
                                timer: 1000

                            })
                            setTimeout(() => {
                                history.push('/');
                            }, 1000)
                        }
                    })
                }}>Sign Out</button></div>
            </header>

        </div>

    );


}

export default Dashboard;
