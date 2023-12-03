/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Button, Icon, IconButton } from '@edx/paragon';
import { Close } from '@edx/paragon/icons';
import PropTypes, { string } from 'prop-types';

import { FormGroup } from '../common-components';
import messages from './messages';

const UsernameField = (props) => {
  const { intl, usernameSuggestions, errorMessage } = props;
  let className = '';
  let suggestedUsernameDiv = <></>;
  let iconButton = <></>;
  const suggestedUsernames = () => (
    <div className={className}>
      <span className="text-gray username-suggestion-label">{intl.formatMessage(messages['registration.username.suggestion.label'])}</span>
      <div className="scroll-suggested-username">
        {usernameSuggestions.map((username, index) => (
          <Button
            type="button"
            name="username"
            variant="outline-dark"
            className="username-suggestion data-hj-suppress"
            autoComplete={props.autoComplete}
            key={`suggestion-${index.toString()}`}
            onClick={(e) => props.handleSuggestionClick(e, username)}
          >
            {username}
          </Button>
        ))}
      </div>
      {iconButton}
    </div>
  );
  if (usernameSuggestions.length > 0 && errorMessage && props.value === ' ') {
    className = 'suggested-username-with-error';
    iconButton = <IconButton src={Close} iconAs={Icon} alt="Close" onClick={() => props.handleUsernameSuggestionClose()} variant="black" size="sm" className="suggested-username-close-button" />;
    suggestedUsernameDiv = suggestedUsernames();
  } else if (usernameSuggestions.length > 0 && props.value === ' ') {
    className = 'suggested-username';
    iconButton = <IconButton src={Close} iconAs={Icon} alt="Close" onClick={() => props.handleUsernameSuggestionClose()} variant="black" size="sm" className="suggested-username-close-button" />;
    suggestedUsernameDiv = suggestedUsernames();
  } else if (usernameSuggestions.length > 0 && errorMessage) {
    suggestedUsernameDiv = suggestedUsernames();
  }
  return (
    <FormGroup {...props}>
      {suggestedUsernameDiv}
    </FormGroup>
  );
};

UsernameField.defaultProps = {
  usernameSuggestions: [],
  handleSuggestionClick: () => { },
  handleUsernameSuggestionClose: () => { },
  errorMessage: '',
  autoComplete: null,
};

UsernameField.propTypes = {
  usernameSuggestions: PropTypes.arrayOf(string),
  handleSuggestionClick: PropTypes.func,
  handleUsernameSuggestionClose: PropTypes.func,
  errorMessage: PropTypes.string,
  intl: intlShape.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
};

export default injectIntl(UsernameField);
