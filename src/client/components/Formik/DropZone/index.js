import React, { useMemo, useEffect, useCallback } from 'react';
import './styles.scss';
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import renderHtml from 'react-render-html';
import { useDropzone } from 'react-dropzone';
import _ from 'lodash';
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const CustomDropDown = (props) => {

  const onDrop = useCallback((droppedFiles) => {
    const { form: { setFieldValue }, labelName } = props;
    if (!_.isEmpty(droppedFiles)) {
      setFieldValue(labelName, droppedFiles)
    }
  }, [props])

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: 'image/*', onDrop: onDrop });

  useEffect(() => {
    const { form: { setFieldValue, values }, labelName } = props;

    if (values.file_drop_zone == null) {
      setFieldValue(labelName, acceptedFiles);
    }
  })

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [isDragAccept, isDragActive, isDragReject]);

  return (
    <React.Fragment>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <div>Files</div>
        <ul>{files}</ul>
      </aside>
    </React.Fragment>
  );
}

const DropZone = (props) => {
  return (
    <div style={{ width: "100%" }}>
      <label>
        {renderHtml(props.labelTitle)}
        {props.isMandatory ? (
          <span className='text-mandatory'>&nbsp;*</span>
        ) : (
            ""
          )}
        <br />
        <Field
          name={props.labelName}
          component={CustomDropDown}
          validate={props.validate}
          disabled={props.disabled}
          type={props.type ? props.type : "text"}
          {...props} />
      </label>
      <div className='error-text'>
        <ErrorMessage name={props.labelName} />
      </div>
    </div>
  )
}

DropZone.propTypes = {
  labelName: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired
}
export default DropZone;
