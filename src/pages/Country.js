import React, { useState, useEffect, memo } from 'react';
import Graph from '../components/Graph';
import CountryCard from '../components/CountryCard';
import CountryStats from '../components/CountryStats';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useIntl, FormattedMessage } from 'react-intl';
import Layouts from '../components/Layouts';
import { getTurkeyData, getWorldData } from '../api/service';

const Country = props => {
  const [graphData, setGraphData] = useState({});
  const [country, setCountry] = useState('');
  const [logarithmicData, setLogarithmicData] = useState({});
  const [loading, setLoading] = useState(true);
  const [statsCountry, setStatsCountry] = useState('');

  const intl = useIntl();

  const getData = async () => {
    setLoading(true);
    if (country === 'TR') {
      let data = await getTurkeyData(); //from api, async-await
      setGraphData(data);
      setLoading(false);
    } else {
      let countryData = await getWorldData(country);
      setGraphData(countryData);
      storeDataInDatabase(countryData);
      setLoading(false);
    }
  };

  useEffect(() => {
    //URL ile gelen parametre (props.match.params.id) değişir ise tetiklenecek.
    setLoading(true);
    setCountry(props.match.params.id); //hem country değişkenini kullanan componentlerin
    setStatsCountry(props.match.params.id); //hem de statsCountry değişkenini kullanan CountryStats componentinin tetiklenmesi için.
  }, [props.match.params.id]);

  useEffect(() => {
    setLoading(true); //country'i kullanan yerlerin tetiklenmesi için
    getData();
  }, [country]);

  function updateCountry(updatedCountry) {
    setLoading(true);
    setCountry(updatedCountry);
    setStatsCountry(updatedCountry); //statsCountry'i update etmez isek CountryStats tetiklenmiyor.
  }

  function storeDataInDatabase(data) {
    let tempArray = [];
    data.forEach((curr, i, array) => {
      if (i > 0) {
        var obj = {
          dailyConfirmed: curr.Confirmed - array[i - 1].Confirmed,
          Date: curr.Date
        }; //create new json object
        tempArray.push(obj); //array push
      }
    });
    setLogarithmicData(tempArray); //set state
  }

  return (
    <Layouts>
      <div>
        <Container className='country-container'>
          <div className='customcenter'>
            <CountryCard selectedCountry={country} handler={updateCountry} />
          </div>
          <Row>
            {statsCountry != '' ? (
              <CountryStats country={statsCountry} />
            ) : (
              'Loading'
            )}{' '}
            {/*kontrol yapılmaz ise en başta boş gidip hataya sebep olabiliyor.*/}
          </Row>
          <Row>
            <Col>
              <div className='graph'>
                <h4>
                  <FormattedMessage id='total_cases' />{' '}
                  {!loading ? (
                    ''
                  ) : (
                    <Button variant='primary' disabled>
                      <Spinner
                        as='span'
                        animation='grow'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                      />{' '}
                      <FormattedMessage id='loading' />{' '}
                    </Button>
                  )}{' '}
                </h4>
                <Graph
                  weekData={graphData}
                  XAxisDatakey={'Date'}
                  AreaDataKey={'Confirmed'}
                  fill={'#84ACEC'}
                  name={intl.formatMessage({ id: 'total_cases' })}
                />
              </div>
            </Col>
            <Col>
              <div className='graph'>
                <h4>
                  <FormattedMessage id='logarithmic_cases' />{' '}
                  {!loading ? (
                    ''
                  ) : (
                    <Button variant='primary' disabled>
                      <Spinner
                        as='span'
                        animation='grow'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                      />{' '}
                      <FormattedMessage id='loading' />{' '}
                    </Button>
                  )}{' '}
                </h4>
                <Graph
                  weekData={country == 'TR' ? graphData : logarithmicData}
                  XAxisDatakey={'Date'}
                  AreaDataKey={'dailyConfirmed'}
                  fill={'#8A80D7'}
                  name={intl.formatMessage({ id: 'logarithmic_cases' })}
                />
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <div className='graph'>
                <h4>
                  <FormattedMessage id='deaths' />{' '}
                  {!loading ? (
                    ''
                  ) : (
                    <Button variant='primary' disabled>
                      <Spinner
                        as='span'
                        animation='grow'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                      />{' '}
                      <FormattedMessage id='loading' />{' '}
                    </Button>
                  )}{' '}
                </h4>
                <Graph
                  weekData={graphData}
                  XAxisDatakey={'Date'}
                  AreaDataKey={'Deaths'}
                  fill={'#c81912'}
                  name={intl.formatMessage({ id: 'deaths' })}
                />
              </div>
            </Col>
            <Col>
              <div className='graph'>
                <h4>
                  <FormattedMessage id='recovered' />{' '}
                  {!loading ? (
                    ''
                  ) : (
                    <Button variant='primary' disabled>
                      <Spinner
                        as='span'
                        animation='grow'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                      />{' '}
                      <FormattedMessage id='loading' />{' '}
                    </Button>
                  )}{' '}
                </h4>
                <Graph
                  weekData={graphData}
                  XAxisDatakey={'Date'}
                  AreaDataKey={'Recovered'}
                  fill={'#26e760'}
                  name={intl.formatMessage({ id: 'recovered' })}
                />
              </div>
            </Col>
          </Row>
          <br />
          <br />
          {country == 'TR' ? (
            <Row>
              <Col>
                <div className='graph'>
                  <h4>
                    <FormattedMessage id='intubated' />{' '}
                    {!loading ? (
                      ''
                    ) : (
                      <Button variant='primary' disabled>
                        <Spinner
                          as='span'
                          animation='grow'
                          size='sm'
                          role='status'
                          aria-hidden='true'
                        />{' '}
                        <FormattedMessage id='loading' />{' '}
                      </Button>
                    )}{' '}
                  </h4>
                  <Graph
                    weekData={graphData}
                    XAxisDatakey={'Date'}
                    AreaDataKey={'totalIntubated'}
                    fill={'#FD72FB'}
                    name={intl.formatMessage({ id: 'intubated' })}
                  />
                </div>
              </Col>
              <Col>
                <div className='graph'>
                  <h4>
                    <FormattedMessage id='intensive_care' />{' '}
                    {!loading ? (
                      ''
                    ) : (
                      <Button variant='primary' disabled>
                        <Spinner
                          as='span'
                          animation='grow'
                          size='sm'
                          role='status'
                          aria-hidden='true'
                        />{' '}
                        <FormattedMessage id='loading' />{' '}
                      </Button>
                    )}{' '}
                  </h4>
                  <Graph
                    weekData={graphData}
                    XAxisDatakey={'Date'}
                    AreaDataKey={'totalIntensiveCare'}
                    fill={'#FDC272'}
                    name={intl.formatMessage({ id: 'intensive_care' })}
                  />
                </div>
              </Col>
            </Row>
          ) : (
            ''
          )}
          <br />
          <br />
          {country == 'TR' ? (
            <Row>
              <Col>
                <div className='graph'>
                  <h4>
                    <FormattedMessage id='case_test_rate' />{' '}
                    {!loading ? (
                      ''
                    ) : (
                      <Button variant='primary' disabled>
                        <Spinner
                          as='span'
                          animation='grow'
                          size='sm'
                          role='status'
                          aria-hidden='true'
                        />{' '}
                        <FormattedMessage id='loading' />{' '}
                      </Button>
                    )}{' '}
                  </h4>
                  <Graph
                    weekData={graphData}
                    XAxisDatakey={'Date'}
                    AreaDataKey={'testCaseRate'}
                    fill={'#b0a160'}
                    name={intl.formatMessage({ id: 'case_test_rate' })}
                  />
                </div>
              </Col>
              <Col>
                <div className='graph'>
                  <h4>
                    <FormattedMessage id='death_case_rate' />{' '}
                    {!loading ? (
                      ''
                    ) : (
                      <Button variant='primary' disabled>
                        <Spinner
                          as='span'
                          animation='grow'
                          size='sm'
                          role='status'
                          aria-hidden='true'
                        />{' '}
                        <FormattedMessage id='loading' />{' '}
                      </Button>
                    )}{' '}
                  </h4>
                  <Graph
                    weekData={graphData}
                    XAxisDatakey={'Date'}
                    AreaDataKey={'caseDeathRate'}
                    fill={'#9A4CA7'}
                    name={intl.formatMessage({ id: 'death_case_rate' })}
                  />
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <div className='graph'>
                  <h4>
                    <FormattedMessage id='recovery_rate2' />{' '}
                    {!loading ? (
                      ''
                    ) : (
                      <Button variant='primary' disabled>
                        <Spinner
                          as='span'
                          animation='grow'
                          size='sm'
                          role='status'
                          aria-hidden='true'
                        />{' '}
                        <FormattedMessage id='loading' />{' '}
                      </Button>
                    )}{' '}
                  </h4>
                  <Graph
                    weekData={graphData}
                    XAxisDatakey={'Date'}
                    AreaDataKey={'recoveryRate'}
                    fill={'#4CA6A7'}
                    name={intl.formatMessage({ id: 'recovery_rate2' })}
                  />
                </div>
              </Col>
              <Col>
                <div className='graph'>
                  <h4>
                    <FormattedMessage id='death_case_rate' />{' '}
                    {!loading ? (
                      ''
                    ) : (
                      <Button variant='primary' disabled>
                        <Spinner
                          as='span'
                          animation='grow'
                          size='sm'
                          role='status'
                          aria-hidden='true'
                        />{' '}
                        <FormattedMessage id='loading' />{' '}
                      </Button>
                    )}{' '}
                  </h4>
                  <Graph
                    weekData={graphData}
                    XAxisDatakey={'Date'}
                    AreaDataKey={'caseDeathRate'}
                    fill={'#9A4CA7'}
                    name={intl.formatMessage({ id: 'death_case_rate' })}
                  />
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </Layouts>
  );
};

export default memo(Country);
