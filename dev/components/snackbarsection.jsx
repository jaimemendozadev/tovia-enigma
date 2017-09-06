import React from 'react';
import { Snackbar } from 'react-toolbox';
import PropTypes from 'prop-types';

const SnackbarSection = props => (
  <section>
    <Snackbar
      active={props.showFormSnackbar}
      label="You're message is missing something. Please fill out the form   entirely."
      timeout={3500}
      onTimeout={props.handleSnackbarFormTimeout}
    />

    <Snackbar
      active={props.showDateSnackbar}
      label="You cannot set an expiration date on or before before today's date. Please try again."
      timeout={3500}
      onTimeout={props.handleSnackbarDateTimeout}
    />
  </section>
);

SnackbarSection.propTypes = {
  showFormSnackbar: PropTypes.bool.isRequired,
  handleSnackbarFormTimeout: PropTypes.func.isRequired,
  showDateSnackbar: PropTypes.bool.isRequired,
  handleSnackbarDateTimeout: PropTypes.func.isRequired,
};

export default SnackbarSection;
