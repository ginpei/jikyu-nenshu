type CalculationTarget = 'annualIncome' | 'wage';

type AppState = {
  target: CalculationTarget;
  values: CalculationValues;
}

interface CalculationValues {
  annualIncome: number;
  days: number;
  hours: number;
  wage: number;
}

type WageValues = Omit<CalculationValues, 'annualIncome'>;
type AnnualIncomeValues = Omit<CalculationValues, 'wage'>;

interface CalculationFormProps {
  el: HTMLElement;
  onValueChange: (values: CalculationValues) => void;
  target: CalculationTarget;
  values: CalculationValues;
}

interface CalculationFormState {
  values: CalculationValues;
}

interface CalculationResultProps {
  el: HTMLElement;
  target: CalculationTarget;
  values: CalculationValues;
}

interface ToggleFormProps {
  el: HTMLElement;
  onTargetChange: (target: CalculationTarget) => void;
  target: CalculationTarget;
}

interface DialogProps {
  el: HTMLElement;
  onDone: () => void;
}

interface PresetsDialogProps extends DialogProps {
  onSelect: (values: PresetsDialogResult) => void;
}

type PresetsDialogResult = {
  target: 'annualIncome';
  wage: number;
} |  {
  target: 'wage';
  annualIncome: number;
}

interface ShuchusenProps {
  accuracy: number;
  centerRadius: number; // 0 to 1
  density: number;
  el: HTMLCanvasElement;
}

interface ShuchusenContext {
  accuracy: number;
  canvas: HTMLCanvasElement;
  centerRadius: number; // 0 to 1
  canvasContext: CanvasRenderingContext2D;
  cx: number;
  cy: number;
  density: number;
  height: number;
  vmax: number;
  vmin: number;
  width: number;
}
