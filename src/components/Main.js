import React from 'react';
import { withAlert } from "react-alert";

const styles = {
  forms: {
    textAlign: 'center'
  },
  centerButton: {
    align: 'center'
  },
  h1_style: {
    color: 'white',
    textAlign : 'center',
    padding: 0,
  },
  buttons: {
    align: 'center'
  },
}


const messages = {
  haveAssignments: "Did you have assignments?",
  amountAssignments: "How many assignments did you have?",
  valueAssignments: "How much did you get on assignment ",
  valueAssignments2: " and how much was it worth?",
  haveMidterms: "Did you have midterms?",
  amountMidterms: "How many midterms did u have?",
  valueMidterms: "How much did you get on midterm ",
  valueMidterms2: " and how much was it worth?",
  good: "You already have over 50%! Great Job!",
  worthFinal: "How much is your final exam or project worth?"
}


class Main extends React.Component {


  constructor(props) {
    super(props);
    this.state =  {
      inputvalue: '',
      worthvalue: '',
      /*
      0 - Start /Do you have assignements?
      0.1 - how many assignment?
      1 -
      */
      // States
      currentState: 0,
      start: 1,
      end: 0,
      // Holders
      total: 0,
      totalworth: 0,
    };
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addOnState = this.addOnState.bind(this);
  }

  handleYes(e) {
    this.setState({
      currentState: this.state.currentState + 1
    });
  }

  handleNo(e) {
    this.setState({
      currentState: this.state.currentState + 10
    });
  }

  handleReset(e) {
    this.setState({
      currentState: 0,
      start: 1,
      end: 0,
      total: 0,
      totalworth: 0
    });
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    });
  }


  handleSubmit(e) {
    // update
    this.addOnState();
    // reset
    this.setState({
      inputvalue: '',
      worthvalue: ''
    });
    e.preventDefault();
  }

  addOnState() {
    const item = parseInt(this.state.inputvalue);
    const state = this.state.currentState;
    if (state === 1) {
      //how many assignments
      if (item <= 12) {
        this.setState({
          end: item,
          currentState: this.state.currentState + 1
        });
      } else if (item > 12) {
        this.props.alert.show('I think thats too many assignments')
      } else {
        this.props.alert.show('A number please')
      }
    } else if (state === 2 || state == 12) {
      const worth = parseInt(this.state.worthvalue);
      if (item > 100 || worth > 100) {
        this.props.alert.show('impossible');
      } else if (isNaN(item) || isNaN(worth)) {
        console.log(!isNaN(item) +  !isNaN(worth));
        this.props.alert.show('Numbers only');
      } else {
        const currentItem = this.state.start;
        this.setState({
          total: this.state.total + item * (worth / 100),
          totalworth: parseInt(this.state.totalworth) + worth,
          start: this.state.start + 1
        });
        if (currentItem >= this.state.end) {
          this.setState({
            currentState: (this.state.currentState < 10) ? 10 : 20,
            start: 1,
            end: 0
          });
        }
      }
    } else if (state === 11) {
      //how many assignments
      if (item <= 5) {
        console.log("THIES");
        this.setState({
          end: item,
          currentState: this.state.currentState + 1
        });
      } else if (item > 5) {
        this.props.alert.show('Too many midterms?')
      } else {
        this.props.alert.show('A number please')
      }
    } else {
      this.props.alert.show('What did you type?')
    }
  }

  render() {
    console.log(this.state);

    let show;

    if (this.state.currentState === 0) {
      show = (
        <div>
          <h1>{messages.haveAssignments}</h1>
          <button onClick={this.handleYes}>Yes</button>
          <button onClick={this.handleNo}>No</button>
        </div>
      );
    } else if (this.state.currentState === 1){
      show = (
        <div>
          <h1>{messages.amountAssignments}</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="inputvalue" value={this.state.inputvalue} onChange={this.handleChange}/>
            <br/>
            <input type="submit" value="Next"/>
          </form>
        </div>
      );
    } else if (this.state.currentState === 2 ){
      show = (
        <div>
          <h1>{messages.valueAssignments}{this.state.start}{messages.valueAssignments2}</h1>
          <form onSubmit={this.handleSubmit}>
            <label className="label">Grade</label>
            <label className="label">Percentage</label>
            <br/>
            <input type="text" name="inputvalue" value={this.state.inputvalue} onChange={this.handleChange}/>
            <input type="text" name="worthvalue" value={this.state.worthvalue} onChange={this.handleChange}/>
            <br/>
            <input type="submit" value="Next"/>
          </form>
        </div>
      );
    } else if (this.state.currentState === 10 ){
      show = (
        <div>
          <h1>{messages.haveMidterms}</h1>
          <button onClick={this.handleYes}>Yes</button>
          <button onClick={this.handleNo}>No</button>
        </div>
      );
    } else if (this.state.currentState === 11){
      show = (
        <div>
          <h1>{messages.amountMidterms}</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="inputvalue" value={this.state.inputvalue} onChange={this.handleChange}/>
            <br/>
            <input type="submit" value="Next"/>
          </form>
        </div>
      );
    } else if (this.state.currentState === 12 ){
      show = (
        <div>
          <h1>{messages.valueMidterms}{this.state.start}{messages.valueMidterms2}</h1>
          <form onSubmit={this.handleSubmit}>
            <label className="label">Grade</label>
            <label className="label">Percentage</label>
            <br/>
            <input type="text" name="inputvalue" value={this.state.inputvalue} onChange={this.handleChange}/>
            <input type="text" name="worthvalue" value={this.state.worthvalue} onChange={this.handleChange}/>
            <br/>
            <input type="submit" value="Next"/>
          </form>
        </div>
      );
    } else {
      if (this.state.total > 50) {
        show = (
          <div>
            <h1>{messages.good}</h1>
          </div>
        );
      } else {
        const rest = this.state.totalworth;
        const totalGrade = this.state.total;
        const need50 = (50 - totalGrade) / (100/rest);
        const need60 = (60 - totalGrade) / (100/rest);

        show = (
          <div>
            <h1>Your final is worth {100 - rest} right?</h1>
            <h1>You need {need50}% in your final to get a 50! and {need60}% in your final to reach a 60!</h1>
          </div>
        );
      }
    }

    return (
      <div >
        {show}
        <button onClick={this.handleReset}>Start again</button>
        <h1>{this.state.total}</h1>
      </div>
    );
  }
}

export default withAlert(Main);
