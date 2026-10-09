import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, signal } from '@angular/core';

/** How long the "Copied" confirmation shows before the copy button resets. */
const COPY_FEEDBACK_MS = 1800;

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

  /** True for a short window right after the code snippet was copied. */
  protected readonly copied = signal(false);

  private readonly destroyRef = inject(DestroyRef);
  private copiedTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    this.destroyRef.onDestroy(() => clearTimeout(this.copiedTimeout));
  }

  protected async copyCode(): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;

    await navigator.clipboard.writeText(this.code());

    this.copied.set(true);
    clearTimeout(this.copiedTimeout);
    this.copiedTimeout = setTimeout(() => this.copied.set(false), COPY_FEEDBACK_MS);
  }
}
