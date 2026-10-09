import { computed, signal, type Signal, type WritableSignal } from '@angular/core';
import {
  AURORA_ICON_NAMES,
  type AlertBannerVariant,
  type AuroraIconName,
  type AuroraIconSize,
  type BedCardStatus,
  type ButtonType,
  type ButtonVariant,
  type StatusPillVariant,
  type TextFieldType,
  type VitalSignStatus,
} from '@aurora-hospital/ui';

import { booleanControl, numberControl, selectControl, textControl, type ControlDef } from '../../shared/prop-controls/control-def';

/**
 * One entry in the playground's component explorer: a searchable/selectable
 * component with its own typed prop state, a generic `controls` list for
 * `app-prop-controls`, and the exact markup for the current state.
 */
export interface ExplorerEntry {
  readonly key: string;
  readonly title: string;
  readonly controls: Signal<ControlDef[]>;
  readonly code: Signal<string>;
  readonly reset: () => void;
}

function updater<T>(state: WritableSignal<T>): <K extends keyof T>(key: K, value: T[K]) => void {
  return (key, value) => state.update((s) => ({ ...s, [key]: value }));
}

// --- Button -----------------------------------------------------------

export interface ButtonEntryState {
  label: string;
  variant: ButtonVariant;
  icon: AuroraIconName | 'none';
  type: ButtonType;
  disabled: boolean;
}

const BUTTON_DEFAULTS: ButtonEntryState = {
  label: 'Admit patient',
  variant: 'primary',
  icon: 'none',
  type: 'button',
  disabled: false,
};

const BUTTON_VARIANTS: readonly ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const BUTTON_TYPES: readonly ButtonType[] = ['button', 'submit', 'reset'];
const BUTTON_ICON_OPTIONS: readonly string[] = ['none', ...AURORA_ICON_NAMES];

export function createButtonEntry(): ExplorerEntry & { state: Signal<ButtonEntryState> } {
  const state = signal<ButtonEntryState>({ ...BUTTON_DEFAULTS });
  const set = updater(state);

  const controls = computed<ControlDef[]>(() => {
    const s = state();
    return [
      textControl('label', 'Label', s.label, (v) => set('label', v)),
      selectControl('variant', 'Variant', BUTTON_VARIANTS, s.variant, (v) =>
        set('variant', v as ButtonVariant),
      ),
      selectControl('icon', 'Icon', BUTTON_ICON_OPTIONS, s.icon, (v) =>
        set('icon', v as AuroraIconName | 'none'),
      ),
      selectControl('type', 'Type', BUTTON_TYPES, s.type, (v) => set('type', v as ButtonType)),
      booleanControl('disabled', 'Disabled', s.disabled, (v) => set('disabled', v)),
    ];
  });

  const code = computed(() => {
    const s = state();
    const lines = ['<au-button', `  variant="${s.variant}"`];
    if (s.icon !== 'none') lines.push(`  icon="${s.icon}"`);
    if (s.type !== 'button') lines.push(`  type="${s.type}"`);
    if (s.disabled) lines.push('  [disabled]="true"');
    lines.push(`>${s.label}</au-button>`);
    return lines.join('\n');
  });

  return {
    key: 'button',
    title: 'Button',
    controls,
    code,
    reset: () => state.set({ ...BUTTON_DEFAULTS }),
    state,
  };
}

// --- StatusPill ---------------------------------------------------------

export interface StatusPillEntryState {
  label: string;
  status: StatusPillVariant;
}

const STATUS_PILL_DEFAULTS: StatusPillEntryState = { label: 'Critical', status: 'critical' };
const STATUS_PILL_VARIANTS: readonly StatusPillVariant[] = [
  'critical',
  'warning',
  'stable',
  'info',
];

export function createStatusPillEntry(): ExplorerEntry & { state: Signal<StatusPillEntryState> } {
  const state = signal<StatusPillEntryState>({ ...STATUS_PILL_DEFAULTS });
  const set = updater(state);

  const controls = computed<ControlDef[]>(() => {
    const s = state();
    return [
      textControl('label', 'Label', s.label, (v) => set('label', v)),
      selectControl('status', 'Status', STATUS_PILL_VARIANTS, s.status, (v) =>
        set('status', v as StatusPillVariant),
      ),
    ];
  });

  const code = computed(() => {
    const s = state();
    return `<au-status-pill status="${s.status}">${s.label}</au-status-pill>`;
  });

  return {
    key: 'status-pill',
    title: 'StatusPill',
    controls,
    code,
    reset: () => state.set({ ...STATUS_PILL_DEFAULTS }),
    state,
  };
}

// --- TextField ------------------------------------------------------------

export interface TextFieldEntryState {
  label: string;
  placeholder: string;
  helpText: string;
  errorText: string;
  type: TextFieldType;
}

const TEXT_FIELD_DEFAULTS: TextFieldEntryState = {
  label: 'Patient name',
  placeholder: 'e.g. M. Oliveira',
  helpText: 'As it appears on the chart',
  errorText: '',
  type: 'text',
};

const TEXT_FIELD_TYPES: readonly TextFieldType[] = ['text', 'email', 'tel', 'number', 'password'];

export function createTextFieldEntry(): ExplorerEntry & { state: Signal<TextFieldEntryState> } {
  const state = signal<TextFieldEntryState>({ ...TEXT_FIELD_DEFAULTS });
  const set = updater(state);

  const controls = computed<ControlDef[]>(() => {
    const s = state();
    return [
      textControl('label', 'Label', s.label, (v) => set('label', v)),
      textControl('placeholder', 'Placeholder', s.placeholder, (v) => set('placeholder', v)),
      textControl('helpText', 'Help text', s.helpText, (v) => set('helpText', v)),
      textControl('errorText', 'Error text', s.errorText, (v) => set('errorText', v)),
      selectControl('type', 'Type', TEXT_FIELD_TYPES, s.type, (v) => set('type', v as TextFieldType)),
    ];
  });

  const code = computed(() => {
    const s = state();
    const lines = ['<au-text-field', `  label="${s.label}"`];
    if (s.placeholder) lines.push(`  placeholder="${s.placeholder}"`);
    if (s.type !== 'text') lines.push(`  type="${s.type}"`);
    if (s.errorText) {
      lines.push(`  errorText="${s.errorText}"`);
    } else if (s.helpText) {
      lines.push(`  helpText="${s.helpText}"`);
    }
    lines.push('/>');
    return lines.join('\n');
  });

  return {
    key: 'text-field',
    title: 'TextField',
    controls,
    code,
    reset: () => state.set({ ...TEXT_FIELD_DEFAULTS }),
    state,
  };
}

// --- AlertBanner ------------------------------------------------------

export interface AlertBannerEntryState {
  variant: AlertBannerVariant;
  title: string;
  text: string;
  acknowledgeLabel: string;
}

const ALERT_BANNER_DEFAULTS: AlertBannerEntryState = {
  variant: 'critical',
  title: 'SpO2 87% · Bed 4B-12',
  text: 'Below 90% for 2 minutes. Nurse on duty notified at 14:32.',
  acknowledgeLabel: 'Acknowledge',
};

const ALERT_BANNER_VARIANTS: readonly AlertBannerVariant[] = ['critical', 'info'];

export function createAlertBannerEntry(): ExplorerEntry & {
  state: Signal<AlertBannerEntryState>;
  acknowledged: WritableSignal<boolean>;
} {
  const state = signal<AlertBannerEntryState>({ ...ALERT_BANNER_DEFAULTS });
  const acknowledged = signal(false);
  const rawSet = updater(state);
  const set: typeof rawSet = (key, value) => {
    rawSet(key, value);
    acknowledged.set(false);
  };

  const controls = computed<ControlDef[]>(() => {
    const s = state();
    return [
      selectControl('variant', 'Variant', ALERT_BANNER_VARIANTS, s.variant, (v) =>
        set('variant', v as AlertBannerVariant),
      ),
      textControl('title', 'Title', s.title, (v) => set('title', v)),
      textControl('text', 'Text', s.text, (v) => set('text', v)),
      textControl('acknowledgeLabel', 'Acknowledge label', s.acknowledgeLabel, (v) =>
        set('acknowledgeLabel', v),
      ),
    ];
  });

  const code = computed(() => {
    const s = state();
    const lines = ['<au-alert-banner', `  variant="${s.variant}"`, `  title="${s.title}"`];
    if (s.text) lines.push(`  text="${s.text}"`);
    if (s.acknowledgeLabel) lines.push(`  acknowledgeLabel="${s.acknowledgeLabel}"`);
    lines.push('/>');
    return lines.join('\n');
  });

  return {
    key: 'alert-banner',
    title: 'AlertBanner',
    controls,
    code,
    reset: () => {
      state.set({ ...ALERT_BANNER_DEFAULTS });
      acknowledged.set(false);
    },
    state,
    acknowledged,
  };
}

// --- OccupancyMeter -----------------------------------------------------

export interface OccupancyMeterEntryState {
  label: string;
  occupied: number;
  capacity: number;
}

const OCCUPANCY_METER_DEFAULTS: OccupancyMeterEntryState = {
  label: 'Ward 4B · Cardiology',
  occupied: 21,
  capacity: 24,
};

export function createOccupancyMeterEntry(): ExplorerEntry & {
  state: Signal<OccupancyMeterEntryState>;
} {
  const state = signal<OccupancyMeterEntryState>({ ...OCCUPANCY_METER_DEFAULTS });
  const set = updater(state);

  const controls = computed<ControlDef[]>(() => {
    const s = state();
    return [
      textControl('label', 'Label', s.label, (v) => set('label', v)),
      numberControl('occupied', 'Occupied', s.occupied, (v) => set('occupied', v)),
      numberControl('capacity', 'Capacity', s.capacity, (v) => set('capacity', v)),
    ];
  });

  const code = computed(() => {
    const s = state();
    return `<au-occupancy-meter label="${s.label}" [occupied]="${s.occupied}" [capacity]="${s.capacity}" />`;
  });

  return {
    key: 'occupancy-meter',
    title: 'OccupancyMeter',
    controls,
    code,
    reset: () => state.set({ ...OCCUPANCY_METER_DEFAULTS }),
    state,
  };
}

// --- VitalSign ------------------------------------------------------------

export interface VitalSignEntryState {
  label: string;
  value: string;
  unit: string;
  status: VitalSignStatus;
  rangeLow: string;
  rangeHigh: string;
  history: string;
}

const VITAL_SIGN_DEFAULTS: VitalSignEntryState = {
  label: 'Heart rate',
  value: '78',
  unit: 'bpm',
  status: 'stable',
  rangeLow: '60',
  rangeHigh: '100',
  history: '74, 76, 75, 78, 82, 79, 78',
};

const VITAL_SIGN_STATUSES: readonly VitalSignStatus[] = ['stable', 'warning', 'critical'];

function parseNumberList(raw: string): number[] {
  return raw
    .split(',')
    .map((part) => Number(part.trim()))
    .filter((value) => !Number.isNaN(value));
}

export function createVitalSignEntry(): ExplorerEntry & {
  state: Signal<VitalSignEntryState>;
  resolvedValue: Signal<string | number>;
  resolvedRange: Signal<readonly [number, number] | undefined>;
  resolvedHistory: Signal<readonly number[]>;
} {
  const state = signal<VitalSignEntryState>({ ...VITAL_SIGN_DEFAULTS });
  const set = updater(state);

  const controls = computed<ControlDef[]>(() => {
    const s = state();
    return [
      textControl('label', 'Label', s.label, (v) => set('label', v)),
      textControl('value', 'Value', s.value, (v) => set('value', v)),
      textControl('unit', 'Unit', s.unit, (v) => set('unit', v)),
      selectControl('status', 'Status', VITAL_SIGN_STATUSES, s.status, (v) =>
        set('status', v as VitalSignStatus),
      ),
      textControl('rangeLow', 'Range low', s.rangeLow, (v) => set('rangeLow', v)),
      textControl('rangeHigh', 'Range high', s.rangeHigh, (v) => set('rangeHigh', v)),
      textControl('history', 'History (comma-separated)', s.history, (v) => set('history', v)),
    ];
  });

  const resolvedValue = computed<string | number>(() => {
    const raw = state().value;
    const parsed = Number(raw);
    return raw.trim() !== '' && !Number.isNaN(parsed) ? parsed : raw;
  });

  const resolvedRange = computed<readonly [number, number] | undefined>(() => {
    const s = state();
    const low = Number(s.rangeLow);
    const high = Number(s.rangeHigh);
    return Number.isNaN(low) || Number.isNaN(high) ? undefined : [low, high];
  });

  const resolvedHistory = computed(() => parseNumberList(state().history));

  const code = computed(() => {
    const s = state();
    const lines = [
      '<au-vital-sign',
      `  label="${s.label}"`,
      `  [value]="${JSON.stringify(resolvedValue())}"`,
    ];
    if (s.unit) lines.push(`  unit="${s.unit}"`);
    lines.push(`  status="${s.status}"`);
    const range = resolvedRange();
    if (range) lines.push(`  [range]="[${range[0]}, ${range[1]}]"`);
    const history = resolvedHistory();
    if (history.length > 0) lines.push(`  [history]="[${history.join(', ')}]"`);
    lines.push('/>');
    return lines.join('\n');
  });

  return {
    key: 'vital-sign',
    title: 'VitalSign',
    controls,
    code,
    reset: () => state.set({ ...VITAL_SIGN_DEFAULTS }),
    state,
    resolvedValue,
    resolvedRange,
    resolvedHistory,
  };
}

// --- BedCard --------------------------------------------------------------

export interface BedCardEntryState {
  code: string;
  name: string;
  free: boolean;
  status: BedCardStatus | 'none';
  statusLabel: string;
  diagnosis: string;
  dayOfStay: string;
  nextEvent: string;
}

const BED_CARD_DEFAULTS: BedCardEntryState = {
  code: '4B-12',
  name: 'M. Oliveira, 67',
  free: false,
  status: 'critical',
  statusLabel: 'Critical',
  diagnosis: 'Post-op cardiac',
  dayOfStay: 'Day 2',
  nextEvent: 'Visit due 15:00',
};

const BED_CARD_STATUSES: readonly string[] = ['none', 'critical', 'warning', 'stable', 'info'];

export function createBedCardEntry(): ExplorerEntry & { state: Signal<BedCardEntryState> } {
  const state = signal<BedCardEntryState>({ ...BED_CARD_DEFAULTS });
  const set = updater(state);

  const controls = computed<ControlDef[]>(() => {
    const s = state();
    return [
      textControl('code', 'Code', s.code, (v) => set('code', v)),
      textControl('name', 'Name', s.name, (v) => set('name', v)),
      booleanControl('free', 'Free bed', s.free, (v) => set('free', v)),
      selectControl('status', 'Status', BED_CARD_STATUSES, s.status, (v) =>
        set('status', v as BedCardStatus | 'none'),
      ),
      textControl('statusLabel', 'Status label', s.statusLabel, (v) => set('statusLabel', v)),
      textControl('diagnosis', 'Diagnosis', s.diagnosis, (v) => set('diagnosis', v)),
      textControl('dayOfStay', 'Day of stay', s.dayOfStay, (v) => set('dayOfStay', v)),
      textControl('nextEvent', 'Next event', s.nextEvent, (v) => set('nextEvent', v)),
    ];
  });

  const code = computed(() => {
    const s = state();
    const lines = ['<au-bed-card', `  code="${s.code}"`, `  name="${s.name}"`];
    if (s.free) {
      lines.push('  [free]="true"');
    } else {
      if (s.status !== 'none') lines.push(`  status="${s.status}"`);
      if (s.statusLabel) lines.push(`  statusLabel="${s.statusLabel}"`);
    }
    if (s.diagnosis) lines.push(`  diagnosis="${s.diagnosis}"`);
    if (s.dayOfStay) lines.push(`  dayOfStay="${s.dayOfStay}"`);
    if (s.nextEvent) lines.push(`  nextEvent="${s.nextEvent}"`);
    lines.push('/>');
    return lines.join('\n');
  });

  return {
    key: 'bed-card',
    title: 'BedCard',
    controls,
    code,
    reset: () => state.set({ ...BED_CARD_DEFAULTS }),
    state,
  };
}

// --- Icon -------------------------------------------------------------

export interface IconEntryState {
  name: AuroraIconName;
  size: AuroraIconSize;
}

const ICON_DEFAULTS: IconEntryState = { name: 'heart-pulse', size: 20 };
const ICON_SIZES: readonly string[] = ['16', '20', '24', '32'];

export function createIconEntry(): ExplorerEntry & { state: Signal<IconEntryState> } {
  const state = signal<IconEntryState>({ ...ICON_DEFAULTS });
  const set = updater(state);

  const controls = computed<ControlDef[]>(() => {
    const s = state();
    return [
      selectControl('name', 'Icon', AURORA_ICON_NAMES, s.name, (v) => set('name', v as AuroraIconName)),
      selectControl('size', 'Size', ICON_SIZES, String(s.size), (v) =>
        set('size', Number(v) as AuroraIconSize),
      ),
    ];
  });

  const code = computed(() => {
    const s = state();
    return `<au-icon name="${s.name}" [size]="${s.size}" />`;
  });

  return {
    key: 'icon',
    title: 'Icon',
    controls,
    code,
    reset: () => state.set({ ...ICON_DEFAULTS }),
    state,
  };
}
