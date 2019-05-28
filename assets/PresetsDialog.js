import Dialog from './Dialog.js';
import { findAllElements } from './misc.js';

export default class PresetsDialog extends Dialog {
  /**
   * @param {PresetsDialogProps} props
   */
  constructor (props) {
    super(props);

    this.onPresetClick = this.onPresetClick.bind(this);
    this.props = props;

    /** @type {HTMLButtonElement[]} */
    this._elsPreset = findAllElements(props.el, 'preset');
    this._elsPreset.forEach((el) => {
      el.addEventListener('click', this.onPresetClick);
    });

    this._render();
  }

  /**
   * @param {Event} event
   */
  onPresetClick (event) {
    const el = event.currentTarget;
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error('Failed to retrieve element');
    }

    const { target } = el.dataset;
    if (target === 'annualIncome') {
      const wage = Number(el.dataset.wage);
      if (Number.isNaN(wage)) {
        throw new Error('Failed to get value');
      }
      this.props.onSelect({ target, wage });
    } else if (target === 'wage') {
      const annualIncome = Number(el.dataset.annualincome);
      if (Number.isNaN(annualIncome)) {
        throw new Error('Failed to get value');
      }
      this.props.onSelect({ target, annualIncome });
    } else {
      throw new Error('Invalid value settings');
    }
  }

  _render () {}
}
