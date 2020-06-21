const OBJECTID_REGEX = /^[a-f\d]{24}$/i;

const ERROR_MESSAGES = {
  INVALID_ORG_TYPE: 'UserName is Empty...',
  INVALID_CSRF_TOKEN: 'Invalid csrf token',
  INVALID_FILE_FORMAT: 'Invalid filetype',
  USER_NOT_FOUND: 'User Not Found',
  USER_ROLE_NOT_FOUND: 'User Role not defined',
  FORBIDDEN_ACCESS: 'Forbidden Access'
};

//extra care to be taken while adding roles,
//this string should be same as mongoDB stored role

const ROLE = {
  INVESTOR: 'investor',
  ADMIN: 'admin'
};

const CSRF_ERROR_CODE = 'EBADCSRFTOKEN';

const UPDATED_SUCCESS = {
  success: 'updated_successfully'
};
const REMOVED_SUCCESS = {
  success: 'removed_successfully'
};
module.exports = {
  OBJECTID_REGEX,
  ERROR_MESSAGES,
  CSRF_ERROR_CODE,
  UPDATED_SUCCESS,
  REMOVED_SUCCESS,
  ROLE
};
