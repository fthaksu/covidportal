import React, { useState, useEffect, memo } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Alert, Spinner, Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import {getTurkeyStatsData} from "../api/service"
import axios from "axios";



const CountryStats = (props) => {
    const [statsData, setStatsData] = useState([]);
    const [loading, setLoading] = useState(true);



    async function getData() {
        if(props.country == "TR"){
            let data = await getTurkeyStatsData();
            setStatsData(data);
            setLoading(false);
        }else 
        {
        const res = await axios(`https://corona.lmao.ninja/v2/countries/${props.country}`);
        const data = res.data;
        setStatsData(data);
        setLoading(false);
        }

    }

    useEffect(() => {
        setLoading(true);
        getData();
    }, [props]); //props değişince useEffect tetiklenir.

    useEffect(() => {
        setLoading(true);
        getData();
    }, []); //props değişince useEffect tetiklenir.


    const numberFormatter = val => {
        var number = parseInt(val);
        return (<span>{number.toLocaleString()}</span>)
    };

    const calculateRate = (num, totalNum) => {
        var num1 = parseInt(num);
        var num2 = parseInt(totalNum);
        if(num1 == 0 || num2 == 0){
            return (<span>0</span>);
        }
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
            
            <div className="card-deck">
            <Row>
                <div className="card bg-primary">
                    <div className="card-header font-weight-bold text-uppercase"><FormattedMessage id="total_cases" /></div>
                    <div className="card-body">
                        {loading ? (<Spinner animation="border" />) :
                            <h3 className="card-title"> {numberFormatter(statsData.cases)}</h3>}
                            {(props.country == "TR" && !loading) ? <p className="card-text font-italic"><FormattedMessage id="today" /> : <span className="font-weight-bold">{numberFormatter(statsData.todayCases)}</span> </p> : "" }
                    </div>
                </div>
                <div className="card bg-danger">
                    <div className="card-header font-weight-bold text-uppercase"><FormattedMessage id="deaths" /></div>
                    <div className="card-body">
                        {loading ? (<Spinner animation="border" />) :
                            <h3 className="card-title"> {numberFormatter(statsData.deaths)}</h3>}
                            {(props.country == "TR" && !loading) ? <p className="card-text font-italic"><FormattedMessage id="today" /> : <span className="font-weight-bold">{numberFormatter(statsData.todayDeaths)}</span> </p> : "" }
                    </div>
                </div>
                <div className="card bg-warning">
                    <div className="card-header font-weight-bold text-uppercase"><FormattedMessage id="critical" /></div>
                    <div className="card-body">
                        {loading ? (<Spinner animation="border" />) :
                            <h3 className="card-title"> {numberFormatter(statsData.critical)}</h3>}
                            {(props.country == "TR" && !loading) ? <p className="card-text font-italic"><FormattedMessage id="today" /> : <span className="font-weight-bold">{numberFormatter(statsData.todayCritical)}</span> </p> : "" }
                    </div>
                </div>
                <div className="card bg-success">
                    <div className="card-header font-weight-bold text-uppercase"><FormattedMessage id="recovered" /></div>
                    <div className="card-body">
                        {loading ? (<Spinner animation="border" />) :
                            <h3 className="card-title"> {numberFormatter(statsData.recovered)}</h3>}
                            {(props.country == "TR" && !loading) ? <p className="card-text font-italic"><FormattedMessage id="today" /> : <span className="font-weight-bold">{numberFormatter(statsData.todayRecovered)}</span> </p> : "" }
                    </div>
                </div>
                </Row>
                <br/>
                <Row>
                <div className="card bg-secondary">
                    <div className="card-header font-weight-bold text-uppercase"><FormattedMessage id="total_test" /></div>
                    <div className="card-body">
                        {loading ? (<Spinner animation="border" />) :
                            <h3 className="card-title"> {numberFormatter(statsData.tests)}</h3>}
                            {(props.country == "TR" && !loading) ? <p className="card-text font-italic"><FormattedMessage id="today" /> : <span className="font-weight-bold">{numberFormatter(statsData.todayTests)}</span> </p> : "" }
                    </div>
                </div>
                <div className="card bg-info">
                    <div className="card-header font-weight-bold text-uppercase"><FormattedMessage id="case_test" /></div>
                    <div className="card-body">
                        {loading ? (<Spinner animation="border" />) :
                            <h3 className="card-title"> {calculateRate(statsData.cases, statsData.tests)}</h3>}
                           {props.country == "TR" && !loading ? <p className="card-text font-italic"><FormattedMessage id="today" /> : <span className="font-weight-bold">%{statsData.testCaseRate}</span> </p> : "" }
                    </div>
                </div>
                <div className="card bg-dark">
                    <div className="card-header font-weight-bold text-uppercase"><FormattedMessage id="death_rate" /></div>
                    <div className="card-body">
                        {loading ? (<Spinner animation="border" />) :
                            <h3 className="card-title">  {calculateRate(statsData.deaths, statsData.cases)}</h3>}
                    </div>
                </div>
                <div className="card bg-lighter">
                    <div className="card-header font-weight-bold text-uppercase text-dark"><FormattedMessage id="recovery_rate2" /></div>
                    <div className="card-body">
                        {loading ? (<Spinner animation="border" />) :
                            <h3 className="card-title text-dark"> {calculateRate(statsData.recovered, statsData.cases)}</h3>}
                    </div>
                </div>
                </Row>
            </div>
            <section className="my-4 align-left">

            </section>
            <br></br>
        </div>
    )

}
export default memo(CountryStats);
