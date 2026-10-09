import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Site-wide footer: author credit and the fictional-brand disclaimer. */
@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {}
