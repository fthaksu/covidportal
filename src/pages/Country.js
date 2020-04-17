import React, { useState, useEffect, memo } from "react";
import Graph from "../components/Graph";
import CountryCard from "../components/CountryCard";
import axios from "axios";
import moment from "moment";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import Layouts from "../components/Layouts";

const Country = () => {
  const [todayData, setTodayData] = useState({});
  const [graphData, setGraphData] = useState({});
  const [country, setCountry] = useState("tr");
  const [logarithmicData, setLogarithmicData] = useState({});
  const [loading, setLoading] = useState(true);


  const getData = async () => {
    const result = await axios(`https://api.covid19api.com/total/dayone/country/${country}`);
    setTodayData(result.data[result.data.length - 1]);
    let threeMonthsData = result.data;
    threeMonthsData = threeMonthsData.map((item) => {
      item.Date = moment(item.Date).format("MMM Do");
      return item;
    });
    setGraphData(threeMonthsData);
    storeDataInDatabase(threeMonthsData);
    setLoading(false);
  };

  function updateCountry(updatedCountry) {
    setLoading(true);
    setCountry(updatedCountry);
  }

  function storeDataInDatabase(data) {
    let tempArray = [];
    data.forEach((curr, i, array) => {
      if (i > 0) {
        var obj = { 'dailyConfirmed': (curr.Confirmed - array[i - 1].Confirmed), 'Date': curr.Date } //create new json object
        tempArray.push(obj); //array push
      }
    });
    setLogarithmicData(tempArray); //set state
  }

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [country]);

  return (
    <Layouts>
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto"><CountryCard handler={updateCountry} /></Col>
          </Row>
          <Row>
            <Col>
              <div>
                <h4>Total Cases {!loading ? '' : (<Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> <FormattedMessage id="loading" /> </Button>)} </h4>
                <Graph
                  weekData={graphData}
                  XAxisDatakey={"Date"}
                  AreaDataKey={"Confirmed"}
                  fill={"#8884d8"}
                />
              </div>
            </Col>
            <Col>
              <div>
                <h4>Logaritmic Cases {!loading ? '' : (<Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> <FormattedMessage id="loading" /> </Button>)} </h4>
                <Graph
                  weekData={logarithmicData}
                  XAxisDatakey={"Date"}
                  AreaDataKey={"dailyConfirmed"}
                  fill={"#E0CE72"}
                />
              </div>

            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <div>
                <h4>Deaths {!loading ? '' : (<Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> <FormattedMessage id="loading" /> </Button>)} </h4>
                <Graph
                  weekData={graphData}
                  XAxisDatakey={"Date"}
                  AreaDataKey={"Deaths"}
                  fill={"#df2808"}
                />
              </div>
            </Col>
            <Col>
              <div>
                <h4>Recovered {!loading ? '' : (<Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> <FormattedMessage id="loading" /> </Button>)} </h4>
                <Graph
                  weekData={graphData}
                  XAxisDatakey={"Date"}
                  AreaDataKey={"Recovered"}
                  fill={"#26e760"}
                />
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </Layouts>
  );
}

export default memo(Country);