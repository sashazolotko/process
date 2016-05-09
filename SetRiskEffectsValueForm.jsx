SetRiskEffectsValueForm = React.createClass({
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
                <table>
                    <thead>
                    <tr>
                        <th>Negative consequences</th>
                        <th>Scores</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            Catastrophic consequences, leading to death of people
                        </td>
                        <td>
                            10
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Catastrophic consequences, leading to very large material losses and / or personal injury
                        </td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>
                            Serious material damage for the company
                        </td>
                        <td>7-8</td>
                    </tr>
                    <tr>
                        <td>
                            Tangible material losses for the company
                        </td>
                        <td>5-6</td>
                    </tr>
                    <tr>
                        <td>
                            Material losses which do not lead to financial difficulties in the company
                        </td>
                        <td>3-4</td>
                    </tr>
                    <tr>
                        <td>
                            Insignificant material losses
                        </td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>
                            Practically there are no material losses
                        </td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>
                            There are no negative consequences
                        </td>
                        <td>0</td>
                    </tr>
                    </tbody>
                </table>
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