ValuesForm = React.createClass({
  propTypes: {
    stageTitle: React.PropTypes.string.isRequired,
    editableField: React.PropTypes.string.isRequired,
    editableCategory: React.PropTypes.string.isRequired,
    index: React.PropTypes.string,
    id: React.PropTypes.string.isRequired
  },
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      min: 0,
      max: 0,
      modal: 0,
    }
  },

  getMeteorData() {
    return {
      //stage: Stages.findOne({id title: this.props.stageTitle})
      stage: Stages.findOne({_id: this.props.id})
    }
  },
  changeMin(evt) {
    this.setState({min: evt.target.value});
  },
  changeModal(evt) {
    this.setState({modal: evt.target.value});
  },
  changeMax(evt) {
    this.setState({max: evt.target.value});
  },
  onSubmit(evt) {
    evt.preventDefault();
    Stages.update({_id: this.data.stage._id },
      {$set:{
        [`${this.props.editableCategory}.${this.props.index}.${this.props.editableField}`]: {
        min: this.state.min,
        modal: this.state.modal,
        max: this.state.max
      }}}
    , null, (error, noErr)=>{
          console.log(noErr);

    });
    this.closeModal();
  },
  closeModal: function (event) {
    React.unmountComponentAtNode(document.getElementById("overlay"));
  },

  render() {
    return (
      <form>
        <h1>Set values</h1>
        <lable>
          min:
          <input type="number" onChange={this.changeMin}/>
        </lable>
        <lable>
          modal:
          <input type="number" onChange={this.changeModal}/>
        </lable>
        <lable>
          max:
          <input type="number" onChange={this.changeMax}/>
        </lable>
        <button onClick={this.onSubmit}>Confirm</button>
      </form>
    );
  }
});
