import React from "react";

class ButtonSpinner extends React.Component {
  render() {
    return (
      <>
        <span
          class='spinner-border spinner-border-sm'
          role='status'
          aria-hidden='true'
        />
        <span class='sr-only'>Loading...</span>
      </>
    );
  }
}

export default ButtonSpinner;
