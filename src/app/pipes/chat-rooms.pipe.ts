import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatRooms'
})
export class ChatRoomsPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (args === 'unread') {
      value = value.filter((item) => {
        if (item.unreadCount)
          return true;
      });
    }
    return value;
  }

}
