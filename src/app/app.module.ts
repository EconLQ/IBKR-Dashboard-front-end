import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PositionService } from './positions-table/position.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditPositionModalComponent } from './modals/edit-position-modal/edit-position-modal.component';
import { DeletePositionModalComponent } from './modals/delete-position-modal/delete-position-modal.component';
import { FormsModule } from '@angular/forms';
import { PositionsTableComponent } from './positions-table/positions-table.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { NavbarService } from './shared/navbar/navbar.service';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-guard.service';
import { RefreshTableModalComponent } from './modals/refresh-table-modal/refresh-table-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { RefreshTableService } from './modals/refresh-table-modal/refresh-table.service';
import { KeyStatsComponent } from './dashboard/tables/key-stats/key-stats.component';
import { RiskMeasuresBenchComponent } from './dashboard/tables/risk-measures-bench/risk-measures-bench.component';
import { RiskMeasuresBenchCompService } from './dashboard/tables/risk-measures-bench/risk-measures-bench.service';
import { NgChartsModule } from 'ng2-charts';
import { HistPerfBenchCompComponent } from './dashboard/tables/hist-perf-bench-comp/hist-perf-bench-comp.component';
import { ConcentrationComponent } from './dashboard/tables/concentration/concentration.component';
import { AssetClassComponent } from './dashboard/tables/allocation/asset-class/asset-class.component';
import { RegionComponent } from './dashboard/tables/allocation/region/region.component';
import { PerformanceBySectorComponent } from './dashboard/tables/allocation/performance-by-sector/performance-by-sector.component';
import { TimePeriodBenchCompComponent } from './dashboard/tables/time-period-bench-comp/time-period-bench-comp.component';
import { HistoricalPerfBenchCompService } from './dashboard/tables/hist-perf-bench-comp/hist-perf-bench-comp.service';
import { AssetClassService } from './dashboard/tables/allocation/asset-class/asset-class.service';
import { PerformanceBySectorService } from './dashboard/tables/allocation/performance-by-sector/performance-by-sector.service';
import { RegionService } from './dashboard/tables/allocation/region/region.service';
import { ConcentrationHoldingsService } from './dashboard/tables/concentration/concentration-service';
import { ClosePositionComponent } from './modals/close-position/close-position.component';
import { OpenedPositionsComponent } from './opened-positions/opened-positions.component';
import { AddToPositionComponent } from './modals/add-to-position/add-to-position.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    EditPositionModalComponent,
    DeletePositionModalComponent,
    PositionsTableComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    RefreshTableModalComponent,
    DashboardComponent,
    KeyStatsComponent,
    RiskMeasuresBenchComponent,
    HistPerfBenchCompComponent,
    ConcentrationComponent,
    AssetClassComponent,
    RegionComponent,
    PerformanceBySectorComponent,
    TimePeriodBenchCompComponent,
    ClosePositionComponent,
    OpenedPositionsComponent,
    AddToPositionComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgxCsvParserModule,
    NgChartsModule,
  ],
  providers: [
    PositionService,
    CookieService,
    NgbActiveModal,
    NavbarService,
    AuthGuard,
    RefreshTableService,
    RiskMeasuresBenchCompService,
    HistoricalPerfBenchCompService,
    AssetClassService,
    PerformanceBySectorService,
    RegionService,
    ConcentrationHoldingsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
