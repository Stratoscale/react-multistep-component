import React from 'react';

export default class Steps extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentStep: props.currentStep,
    };

    this._moveStep = this._moveStep.bind(this);
    this._printNav = this._printNav.bind(this);

    // Call onStepChange for first time
    this.props.onStepChange(this.state.currentStep);
  }

  render() {
    let { currentStep } = this.state;
    let { children } = this.props;
    return (
      <div className="steps-component">
        <ul className="steps-navigator">
          {
            this._printStepsLabel(children, currentStep)
          }
        </ul>
        <div className="steps-content">
          {
            this._printSteps(children, currentStep)
          }
        </div>
          {
            this._printNav(currentStep, children.length)
          }
      </div>
    );
  }

  _getStepState(index, currentStep) {
    let state = '';
    if (index + 1 < currentStep) {
      state = 'done-step';
    } else if (index + 1 === currentStep) {
      state = 'active-step';
    } else if (index > currentStep && !this.props.allowStepSkip) {
      state = 'disabled';
    }
    return state;
  }

  _printStepsLabel(children, currentStep) {
    return (
      React.Children.map(children, (child, index) => {
        let { customNavigator } = child.props;
        return (
          <li key={index} className={this._getStepState(index, currentStep)} onClick={() => {this._moveStep(index + 1)}}>
            {customNavigator ? customNavigator : index + 1}
          </li>
        )
      })
    )
  }

  _printSteps(children, currentStep) {
    return (
      React.Children.map(children, (child, index) => {
        let stepNumber = index + 1;
        let isSibling = currentStep + 1 === stepNumber || currentStep - 1 === stepNumber;
        let settings = {
          key: index,
          index,
          stepNumber: stepNumber,
          isActive: currentStep === stepNumber,
          isSibling: this.props.mountOnlyActive ? false : this.props.mountOnlySiblings ? isSibling : true
        };
        return (
          // child.type === <Step/>
          <child.type {...settings}>
            {child.props.children}
          </child.type>
        );
      })
    )
  }

  _printNav(currentStep, childrenLength) {
     const cancelButton = this.props.cancelButton ?
      <button
        className="steps-nav-cancel"
        onClick={() => { this._cancelStep() }}
      >
        {this.props.cancelButton}
      </button> : null;

    return (
      <div className="steps-nav">
        { cancelButton }
        { currentStep > 1 ?
            <button
              className="steps-nav-prev"
              onClick={() => {this._moveStep(currentStep - 1)}}
              disabled={currentStep === 1}
            >
              {this.props.prevButton}
            </button>
          :
            null
        }
        { currentStep === childrenLength ?
            <button
              className="steps-nav-finish"
              onClick={() => {this._finishStep(currentStep)}}
            >
              {this.props.finishButton}
            </button>
          :
            <button
              className="steps-nav-next"
              onClick={() => {this._moveStep(currentStep + 1)}}
            >
              {this.props.nextButton}
            </button>
        }
      </div>
    )
  }

  _moveStep(step) {
    if (this.props.allowStepSkip || this.state.currentStep >= step - 1) {
        if (this.props.stepShouldChange(this.state.currentStep, step)) {
          this.setState({
            currentStep: step
          }, () => this.props.onStepChange(step));
        }
    }
  }

  _finishStep(step) {
    if (this.props.stepShouldChange(this.state.currentStep, step)) {
      this.props.onFinish();
    }
  }

  _cancelStep() {
    this.props.onCancel();
  }
}

Steps.propTypes = {
  currentStep: React.PropTypes.number,
  stepShouldChange: React.PropTypes.func,
  onStepChange: React.PropTypes.func,
  onFinish: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  mountOnlySiblings: React.PropTypes.bool,
  mountOnlyActive: React.PropTypes.bool,
  allowStepSkip: React.PropTypes.bool
};

Steps.defaultProps = {
  currentStep: 1,
  stepShouldChange: () => {return true;},
  onStepChange: () => {},
  onFinish: () => {},
  onCancel: () => {},
  prevButton: 'Prev',
  nextButton: 'Next',
  finishButton: 'Finish',
  cancelButton: 'Cancel',
  mountOnlySiblings: false,
  mountOnlyActive: false,
  allowStepSkip: false
};
