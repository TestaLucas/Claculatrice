const num = [

{ id: "seven", name: "7" },
{ id: "eight", name: "8" },
{ id: "nine", name: "9" },

{ id: "four", name: "4" },
{ id: "five", name: "5" },
{ id: "six", name: "6" },

{ id: "one", name: "1" },
{ id: "two", name: "2" },
{ id: "three", name: "3" },
{ id: "zero", name: "0" }];



const autre = [
{ id: "divide", name: " / " },
{ id: "multiply", name: " x " },
{ id: "subtract", name: " - " },
{ id: "add", name: " + " },
{ id: "decimal", name: "." }];


const lastIsNumRegex = /\d$/g;
const realOp = /x/g;

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { operation: "0",
      isDecimal: false };
    this.inputNum = this.inputNum.bind(this);
    this.inputDec = this.inputDec.bind(this);
    this.inputOp = this.inputOp.bind(this);
    this.inputSub = this.inputSub.bind(this);
    this.clear = this.clear.bind(this);
    this.delete = this.delete.bind(this);
    this.getResult = this.getResult.bind(this);
  }

  inputNum(event) {
    if (this.state.operation == "0") {
      this.setState({ operation: event.target.value });
    } else
    if (this.state.operation.length < 20) {
      this.setState({
        operation:
        this.state.operation + event.target.value });
    }}

  inputOp() {
    if (/\d$/g.test(this.state.operation))
    {
      this.setState({
        isDecimal: false,
        operation: this.state.operation + event.target.value });
    } else
    if (/\d[+/x-]+$/.test(this.state.operation))
    {
      this.setState({
        isDecimal: false,
        operation: this.state.operation.replace(/[+/x-]+$/,
        event.target.value) });
    }}

  inputSub() {
    if (!/[-\.]$/.test(this.state.operation)) {
      this.setState({
        isDecimal: false,
        operation:
        this.state.operation + event.target.value });

    }}

  inputDec(event) {
    if (this.state.isDecimal == false &&
    /\d$/g.test(this.state.operation)) {
      this.setState({
        isDecimal: true,
        operation:
        this.state.operation + event.target.value });
    }
  }

  clear() {
    this.setState({ isDecimal: false, operation: "0" });
  }

  delete() {
    this.setState({
      operation: this.state.operation.slice(0, -1) });
  }

  getResult() {
    let result =
    this.state.operation.replace(/x/g, "*");
    result = Math.round(eval(result) * 100000) / 100000;
    this.setState({ operation: result });}

  render() {
    let htmlNum = num.map(e => React.createElement("button", {
      className: "buttons", id: e.id, value: e.name,
      onClick: this.inputNum }, e.name));

    return (
      React.createElement("div", { id: "grid" },
      React.createElement("div", { id: "display" }, this.state.operation),

      React.createElement("div", { className: "buttons", id: "clear",
        onClick: this.clear }, "AC"),
      React.createElement("div", { className: "buttons", id: "delete", onClick: this.delete }, "DEL"),


      React.createElement("button", { className: "buttons", id: "divide",
        value: "/", onClick: this.inputOp }, "/"),
      React.createElement("button", { className: "buttons", id: "multiply",
        value: "x", onClick: this.inputOp }, "x"),
      React.createElement("button", { className: "buttons", id: "subtract",
        value: "-", onClick: this.inputSub }, "-"),
      React.createElement("button", { className: "buttons", id: "add", value: "+",
        onClick: this.inputOp }, "+"),

      htmlNum,

      React.createElement("button", { className: "buttons", id: "decimal",
        value: ".", onClick: this.inputDec }, "."),
      React.createElement("div", { className: "buttons", id: "equals", onClick:
        this.getResult }, "=")));


  }}


ReactDOM.render(React.createElement(Calculator, null),
document.getElementById('ici'));