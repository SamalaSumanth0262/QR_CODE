import { ErrorMessage, Field } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';
import renderHTML from 'react-render-html';
import PropTypes from "prop-types";
import './styles.scss';
const CustomPhotoUpload = (props) => {
  let [filePreview, setFilePreview] = useState('https://via.placeholder.com/80');
  let handleUpload = (event) => {
    var currentFile = event.currentTarget.files[0];
    props.form.setFieldTouched(props.field.name);
    props.form.setFieldValue(props.field.name, currentFile);
    var currentFilePreview = URL.createObjectURL(currentFile);
    setFilePreview(currentFilePreview);
  };
  return (
    <React.Fragment>
      <div className="d-inline-flex">
        {props && (
          <img
            src={!_.isEmpty(props.field.value) ? props.field.value : filePreview}
            width="70"
            height="70"
            {...props}
          />
        )}
        <div className="upload-btn-wrapper">
          <div style={{ marginTop: '17px' }}>
            <button className='btn btn-primary ml-5' onClick={handleUpload}>Upload</button>
          </div>
          <input type="file" accept="image/*" name="myfile" onChange={handleUpload} />
        </div>
      </div>
    </React.Fragment>
  );
};

const PhotoUpload = (props) => {
  let { labelFor, labelTitle, isMandatory, labelName, notes } = props;
  return (
    <div>
      <label htmlFor={labelFor}>
        {labelTitle} {isMandatory ? <span className="text-mandatory">*</span> : ''}
      </label>
      <Field name={labelName} component={CustomPhotoUpload} />
      {notes && <div>{renderHTML(notes)}</div>}
      <div className="error-text">
        <ErrorMessage name={labelName} />
      </div>
    </div>
  );
};

PhotoUpload.propTypes = {
  labelName: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired
}

export default PhotoUpload;
