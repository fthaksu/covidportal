import React, { memo, useState, useEffect } from 'react'
import { FormattedMessage } from "react-intl";
import {Form, FormGroup,FormLabel, FormControl, option } from "react-bootstrap";
import countryNames from '../i18n/countrynames.json'



 const CountryCard = (props) => {
    const [country, setCountry] = useState("TR");

    const handleChange = (event) => {
        props.handler(event.target.value); //Country.js'deki updateCountry'i tetikler.
        setCountry(event.target.value);
      };
    
      return (
        <div className="country-form">
          <Form>
            <FormGroup>
              <FormLabel>Select Country</FormLabel>
              <FormControl
                as='select'
                name='country'
                placeholder='Select..'
                defaultValue={country}
                onChange={handleChange}
              >
              {Object.keys(countryNames).
                sort((a,b) => countryNames[a].localeCompare(countryNames[b]))
                .map((key,index) => 
                <option value={key}>{countryNames[key]}</option>
               )}
              </FormControl>
            </FormGroup>
          </Form>
        </div>
      );

 }

export default memo(CountryCard);
