import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'chatRooms'
})
export class ChatRoomsPipe implements PipeTransform {

  transform(value: any, args: any, adminArgs: any): any {
    if (adminArgs) {
      console.log(value);
      switch (adminArgs) {
        case 'only_flags':
          value = value.filter((item) => {
            if (item.summonAdmin)
              return true;
          });
          break;
        case 'active':
          value = value.filter((item) => {
            let startDate = moment().subtract(1, 'month');
            let endDate = moment();
            let testDate = moment(item.messages[0].timestamp, "YYYY-MM-DD");
            return testDate.isBetween(startDate, endDate, 'days', '[]');
          });
          break;
        case 'inactive':
          value = value.filter((item) => {
            let startDate = moment().subtract(2, 'month');
            let endDate = moment().subtract(1, 'month');
            let testDate = moment(item.messages[0].timestamp, "YYYY-MM-DD");
            return testDate.isBetween(startDate, endDate, 'days', '[]');
          });
          break;
        case 'update':
          value = null;
          break;
      }
    } else {
      if (args === 'unread') {
        value = value.filter((item) => {
          if (item.unreadCount)
            return true;
        });
      }
    }
    console.log(value);

    return value;
  }

}
