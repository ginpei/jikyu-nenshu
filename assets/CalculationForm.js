import { findElement } from './misc.js';

export default class CalculationForm {
  /**
   * @param {CalculationFormProps} props
   */
  constructor (props) {
    this.onValueChange = this.onValueChange.bind(this);

    /** @type {CalculationFormProps} */
    this.props = props;

    const { el } = props;

    /** @type {HTMLElement} */
    this._elWageRow = findElement(el, 'wageRow');

    /** @type {HTMLInputElement} */
    this._elWage = findElement(el, 'wage');
    this._elWage.addEventListener('input', this.onValueChange);

    /** @type {HTMLElement} */
    this._elAnnualIncomeRow = findElement(el, 'annualIncomeRow');

    /** @type {HTMLInputElement} */
    this._elAnnualIncome = findElement(el, 'annualIncome');
    this._elAnnualIncome.addEventListener('input', this.onValueChange);

    /** @type {HTMLInputElement} */
    this._elHours = findElement(el, 'hours');
    this._elHours.addEventListener('input', this.onValueChange);

    /** @type {HTMLInputElement} */
    this._elDays = findElement(el, 'days');
    this._elDays.addEventListener('input', this.onValueChange);

    this._render();
  }

  /**
   * @param {Partial<CalculationFormProps>} props
   */
  updateProps (props) {
    this.props = {
      ...this.props,
      ...props,
    };

    this._render();
  }

  onValueChange () {
    this.props.onValueChange({
      annualIncome: Number(this._elAnnualIncome.value) * 10000,
      wage: Number(this._elWage.value),
      hours: Number(this._elHours.value),
      days: Number(this._elDays.value),
    });
  }

  _render () {
    const { values } = this.props;

    if (this.props.target === 'annualIncome') {
      this._elWageRow.hidden = false;
      this._elAnnualIncomeRow.hidden = true;
      this._elWage.value = String(
        Math.round(values.wage),
      );
    } else {
      this._elAnnualIncomeRow.hidden = false;
      this._elWageRow.hidden = true;
      this._elAnnualIncome.value = String(
        Math.round(values.annualIncome / 10000),
      );
    }
    this._elHours.value = String(values.hours);
    this._elDays.value = String(values.days);
  }
}
