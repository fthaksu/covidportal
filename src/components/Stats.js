import React, { useState, useEffect, memo } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Alert } from "react-bootstrap";

const Stats = () => {
    const [statsData, setStatsData] = useState([]);

    async function getData() {
        const res = await fetch('https://corona.lmao.ninja/all');
        const data = await res.json();
        setStatsData(data);
    }

    useEffect(() => {
        getData();
    }, []);


    const numberFormatter = val => {
        var number = parseInt(val);
        return (<span>{number.toLocaleString()}</span>)
    };

    const calculateRate = (num, totalNum) => {
        var num1 = parseInt(num);
        var num2 = parseInt(totalNum);
        var rate = (num1 / num2) * 100
        return (<span>%{rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>)
    }

    const customToDate = (val) => {
        var num = parseFloat(val);
        var date =  new Date(num);
        return (<span> {date.toUTCString()} </span>)
    }

    return (
        <div>
            <div className="card-columns">
                <div className="card text-white bg-primary mb-6">
                    <div className="card-header font-weight-bold text-uppercase">Total Cases</div>
                    <div className="card-body">
                        <h3 className="card-title font-weight-bold"> {numberFormatter(statsData.cases)}</h3>
                        <p className="card-text font-italic">Today : +{numberFormatter(statsData.todayCases)}</p>
                    </div>
                </div>
                <div className="card text-white bg-success mb-6">
                    <div className="card-header font-weight-bold text-uppercase">Recovered</div>
                    <div className="card-body">
                        <h3 className="card-title font-weight-bold"> {numberFormatter(statsData.recovered)}</h3>
                    </div>
                </div>
                <div className="card text-white bg-dark mb-6">
                    <div className="card-header font-weight-bold text-uppercase">Deaths</div>
                    <div className="card-body">
                        <h3 className="card-title font-weight-bold"> {numberFormatter(statsData.deaths)}</h3>
                        <p className="card-text font-italic">Today : +{numberFormatter(statsData.todayDeaths)}</p>
                    </div>
                </div>
                <div className="card text-white bg-danger mb-6">
                    <div className="card-header font-weight-bold text-uppercase">Critical</div>
                    <div className="card-body">
                        <h3 className="card-title font-weight-bold"> {numberFormatter(statsData.critical)}</h3>
                    </div>
                </div>
                <div className="card text-white bg-warning mb-6">
                    <div className="card-header font-weight-bold text-uppercase">Death Rate</div>
                    <div className="card-body">
                        <h3 className="card-title font-weight-bold"> {calculateRate(statsData.critical, statsData.cases)}</h3>
                        <p className="card-text font-italic">Recovery Rate : {calculateRate(statsData.recovered, statsData.cases)}</p>
                    </div>
                </div>
                <div className="card text-white bg-info mb-6">
                    <div className="card-header font-weight-bold text-uppercase">Total Tests</div>
                    <div className="card-body">
                        <h3 className="card-title font-weight-bold"> {numberFormatter(statsData.tests)}</h3>
                    </div>
                </div>
            </div>
            <section className="my-4">
                <Alert variant="info">
                    Last updated time :
                <strong> {customToDate(statsData.updated)}</strong>
                    {/* <Link to="about" className="alert-link">
                        alert link deneme
                </Link> ---Link vermek için */} 
                </Alert>
            </section>
        </div>
    )

}
export default memo(Stats);
