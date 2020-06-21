import React from 'react';
import {Formik} from 'formik';
import TextInput from './TextInput';
import * as Yup from 'yup';
// import CkEditor from "./CkEditor";
import TextArea from './TextArea';
import RadioBox from './RadioBox';
import CheckBox from './CheckBox';
import PhotoUpload from './PhotoUpload';
// import DropZone from "./DropZone";
// import DropDown from "./DropDown";
import DatePicker from './DatePicker';
// import TextGroup from "./TextGroup";
//Yup Validaation STARTS
// import { radioOptions, DropDownOptions } from "../constants";
const exampleSchema = Yup.object().shape({
  name: Yup.string().required('Text is Required'),
  cke_editor: Yup.string().required('CKE editor is required'),
  text_area: Yup.string().required('Text Area is Empty..')
});

//Yup Validation ENDS

class FormikExample extends React.Component {
  state = {
    initialValues: {
      name: '',
      text_area: '',
      cke_editor: '',
      radio_box: null,
      check_box: null,
      photo_upload: null,
      file_drop_zone: null,
      drop_down: null,
      date_picker: null,
      text_group: null,
      radio_box: null,
      radio_box_Yes: null,
      radio_box_No: null,
      text_group_input_value: null,
      text_group_select_value: null
    },
    isDarkMode: false
  };

  handleSubmitForm = ({values, actions}) => {
    console.log('TCL: FormikExample -> handleSubmitForm -> {values, actions}', {
      values,
      actions
    });
  };

  handleDarkMode = (event) => {
    this.setState({
      isDarkMode: event.currentTarget.checked
    });
  };

  render() {
    let renderView = (props) => {
      console.log('TCL: render -> props', props);
      return (
        <form onSubmit={props.handleSubmit} id={this.state.isDarkMode ? 'formikDarkMode' : 'formikLightMode'}>
          <div className="container-fluid bg-theme">
            <nav className="navbar navbar-light justify-content-between nav-bar-bg">
              <a className="navbar-brand">Formik Components Made Easy</a>
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="checkbox"
                  placeholder="DarkMode"
                  aria-label="DarkMode"
                  onClick={(e) => this.handleDarkMode(e)}
                />
                <span className="navbar-brand">Dark Mode</span>
              </form>
            </nav>
            <div className="container-fluid justify-content-center mt-5">
              <div className="row justify-content-center mx-auto" style={{width: '90%'}}>
                <div className="col-sm-6">
                  <div className="mt-3">
                    <TextInput type="text" labelName="name" labelTitle="Text Input" isMandatory={true} />
                  </div>
                  <div className="mt-3">
                    <TextArea type="text" labelName="text_area" labelTitle="TextArea" isMandatory={true} />
                  </div>
                  <div className="mt-3">
                    {/* <CkEditor
                      labelName="cke_editor"
                      labelTitle="Check Your CKE Editor"
                      isMandatory={true}
                    /> */}
                  </div>
                  <div className="mt-3">
                    {/* <RadioBox
                      labelName="radio_box"
                      labelTitle="Radio Box"
                      // options={radioOptions}
                      isMandatory={true}
                      {...props}
                    /> */}
                  </div>
                  <div className="mt-3">
                    <CheckBox labelName="check_box" labelTitle="CheckBox" isMandatory={true} />
                  </div>
                  <button type="submit" className="btn btn-primary mt-5">
                    Submit
                  </button>
                </div>
                <div className="col-sm-6">
                  <div className="mt-3">
                    <PhotoUpload
                      labelName="photo_upload"
                      labelTitle="Upload Photo"
                      labelFor="photo_upload"
                      isMandatory={true}
                    />
                  </div>
                  <div className="mt-3">
                    {/* <DropZone
                      labelName="file_drop_zone"
                      labelTitle="File Drop Zone"
                      labelFor="File Drop Zone"
                      isMandatory={true}
                    /> */}
                  </div>
                  <div className="mt-3">
                    {/* <DropDown
                      split={false}
                      labelTitle="Drop Down"
                      // option={DropDownOptions}
                      labelFor="drop_down"
                      labelName="drop_down"
                      isMandatory={true}
                    /> */}
                  </div>
                  <div className="mt-3">
                    <DatePicker
                      labelTitle="Date Picker"
                      isMandatory={true}
                      labelFor="date_picker"
                      labelName="date_picker"
                    />
                  </div>
                  <div className="mt-3">
                    {/* <TextGroup
                      labelTitle="Text Group"
                      labelFor="text_group_input_value"
                      labelName="text_group_input_value"
                      isMandatory={true}
                      selectOptions={DropDownOptions}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      );
    };
    return (
      <React.Fragment>
        <Formik
          initialValues={this.state.initialValues}
          render={renderView}
          validationSchema={exampleSchema}
          handleSubmit={({values, actions}) => {
            this.handleSubmitForm({values, actions});
          }}
        />
      </React.Fragment>
    );
  }
}

export default FormikExample;
