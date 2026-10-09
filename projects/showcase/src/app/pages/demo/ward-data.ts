import type { BedCardStatus } from '@aurora-hospital/ui';

/** One bed on the Ward 4B occupancy board. All patients are invented. */
export interface BedRecord {
  readonly code: string;
  readonly name: string;
  readonly free?: boolean;
  readonly status?: BedCardStatus;
  readonly statusLabel?: string;
  readonly diagnosis?: string;
  readonly dayOfStay?: string;
  readonly nextEvent?: string;
}

/** Fictional occupancy snapshot for Ward 4B, used only by the showcase demo. */
export const WARD_4B_BEDS: readonly BedRecord[] = [
  {
    code: '4B-01',
    name: 'R. Nakamura, 72',
    status: 'critical',
    statusLabel: 'Critical',
    diagnosis: 'Post-op cardiac',
    dayOfStay: 'Day 2',
    nextEvent: 'ICU eval 15:00',
  },
  {
    code: '4B-02',
    name: 'T. Alves, 45',
    status: 'info',
    statusLabel: 'Discharge pending',
    diagnosis: 'Appendectomy',
    dayOfStay: 'Day 5',
    nextEvent: 'Transport 16:00',
  },
  {
    code: '4B-03',
    name: 'C. Pereira, 58',
    status: 'stable',
    statusLabel: 'Stable',
    diagnosis: 'Pneumonia',
    dayOfStay: 'Day 3',
  },
  { code: '4B-04', name: 'Ready for admission', free: true },
  {
    code: '4B-05',
    name: 'S. Barros, 70',
    status: 'warning',
    statusLabel: 'Observation',
    diagnosis: 'COPD exacerbation',
    dayOfStay: 'Day 1',
    nextEvent: 'Reassess 18:00',
  },
  {
    code: '4B-06',
    name: 'J. Lindqvist, 63',
    status: 'stable',
    statusLabel: 'Stable',
    diagnosis: 'Hip fracture',
    dayOfStay: 'Day 6',
  },
  { code: '4B-07', name: 'Ready for admission', free: true },
  { code: '4B-08', name: 'Ready for admission', free: true },
  {
    code: '4B-09',
    name: 'P. Silveira, 81',
    status: 'stable',
    statusLabel: 'Stable',
    diagnosis: 'UTI',
    dayOfStay: 'Day 4',
  },
  {
    code: '4B-10',
    name: 'E. Costa, 55',
    status: 'warning',
    statusLabel: 'Observation',
    diagnosis: 'Sepsis monitoring',
    dayOfStay: 'Day 2',
    nextEvent: 'Labs due 20:00',
  },
  {
    code: '4B-11',
    name: 'N. Souza, 29',
    status: 'info',
    statusLabel: 'Transfer pending',
    diagnosis: 'Observation, neuro',
    dayOfStay: 'Day 2',
    nextEvent: 'Transfer 17:30',
  },
  {
    code: '4B-12',
    name: 'H. Tanaka, 66',
    status: 'stable',
    statusLabel: 'Stable',
    diagnosis: 'Post-op knee',
    dayOfStay: 'Day 3',
  },
];
