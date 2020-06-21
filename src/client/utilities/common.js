
import _ from 'lodash';
import {toast} from 'react-toastify';
import {Redirect} from 'react-router-dom';
import React from 'react';

var isRefreshing = false;
//Freeeze this , Do Not Modify..
export let SERVER_ERRORS = {
  DUPLICATE_KEY_ERROR: 'There was a duplicate key error',
  INVALID_CSRF_TOKEN: 'invalid csrf token',
  INVALID_TOKEN: 'Invalid token',
  INVALID_ACCESS_ERROR: 'Invalid Access',
  CAN_NOT_MODIFY: 'CAN_NOT_MODIFY',
  INVALID_REFRESH_TOKEN: 'Refresh Token has expired',
  VALIDATION_ERROR: 'validation error',
  USER_NOT_FOUND: 'User Not Found'
};
let refreshSubscribers = [];
