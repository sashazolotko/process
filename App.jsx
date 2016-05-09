App = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      isFormVisible: false,
      isTableVisible: false,
      isStart: true,
    }
  },
  getMeteorData() {
    return {
      stages: Stages.find({}).fetch(),
      processes: Processes.find({}).fetch(),
      combinations: Combinations.find({}).fetch()
    }
  },
  componentWillMount() {
    for (let i=0;i < this.data.stages.length; i++) {
      Stages.remove({_id: this.data.stages[i]._id});
    }
  },
  hideFormHandler() {
    this.setState({
      isFormVisible: !this.state.isFormVisible,
      isTableVisible: !this.state.isTableVisible
    });
  },
  startHandler() {
    this.setState({
      isFormVisible: true,
      isStart: false,
    });
  },
  renderStartPage() {
    if (!this.state.isStart) {
      return null;
    }
    return (
        <div className="startPage">
          <h1>Set new combination</h1>
          <button onClick={this.startHandler}>Start</button>
        </div>
    )
  },

  render() {
    /*for (let i=0;i < this.data.combinations.length; i++) {
     Combinations.remove({_id: this.data.combinations[i]._id});
     }*/
    /*for (let i=0;i < this.data.stages.length; i++) {
      Stages.remove({_id: this.data.stages[i]._id});
    }*/
    /*for (let i=0;i < this.data.processes.length; i++) {
      Processes.remove({_id: this.data.processes[i]._id});
    }*/
    return (
      <div className="container">
        {this.renderStartPage()}
        <ManageProcessForm isVisible={this.state.isFormVisible} hideForm={this.hideFormHandler}/>
        <StagesTable isVisible={this.state.isTableVisible} hideForm={this.hideFormHandler}/>
      </div>
    );
  }
});