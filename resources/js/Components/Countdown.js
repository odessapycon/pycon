import $ from 'jquery';
// import jQuery from 'jquery'
// import '../Base/globalJQuery.js';
import { BaseComponent } from '../Base/BaseComponent';



require('jquery-countdown');


export class CountdownComponent extends BaseComponent {

  constructor() {
    super();
  }

  _events() {
    let day = this.CONFIG.LANG === 'ru' ? 'дн' : 'd';
    let hours = this.CONFIG.LANG === 'ru' ? 'ч' : 'hr';
    let min = this.CONFIG.LANG === 'ru' ? 'мин' : 'min';
    let sec = this.CONFIG.LANG === 'ru' ? 'сек' : 'sec';

    $('#clock').countdown('2019/02/26 23:59:59')
      .on('update.countdown', function (event) {
        var format = `%-D ${ day } %H:%M:%S`;
        $(this).html(event.strftime(
          `<span class="cont"><span class="num">%-D</span><br>${day}</span>
          <span class="cont"><span class="num">%H</span><br>${hours}</span>
          <span class="cont"><span class="num">%M</span><br>${min}</span>
          <span class="cont"><span class="num">%S</span><br>${sec}</span>`));
      })
      .on('finish.countdown', function (event) {
        $(this).html('00:00:00')
          .parent().addClass('disabled');
      });

  }
}
