import React from 'react';
import './Bar.css';

const style = {
  marginTop: '20px',
  fontSize: '20px',
}

class Bar extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    let percent;

    if (this.props.percentage > 0) {
     percent = String(Math.round((this.props.percentage / 100) * 400)).concat('px');
    } else {
     percent = 0;
    }

    let insideBar_style = {
      height: '20px',
      width: percent,
      backgroundColor: 'black',
      margin:'0 0px',
    };

    let show = <div style={insideBar_style}></div>

    return(
      <div style={style}>
        <p>You have {this.props.percentage}%</p>
        <div className="bar">
          {show}
        </div>
      </div>
    );
  }
}

export default Bar;
