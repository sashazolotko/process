SetRiskValueForm = React.createClass({
    propTypes: {
        field: React.PropTypes.string.isRequired,
        index: React.PropTypes.number.isRequired,
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
            stage: Stages.findOne({_id: this.props.id})
            //stage: Stages.find({_id: this.props.id}).fetch()
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
        const risksReplace = this.data.stage.risks;
        risksReplace[this.props.index][this.props.field] = {
            min: this.state.min,
            modal: this.state.modal,
            max: this.state.max
        };
        Stages.update({_id: this.data.stage._id},
            {$set:{
                risks: risksReplace
            }});
        this.closeModal();
    },
    renderRiskList() {
        if (!this.state.customRisks.length) {
            return null;
        }
        return (
            this.state.customRisks.map(function (riskEvent) {
                return (
                    <li>{riskEvent}</li>
                );
            })
        );
    },
    closeModal: function (event) {
        React.unmountComponentAtNode(document.getElementById("overlay"));
    },

    render() {
        return (
            <div>
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
            </div>
        );
    }
});
