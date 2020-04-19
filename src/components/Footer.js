import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FormattedMessage } from 'react-intl';

const Footer = () => {
  return (
    <footer className='py-4'>
      <p className='mb-0 text-center'>
        <FormattedMessage id='developed' />{' '}
        <a
          href='https://tr.linkedin.com/in/muhammed-fatih-aksu-70b42ba7'
          target='_blank'
          rel='noopener noreferrer'
        >
          M. Fatih Aksu
        </a>{' '}
        <span>&nbsp;</span>
        {'   '} | <span>&nbsp;</span>{' '}
        <a
          href='https://github.com/fthaksu/covidportal'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </p>
    </footer>
  );
};

export default memo(Footer);
