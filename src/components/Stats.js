import React, { useState, useEffect, memo } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Alert, Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";




const Stats = () => {
    const [statsData, setStatsData] = useState([]);
    const [locale, setLocale] = useState("en");
    const [loading, setLoading] = useState(true)


    async function getData() {

        const res = await fetch('https://corona.lmao.ninja/v2/all');
        const data = await res.json();
        setStatsData(data);
        setLoading(false);

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
        var date = new Date(num);
        return (<span> {date.toLocaleDateString() + ' | ' + date.toLocaleTimeString()} </span>)
    }

    return (
        <div>
            <p>
            </p>
            <div className="card-columns">
                <div className="card text-white bg-primary mb-6">
                    <div className="card-header font-weight-bold text-uppercase"><FormattedMessage id="total_cases" /></div>
                    <div className="card-body">
                        {loading ? (<Spinner animation="border" />) :
                            <h3 className="card-title"> {numberFormatter(statsData.cases)}</h3>}
                        <p className="card-text font-italic"><FormattedMessage id="today" />: +{numberFormatter(statsData.todayCases)}</p>
                    </div>
                </div>
                <div className="card text-white bg-success mb-6">
                    <div className="card-header font-weight-bold text-uppercase"><FormattedMessage id="recovered" /></div>
                    <div className="card-body">
                        {loading ? (<Spinner animation="border" />) :
                            <h3 className="card-title"> {numberFormatter(statsData.recovered)}</h3>}
                    </div>
                </div>
                <div className="card text-white bg-dark mb-6">
                    <div className="card-header font-weight-bold text-uppercase"><FormattedMessage id="deaths" /></div>
                    <div className="card-body">
                        {loading ? (<Spinner animation="border" />) :
                            <h3 className="card-title"> {numberFormatter(statsData.deaths)}</h3>}
                        <p className="card-text font-italic"><FormattedMessage id="today" /> : +{numberFormatter(statsData.todayDeaths)}</p>
                    </div>
                </div>
                <div className="card text-white bg-danger mb-6">
                    <div className="card-header font-weight-bold text-uppercase"><FormattedMessage id="critical" /></div>
                    <div className="card-body">
                        {loading ? (<Spinner animation="border" />) :
                            <h3 className="card-title"> {numberFormatter(statsData.critical)}</h3>}
                    </div>
                </div>
                <div className="card text-white bg-warning mb-6">
                    <div className="card-header font-weight-bold text-uppercase"><FormattedMessage id="death_rate" /></div>
                    <div className="card-body">
                        {loading ? (<Spinner animation="border" />) :
                            <h3 className="card-title"> {calculateRate(statsData.deaths, statsData.cases)}</h3>}
                        <p className="card-text font-italic"><FormattedMessage id="recovery_rate" /> : {calculateRate(statsData.recovered, statsData.cases)}</p>
                    </div>
                </div>
                <div className="card text-white bg-info mb-6">
                    <div className="card-header font-weight-bold text-uppercase"><FormattedMessage id="total_test" /></div>
                    <div className="card-body">
                        {loading ? (<Spinner animation="border" />) :
                            <h3 className="card-title"> {numberFormatter(statsData.tests)}</h3>}
                    </div>
                </div>
            </div>
            <section className="my-4">
                <Alert variant="info">
                    <FormattedMessage id="last_updated" /> :
                {loading ? (<Spinner animation="grow" size="sm" />) : <strong>  {customToDate(statsData.updated)}</strong>}
                    {/* <Link to="about" className="alert-link">
                        alert link deneme
                </Link> ---Link vermek için */}
                </Alert>
            </section>
        </div>
    )

}
export default memo(Stats);
