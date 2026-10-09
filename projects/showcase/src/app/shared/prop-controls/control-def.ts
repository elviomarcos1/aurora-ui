/** One editable prop in a component explorer panel, bound via closures to the owning entry's own typed state. */
export type ControlDef =
  | { kind: 'text'; key: string; label: string; value: string; set: (value: string) => void }
  | {
      kind: 'select';
      key: string;
      label: string;
      value: string;
      options: readonly string[];
      set: (value: string) => void;
    }
  | { kind: 'boolean'; key: string; label: string; value: boolean; set: (value: boolean) => void }
  | { kind: 'number'; key: string; label: string; value: number; set: (value: number) => void };

export function textControl(
  key: string,
  label: string,
  value: string,
  set: (value: string) => void,
): ControlDef {
  return { kind: 'text', key, label, value, set };
}

export function selectControl(
  key: string,
  label: string,
  options: readonly string[],
  value: string,
  set: (value: string) => void,
): ControlDef {
  return { kind: 'select', key, label, value, options, set };
}

export function booleanControl(
  key: string,
  label: string,
  value: boolean,
  set: (value: boolean) => void,
): ControlDef {
  return { kind: 'boolean', key, label, value, set };
}

export function numberControl(
  key: string,
  label: string,
  value: number,
  set: (value: number) => void,
): ControlDef {
  return { kind: 'number', key, label, value, set };
}
