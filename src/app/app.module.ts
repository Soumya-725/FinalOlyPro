import { HttpClientModule } from '@angular/common/http';
import { ApiRoutingService } from './api-routing.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { SportsListComponent } from './sports-list/sports-list.component';
import { IndexHeaderWithSearchComponent } from './index-header-with-search/index-header-with-search.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    SportsListComponent,
    IndexHeaderWithSearchComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    PlayerProfileComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", component:HomeComponent },
      { path: "players/:sports_id", component: PlayerListComponent},
      { path:"player/:player_id", component: PlayerProfileComponent },
      { path:"**", component:NotFoundComponent }
    ])
  ],
  providers: [ApiRoutingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
