import $ from 'jquery';
import { BaseComponent } from '../Base/BaseComponent';



require('jquery-countdown');


export class CountdownComponent extends BaseComponent {

  constructor() {
    super();
  }

  _events() {
    let lang = this.CONFIG.LANG;
    let day = lang === 'ru' ? 'дн' :  lang === 'ua' ? 'дн' :'d';
    let hours = lang === 'ru' ? 'ч' : lang === 'ua' ? 'г' :'hr';
    let min = lang === 'ru' ? 'мин' : lang === 'ua' ? 'хв' :'min';
    let sec = lang === 'ru' ? 'сек' : lang === 'ua' ? 'сек' :'sec';

    $('#clock').countdown('2020/04/25 08:30:00')
      .on('update.countdown', function (event) {
        let format = `%-D ${ day } %H:%M:%S`;
        $(this).html(event.strftime(
          `<span class="cont"><span class="num-2020">%-D</span>${ day }</span>
          <span class="cont"><span class="num-2020">%H</span>${ hours }</span>
          <span class="cont"><span class="num-2020">%M</span>${ min }</span>
          <span class="cont"><span class="num-2020">%S</span>${ sec }</span>`));
      })
      .on('finish.countdown', function (event) {
        $('#share-block').hide();
        $(this).html('00:00:00')
          .parent().addClass('disabled');

      });

  }
}
