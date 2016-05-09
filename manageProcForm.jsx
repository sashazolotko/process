ManageProcessForm = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    isVisible: React.PropTypes.bool.isRequired,
    hideForm: React.PropTypes.func.isRequired
  },

  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      selectedProcesses: {
        initiating: [],
        planning: [],
        executing: [],
        closing: []
      }
    }
  },

  getMeteorData() {
    return {
      processes: Processes.find({}).fetch(),
      stages: Stages.find({}).fetch(),
    }
  },
  selectProcessHandler(vals, objs) {
    this.state.selectedProcesses[objs[0].category] = objs.map((obj)=> {
          return obj.label;
        }
    );
  },
  renderSelect(category) {
    const colData = this.data.processes.map((process) => {
      return process.processGroup[category].map((catItem, index)=>{
        return {value: catItem + (index + 1),
          label: catItem,
          category: category,
        }
      });
    });
    let optionsData = []
    colData.forEach((data)=>{
      optionsData = optionsData.concat(data)
    });
    return (
    <Select
        name={"lkmxv" + category}
        multi={true}
        placeholder={"Enter " + category}
    value={this.state.selectedProcesses[category]}
    options={optionsData}
    onChange={this.selectProcessHandler}
        />);
  },
  addCombination(evt) {
    evt.preventDefault();
    if (!this.state.costLimit) {
      this.setState({
        isError: true,
      });
      return;
    }
    Stages.insert({
      initiating: this.state.selectedProcesses.initiating.map((proc)=>{
        return {
          title: proc,
          laboriousness: {min: 0, max: 0, modal: 0},
          totalCost: {min: 0, max: 0, modal: 0},
          cost:{min: 0, max: 0, modal: 0},
          createdAt: new Date()
        }
      }),
      planning: this.state.selectedProcesses.planning.map((proc)=>{
        return {
          title: proc,
          laboriousness: {min: 0, max: 0, modal: 0},
          totalCost: {min: 0, max: 0, modal: 0},
          cost:{min: 0, max: 0, modal: 0},
          createdAt: new Date()
        }
      }),
      executing: this.state.selectedProcesses.executing.map((proc)=>{
        return {
          title: proc,
          laboriousness: {min: 0, max: 0, modal: 0},
          totalCost: {min: 0, max: 0, modal: 0},
          cost:{min: 0, max: 0, modal: 0},
          createdAt: new Date()
        }
      }),
      closing: this.state.selectedProcesses.closing.map((proc)=>{
        return {
          title: proc,
          laboriousness: {min: 0, max: 0, modal: 0},
          totalCost: {min: 0, max: 0, modal: 0},
          cost:{min: 0, max: 0, modal: 0},
          createdAt: new Date()
        }
      }),
      risks: [],
      totalRisk: {min: 0, max: 0, modal: 0},
      costLimit: this.state.costLimit
    }, null, ()=>{
      console.log(this.data.stages)
    });

    this.setState({selectedProcesses: {
        initiating: [],
        planning: [],
        executing: [],
        closing: [],
        costLimit: 0,
      }
    });
    this.props.hideForm();
  },
  handleConfirm(evt) {
    evt.preventDefault();
  },
  changeCostLimit(evt) {
    this.setState({costLimit: evt.target.value, isError: false});
  },
  renderValidHint() {
    if(!this.state.isError) {
      return null;
    }
    return <span className="inputError">Required field!</span>
  },
  render() {
    const styles = this.props.isVisible ? "manageProcessesForm" : "hiddenForm";
    return (
      <form className={styles} >
        <h1>Select manage processes</h1>
        <div>
          <lable>
            Initiating:
            {this.renderSelect("initiating")}
          </lable>
          <lable>
            Planning:
            {this.renderSelect("planning")}
          </lable>
          <lable>
            Executing:
            {this.renderSelect("executing")}
          </lable>
        </div>
        <div>
          <lable>
            Closing:
            {this.renderSelect("closing")}
          </lable>
        </div>
        <div>
          <lable>
            Cost Limit:
            <input type="number" onChange={this.changeCostLimit} />
            {this.renderValidHint()}
          </lable>
        </div>
        <div className="buttonBlock">
          <button onClick={this.addCombination} >Show combination</button>
        </div>
      </form>);
  }
});
