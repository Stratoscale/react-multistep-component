!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.reactMultistepComponent=t(require("react")):e.reactMultistepComponent=t(e.React)}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Step=t.Steps=void 0;var o=n(2),i=r(o),u=n(4),s=r(u);t.Steps=s["default"],t.Step=i["default"]},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(3),i=r(o),u=function(e){var t=e.stepNumber,n=e.isActive,r=e.isSibling,o=e.children;return i["default"].createElement("div",{className:"step-item step-"+t+" active-"+n,style:{display:n?"block":"none"}},n||r?o:"")};t["default"]=u},function(t,n){t.exports=e},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(3),p=r(a),l=function(e){function t(e){o(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e));return n.state={currentStep:e.currentStep},n._moveStep=n._moveStep.bind(n),n._printNav=n._printNav.bind(n),n.props.onStepChange(n.state.currentStep),n}return u(t,e),s(t,[{key:"render",value:function(){var e=this.state.currentStep,t=this.props.children;return p["default"].createElement("div",{className:"steps-component"},p["default"].createElement("ul",{className:"steps-navigator"},this._printStepsLabel(t,e)),p["default"].createElement("div",{className:"steps-content"},this._printSteps(t,e)),this._printNav(e,t.length))}},{key:"_printStepsLabel",value:function(e,t){var n=this;return p["default"].Children.map(e,function(e,r){var o=r+1===t?"active-step":"",i=e.props.customNavigator;return p["default"].createElement("li",{key:r,className:o,onClick:function(){n._moveStep(r+1)}},i?i:r+1)})}},{key:"_printSteps",value:function(e,t){var n=this;return p["default"].Children.map(e,function(e,r){var o=r+1,i=t+1===o||t-1===o,u={key:r,index:r,stepNumber:o,isActive:t===o,isSibling:n.props.mountOnlySiblings?i:!0};return p["default"].createElement(e.type,u,e.props.children)})}},{key:"_printNav",value:function(e,t){var n=this;return p["default"].createElement("div",{className:"steps-nav"},p["default"].createElement("button",{className:"steps-nav-prev",onClick:function(){n._moveStep(e-1)},disabled:1===e},this.props.prevButton),e===t?p["default"].createElement("button",{className:"steps-nav-finish",onClick:function(){n._finishStep()}},this.props.finishButton):p["default"].createElement("button",{className:"steps-nav-next",onClick:function(){n._moveStep(e+1)}},this.props.nextButton))}},{key:"_moveStep",value:function(e){this.props.stepShouldChange()&&(this.setState({currentStep:e}),this.props.onStepChange(e))}},{key:"_finishStep",value:function(){this.props.stepShouldChange()&&this.props.onFinish()}}]),t}(p["default"].Component);t["default"]=l,l.propTypes={currentStep:p["default"].PropTypes.number,stepShouldChange:p["default"].PropTypes.func,onStepChange:p["default"].PropTypes.func,onFinish:p["default"].PropTypes.func,mountOnlySiblings:p["default"].PropTypes.bool},l.defaultProps={currentStep:1,stepShouldChange:function(){return!0},onStepChange:function(){},onFinish:function(){},prevButton:"Prev",nextButton:"Next",finishButton:"Finish",mountOnlySiblings:!1}}])});