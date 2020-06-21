import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import './styles.scss';
import Select from 'react-select';
import renderHtml from 'react-render-html';

const customStyles = {
  indicatorSeparator: () => ({
    width: 1
  }),
  control: (base, state) => {
    return {
      ...base,
      boxShadow: 'none',
      borderColor: state.isFocused || state.isHover || state.menuIsOpen ? '#979797' : base.borderColor
    };
  }
};

const CustomReactSelect = (props) => {
  let {
    form: { setFieldValue, setFieldTouched },
    field: { name, value },
    placeholder,
    option
  } = props;
  return (
    <div>
      <Select
        isClearable={false}
        styles={customStyles}
        options={option}
        onChange={(e) => {
          setFieldTouched(name);
          setFieldValue(name, e);
        }}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

const DropDown = (props) => {
  const { labelFor, labelTitle, isMandatory, disabled, labelName, placeholder, option } = props;
  return (
    <div >
      <label for={labelFor}>
        {renderHtml(labelTitle)} {isMandatory ? <span className="text-mandatory">*</span> : ''}
      </label>
      <Field
        disabled={disabled}
        name={labelName}
        component={CustomReactSelect}
        option={option}
        placeholder={placeholder}
        {...props}
      />
      <div>
        <ErrorMessage name={labelName} />
      </div>
    </div>
  );
};

DropDown.propTypes = {
  labelTitle: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  labelFor: PropTypes.string.isRequired,
  defaultValue: PropTypes.array
};

export default DropDown;
