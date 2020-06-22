import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import DropZone from '../Formik/DropZone';
import Button from '../common/Button';
import {uploadFile} from './client.js';
var QRCode = require('qrcode.react');

// import { radioOptions, DropDownOptions } from "../constants";
const exampleSchema = Yup.object().shape({
  // name: Yup.string().required('Text is Required')
});

class DashBoard extends React.Component {
  state = {
    src: '',
    initialValues: {}
  };
  async handleSubmitForm({values, actions}) {
    const result = await uploadFile(values);
    this.setState({
      src: 'http://localhost:1111/' + result.data.path
    });
    console.log('DashBoard -> handleSubmitForm -> result', result);
  }
  componentDidMount() {}
  render() {
    let renderView = (props) => {
      console.log('renderView -> props', props);
      return (
        <form onSubmit={props.handleSubmit}>
          <div className="container">
            <DropZone
              labelName="file_drop_zone"
              labelTitle="File Drop Zone"
              labelFor="File Drop Zone"
              isMandatory={true}
            />
            <div className="row float-right">
              <div className="col-sm-12">
                <Button text="Upload" type="submit" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <QRCode value={this.state.src} />
              </div>
            </div>
          </div>
        </form>
      );
    };
    return (
      <Formik
        initialValues={this.state.initialValues}
        render={renderView}
        validationSchema={exampleSchema}
        onSubmit={(values, actions) => {
          this.handleSubmitForm({values, actions});
        }}
      />
    );
  }
}

export default DashBoard;
