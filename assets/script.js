import AboutDialog from './AboutDialog.js';
import CalculationForm from './CalculationForm.js';
import CalculationResult from './CalculationResult.js';
import { findElement } from './misc.js';
import PresetsDialog from './PresetsDialog.js';
import Shuchusen from './Shuchusen.js';
import ToggleForm from './ToggleForm.js';

function main () {
  /** @type {AppState} */
  let appState = {
    target: 'annualIncome',
    values: {
      annualIncome: 2085714,
      days: 5,
      hours: 8,
      wage: 1000,
    },
  };

  /**
   * @param {Partial<AppState>} state
   */
  const setAppState = (state) => {
    appState = {
      ...appState,
      ...state,
    };

    const { target, values } = appState;

    // eslint-disable-next-line no-use-before-define
    form.updateProps({ target, values });

    // eslint-disable-next-line no-use-before-define
    calculationResult.updateProps({ target, values });

    // eslint-disable-next-line no-use-before-define
    toggleForm.updateProps({ target });

    if (
      (target === 'annualIncome' && values.annualIncome > 100000000)
      || (target === 'wage' && values.wage > 100000)
    ) {
      // eslint-disable-next-line no-use-before-define
      shuchusen.emphasize();
    }
  };

  /**
   * @param {CalculationValues} values
   * @param {CalculationTarget} target
   */
  const calculate = (values, target = appState.target) => {
    const { days, hours } = values;
    const newValues = { ...values };
    if (target === 'annualIncome') {
      const { wage } = values;
      newValues.annualIncome = wage * hours * days / 7 * 365;
    } else {
      const { annualIncome } = values;
      newValues.wage = annualIncome / (hours * days / 7 * 365);
    }

    setAppState({
      target,
      values: newValues,
    });
  };

  const form = new CalculationForm({
    el: findElement(document.body, 'calculator'),
    onValueChange: (values) => calculate(values),
    target: appState.target,
    values: appState.values,
  });

  const calculationResult = new CalculationResult({
    el: findElement(document.body, 'calculationResult'),
    target: appState.target,
    values: appState.values,
  });

  const toggleForm = new ToggleForm({
    el: findElement(document.body, 'toggleForm'),
    onTargetChange: (target) => setAppState({ target }),
    target: appState.target,
  });

  const aboutDialog = new AboutDialog({
    el: findElement(document.body, 'aboutDialog'),
    onDone: () => {
      aboutDialog.hide();
    },
  });

  const presetsDialog = new PresetsDialog({
    el: findElement(document.body, 'presetsDialog'),
    onDone: () => {
      presetsDialog.hide();
    },
    onSelect: (result) => {
      const newValues = { ...appState.values };
      if (result.target === 'annualIncome') {
        newValues.wage = result.wage;
      } else {
        newValues.annualIncome = result.annualIncome;
      }
      calculate(newValues, result.target);

      presetsDialog.hide();
    },
  });

  const shuchusen = new Shuchusen({
    accuracy: 0.7,
    centerRadius: 0.7,
    density: 100,
    el: findElement(document.body, 'shuchusen'),
  });

  findElement(document.body, 'openAboutDialog')
    .addEventListener('click', () => aboutDialog.show());

  findElement(document.body, 'openPresetsDialog')
    .addEventListener('click', () => presetsDialog.show());

  setAppState(appState);
  findElement(document.body, 'app').hidden = false;
}

document.addEventListener('DOMContentLoaded', main);
