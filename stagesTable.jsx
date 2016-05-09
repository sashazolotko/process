
StagesTable = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    isVisible: React.PropTypes.bool.isRequired,
    hideForm: React.PropTypes.func.isRequired
  },
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      isResult: null,
      isModalOpen: false,
      minDefuz: {
        laboriousness: 0,
        cost: 0,
        risk: 0,
      },
    }
  },

  getMeteorData() {
    return {
      stages: Stages.find({}).fetch()
    }
  },
  calcDefuzzificationValue() {
    const stage = this.data.stages[this.data.stages.length - 1];
      const defuzLaboriousness = (parseInt(stage.totalLaboriousness.min) +
          parseInt(stage.totalLaboriousness.modal) +
          parseInt(stage.totalLaboriousness.max)) / 3;
      const defuzCost = (parseInt(stage.totalCost.min) +
          parseInt(stage.totalCost.modal) +
          parseInt(stage.totalCost.max)) / 3;
      const defuzRisk = (parseInt(stage.totalRisk.min) +
          parseInt(stage.totalRisk.modal) +
          parseInt(stage.totalRisk.max)) / 3;

      Stages.update({_id: stage._id},
          {$set:{
            defuzzificationLaboriousnessValue: defuzLaboriousness,
            defuzzificationCostValue: defuzCost,
            defuzzificationRiskValue: defuzRisk
          }}, null, function() {
          }.bind(this));
  },
  getMinDefuzzification() {
    let minLaboriousness = this.data.stages[0].defuzzificationLaboriousnessValue,
        minCost = this.data.stages[0].defuzzificationCostValue,
        minRisk = this.data.stages[0].defuzzificationRiskValue;
    this.data.stages.forEach((stage)=>{
      if (minLaboriousness > stage.defuzzificationLaboriousnessValue) {
        minLaboriousness = stage.defuzzificationLaboriousnessValue;
      }
      if (minCost > stage.defuzzificationCostValue) {
        minCost = stage.defuzzificationCostValue;
      }
      if (minRisk > stage.defuzzificationRiskValue) {
        minRisk = stage.defuzzificationRiskValue;
      }
    });
    this.setState({
      minDefuz: {
        laboriousness: minLaboriousness,
        cost: minCost,
        risk: minRisk,
      }
    });
  },
  calcNormalized () {
    this.data.stages.forEach((stage)=>{
      let normalized = {
        laboriousness: 0,
        cost: 0,
        risk: 0,
      };
      normalized.laboriousness = stage.defuzzificationLaboriousnessValue - this.state.minDefuz.laboriousness;
      normalized.cost = stage.defuzzificationCostValue - this.state.minDefuz.cost;
      normalized.risk = stage.defuzzificationRiskValue - this.state.minDefuz.risk;
      let max = 0;
      for (let item in normalized) {
        if (normalized[item] > max) {
          max = normalized[item];
        }
      }

      Stages.update({_id: stage._id},
          {$set:{
            maxNormalized: max,
          }}, null, function() {
          }.bind(this));
    });
  },
  getOptimal() {
    let min =  this.data.stages[0].maxNormalized;
    this.data.stages.forEach((stage, index)=>{
      if (min > stage.maxNormalized) {
        min = stage.maxNormalized;
      }
    });
    const optimal = this.data.stages.find((stage)=>{
      return min === stage.maxNormalized;
    });
    Stages.update({_id: optimal._id},
        {$set:{
          optimal: true,
        }}, null, function() {
        }.bind(this));
    Combinations.insert({
      combinations: this.data.stages,
      best: optimal,
    });
    this.setState({
      isResult: optimal,
    });
  },
  totalRowRisk() {
    let totalRisk = {min: 0, modal: 0, max: 0};
    if (!this.data.stages[this.data.stages.length - 1].risks.length) {
      return;
    }
    for(let i in this.data.stages[this.data.stages.length - 1].risks) {
      totalRisk.min = parseFloat(this.data.stages[this.data.stages.length - 1]
              .risks[i].probability.min) * parseFloat(this.data
              .stages[this.data.stages.length - 1].risks[i].effects.min);
      totalRisk.modal = parseFloat(this.data
              .stages[this.data.stages.length - 1].risks[i].probability.modal) * parseFloat(this.data
              .stages[this.data.stages.length - 1].risks[i].effects.modal);
      totalRisk.max = parseFloat(this.data
              .stages[this.data.stages.length - 1].risks[i].probability.max) * parseFloat(this.data
              .stages[this.data.stages.length - 1].risks[i].effects.max);
      Stages.update({_id: this.data.stages[this.data.stages.length - 1]._id},
          {$set:{
            [`risks.${i}.totalRisk`]: {
              min: totalRisk.min.toFixed(3),
              modal: totalRisk.modal.toFixed(3),
              max: totalRisk.max.toFixed(3)
            }}
          }, null, function() {
            console.log(this.data.stages[this.data.stages.length - 1].risks);
          }.bind(this));
    }

  },
  totalCombinationRisk() {
    let totalRisk = {min: 0, modal: 0, max: 0};
    for(let i in this.data.stages[this.data.stages.length - 1].risks) {
      totalRisk.min += parseFloat(this.data.stages[this.data.stages.length - 1].risks[i].totalRisk.min);
      totalRisk.modal += parseFloat(this.data.stages[this.data.stages.length - 1].risks[i].totalRisk.modal);
      totalRisk.max += parseFloat(this.data.stages[this.data.stages.length - 1].risks[i].totalRisk.max);
    }
    console.log(totalRisk);
    Stages.update({_id: this.data.stages[this.data.stages.length - 1]._id},
        {$set:{
          totalRisk: {
            min: totalRisk.min.toFixed(3),
            modal: totalRisk.modal.toFixed(3),
            max: totalRisk.max.toFixed(3)
          }}
        }, null, function() {
        }.bind(this));
  },
  totalCombinationLaboriousness() {
    let totalLaboriousness = {min: 0, modal: 0, max: 0};
    for(let i in this.data.stages[this.data.stages.length - 1]) {
      if(!this.data.stages[this.data.stages.length - 1][i].length ||
          !this.data.stages[this.data.stages.length - 1][i][0].laboriousness) {
        continue;
      }
      this.data.stages[this.data.stages.length - 1][i].forEach((item)=>{
        totalLaboriousness.min += parseInt(item.laboriousness.min);
        totalLaboriousness.modal += parseInt(item.laboriousness.modal);
        totalLaboriousness.max += parseInt(item.laboriousness.max);
      });
    }
    Stages.update({_id: this.data.stages[this.data.stages.length - 1]._id},
        {$set:{
          totalLaboriousness: {
            min: totalLaboriousness.min,
            modal: totalLaboriousness.modal,
            max: totalLaboriousness.max
          }}
        }, null, function() {
        }.bind(this));
  },

  totalCombinationCost() {
    let totalCost = {min: 0, modal: 0, max: 0};
    for(let i in this.data.stages[this.data.stages.length - 1]) {
      if(!this.data.stages[this.data.stages.length - 1][i].length || !this.data.stages[this.data.stages.length - 1][i][0].totalCost) {
        continue;
      }
      this.data.stages[this.data.stages.length - 1][i].forEach((item)=>{
        totalCost.min += (item.totalCost.min);
        totalCost.modal += (item.totalCost.modal);
        totalCost.max += (item.totalCost.max);
      });
    }

    if (totalCost.max > this.data.stages[this.data.stages.length - 1].costLimit) {
      console.log("Over limit", this.data.stages[this.data.stages.length - 1].costLimit)
    }
    Stages.update({_id: this.data.stages[this.data.stages.length - 1]._id},
        {$set:{
          totalCost: {
            min: totalCost.min,
            modal: totalCost.modal,
            max: totalCost.max
          }}
        }, null, function() {
        }.bind(this));
  },
  updateTotalCost(field, index, arr) {
    Stages.update({_id: this.data.stages[this.data.stages.length - 1]._id},
        {$set:{
          [`${field}.${index}.totalCost`]: {
            min: arr[0],
            modal: arr[1],
            max: arr[2]
          }}
        });
  },
  totalCost() {
    let totalCostFields = {};
    for(let i in this.data.stages[this.data.stages.length - 1]) {
      if(!this.data.stages[this.data.stages.length - 1][i].length || !this.data.stages[this.data.stages.length - 1][i][0].cost) {
        continue;
      }
      this.data.stages[this.data.stages.length - 1][i].forEach((item, index)=>{
        let totalCostArr = [];
        totalCostArr.push(item.laboriousness.min * item.cost.min);
        totalCostArr.push(item.laboriousness.modal * item.cost.modal);
        totalCostArr.push(item.laboriousness.max * item.cost.max);
        this.updateTotalCost(i, index, totalCostArr);
      });
      //totalCostFields[i] = totalCostArr;
    }
  },
  renderRow(stage) {
    return (
      <tr key={stage.title}>
        <td>{stage.title}</td>
        <td onClick={
          this.renderModal.bind(null, {title: stage.title,
          field: "laboriousness",
          category: stage.category,
          index: stage.index,
          id: this.data.stages[this.data.stages.length - 1]._id})}>
          {stage.laboriousness.min}, {stage.laboriousness.modal}, {stage.laboriousness.max}
        </td>
        <td onClick={
          this.renderModal.bind(null, {title: stage.title, field: "cost",
          category: stage.category, index: stage.index, id:this.data.stages[this.data.stages.length - 1]._id})}>
          {stage.cost.min}, {stage.cost.modal}, {stage.cost.max}
        </td>
        <td>
          {stage.totalCost.min}, {stage.totalCost.modal}, {stage.totalCost.max}
        </td>
      </tr>
    );
  },
  renderTable() {
    if(!this.data.stages.length) {
      return null;
    }
    let procArr = [];
    for(let i in this.data.stages[this.data.stages.length - 1]) {
      if(this.data.stages[this.data.stages.length - 1][i].length &&
          this.data.stages[this.data.stages.length - 1][i][0].title) {
        const elements = this.data.stages[this.data.stages.length - 1][i].filter((element)=>{return element.title});
        procArr.push({elements: elements, category: i});
      }
    }
    let totalArray = [];
    procArr.forEach((stage)=>{
      stage.elements.forEach((el, indx)=>{
        el.category = stage.category;
        el.index = indx;
      });
      totalArray = totalArray.concat(stage.elements);
    });
    return (
        totalArray.map((stage) => {
        return this.renderRow(stage);
      })
    );
  },
  saveCombination() {
    this.totalCombinationCost();
    this.totalCombinationRisk();
    setTimeout(this.calcDefuzzificationValue, 500);
    setTimeout(this.getMinDefuzzification, 1000)

    setTimeout(this.calcNormalized, 1500);
    setTimeout(this.getOptimal, 2000);
  },
  setNextCombination: function() {
    this.totalCombinationCost();
    this.totalCombinationRisk();
    setTimeout(this.calcDefuzzificationValue, 500);
    setTimeout(this.getMinDefuzzification, 1000)
    setTimeout(this.props.hideForm, 1500);
  },
  renderRiskModal(params) {
    return (
        React.render(<Overlay modalId='overlay' style={{top: 0, backgroundColor: 'red'}}>
          <SetRiskEventForm stageTitle={params.title} editableField={params.field} editableCategory={params.category} id={params.id}/>
        </Overlay>,document.getElementById('overlay'))
    );
  },

  renderValueRiskModal(params) {
    return (
        React.render(<Overlay modalId='overlay' style={{top: 0, backgroundColor: 'red'}}>
          <SetRiskValueForm index={params.index} field={params.field} id={params.id}/>
        </Overlay>,document.getElementById('overlay'))
    );
  },
  renderValueEffectsRiskModal(params) {
    return (
        React.render(<Overlay modalId='overlay' style={{top: 0, backgroundColor: 'red'}}>
          <SetRiskEffectsValueForm index={params.index} field={params.field} id={params.id}/>
        </Overlay>,document.getElementById('overlay'))
    );
  },

  renderModal(params) {
    return (
      React.render(<Overlay modalId='overlay' style={{top: 0, backgroundColor: 'red'}}>
        <ValuesForm stageTitle={params.title} editableField={params.field} index={params.index} editableCategory={params.category} id={params.id}/>
      </Overlay>,document.getElementById('overlay'))
    );
  },
  /*----------Risk----------------*/
  renderRiskTableBody() {
    const stage = this.data.stages[this.data.stages.length - 1];
    return (
        stage.risks.map((risk, index)=>{
          return (
              <tr key={risk.riskEvent + index}>
                <td>{risk.riskEvent}</td>
                <td onClick={
            this.renderValueRiskModal.bind(null, {index: index, field: 'probability',
             id: this.data.stages[this.data.stages.length - 1]._id})}>
                  {risk.probability.min}, {risk.probability.modal}, {risk.probability.max}
                </td>
                <td onClick={
            this.renderValueEffectsRiskModal.bind(null, {index: index, field: 'effects',
             id: this.data.stages[this.data.stages.length - 1]._id})}>
                  {risk.effects.min}, {risk.effects.modal}, {risk.effects.max}
                </td>
                <td >
                  {risk.totalRisk.min}, {risk.totalRisk.modal}, {risk.totalRisk.max}
                </td>
              </tr>);
        })
    );
  },
  renderRiskTable() {
    if(!this.data.stages.length) {
      return null;
    }
    return (
        <table>
          <thead className="tableRiskHeadStyle">
          <tr>
            <th>Title of risk event</th>
            <th>Probability</th>
            <th>Effects</th>
            <th>Risk</th>
          </tr>
          </thead>
          <tbody className="tableRiskBodyStyle">
            {this.renderRiskTableBody()}
          </tbody>
        </table>
    );
  },
  renderResultInfo() {
    if (!this.state.isResult) {
      return null;
    }
    const resultField = [];
    for (let indx in this.state.isResult) {
      if(!this.state.isResult[indx].length || !this.state.isResult[indx][0].title) {
        continue;
      }
      this.state.isResult[indx].forEach((proc)=>{
        resultField.push(proc.title);
      })
    }
    return(
        <div>
          <ul>
            {resultField.map((field)=>{
              return (<li>{field}</li>);
            })}
          </ul>
          <span>
            Total Laboriousness
            {this.state.isResult.totalLaboriousness.min}
            {this.state.isResult.totalLaboriousness.modal}
            {this.state.isResult.totalLaboriousness.max}
          </span>
          <span>
            Total Cost
            {this.state.isResult.totalCost.min}
            {this.state.isResult.totalCost.modal}
            {this.state.isResult.totalCost.max}
          </span>
          <span>
            Total Risk
            {this.state.isResult.totalRisk.min}
            {this.state.isResult.totalRisk.modal}
            {this.state.isResult.totalRisk.max}
          </span>
        </div>
    )

  },
  /*----------Risk----------------*/
  render() {
    const styles = this.props.isVisible ? "tableStyles" : "hiddenTable";
    const stagesId = this.data.stages.length ? this.data.stages[this.data.stages.length - 1]._id: 0;
    return (
      <div className={styles}>
        <table>
          <thead className="tableHeadStyle">
            <tr>
              <th>Title of Stage</th>
              <th>Laboriousness</th>
              <th>Cost</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="tableBodyStyle">
            {this.renderTable()}
          </tbody>
        </table>
        {this.renderRiskTable()}
        <div className="footerButtons">
          <button onClick={this.totalCombinationLaboriousness}>1</button>
          <button onClick={this.totalCost}>2</button>
          <button onClick={this.totalRowRisk}>3</button>


          <button onClick={this.totalCost}>Total row cost</button>
          <button onClick={this.setNextCombination}>Next</button>
          <button onClick={this.saveCombination}>Finish</button>
          <button onClick={this.renderRiskModal.bind(null, {id: stagesId})}>Set Risk</button>
          {this.renderResultInfo()}
        </div>
      </div>
    );
  }
});
