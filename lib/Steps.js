import React from "react";
import PropTypes from "prop-types";

export default class Steps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: props.currentStep
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
          {this._printStepsLabel(children, currentStep)}
        </ul>
        <div className="steps-content">
          {this._printSteps(children, currentStep)}
        </div>
        {this._printNav(currentStep, children.length)}
      </div>
    );
  }

  _getStepState(index, currentStep) {
    let state = "";
    if (index + 1 < currentStep) {
      state = "done-step";
    } else if (index + 1 === currentStep) {
      state = "active-step";
    } else if (index > currentStep && !this.props.allowStepSkip) {
      state = "disabled";
    }
    return state;
  }

  _printStepsLabel(children, currentStep) {
    return React.Children.map(children, (child, index) => {
      let { customNavigator } = child.props;
      return (
        <li
          key={index}
          className={this._getStepState(index, currentStep)}
          onClick={() => {
            this._moveStep(index + 1);
          }}
        >
          {customNavigator ? customNavigator : index + 1}
        </li>
      );
    });
  }

  _printSteps(children, currentStep) {
    return React.Children.map(children, (child, index) => {
      let stepNumber = index + 1;
      let isSibling =
        currentStep + 1 === stepNumber || currentStep - 1 === stepNumber;
      let settings = {
        key: index,
        index,
        stepNumber: stepNumber,
        isActive: currentStep === stepNumber,
        isSibling: this.props.mountOnlyActive
          ? false
          : this.props.mountOnlySiblings
          ? isSibling
          : true
      };
      return (
        // child.type === <Step/>
        <child.type {...settings}>{child.props.children}</child.type>
      );
    });
  }

  _printNav(currentStep, childrenLength) {
    const cancelButton = this.props.cancelButton ? (
      <button
        className="steps-nav-cancel"
        onClick={() => {
          this._cancelStep();
        }}
      >
        {this.props.cancelButton}
      </button>
    ) : null;
    const prevButton = this.props.prevButton ? (
      <button
        className="steps-nav-prev"
        onClick={() => {
          this._moveStep(currentStep - 1);
        }}
        disabled={currentStep === 1}
      >
        {this.props.prevButton}
      </button>
    ) : null;
    const nextButton = this.props.nextButton ? (
      <button
        className="steps-nav-next"
        onClick={() => {
          this._moveStep(currentStep + 1);
        }}
        disabled={this.props.nextButtonDisabled}
      >
        {this.props.nextButton}
      </button>
    ) : null;
    const finishButton = this.props.finishButton ? (
      <button
        className="steps-nav-finish"
        onClick={() => {
          this._finishStep(currentStep);
        }}
        disabled={this.props.finishButtonDisabled}
      >
        {currentStep < childrenLength && this.props.intermediateFinishButton
          ? this.props.intermediateFinishButton
          : this.props.finishButton}
      </button>
    ) : null;

    return (
      <div className="steps-nav">
        {cancelButton}
        {this.props.extraNavElement}
        {currentStep > 1 ? prevButton : null}
        {currentStep === childrenLength ? finishButton : nextButton}
        {currentStep < childrenLength && Boolean(this.props.showFinish)
          ? finishButton
          : null}
      </div>
    );
  }

  _moveStep(step) {
    const _doMove = () => {
      this.props.onBeforeStepChange(this.state.currentStep, step);
      this.setState(
        {
          currentStep: step
        },
        () => this.props.onStepChange(step)
      );
    };

    if (this.props.allowStepSkip || this.state.currentStep >= step - 1) {
      const validationResult = this.props.stepShouldChange(
        this.state.currentStep,
        step
      );
      Promise.resolve(validationResult).then(isValid => isValid && _doMove());
    }
  }

  _finishStep(step) {
    const validationResult = this.props.stepShouldChange(
      this.state.currentStep,
      step
    );
    this.props.onBeforeStepChange(this.state.currentStep, step);
    Promise.resolve(validationResult).then(
      isValid => isValid && this.props.onFinish()
    );
  }

  _cancelStep() {
    this.props.onCancel();
  }
}

Steps.propTypes = {
  currentStep: PropTypes.number,
  stepShouldChange: PropTypes.func,
  onBeforeStepChange: PropTypes.func,
  onStepChange: PropTypes.func,
  onFinish: PropTypes.func,
  onCancel: PropTypes.func,
  mountOnlySiblings: PropTypes.bool,
  mountOnlyActive: PropTypes.bool,
  allowStepSkip: PropTypes.bool,
  nextButtonDisabled: PropTypes.bool
};

Steps.defaultProps = {
  currentStep: 1,
  stepShouldChange: () => {
    return true;
  },
  onBeforeStepChange: () => {},
  onStepChange: () => {},
  onFinish: () => {},
  onCancel: () => {},
  prevButton: "Prev",
  nextButton: "Next",
  extraNavElemenet: false,
  finishButton: "Finish",
  finishButtonDisabled: false,
  nextButtonDisabled: false,
  intermediateFinishButton: null,
  cancelButton: "Cancel",
  showFinish: false,
  mountOnlySiblings: false,
  mountOnlyActive: false,
  allowStepSkip: false
};
