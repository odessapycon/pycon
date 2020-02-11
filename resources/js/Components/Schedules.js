import { BaseComponent } from '../Base/BaseComponent';
import { MainScheduleEn } from '../../lang/js/en/main-schedule-en';
import { MainScheduleRu } from '../../lang/js/ru/main-schedule-ru';
import { MainSchedule2020En } from '../../lang/js/en/main-schedule-2020-en';
import { MainSchedule2020Ru } from '../../lang/js/ru/main-schedule-2020-ru';
import { MainSchedule2020Ua } from '../../lang/js/ua/main-schedule-2020-ua';
import { MainSchedule2020Day2En } from '../../lang/js/en/main-schedule-2020-2-en';
import { MainSchedule2020Day2Ru } from '../../lang/js/ru/main-schedule-2020-2-ru';
import { MainSchedule2020Day2Ua } from '../../lang/js/ua/main-schedule-2020-2-ua';
import { PrepartyScheduleEn } from '../../lang/js/en/preparty-schedule-en';
import { PrepartyScheduleRu } from '../../lang/js/ru/preparty-schedule-ru';
import { MeetupSchedule } from '../../lang/js/ru/meetup-schedule-ru';
import { MeetupSchedule2 } from '../../lang/js/ru/meetup-schedule-2-ru';
import { RenderSchedule } from '../Modules/RenderSchedule';
import { RenderSchedule2020 } from '../Modules/RenderSchedule-2020';

import $ from 'jquery';
window.jQuery = $;



export class ScheduleComponent extends BaseComponent {

  constructor() {
    super();

    this.prepartySchedule = new RenderSchedule({
      scheduleRu : PrepartyScheduleRu,
      scheduleEn : PrepartyScheduleEn,
      container : '#preparty-schedule-list'
    });

    this.mainSchedule = new RenderSchedule({
      scheduleRu : MainScheduleRu,
      scheduleEn : MainScheduleEn,
      container : '#main-schedule-list'
    });


    if(window.CONFIG.DESIGN_VERSION === '2') {
      this.mainSchedule2020 = new RenderSchedule2020({
        scheduleRu : MainSchedule2020Ru,
        scheduleUa : MainSchedule2020Ua,
        scheduleEn : MainSchedule2020En,
        container : '#main-schedule-2020-list'
      });

      this.mainSchedule2020_2 = new RenderSchedule2020({
        scheduleRu : MainSchedule2020Day2Ru,
        scheduleUa : MainSchedule2020Day2Ua,
        scheduleEn : MainSchedule2020Day2En,
        container : '#main-schedule-2020-2-list'
      });
    } else {
      this.mainSchedule2020 = new RenderSchedule({
        scheduleRu : MainSchedule2020Ru,
        scheduleUa : MainSchedule2020Ua,
        scheduleEn : MainSchedule2020En,
        container : '#main-schedule-2020-list'
      });

      this.mainSchedule2020_2 = new RenderSchedule({
        scheduleRu : MainSchedule2020Day2Ru,
        scheduleUa : MainSchedule2020Day2Ua,
        scheduleEn : MainSchedule2020Day2En,
        container : '#main-schedule-2020-2-list'
      });
    }




    this.meetupSchedule = new RenderSchedule({
      scheduleRu: MeetupSchedule,
      scheduleEn: MeetupSchedule,
      container: '#meetup-schedule-list'
    });

    this.meetupSchedulePart2 = new RenderSchedule({
      scheduleRu: MeetupSchedule2,
      scheduleEn: MeetupSchedule2,
      container: '#meetup-2-schedule-list'
    });



  }

  _events() {
    $('.day-2020').on('click', (e) => {
      e.preventDefault();

      let $this = $(e.currentTarget);

      $this.next().slideToggle();
    })
  }

}
