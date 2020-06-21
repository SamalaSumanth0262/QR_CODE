import classnames from 'classnames';
import { ErrorMessage, Field } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import './styles.scss';
const customStyles = {
  indicatorSeparator: () => ({
    width: 1
  }),
  container: (base) => ({
    ...base,
    width: 120,
    display: 'inline-block'
  }),
  valueContainer: (base) => ({
    ...base,
    height: 35
  }),
  control: (base, state) => ({
    ...base,
    boxShadow: 'none',
    borderColor: state.isFocused || state.isHover || state.menuIsOpen ? '#979797' : base.borderColor
  })
};

const CustomTextGroup = ({ field, form, innerRef, ...props }) => {

  const onChangeAction = (option) => {
    form.setFieldValue('text_group_select_value', option) //TO_DO: make this dynamic "text_group_select_value"
  };

  return (
    <div className='d-inline-flex'>
      <input
        type="text"
        onChange={(changeEvent) => {
          form.setFieldValue(field.labelName, changeEvent.target.value);
        }}
        {...field}
        {...props}
      />
      <div>
        <Select
          isDisabled={props.disabled}
          isSearchable={false}
          styles={customStyles}
          isClearable={false}
          options={props.selectOptions}
          defaultValue={props.defaultValue ? props.defaultValue : props.selectOptions ? props.selectOptions[0] : {}}
          onChange={onChangeAction}
        />
      </div>
    </div>
  );
};

// To access value of dropdown from select element create a ref in parent component
const TextGroup = ((props, ref) => {
  const { labelFor, labelTitle, isMandatory, disabled, selectOptions, labelName } = props
  return (
    <div>
      <label for={labelFor}>
        {labelTitle} {isMandatory ? <span className="text-mandatory">*</span> : ''}
      </label>
      <Field
        disabled={disabled}
        name={labelName}
        selectOptions={selectOptions}
        component={CustomTextGroup}
        {...props}
      />
      <div>
        <ErrorMessage name={labelName} />
      </div>
    </div>
  );
});

TextGroup.propTypes = {
  labelTitle: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  labelFor: PropTypes.string.isRequired,
  isMandatory: PropTypes.bool
};

TextGroup.defaultProps = {
  isMandatory: false,
  disabled: false
};

export default TextGroup;
