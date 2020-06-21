import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../../Actions/ActivityActions";
class DashBoard extends React.Component {
  state = {
    users: []
  };
  componentDidMount() {
    this.props.dispatch(getUsers());
  }
  componentDidUpdate(prevProps, currentProps) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        users: this.props
      });
    }
  }
  render() {
    console.log("this.props", this.props.users);
    return (
      <div className="container mt-5 mb-5">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">age</th>
              <th scope="col">gender</th>
              <th scope="col">email</th>
              <th scope="col">phone number</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(record => {
              return (
                <tr>
                  <th scope="row">{record.id}</th>
                  <td>{record.name}</td>
                  <td>{record.age}</td>
                  <td>{record.gender}</td>
                  <td>{record.email}</td>
                  <td>{record.phoneNo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function withStateToProps(state) {
  console.log("withStateToProps -> state", state);
  return {
    users: state.activity.users
  };
}

export default connect(withStateToProps)(DashBoard);
