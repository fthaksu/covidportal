import React, { useState, useEffect, memo } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';



const LatestTable = () => {
  const [covidData, setCovidData] = useState([]); //this.state yerine state'ler bu şekilde tutuluyor.


  async function getData() {
    const res = await fetch('https://corona.lmao.ninja/countries');
    const data = await res.json();
    setCovidData(data);
  }

  useEffect(() => { //componentDidMount yerine kullanılıyor. PageLoad gibi.
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
      style:{backgroundColor: '#ffc8c8'},
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
      style:{backgroundColor: '#444f5a'},
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

  const rowStyle = { height: 45 , justifyContent: 'center',
  alignItems: 'center', verticalAlign: 'center'};

  return (
    <div className='anyClass'>
    <BootstrapTable striped hover condensed 
     bootstrap4
     keyField='id' 
     data={covidData} 
     columns={columns}
     defaultSorted={defaultSorted}
     rowStyle = {rowStyle}
      />
      </div>
  )
}

export default memo(LatestTable);