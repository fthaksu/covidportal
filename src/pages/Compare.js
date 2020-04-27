import React, { useState, useEffect, memo } from 'react'
import Layouts from '../components/Layouts';
import CountryCard from '../components/CountryCard';
import { Row, Col, Container, Table, Spinner, Button, Card } from 'react-bootstrap';
import { getCompareData, getHistoricalData } from '../api/service'
import { FormattedMessage } from 'react-intl';
import { CompareLineGraph } from '../components/Graph';
import countryNames from "../i18n/countrynames.json";
import countryNamesEN from "../i18n/countrynamesEN.json";
import {
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon,
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon
  } from "react-share";


const Compare = (props) => {
    const [firstCountry, setFirstCountry] = useState("TR");
    const [secondCountry, setSecondCountry] = useState("IT");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [activeData, setActiveData] = useState([]);
    const [deathData, setDeathData] = useState([]);
    const [recoveryData, setRecoveryData] = useState([]);

    const language = navigator.language.split(/[-_]/)[0];  


    const getData = async () => {
        setLoading(true);
        let cmpData = await getCompareData(firstCountry,secondCountry);
        setData(cmpData);
        setLoading(false);
        getGraphData();
    };

    const getGraphData = async () => {
        setLoading(true);
        let {activeArray, deathArray, recoveryArray} = await getHistoricalData(firstCountry,secondCountry); //multiple array returns
        setActiveData(activeArray);
        setDeathData(deathArray);
        setRecoveryData(recoveryArray);
        setLoading(false);
    };


    function updateFirstCountry(updatedCountry) {
        setFirstCountry(updatedCountry);
        props.history.push("/compare/" + (updatedCountry+"_"+secondCountry).toString());
    }

    function updateSecondCountry(updatedCountry) {
        setSecondCountry(updatedCountry);
        props.history.push("/compare/" + (firstCountry+"_"+updatedCountry).toString());

    }

    useEffect(() => {
        getData();
    }, [firstCountry, secondCountry])

    useEffect(() => {
        //URL ile gelen parametre (props.match.params.id) değişir ise tetiklenecek.
        setLoading(true);
        if (props.match.params.id !== "" && props.match.params.id !== undefined) {
            var array = props.match.params.id.split('_')
            setFirstCountry(array[0]);
            setSecondCountry(array[1]);
        }
    }, [props.match.params.id])

    const calculateRate = (num, totalNum) => {
        var num1 = parseInt(num);
        var num2 = parseInt(totalNum);
        if (num1 === 0 || num2 === 0) {
            return (<span>0</span>);
        }
        var rate = (num1 / num2) * 100
        return (<span>%{rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>)
    }


    return (
        <Layouts>
            <Container className="country-container">
                <Row>
                    <Col>
                        <CountryCard selectedCountry={firstCountry} handler={updateFirstCountry} />
                    </Col>
                    <Col>
                        <CountryCard selectedCountry={secondCountry} handler={updateSecondCountry} />
                    </Col>
                </Row>
            </Container>
            <Table bordered hover className="compare-table">
                <thead className="text-center">
                    <tr>
                        <th>#</th>
                        {data !== [] && !loading ? data.map((item) => { 
                            return <th key={item.country}>
                                      <img alt="flag" src={item.countryInfo.flag} width="125" />
                                    </th> }) : <><th><Spinner animation="border" /></th><th><Spinner animation="border" /></th></>
                            }
                    </tr>
                </thead>
                <tbody className="text-center">
                    <tr>
                        <td><FormattedMessage id="test"/></td>
                        {data !== [] && !loading ? data.map((item) => { 
                            return <th key={item.country}>
                                     {item.tests.toLocaleString()}
                                    </th> }) : <><th><Spinner animation="border" /></th><th><Spinner animation="border" /></th></>
                            }
                    </tr>
                    <tr>
                        <td><FormattedMessage id="total_cases"/></td>
                        {data !== [] && !loading ? data.map((item) => { 
                            return <th key={item.country}>
                                     {item.cases.toLocaleString()}
                                    </th> }) : <><th><Spinner animation="border" /></th><th><Spinner animation="border" /></th></>
                            }
                    </tr>
                    <tr>
                        <td><FormattedMessage id="active"/></td>
                        {data !== [] && !loading ? data.map((item) => { 
                            return <th key={item.country}>
                                      {item.active.toLocaleString()}
                                    </th> }) : <><th><Spinner animation="border" /></th><th><Spinner animation="border" /></th></>
                            }
                    </tr>
                    <tr>
                        <td><FormattedMessage id="critical"/></td>
                        {data !== [] && !loading ? data.map((item) => { 
                            return <th key={item.country}>
                                      {item.critical.toLocaleString()}
                                    </th> }) : <><th><Spinner animation="border" /></th><th><Spinner animation="border" /></th></>
                            }
                    </tr>
                    <tr>
                        <td><FormattedMessage id="deaths"/></td>
                        {data !== [] && !loading ? data.map((item) => { 
                            return <th key={item.country}>
                                      {item.deaths.toLocaleString()}
                                    </th> }) : <><th><Spinner animation="border" /></th><th><Spinner animation="border" /></th></>
                            }
                    </tr>
                    <tr>
                        <td><FormattedMessage id="recovered"/></td>
                        {data !== [] && !loading ? data.map((item) => { 
                            return <th key={item.country}>
                                      {item.recovered.toLocaleString()}
                                    </th> }) : <><th><Spinner animation="border" /></th><th><Spinner animation="border" /></th></>
                            }
                    </tr>
                    <tr>
                        <td><FormattedMessage id="test_million"/></td>
                        {data !== [] && !loading ? data.map((item) => { 
                            return <th key={item.country}>
                                      {item.testsPerOneMillion.toLocaleString()}
                                    </th> }) : <><th><Spinner animation="border" /></th><th><Spinner animation="border" /></th></>
                            }
                    </tr>
                    <tr>
                        <td><FormattedMessage id="death_rate"/></td>
                        {data !== [] && !loading ? data.map((item) => { 
                            return <th key={item.country}>
                                            {calculateRate(item.deaths, item.cases)}
                                    </th> }) : <><th><Spinner animation="border" /></th><th><Spinner animation="border" /></th></>
                            }
                    </tr>
                    <tr>
                        <td><FormattedMessage id="today_cases"/></td>
                        {data !== [] && !loading ? data.map((item) => { 
                            return <th className="text-center" key={item.country}>
                                     {item.todayCases.toLocaleString()}
                                    </th> }) : <><th><Spinner animation="border" /></th><th><Spinner animation="border" /></th></>
                            }
                    </tr>
                    <tr>
                        <td><FormattedMessage id="today_deaths"/></td>
                        {data !== [] && !loading ? data.map((item) => { 
                            return <th key={item.country}>
                                      {item.todayDeaths.toLocaleString()}
                                    </th> }) : <><th><Spinner animation="border" /></th><th><Spinner animation="border" /></th></>
                            }
                    </tr>
                </tbody>
            </Table>
            <div className="social-share">
                <Card style={{width: "250px", margin: "0" }}>
                    <Card.Header><FormattedMessage id="share"/></Card.Header>
                    <Card.Body>
                        <WhatsappShareButton url={window.location.href}><WhatsappIcon size={50} round /></WhatsappShareButton>
                        <FacebookShareButton url={window.location.href}><FacebookIcon size={50} round /></FacebookShareButton>
                        <TwitterShareButton url={window.location.href}><TwitterIcon size={50} round /></TwitterShareButton>
                        <LinkedinShareButton url={window.location.href}><LinkedinIcon size={50} round /></LinkedinShareButton>
                    </Card.Body>
                </Card>
            </div>
            <br/>
            <br/>
            <Container className="country-container">
                <Row>
                    <Col>
                    <h4><FormattedMessage id="logarithmic_cases"/>{!loading ? '' : (<Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> <FormattedMessage id="loading" /> </Button>)}</h4>
                    <CompareLineGraph 
                        data={activeData}
                        XAxisDatakey={"date"}
                        Key1={"country1"}
                        Key2={"country2"}
                        Name1={language === "tr" ? countryNames[firstCountry] : countryNamesEN[firstCountry]}
                        Name2={language === "tr" ? countryNames[secondCountry] : countryNamesEN[secondCountry]}
                        />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                    <h4><FormattedMessage id="deaths"/>{!loading ? '' : (<Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> <FormattedMessage id="loading" /> </Button>)}</h4>
                    <CompareLineGraph 
                        data={deathData}
                        XAxisDatakey={"date"}
                        Key1={"country1"}
                        Key2={"country2"}
                        Name1={language === "tr" ? countryNames[firstCountry] : countryNamesEN[firstCountry]}
                        Name2={language === "tr" ? countryNames[secondCountry] : countryNamesEN[secondCountry]}
                        />
                    </Col>
                </Row>
                <br/>
                <Row>
                <Col>
                <h4><FormattedMessage id="recovered"/>{!loading ? '' : (<Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> <FormattedMessage id="loading" /> </Button>)}</h4>
                    <CompareLineGraph 
                        data={recoveryData}
                        XAxisDatakey={"date"}
                        Key1={"country1"}
                        Key2={"country2"}
                        Name1={language === "tr" ? countryNames[firstCountry] : countryNamesEN[firstCountry]}
                        Name2={language === "tr" ? countryNames[secondCountry] : countryNamesEN[secondCountry]}
                        />
                    </Col>
                </Row>
            </Container>
        </Layouts>
    )
}

export default memo(Compare);