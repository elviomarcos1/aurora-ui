import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteFooter } from '../../shared/site-footer/site-footer';
import { SiteHeader } from '../../shared/site-header/site-header';

/**
 * Case study page: the real hospital problem behind Aurora UI, the
 * architecture that replaced it, the design decisions it led to, and the
 * result. Content only — no library components, so it reads like an
 * article rather than another demo.
 */
@Component({
  selector: 'app-case-study',
  imports: [RouterLink, SiteFooter, SiteHeader],
  templateUrl: './case-study.html',
  styleUrl: './case-study.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudy {}
