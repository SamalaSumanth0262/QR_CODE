import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import DropZone from '../Formik/DropZone';
import Button from '../common/Button';
// import { radioOptions, DropDownOptions } from "../constants";
const exampleSchema = Yup.object().shape({
  name: Yup.string().required('Text is Required')
});

class DashBoard extends React.Component {
  state = {
    initialValues: {}
  };
  componentDidMount() {}
  render() {
    let renderView = (props) => {
      return (
        <div className="container">
          <DropZone
            labelName="file_drop_zone"
            labelTitle="File Drop Zone"
            labelFor="File Drop Zone"
            isMandatory={true}
          />
          <div className="row float-right">
            <div className="col-sm-12">
              <Button text="Upload" />
            </div>
          </div>
        </div>
      );
    };
    return (
      <Formik
        initialValues={this.state.initialValues}
        render={renderView}
        validationSchema={exampleSchema}
        handleSubmit={(values, actions) => {
          this.handleSubmitForm({values, actions});
        }}
      />
    );
  }
}

export default DashBoard;
