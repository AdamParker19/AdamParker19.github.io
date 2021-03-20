import './App.scss';
import Highcharts from 'highcharts';
import { React, useRef, useState, useEffect } from 'react';
import 'animate.css';
import JsonTable from 'ts-react-json-table';

function Table() {

    const [items, setItems] = useState([]);

    var item = [];

    useEffect(() => {
        setTimeout(() => {
            async function loadJSON(url) {
                const res = await fetch(url);
                return await res.json();
            }
            loadJSON('data.json').then(data => {
                for (var i = 0; i < data.length; i++) {
                    item.push({
                        "Department_Name": data[i].Department_Name, "Sales": data[i].Sales,
                        "Percentage": data[i].Percentage
                    });

                }
                setItems(item);
            });

        })

    }, [])

    return (

        <JsonTable theadClassName={'thead-light'} className="table table-sm table-bordered animate__animated animate__fadeIn" rows={items} />
    );


}

function PieChart() {
    const pieContainer = useRef(null);

    const [PieSource, setPieSource] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            async function loadJSON(url) {
                const res = await fetch(url);
                return await res.json();
            }
            loadJSON('data.json').then(data => {

                let Pies = [];
                for (var i = 0; i < data.length; i++) {
                    Pies.push({
                        'name': 'Department:' + data[i].Department_Name,
                        y: data[i].Sales
                    }
                    );
                    setPieSource([
                        {
                            name: 'Sales',
                            data: Pies
                        }
                    ])
                }
            });


        }, 100)

    }, [])

    useEffect(() => {
        const PieChart = Highcharts.chart(pieContainer.current, {
            chart: {
                backgroundColor: '#5a36e8',
                type: 'pie',
            },
            title: {
                verticalAlign: 'middle',
                floating: true,
                style: {
                    color: '#fff',
                    fontSize: '0px',
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    animation: {
                        duration: 1000
                    },
                    dataLabels: {
                        color: '#fff',

                        fontFamily: 'monospace',
                        format: '{point.name}: {point.percentage:.1f} %'
                    },
                    innerSize: '0%'
                }
            },
            series: PieSource
        });
    }, [PieSource])


    return (<div ref={pieContainer} style={
        {
            animationDuration: '2s',
            animationDelay: '0.9s',
            width: '100%'
        }
    } class="animate__animated animate__fadeIn" >
    </div>)

}

export { Table, PieChart };
