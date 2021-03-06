import React from 'react';
import ReactDOM from 'react-dom';

import { Steps, Step } from '../lib';

class Example extends React.Component {
  render() {
    let nextButton = (<span>nExT</span>);
    return (
      <Steps currentStep={1} prevButton='prev' nextButton={nextButton} mountOnlySiblings={true}>
        <Step>
          Step1
        </Step>
        <Step>
          Step2
        </Step>
        <Step>
          Step3
        </Step>
        <Step>
          Step4
        </Step>
        <Step>
          Step5
        </Step>
      </Steps>
    );
  }
}

ReactDOM.render(<Example/> , document.getElementById('example'));
