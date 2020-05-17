import React, { Component } from 'react';

import styles from './AccountStyles';

class Modal extends Component {
  private delete(){

  }

  private cancel(){

  }

  render() {
    // Render nothing if the "show" prop is false
    // if (!this.props.show) {
    //   return null;
    // }

    return (
      <div className="backdrop" style={styles.backdropStyle}>
        <div className="modal" style={styles.modalStyle}>
          {this.props.children}

          <div className="footer">
            <button onClick={this.delete}>Delete</button>
            <button onClick={this.cancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;