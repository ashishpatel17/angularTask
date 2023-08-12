import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  formatDateToYYYYMMDDHHMM(date: Date): string {
    // const options: Intl.DateTimeFormatOptions = {
    //     year: 'numeric',
    //     month: '2-digit',
    //     day: '2-digit',
    //     hour: '2-digit',
    //     minute: '2-digit'
    // };

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
  };

    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

  transform(date:any): string {
    return this.formatDateToYYYYMMDDHHMM(date);
  }

}
