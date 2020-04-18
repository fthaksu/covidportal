import React, { useState, useEffect, memo } from 'react';
import Layouts from '../components/Layouts';
import pp from '../images/profile.png';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from "react-intl";




const Forecast = () => {
  return (
    <Layouts>
      <div className="jumbotron">
        <h1 className="display-4"><FormattedMessage id="forecast" /></h1>
        <p className="lead">
          <FormattedMessage id="forecast_message1" />
          <br/>
          <br/>
          <FormattedMessage
            id="forecast_list"
            defaultMessage="<ul><li>item1</li><li>item2</li></ul>"
            values={{
              ul: (...msg) => <ul>{msg}</ul>,
              li: (...msg) => <li>{msg}</li>,
            }} />
          <FormattedMessage id="forecast_message2" /></p>
        <br></br>

        { /*<h6><FormattedMessage id="ask_questions"/><a href="mailto:fatihaksu42@gmail.com"><FormattedMessage id="click"/></a></h6> */}
      </div>
    </Layouts>
  );
}

export default memo(Forecast);