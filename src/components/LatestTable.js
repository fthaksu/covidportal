import React, { useState, useEffect, memo } from 'react'
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';



const LatestTable = () => {
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

  const numberFormatter = cell => {return(<span> <strong>{ cell.toLocaleString()}</strong></span>)};

  const columns = [
    {
      dataField: 'country',
      text: 'Country',
      sort: true,
      style: {fontWeight: 'bold'}
    },
    {
      dataField: 'cases',
      text: 'Total Cases',
      sort: true,
      formatter: numberFormatter
    },
    {
      dataField: 'todayCases',
      text: 'Today Cases',
      sort: true,
      style:{backgroundColor: '#F1E0A9'},
      formatter: (cell) => { return(<span>
        <strong>+ { cell.toLocaleString() } </strong>
      </span>) ; }
    },
    {
      dataField: 'deaths',
      text: 'Total Deaths',
      sort: true,
      formatter: numberFormatter
    },
    {
      dataField: 'todayDeaths',
      text: 'Today Deaths',
      sort: true,
      style:{backgroundColor: '#4B3852'},
      formatter: (cell) => { return(<span>
        <strong style={ { color: 'white' } }>+ { cell } </strong>
      </span>) ; }
    },
    {
      dataField: 'recovered',
      text: 'Recovered',
      sort: true,
      formatter: numberFormatter
    },
    {
      dataField: 'critical',
      text: 'Critical',
      sort: true,
      formatter: numberFormatter
    },
    {
      dataField: 'casesPerOneMillion',
      text: 'Cases/Million',
      sort: true,
      style: {fontWeight: 'bold'}
    },
    {
      dataField: 'deathsPerOneMillion',
      text: 'Deaths/Million',
      sort: true,
      style: {fontWeight: 'bold'}
    },
  ];

  const defaultSorted = [{
    dataField: 'cases',
    order: 'desc'
  }];


  return (
    <BootstrapTable  striped hover condensed
     keyField='id' 
     data={covidData} 
     columns={columns}
      defaultSorted={defaultSorted} />
  )
}

export default memo(LatestTable);