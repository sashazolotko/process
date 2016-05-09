/*<select type="number" multiple onChange={this.changeModal.bind(this)}>
    <option>1.Executives fail to support project</option>
    <option>2.Executives become disengaged with project</option>
    <option>3.Conflict between executive stakeholders disrupts project</option>
    <option>4.Executive turnover disrupts project </option>
    <option>5.Scope is ill defined </option>
    <option>6.Scope creep inflates scope</option>
    <option>7.Gold plating inflates scope </option>
    <option>8.Estimates are inaccurate </option>
    <option>9.Dependencies are inaccurate </option>
    <option>10.Activities are missing from scope</option>
    <option>11.Cost forecasts are inaccurate </option>
    <option>12.Exchange rate variability </option>
    <option>13.Change management overload </option>
    <option>14.Stakeholder conflict over proposed changes </option>
    <option>15.Perceptions that a project failed because of changes</option>
    <option>16.Lack of a change management system</option>
    <option>17.Lack of a change management process </option>
    <option>18.Lack of a change control board </option>
    <option>19.Inaccurate change priorities </option>
    <option>20.Low quality of change requests </option>
    <option>21.Change request conflicts with requirements </option>
    <option>22.Stakeholders become disengaged </option>
    <option>23.Stakeholders have inaccurate expectations </option>
    <option>24.Stakeholder turnover</option>
    <option>25.Stakeholders fail to support project </option>
    <option>26.Stakeholder conflict </option>
    <option>27.Process inputs are low quality</option>
    <option>28.Project team misunderstand requirements </option>
    <option>29.Communication overhead </option>
    <option>30.Under communication </option>
    <option>31.Users have inaccurate expectations </option>
    <option>32.Impacted individuals aren't kept informed </option>
    <option>33.Resource shortfalls </option>
    <option>34.Learning curves lead to delays and cost overrun </option>
    <option>35.Training isn't available </option>
    <option>36.Training is inadequate </option>
    <option>37.Resources are inexperienced </option>
    <option>38.Resource performance issues </option>
    <option>39.Team members with negative attitudes towards the project </option>
    <option>40.Resource turnover </option>
    <option>41.Low team motivation </option>
    <option>42.Lack of commitment from functional managers </option>
    <option>43.Architecture fails to pass governance processes </option>
    <option>44.Architecture lacks flexibility </option>
    <option>45.Architecture is not fit for purpose </option>
    <option>46.Architecture is infeasible </option>
    <option>47.Design is infeasible </option>
    <option>48.Design lacks flexibility</option>
    <option>49.Design is not fit for purpose </option>
    <option>50.Design fails peer review </option>
    <option>51.Technology components aren't fit for purpose </option>
    <option>52.Technology components aren't scalable</option>
    <option>53.Technology components aren't interoperable </option>
    <option>54.Technology components aren't compliant with standards and best practices </option>
    <option>55.Technology components have security vulnerabilities </option>
    <option>56.Technology components are over-engineered </option>
    <option>57.Technology components lack stability </option>
    <option>58.Technology components aren't extensible </option>
    <option>59.Technology components aren't reliable </option>
    <option>60.Information security incidents </option>
    <option>61.System outages </option>
    <option>62.Legacy components lack documentation </option>
    <option>63.Legacy components are out of support </option>
    <option>64.Components or products aren't maintainable</option>
    <option>65.Components or products can't be operationalized </option>
    <option>66.Project management tool problems and issues </option>
    <option>67.Delays to required infrastructure </option>
    <option>68.Failure to integrate with business processes </option>
    <option>69.Failure to integrate with systems </option>
    <option>70.Integration testing environments aren't available </option>
    <option>71.Failure to integration with the organization </option>
    <option>72.Failure to integrate components </option>
    <option>73.Project disrupts operations </option>
    <option>74.Project disrupts sales </option>
    <option>75.Project disrupts compliance </option>
    <option>76.Requirements fail to align with strategy </option>
    <option>77.Requirements fail to align with business processes </option>
    <option>78.Requirements fail to align with systems </option>
    <option>79.Requirements have compliance issues </option>
    <option>80.Requirements are ambiguous </option>
    <option>81.Requirements are low quality </option>
    <option>82.Requirements are incomplete </option>
    <option>83.Decision delays impact project </option>
    <option>84.Decisions are ambiguous </option>
    <option>85.Decisions are low quality </option>
    <option>86.Decisions are incomplete </option>
    <option>87.Lack of management or control </option>
    <option>88.Errors in key project management processes </option>
    <option>89.Users reject the prototype </option>
    <option>90.User interface doesn't allow users to complete tasks </option>
    <option>91.User interface is low quality </option>
    <option>92.User interface isn't accessible </option>
</select>*/
SetRiskEventForm = React.createClass({
    propTypes: {
        editableCategory: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired
    },
    mixins: [ReactMeteorData],
    getInitialState() {
        return {
            currentCustomRisks: "",
            customRisks: []
        }
    },

    getMeteorData() {
        return {
            //stage: Stages.findOne({id title: this.props.stageTitle})
            stage: Stages.findOne({_id: this.props.id})
        }
    },
    changeCustomRisk(evt) {
        this.setState({
            currentCustomRisks: evt.target.value
        })
    },
    addCustomRisk(evt) {
        evt.preventDefault();
        this.state.customRisks.push(this.state.currentCustomRisks);
    },
    changeModal(vals, objs) {
        this.state.customRisks = objs.map((obj)=> {
                return obj.label;
            }
        );
    },
    onSubmit(evt) {
        evt.preventDefault();
        Stages.update({_id: this.data.stage._id},
            {$set:{
                risks: this.state.customRisks.map((risk)=>{
                    return ({riskEvent: risk,
                        probability: {min: 0, max: 0, modal: 0},
                        effects: {min: 0, max: 0, modal: 0},
                        totalRisk: {min: 0, max: 0, modal: 0}});
                })
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
    renderRiskValuesSelect() {
        const opts = [
            {value: "Executives fail to support project", label: "Executives fail to support project"},
            {value: "Conflict between executive stakeholders disrupts project", label: "Conflict between executive stakeholders disrupts project"},
            {value: "Executive turnover disrupts project", label: "Executive turnover disrupts project"},
            {value: "Scope is ill defined", label: "Scope is ill defined"},
            {value: "Scope creep inflates scope", label: "Scope creep inflates scope"},
            {value: "Gold plating inflates scope", label: "Gold plating inflates scope"},
            {value: "Estimates are inaccurate", label: "Estimates are inaccurate"},
            {value: "Dependencies are inaccurate", label: "Dependencies are inaccurate"},
            {value: "Activities are missing from scope", label: "Activities are missing from scope"},
            {value: "Cost forecasts are inaccurate", label: "Cost forecasts are inaccurate"},
            {value: "Exchange rate variability", label: "Exchange rate variability"},
            {value: "Change management overload", label: "Change management overload"},
            {value: "Stakeholder conflict over proposed changes", label: "Stakeholder conflict over proposed changes"},
            {value: "Perceptions that a project failed because of changes", label: "Perceptions that a project failed because of changes"},
            {value: "Lack of a change management system", label: "Lack of a change management system"},
            {value: "Lack of a change management process", label: "Lack of a change management process"},
            {value: "Lack of a change control board", label: "Lack of a change control board"},
            {value: "Inaccurate change priorities", label: "Inaccurate change priorities"},
            {value: "Low quality of change requests", label: "Low quality of change requests"},
            {value: "Change request conflicts with requirements", label: "Change request conflicts with requirements"},
            {value: "Stakeholders become disengaged", label: "Stakeholders become disengaged"},
            {value: "Stakeholders have inaccurate expectations", label: "Stakeholders have inaccurate expectations"},
            {value: "Stakeholder turnover", label: "Stakeholder turnover"},
            {value: "Stakeholders fail to support project", label: "Stakeholders fail to support project"},
            {value: "Stakeholder conflict", label: "Stakeholder conflict"},
            {value: "Process inputs are low quality", label: "Process inputs are low quality"},
            {value: "Project team misunderstand requirements", label: "Project team misunderstand requirements"},
            {value: "Communication overhead", label: "Communication overhead"},
            {value: "Under communication", label: "Under communication"},
            {value: "Users have inaccurate expectations", label: "Users have inaccurate expectations"},
            {value: "Impacted individuals aren't kept informed", label: "Impacted individuals aren't kept informed"},
            {value: "Resource shortfalls", label: "Resource shortfalls"},
            {value: "Learning curves lead to delays and cost overrun", label: "Learning curves lead to delays and cost overrun"},
            {value: "Training isn't available", label: "Training isn't available"},
            {value: "Training is inadequate", label: "Training is inadequate"},
            {value: "Resources are inexperienced", label: "Resources are inexperienced"},
            {value: "Resource performance issues", label: "Resource performance issues"},
            {value: "Team members with negative attitudes towards the project", label: "Team members with negative attitudes towards the project"},
            {value: "Resource turnover", label: "Resource turnover"},
            {value: "Low team motivation", label: "Low team motivation"},
            {value: "Lack of commitment from functional managers", label: "Lack of commitment from functional managers"},
            {value: "Architecture fails to pass governance processes", label: "Architecture fails to pass governance processes"},
            {value: "Architecture lacks flexibility", label: "Architecture lacks flexibility"},
            {value: "Architecture is not fit for purpose", label: "Architecture is not fit for purpose"},
            {value: "Architecture is infeasible", label: "Architecture is infeasible"},
            {value: "Design is infeasible", label: "Design is infeasible"},
            {value: "Design lacks flexibility", label: "Design lacks flexibility"},
            {value: "Design is not fit for purpose", label: "Design is not fit for purpose"},
            {value: "Design fails peer review", label: "Design fails peer review"},
            {value: "Technology components aren't fit for purpose", label: "Technology components aren't fit for purpose"},
            {value: "Technology components aren't scalable", label: "Technology components aren't scalable"},
            {value: "Technology components aren't interoperable", label: "Technology components aren't interoperable"},
            {value: "Technology components aren't compliant with standards and best practices", label: "Technology components aren't compliant with standards and best practices"},
            {value: "Technology components have security vulnerabilities", label: "Technology components have security vulnerabilities"},
            {value: "Technology components are over-engineered", label: "Technology components are over-engineered"},
            {value: "Technology components lack stability", label: "Technology components lack stability"},
            {value: "Technology components aren't extensible", label: "Technology components aren't extensible"},
            {value: "Technology components aren't reliable", label: "Technology components aren't reliable"},
            {value: "Information security incidents", label: "Information security incidents"},
            {value: "System outages", label: "System outages"},
            {value: "Legacy components lack documentation", label: "Legacy components lack documentation"},
            {value: "Legacy components are out of support", label: "Legacy components are out of support"},
            {value: "Components or products aren't maintainable", label: "Components or products aren't maintainable"},
            {value: "Components or products can't be operationalized", label: "Components or products can't be operationalized"},
            {value: "Project management tool problems and issues", label: "Project management tool problems and issues"},
            {value: "Delays to required infrastructure", label: "Delays to required infrastructure"},
            {value: "Failure to integrate with business processes", label: "Failure to integrate with business processes"},
            {value: "Failure to integrate with systems", label: "Failure to integrate with systems"},
            {value: "Integration testing environments aren't available", label: "Integration testing environments aren't available"},
            {value: "Failure to integration with the organization", label: "Failure to integration with the organization"},
            {value: "Failure to integrate components", label: "Failure to integrate components"},
            {value: "Project disrupts operations", label: "Project disrupts operations"},
            {value: "Project disrupts sales", label: "Project disrupts sales"},
            {value: "Project disrupts compliance", label: "Project disrupts compliance"},
            {value: "Requirements fail to align with strategy", label: "Requirements fail to align with strategy"},
            {value: "Requirements fail to align with business processes", label: "Requirements fail to align with business processes"},
            {value: "Requirements fail to align with systems", label: "Requirements fail to align with systems"},
            {value: "Requirements have compliance issues", label: "Requirements have compliance issues"},
            {value: "Requirements are ambiguous", label: "Requirements are ambiguous"},
            {value: "Requirements are low quality", label: "Requirements are low quality"},
            {value: "Requirements are incomplete", label: "Requirements are incomplete"},
            {value: "Decision delays impact project", label: "Decision delays impact project"},
            {value: "Decisions are ambiguous", label: "Decisions are ambiguous"},
            {value: "Decisions are low quality", label: "Decisions are low quality"},
            {value: "Decisions are incomplete", label: "Decisions are incomplete"},
            {value: "Lack of management or control", label: "Lack of management or control"},
            {value: "Errors in key project management processes", label: "Errors in key project management processes"},
            {value: "Users reject the prototype", label: "Users reject the prototype"},
            {value: "User interface doesn't allow users to complete tasks", label: "User interface doesn't allow users to complete tasks"},
            {value: "User interface is low quality", label: "User interface is low quality"},
            {value: "User interface isn't accessible", label: "User interface isn't accessible"}
            ];
        return (
            <Select value={this.state.customRisks} options={opts} onChange={this.changeModal} multi={true}></Select>
        )
    },
    render() {
        return (
            <form>
                <h1>Set risk events</h1>
                <ul className="riskList">
                    {this.renderRiskList()}
                </ul>
                <lable>
                    Text:
                    <input type="text" onChange={this.changeCustomRisk.bind(this)}/>
                </lable>
                <button onClick={this.addCustomRisk.bind(this)}>Add Risk</button>
                <lable>
                    Common project list:
                    {this.renderRiskValuesSelect()}
                </lable>
                <button onClick={this.onSubmit}>Confirm</button>
            </form>
        );
    }
});
