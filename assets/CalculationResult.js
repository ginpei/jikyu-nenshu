import { findElement, readableManYen } from './misc.js';

export default class CalculationResult {
  /**
   * @param {CalculationResultProps} props
   */
  constructor (props) {
    /** @type {CalculationResultProps} */
    this.props = props;

    /** @type {HTMLElement} */
    this._elAnnualIncome = findElement(props.el, 'annualIncome');

    /** @type {HTMLElement} */
    this._elAnnualIncomeText = findElement(props.el, 'annualIncomeText');

    /** @type {HTMLElement} */
    this._elWage = findElement(props.el, 'wage');

    /** @type {HTMLElement} */
    this._elWageText = findElement(props.el, 'wageText');

    this._render();
  }

  /**
   * @param {Partial<CalculationResultProps>} props
   */
  updateProps (props) {
    this.props = {
      ...this.props,
      ...props,
    };

    this._render();
  }

  _render () {
    if (this.props.target === 'annualIncome') {
      this._elAnnualIncome.hidden = false;
      this._elWage.hidden = true;

      const numberText = readableManYen(this.props.values.annualIncome);
      this._elAnnualIncomeText.textContent = numberText;
    } else {
      this._elWage.hidden = false;
      this._elAnnualIncome.hidden = true;

      const numberText = readableManYen(this.props.values.wage);
      this._elWageText.textContent = numberText;
    }
  }
}
