import React, { useState, useEffect, memo } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { FormattedMessage } from "react-intl";
import countryNames from "../i18n/countrynames.json"
import { Link } from 'react-router-dom';
import axios from "axios";



const LatestTable = () => {
  const [covidData, setCovidData] = useState([]); //this.state 
  const [isLoading, setLoading] = useState(true);

  useEffect(() => { //componentDidMount, componentDidUpdate etc..
    const fetchData = async () => {
      setLoading(true);
      const result = await axios(
        `https://corona.lmao.ninja/v2/countries`,
      );
      setCovidData(result.data);
      setLoading(false);
    };
 
    fetchData();
  }, []);


  const numberFormatter = cell => {return(<span> <strong>{ cell !== undefined && cell !== null ? cell.toLocaleString() : "" }</strong></span>)};
  const countryFormatter = cell  => {
    const language = navigator.language.split(/[-_]/)[0];  
    const iso2 = covidData.filter(item => item.country === cell).map(post => post.countryInfo.iso2) //filter map örneği
    return(
    <span><Link to={{ pathname: "/country/"+iso2[0] }}>{(language === 'tr') ? (countryNames[iso2] === '' ? {cell} : countryNames[iso2]) : cell }</Link></span>
    )
  };

  const columns = [
    {
      dataField: 'country',
      text: <FormattedMessage id="country" />,
      sort: true,
      style: {fontWeight: 'bold'},
      formatter: countryFormatter
    },
    {
      dataField: 'cases',
      text:  <FormattedMessage id="total_cases" />,
      sort: true,
      formatter: numberFormatter
    },
    {
      dataField: 'todayCases',
      text:  <FormattedMessage id="today_cases" />,
      sort: true,
      style: (cell, row, rowIndex, colIndex) => {return ((cell !== 0 && cell !== null) && { backgroundColor: '#ffc8c8'}) }, 
      formatter: (cell) => { return(<span>
        {cell !== 0 && cell !== null ? <strong>+ { cell } </strong> : <strong>{cell}</strong>}
      </span>) }
    },
    {
      dataField: 'deaths',
      text: <FormattedMessage id="total_deaths" />,
      sort: true,
      formatter: numberFormatter
    },
    {
      dataField: 'todayDeaths',
      text:  <FormattedMessage id="today_deaths" />,
      sort: true,
      style:(cell, row, rowIndex, colIndex) => {return ( (cell !== 0 && cell !== null) && { backgroundColor: '#444f5a'}) },
      formatter: (cell) => { return(<span>
        {cell !== 0  && cell !== null ? <strong style={ { color: 'white' } }>+ { cell } </strong> : <strong>{cell}</strong> }
      </span>)}
    },
    {
      dataField: 'recovered',
      text: <FormattedMessage id="recovered" />,
      sort: true,
      formatter: numberFormatter
    },
    {
      dataField: 'critical',
      text:  <FormattedMessage id="critical" />,
      sort: true,
      formatter: numberFormatter
    },
    {
      dataField: 'active',
      text:  <FormattedMessage id="active" />,
      sort: true,
      style: {fontWeight: 'bold'},
      formatter: numberFormatter
    },
    {
      dataField: 'casesPerOneMillion',
      text:  <FormattedMessage id="cases_million" />,
      sort: true,
      style: {fontWeight: 'bold'}
    }
  ];

  const defaultSorted = [{
    dataField: 'cases',
    order: 'desc'
  }];

  const rowStyle = { height: 45 , justifyContent: 'center',
  alignItems: 'center', verticalAlign: 'center'};

  if (isLoading) return null; // or <Loading />

  return (
    <div className='anyClass'>
    <BootstrapTable striped hover condensed 
     bootstrap4
     keyField='country' 
     data={covidData} 
     columns={columns}
     defaultSorted={defaultSorted}
     rowStyle = {rowStyle}
      />
      </div>
  )
}

export default memo(LatestTable);