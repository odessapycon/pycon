import $ from 'jquery';
import { HeaderComponent } from './Components/Header';
import { LazyLoading } from './Modules/LazyLoad';
import { Map } from './Components/Map';
import { SpeakersComponent } from './Components/Speakers';
import { ScheduleComponent } from './Components/Schedules';
import { CountdownComponent } from './Components/Countdown';


class App {
  constructor(CONFIG) {
    this.CONFIG = CONFIG;

    this._initModules();
    this._initComponents();
  }

  _initModules() {
    new LazyLoading();
  }

  _initComponents() {
    new HeaderComponent();
    new SpeakersComponent();
    new ScheduleComponent();
    // new CountdownComponent();
  }
}


$('body').ready(() => {
  window.APP = new App(window.CONFIG || {});
});