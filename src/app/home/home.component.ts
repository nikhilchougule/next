import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy


} from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import {themeColor,themeDirection,themeLayout } from "../_config/theme-cofig";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  green = themeColor.green;
  blue = themeColor.blue;
  dark = false;
  minisidebar = false;
  boxed = themeLayout.boxed;
  danger = themeColor.danger;
  showHide = false;
  url = '';
  dir = themeDirection.dir;
  sidebarOpened = false;
  status = false;

  public showSearch = false;

  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;

  clickEvent() {
    this.status = !this.status;
  }


  constructor(
    public router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  // Mini sidebar
}
