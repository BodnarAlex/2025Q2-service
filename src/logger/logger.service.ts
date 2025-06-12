import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  customLog() {
    this.log('Please feed the cat!');
  }

  // error(message: any, stack?: string, context?: string) {
  //   // add your tailored logic here
  //   super.error(...arguments);
  // }
}
