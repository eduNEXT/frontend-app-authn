import React from 'react';

import classNames from 'classnames';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';

import { faCut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import messages from './messages';

const LargeLeftLayout = (props) => {
  const { intl, isRegistrationPage, experimentName } = props;
  new ClipboardJS('.copyIcon'); // eslint-disable-line no-new
  return (
    <div className="min-vh-100 pr-0 mt-lg-n2 d-flex align-items-center">
      <svg className={classNames(
        'large-screen-svg-line',
        {
          'variation1-bar-color mt-n5 pt-0': experimentName === 'variation1' && isRegistrationPage,
          'variation2-bar-color': experimentName === 'variation2' && isRegistrationPage,
          'ml-5': experimentName !== 'variation1' || !isRegistrationPage,
        },
      )}
      >
        <line x1="50" y1="0" x2="10" y2="215" />
      </svg>
      <div className={classNames({ 'pl-4': experimentName === 'variation1' && isRegistrationPage })}>
        <h1 className="large-heading">
          {intl.formatMessage(messages['start.learning'])}
          <span
            className={((experimentName === 'variation1' || experimentName === 'variation2') && isRegistrationPage) ? 'text-accent-b' : 'text-accent-a'}
          >
            <br />
            {intl.formatMessage(messages['with.site.name'], { siteName: getConfig().SITE_NAME })}
          </span>
        </h1>
        {experimentName === 'variation1' && isRegistrationPage ? (
          <span className="text-light-300">
            <span className="lead mr-2.5">Get <span className="text-accent-a h2">15% off</span> your first verified <br /> certificate* with code</span>
            <span className="dashed-border d-inline-flex flex-wrap align-items-center">
              <span id="edx-welcome" className="text-white edx-welcome font-weight-bold mr-1">EDXWELCOME</span>
              <FontAwesomeIcon
                className="text-light-700 copyIcon ml-1.5"
                icon={faCut}
                data-clipboard-action="copy"
                data-clipboard-target="#edx-welcome"
              />
            </span>
          </span>
        ) : null}
      </div>
    </div>
  );
};

LargeLeftLayout.propTypes = {
  intl: intlShape.isRequired,
  experimentName: PropTypes.string,
  isRegistrationPage: PropTypes.bool,
};

LargeLeftLayout.defaultProps = {
  experimentName: '',
  isRegistrationPage: false,
};

export default injectIntl(LargeLeftLayout);