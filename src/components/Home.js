import React, { useState, useEffect, memo } from 'react'
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';



const DataIndonesia = () => {
  const [covidData, setCovidData] = useState([]);


  async function getData() {
    const res = await fetch('https://corona.lmao.ninja/countries');
    const data = await res.json();
    console.log(data)
    setCovidData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  // function showDescription(cell, row) {
  //   return cell.confirmed;
  // }

  // const showDeaths = cell => {return cell.deaths};

  const columns = [
    {
      dataField: 'country',
      text: 'Country',
      sort: true
    },
    {
      dataField: 'cases',
      text: 'Total Cases',
      sort: true
    },
    {
      dataField: 'todayCases',
      text: 'Today Cases',
      sort: true,
      style:{backgroundColor: '#EAC8CA'},
      formatter: (cell) => { return(<span>
        <strong>+ { cell } </strong>
      </span>) ; }
    },
    {
      dataField: 'deaths',
      text: 'Deaths',
      sort: true
    },
    {
      dataField: 'todayDeaths',
      text: 'Today Deaths',
      sort: true,
      style:{backgroundColor: '#B8A1C4'},
      formatter: (cell) => { return(<span>
        <strong>+ { cell } </strong>
      </span>) ; }
    },
    {
      dataField: 'recovered',
      text: 'Recovered',
      sort: true
    },
    {
      dataField: 'critical',
      text: 'Critical',
      sort: true
    },
    {
      dataField: 'casesPerOneMillion',
      text: 'Cases/Million',
      sort: true
    },
    {
      dataField: 'deathsPerOneMillion',
      text: 'Deaths/Million',
      sort: true
    },
  ];


  return (
    <BootstrapTable  striped hover condensed keyField='id' data={covidData} columns={columns} />
  )
}

export default memo(DataIndonesia);