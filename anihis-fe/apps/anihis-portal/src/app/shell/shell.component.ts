import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ApplicationStateService } from '../shared/services/application-state.service';
import { TabsComponentService } from '../shared/services/tabs-component.service';

@Component({
  selector: 'anihis-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnDestroy, OnInit {
  destroyed = new Subject<void>();
  currentScreenSize!: string;
  isMenuOpen$!: any;
  isMenuOpenData!: any;
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  tabsName$ = this.tabsComponentService.openTabs$;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private applicationStateService: ApplicationStateService,
    private tabsComponentService: TabsComponentService
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        tap((result: any) => {
          this.tabsComponentService.closeAllTab();
          for (const query of Object.keys(result.breakpoints)) {
            if (result.breakpoints[query]) {
              this.currentScreenSize =
                this.displayNameMap.get(query) ?? 'Unknown';
              console.log(this.currentScreenSize);
            }
          }
        }),
        takeUntil(this.destroyed)
      )
      .subscribe();

    this.applicationStateService.isOpenMenu$
      .pipe(takeUntil(this.destroyed))
      .subscribe((isMenuOpen: any) => {
        console.log(isMenuOpen);
        this.isMenuOpenData = isMenuOpen;
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
