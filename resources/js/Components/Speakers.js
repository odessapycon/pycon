import $ from 'jquery';
import { BaseComponent } from '../Base/BaseComponent';
import { RenderSpeakers } from '../Modules/RenderSpeakers';
import { MainSpeakersRu } from '../../lang/js/ru/main-speakers-ru.js';
import { MainSpeakersEn } from '../../lang/js/en/main-speakers-en.js';
import { MeetupSpeakers } from '../../lang/js/ru/pyday-speakers.js';
import { MeetupSpeakersEn } from '../../lang/js/en/pyday-speakers-en.js';
import { Meetup2Speakers } from '../../lang/js/ru/pyday-2-speakers.js';
import { Meetup2SpeakersEn } from '../../lang/js/en/pyday-2-speakers-en.js';
import { PrepartySpeakersEn } from '../../lang/js/en/preparty-speakers-en';
import { PrepartySpeakersRu } from '../../lang/js/ru/preparty-speakers-ru';

export class SpeakersComponent extends BaseComponent {

  constructor() {
    super();

    this.mainSpeakers = new RenderSpeakers({
      modal: 'main-speakers-modal',
      speakersRu: MainSpeakersRu,
      speakersEn: MainSpeakersEn,
      container: '#main-speakers-list'
    });

    this.meetupSpeakers = new RenderSpeakers({
      modal: 'meetup-speakers-modal',
      speakersRu: MeetupSpeakers,
      speakersEn: MeetupSpeakersEn,
      container: '#meetup-speakers-list'
    });

    this.meetup2Speakers = new RenderSpeakers({
      modal: 'meetup-2-speakers-modal',
      speakersRu: Meetup2Speakers,
      speakersEn: Meetup2SpeakersEn,
      container: '#meetup-2-speakers-list'
    });


    // this.prepartySpeakers = new RenderSpeakers({
    //   modal: 'preparty-speakers-modal',
    //   speakersRu: PrepartySpeakersRu,
    //   speakersEn: PrepartySpeakersEn,
    //   container: '#preparty-speakers-list'
    // });
  }

  _events() {

  }

}
