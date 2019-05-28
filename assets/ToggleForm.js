import { findElement } from './misc.js';

export default class ToggleForm {
  /**
   * @param {ToggleFormProps} props
   */
  constructor (props) {
    this.onToggleClick = this.onToggleClick.bind(this);

    /** @type {ToggleFormProps} */
    this.props = props;

    /** @type {HTMLButtonElement} */
    this._elToggle = findElement(props.el, 'toggle');
    this._elToggle.addEventListener('click', this.onToggleClick);

    /** @type {HTMLElement} */
    this._elAnnualIncome = findElement(props.el, 'annualIncome');

    /** @type {HTMLElement} */
    this._elWage = findElement(props.el, 'wage');

    this._render();
  }

  /**
   * @param {Partial<ToggleFormProps>} props
   */
  updateProps (props) {
    this.props = {
      ...this.props,
      ...props,
    };

    this._render();
  }

  onToggleClick () {
    const target = this.props.target === 'annualIncome'
      ? 'wage'
      : 'annualIncome';
    this.props.onTargetChange(target);
  }

  _render () {
    const { target } = this.props;
    this._elAnnualIncome.hidden = target !== 'annualIncome';
    this._elWage.hidden = target !== 'wage';
  }
}
