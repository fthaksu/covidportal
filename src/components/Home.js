import React, { useState, useEffect, memo } from 'react'
import axios from "axios";
import { Card, Col, Row, Table } from "react-bootstrap";


const DataIndonesia = () => {
  const [covidData, setCovidData] = useState([]);

  const formatNumber = num => String(num).replace(/(.)(?=(\d{3})+$)/g, "$1,");

  async function getData() {
    const res = await fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations');
    const data = await res.json();
    console.log(data.locations)
    setCovidData(data.locations);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Row>
      <Col md={6}>
        <h3 className="text-center text-uppercase text-color-orange mb-6">
          Stats
        </h3>
      </Col>
      <Col md={6}>
        <Table hover borderless striped responsive>
          <thead>
            <tr>
              <th className="text-uppercase">#</th>
              <th className="text-uppercase">Country</th>
              <th className="text-uppercase">Population</th>
              <th className="text-uppercase">Confirmed</th>
              <th className="text-uppercase">Deaths</th>
              <th className="text-uppercase">Recovered</th>
            </tr>
          </thead>
          <tbody>
            {covidData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.country}</td>
                <td>{item.country_population}</td>
                <td>{item.latest.confirmed}</td>
                <td>{item.latest.deaths}</td>
                <td>{item.latest.recovered}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}

export default memo(DataIndonesia);