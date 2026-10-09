import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Pairs a live Aurora UI component demo with the template snippet that
 * produces it. Used on the showcase home page only, one card per component.
 */
@Component({
  selector: 'app-showcase-example',
  templateUrl: './showcase-example.html',
  styleUrl: './showcase-example.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcaseExample {
  /** Component name shown above the demo, e.g. "StatusPill". */
  readonly title = input.required<string>();

  /** Template snippet shown below the demo, exactly as a developer would write it. */
  readonly code = input.required<string>();
}
