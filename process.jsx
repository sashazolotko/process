Stages = new Mongo.Collection("stages");
Processes = new Mongo.Collection("processes");
Combinations = new Mongo.Collection("combinations");

if (Meteor.isClient) {
  // This code is executed on the client only
  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    if (Processes.find().count() === 0) {
      Processes.insert({
        knowlegeArea: "Project Integration Management",
        processGroup: {
          initiating: ["Develop Project Charter (PMBoK)"],
          planning: ["Develop Project Management Plan (PMBoK)"],
          executing: ["Direct and Manage Project Work (PMBoK)"],
          monitoringAndControlling: {
            reporting: ["?????"],
            controlling: ["Monitor and Control Project Work",
              "Perform Integrated Change Control",
              "???????"],
            analysis: ["?????"],
            decisionMaking: ["???????"]
          },
          closing: ["Close Project or Phase"],
        }
      });
      Processes.insert({
        knowlegeArea: "Integration",
        processGroup: {
          initiating: ["Develop Project Charter(ISO 21500)",
            "Capture previous lessons (PRINCE 2)",
            "Prepare the outline Business Case (PRINCE2)",
            "Select the project approach and assemble the Project Brief (PRINCE2)",
            "Plan the initiation stage (PRINCE2)",
            "Authorize initiation (PRINCE2)",
            "Determination and Negotiation of Requirements (SWEBOK)"],
          planning: ["Develop Project Plans) (ISO 21500)",
            "The integration of project plans",
            "Determining the duration of the Sprint. (Usually 2-4 weeks). [Scrum]",
            "Sprint Planning [Scrum]",
            "Setting priorities in backlog of the Sprint. (Scrum)",
            "Planning game (XP)",
            "Create the Project Plan (PRINCE2)",
            "Refine the Business Case (PRINCE2)",
            "Assemble the Project Initiation Documentation (PRINCE2)",
            "Authorize a Stage or Exception Plan (PRINCE2)",
            "Authorize the project (PRINCE2)",
            "Plan the next stage (PRINCE2)",
            "Update the Project Plan (PRINCE2)",
            "Update the Business Case (PRINCE2)",
            " Produce an Exception Plan (PRINCE2)",
            "Process Planning (SWEBOK)",
            "Plan Management (SWEBOK)",
            "Plan Scope Management) (PMBoK)",
            "Collect Requirements (PMBoK)",
            "Define Scope (PMBoK)",
            "Create Work Breakdown Structure(WBS) (PMBoK)",
            "Define activities (ISO 21500)",
            "Creating task succession. At each stage, the number of tasks shall not be more than predetermined. " +
            "The urgent task shall be planned separately. " +
            "Succession of tasks shall be presented in the form of " +
            "inscriptions on sheets of paper placed on " +
            "the Kanban board (Kanban)",
            "Prepare the Configuration Management Strategy (PRINCE2)",
            "Determination and Negotiation of Requirements (SWEBOK)",
            "Feasibility Analysis (SWEBOK)",
            "Determine Deliverables (SWEBOK)"],
          executing: ["Direct and Manage Project Work (ISO 21500)",
            "Authorize a Work Package (PRINCE2)",
            "Take corrective action (PRINCE2)",
            "Accept a Work Package (PRINCE2)",
            "Execute a Work Package (PRINCE2)",
            "Deliver a Work Package (PRINCE2)",
            "Give ad hoc direction (PRINCE2)",
            "Implementation of Plans (SWEBOK)"],
          monitoringAndControlling: {
            reporting: ["??????",
              "Reporting",
              "??????",
              "Review Work Package status",
              "Review the stage status"],
            controlling: ["Control Project Work",
              "Control Changes",
              "??????",
              "Process for the Review and Revision of Requirements",
              "Monitor Process",
              "Control Process",
              "Determining Satisfactions Requirements"],
            analysis: ["???????",
              "Report highlights",
              "Report stage end",
              "Evaluate the project",
              "Control Process"],
            decisionMaking: ["?????",
              "Control Process",
              "Collect lessons learned",
              "Authorize project closure",
              "Prepare planned closure",Refactoring or design improvement) (XP)
              "Hand over products",
              "Recommend project closure",
              "Determining Closure",
              "Closure Activities"]
          },
          closing: ["Close Project or Phase"],
        }
      });
      Processes.insert({
        knowlegeArea: "Project Time Management",
        processGroup: {
          initiating: ["Establish Project Team (PMBoK)",
            "Appoint the Executive and the Project Manager (PRINCE2)",
            "Design and appoint the project management team (PRINCE2)"],
          planning: ["Plan Schedule Management (PMBoK)",
            "Define Activities (PMBoK)",
            "Sequence Activities (PMBoK)",
            "Estimate Activity Resources",
            "Estimate Activity Durations (PMBoK)",
            "Develop Schedule (PMBoK)"],
          executing: ["Daily Scrum [Scrum]", "Continuous integration (XP)", "Refactoring or design improvement (XP) "],
          monitoringAndControlling: {
            reporting: ["??????"],
            controlling: ["Control Schedule",
              "??????"],
            analysis: ["?????"],
            decisionMaking: ["?????"]
          },
          closing: []
        }
      });

      Processes.insert({
        knowlegeArea: "Time",
        processGroup: {
          initiating: [],
          planning: ["Sequence Activities (ISO 21500)",
            "Estimate Activity Durations (ISO 21500)",
            "Develop Schedule (ISO 21500)",
            "Effort, Schedule, and Cost Estimation (SWEBOK)"],
          executing: ["??????"],
          monitoringAndControlling: {
            reporting: ["??????"],
            controlling: ["Control Schedule",
              "??????"],
            analysis: ["??????"],
            decisionMaking: ["??????"]
          },
          closing: []
        }
      });

      Processes.insert({
        knowlegeArea: "Project Cost Management",
        processGroup: {
          initiating: [],
          planning: ["Plan Cost Management (PMBoK)",
            "Estimate Costs (PMBoK)",
            "Determine Budget (PMBoK)"],
          executing: ["??????"],
          monitoringAndControlling: {
            reporting: ["??????"],
            controlling: ["Control Costs",
              "??????"],
            analysis: ["??????"],
            decisionMaking: ["??????"]
          },
          closing: []
        }
      });

      Processes.insert({
        knowlegeArea: "Cost",
        processGroup: {
          initiating: [],
          planning: ["Estimate Costs (ISO 21500)",
            "Effort, Schedule, and Cost Estimation (SWEBOK)",
            "Develop Budget (ISO 21500)",
            "Plan Quality Management (PMBoK)",
            "Plan Quality (ISO 21500)",
            "Prepare the Quality Management Strategy (PRINCE2)",
            "Plan the Measurement Process (SWEBOK)",
            "Plan Human Resource Management (PMBoK)",
            "Estimate Resources (PMBoK)",
            "Define Project  Organization",
            "Tasks of Scrum Master (Scrum)",
            "The determination of product liability " +
            "(the project manager or project team in general can be tasked with it)",
            "Collective code ownership (XP)",
            "Sustainable pace (XP)",
            "Effort, Schedule, and Cost Estimation (SWEBOK)",
            "Resource Allocation(SWEBOK)",
          ],
          executing: [],
          monitoringAndControlling: {
            reporting: [],
            controlling: ["Control Costs",
              "Monitor Process"],
            analysis: ["??????"],
            decisionMaking: ["??????"]
          },
          closing: []
        }
      });

      Processes.insert({
        knowlegeArea: "Project Communication Management",
        processGroup: {
          initiating: [],
          planning: ["Plan Communications Management (PMBoK)"],
          executing: ["Manage Communications", "????????"],
          monitoringAndControlling: {
            reporting: ["???????"],
            controlling: ["Control Communications",
              "?????"],
            analysis: ["??????"],
            decisionMaking: ["??????"]
          },
          closing: []
        }
      });

      Processes.insert({
        knowlegeArea: "Communication",
        processGroup: {
          initiating: [],
          planning: ["Plan Communications (ISO 21500)",
            "Prepare the Communication Management Strategy (PRINCE2)",
            "Set up the project controls (PRINCE2)"],
          executing: ["Distribute Information"],
          monitoringAndControlling: {
            reporting: [],
            controlling: ["Control Communications"],
            analysis: [],
            decisionMaking: []
          },
          closing: []
        }
      });

      Processes.insert({
        knowlegeArea: "Project Risk Management",
        processGroup: {
          initiating: [],
          planning: ["Plan Risk Management (PMBoK)",
            "Identify Risks (PMBoK)",
            "Perform Qualitative Risk Analysis (PMBoK)",
            "Perform Quantitative Risk Analysis (PMBoK)",
            "Plan Risk Responses (PMBoK)"],
          executing: ["??????"],
          monitoringAndControlling: {
            reporting: ["?????"],
            controlling: ["Control Risks", "????"],
            analysis: ["?????"],
            decisionMaking: ["?????"]
          },
          closing: []
        }
      });

      Processes.insert({
        knowlegeArea: "Risk",
        processGroup: {
          initiating: [],
          planning: ["Identify Risks (ISO 21500)",
            "Assess Risks (ISO 21500)",
            "Prepare the Risk Management Strategy (PRINCE2)",
            "Risk Management (SWEBOK)"],
          executing: ["Treat Risks"],
          monitoringAndControlling: {
            reporting: ["?????"],
            controlling: ["Control Risks", "Monitor Process"],
            analysis: ["?????",
            "Capture and examine issues and risks",
            "Escalate issues and risks"],
            decisionMaking: [""]
          },
          closing: []
        }
      });

      Processes.insert({
        knowlegeArea: "Project Procurement Management",
        processGroup: {
          initiating: [],
          planning: ["Plan Procurement Management (PMBoK)"],
          executing: ["Conduct Procurements"],
          monitoringAndControlling: {
            reporting: ["?????"],
            controlling: ["Control Procurements", "??????"],
            analysis: ["?????"],
            decisionMaking: ["?????"]
          },
          closing: ["Close Procurements"]
        }
      });

      Processes.insert({
        knowlegeArea: "Procurement",
        processGroup: {
          initiating: [],
          planning: ["Plan Procurement (ISO 21500)", "Determine Deliverables (SWEBOK)"],
          executing: ["Select Suppliers", "Software Acquisition and Supplier Contract Management"],
          monitoringAndControlling: {
            reporting: [],
            controlling: ["Administer Contracts"],
            analysis: [],
            decisionMaking: []
          },
          closing: []
        }
      });

      Processes.insert({
        knowlegeArea: "Project Stakeholder Management",
        processGroup: {
          initiating: ["Identify stakeholders(PMBoK)",
            "Creation of the product backlog [Scrum]",
            "Stakeholders: Product Owner, Scrum Master, Team) (Scrum)",
            "The customer is always available) (XP)"],
          planning: ["Plan Stakeholder Management (PMBoK)"],
          executing: ["Manage Stakeholder Engagement"],
          monitoringAndControlling: {
            reporting: ["?????"],
            controlling: ["Control Stakeholder Engagement", "?????"],
            analysis: ["??????"],
            decisionMaking: ["??????"]
          },
          closing: []
        }
      });

      Processes.insert({
        knowlegeArea: "Stakeholders",
        processGroup: {
          initiating: ["Identify Stakeholders (ISO 21500)"],
          planning: [],
          executing: ["Manage stakeholders"],
          monitoringAndControlling: {
            reporting: [],
            controlling: [],
            analysis: [],
            decisionMaking: []
          },
          closing: []
        }
      });

    }
    ReactDOM.render(<App />, document.getElementById("render-target"));
  });
}
