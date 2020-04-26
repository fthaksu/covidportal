import React, { memo, useState, useEffect } from 'react'
import { FormattedMessage, useIntl } from "react-intl";
import {Form, FormGroup,FormLabel, FormControl, option } from "react-bootstrap";
import countryNames from '../i18n/countrynames.json'
import countryNamesEN from '../i18n/countrynamesEN.json'



 const CountryCard = (props) => {
    const [country, setCountry] = useState(props.selectedCountry);
    let language = navigator.language.split(/[-_]/)[0]; 
    const navLang =  (language === 'tr') ? language : 'en' ; 
    let selectedCountryNames = (navLang === "tr" ? countryNames : countryNamesEN)

    const intl = useIntl();

    useEffect(() => {
      setCountry(props.selectedCountry);
    }, [props.selectedCountry])

  
    const handleChange = (event) => {
        props.handler(event.target.value); //Country.js'deki updateCountry'i tetikler.
        setCountry(event.target.value);
      };
    
      return (
        <div className="country-form">
          <Form>
            <FormGroup>
              <FormLabel><FormattedMessage id="select_country" /></FormLabel>
              <FormControl className="mobile-selector"
                as='select'
                name='country'
                placeholder='Select..'
                onChange={handleChange}
                value={country}
              >
               <option hidden >{intl.formatMessage({ id: "select" })}</option>
              { 
                Object.keys(selectedCountryNames).sort((a,b) => selectedCountryNames[a].localeCompare(selectedCountryNames[b])).map((key,index) => 
                <option key={index} value={key}>{selectedCountryNames[key]}</option>
               )}
              </FormControl>
            </FormGroup>
          </Form>
        </div>
      );

 }

export default memo(CountryCard);
