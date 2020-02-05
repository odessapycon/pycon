import $ from 'jquery';
import { Helpers } from '../Helpers';



window.jQuery = $;
require('../vendors/jquery-tmpl/jquery.tmpl.min');


export class RenderSchedule2020 {
  constructor(options) {
    this.CONFIG = window.CONFIG;
    this.schedule = null;
    this.options = options;
    this._init();
    this._events();
    this.helpers = new Helpers();
  }


  _init() {
    if(this.CONFIG.LANG === 'ru') {
      this.schedule = this.options.scheduleRu;
    } else if(this.CONFIG.LANG === 'ua') {
      this.schedule = this.options.scheduleUa;
    } else {
      this.schedule = this.options.scheduleEn;
    }

    let scheduleRow = '<div class="schedule-item-2020 {{if icon == \'clock-o\' }} schedule-break-2020{{/if}} {{if icon == \'user\' || icon == \'coffee\' || icon == \'flag\' || icon == \'glass\' || icon == \'cutlery\' }} schedule-separator-2020{{/if}}">' +
      '                <div class="schedule-time">' +
      '                   {{if time.start}}' +
      '                     {{html time.start}}' +
      '                   {{/if}}' +
      '                   {{if time.end}}' +
      '-' +
      '{{html time.end}}' +
      '                   {{/if}}' +
      '                 </div>' +
      '                 <div class="schedule-icon"><i class="fa fa-{{html icon }}"></i></div>'+
      '                 {{html scheduleRendered}}' +
      '              </div>';
    $.template('scheduleRow', scheduleRow);

    let scheduleItem = '<div class="schedule-text flex-item-1">' +
      '                  <div class="schedule-author">' +
      '                    ${author}' +
      '                  </div>' +
      '                  {{html title}}' +
      '                </div>';
    $.template('scheduleItemTemplate', scheduleItem);


    let scheduleHtml = '';

    $.each(this.schedule, function (i, schedule) {
      let talksHtml = '';

      $.each(schedule.talks, function (j, talk) {
        talksHtml += $.tmpl('scheduleItemTemplate', talk)[0].outerHTML;
      });

      schedule.scheduleRendered = talksHtml;

      let item = $.tmpl('scheduleRow', schedule)[0].outerHTML;

      scheduleHtml += item;

    });

    $(`${this.options.container} .schedule-body`).html(scheduleHtml);
  }

  _events() {

  }
}