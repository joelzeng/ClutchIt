import React from 'react';
import { withAlert } from "react-alert";
import './Main.css';
import Bar from './Bar.js';

/*jshint -W065 */

const styles = {
  div_center: {
    textAlign: 'center'
  },
  h1_style: {
    marginTop: '50px'
  },
  yesnos: {
    margin: '200px 100px'
  }
}


const messages = {
  haveAssignments: "Did you have assignments?",
  amountAssignments: "How many assignments did you have?",
  valueAssignments: "How much did you get on assignment ",
  valueAssignments2: " and how much was it worth out of 100%?",
  haveMidterms: "Did you have midterms?",
  amountMidterms: "How many midterms did u have?",
  valueMidterms: "How much did you get on midterm ",
  valueMidterms2: " and how much was it worth out of 100%?",
  good: "You already have over 50%! Great Job!",
  worthFinal: "How much is your final exam or project worth?"
}


class Main extends React.Component {


  constructor(props) {
    super(props);
    this.state =  {
      inputvalue: '0',
      worthvalue: '0',
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
      total: 0, //% value
      totalworth: 0, //raw value
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
    const item = Number(this.state.inputvalue);
    const state = this.state.currentState;
    console.log(item + "--- on state ----" + state);
    if (state === 1) {
      //how many assignments
      if (item <= 0) {
        console.log("This");
        this.setState({
          currentState: (this.state.currentState < 10) ? 10 : 20,
          start: 1,
          end: 0
        });
      } else if (item <= 12) {
        console.log("That");
        this.setState({
          end: item,
          currentState: this.state.currentState + 1
        });
      } else if (item > 12) {
        this.props.alert.show('I think thats too many assignments')
      } else {
        this.props.alert.show('A number please')
      }
    } else if (state === 2 || state === 12) {
      const worth = Number(this.state.worthvalue);
      if (item > 100 || worth > 100) {
        this.props.alert.show('impossible');
      } else if (isNaN(item) || isNaN(worth)) {
        console.log(!isNaN(item) +  !isNaN(worth));
        this.props.alert.show('Numbers only');
      } else {
        const currentItem = this.state.start;
        this.setState({
          total: this.state.total + item * (worth / 100),
          totalworth: Number(this.state.totalworth) + worth,
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
      if (item <= 0) {
        this.setState({
          currentState: (this.state.currentState < 10) ? 10 : 20,
          start: 1,
          end: 0
        });
      } else if (item <= 5) {
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
    // console.log(this.state);

    let show;

    if (this.state.currentState === 0 || this.state.currentState === 10) {
      let msg;
      if (this.state.currentState === 0){
        msg = <h1>{messages.haveAssignments}</h1>
      } else {
        msg = <h1>{messages.haveMidterms}</h1>
      }
      show = (
        <div >
          {msg}
          <button className="button-yes" onClick={this.handleYes}><span>Yes</span></button>
          <button className="button-no"onClick={this.handleNo}><span>No</span></button>
        </div>
      );
    } else if (this.state.currentState === 1 || this.state.currentState === 11){
      let msg;
      if (this.state.currentState === 1){
        msg = <h1>{messages.amountAssignments}</h1>
      } else if (this.state.currentState === 11) {
        msg = <h1>{messages.amountMidterms}</h1>
      }

      let options = [];
      let len;
      if (this.state.currentState === 1) {
        len = 12;
      } else {
        len = 5;
      }
      for(let i = 0; i <= len; i++){
        options.push(i);
      }
      console.log(options);
      show = (
        <div>
          {msg}
          <form onSubmit={this.handleSubmit}>
            <select className="selectTag" name="inputvalue" value={this.state.inputvalue} onChange={this.handleChange}>
              {options.map(p => <option value={p} key={p+"ass"}>{p}</option>)}
            </select>
            <br/>
            <input className="button-next" type="submit" value="Next"/>
          </form>
        </div>
      );
    } else if (this.state.currentState === 2 || this.state.currentState === 12 ){
      let msg;
      if (this.state.currentState === 2){
        msg = <h1>{messages.valueAssignments}{this.state.start}{messages.valueAssignments2}</h1>
      } else if (this.state.currentState === 12) {
        msg = <h1>{messages.valueMidterms}{this.state.start}{messages.valueMidterms2}</h1>
      }

      let options = [];
      let options2 = [];
      for(let i = 0; i <= 100; i++){
        options.push(i);
      }
      for(let i = 0; i <= 50; i++){
        options2.push(i);
      }
      show = (
        <div>
          {msg}
          <form onSubmit={this.handleSubmit}>
            <label style={styles.grades}>Grade</label>
            <label style={styles.percentage}>Percentage</label>
            <br/>
            <select className="selectTag" name="inputvalue" value={this.state.inputvalue} onChange={this.handleChange}>
              {options.map(p => <option value={p} key={p+"assG"}>{p}</option>)}
            </select>
            <select className="selectTag" name="worthvalue" value={this.state.worthvalue} onChange={this.handleChange}>
              {options2.map(p => <option value={p} key={p+"assW"}>{p}</option>)}
            </select>
            <br/>
            <input className="button-next" type="submit" value="Next"/>
          </form>
        </div>
      );
    } else {
      if (this.state.total > 50) {
        show = (
          <div >
            <h1>{messages.good}</h1>
          </div>
        );
      } else {

        const rest = this.state.totalworth;
        const totalGrade = this.state.total;

        const need50 = Math.round(((50 - totalGrade) * 100) / (100 -rest));
        const need60 = Math.round(((60 - totalGrade) * 100) / (100 -rest));
        console.log("rest: "+ rest + ", totalGrade" + totalGrade);

        show = (
          <div>
            <h1>Your final is worth {100 - rest} right?</h1>
            <h1>You need {need50}% in your final to get a 50! and {need60}% in your final to reach a 60!</h1>
          </div>
        );
      }
    }

    return (
      <div style={styles.div_center}>
        {show}
        <Bar percentage={this.state.total}/>
        <button className="button-reset" onClick={this.handleReset}><span>Start again</span></button>
      </div>
    );
  }
}

export default withAlert(Main);
