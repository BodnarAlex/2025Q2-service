import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { appendFileSync, existsSync, statSync, writeFileSync } from 'node:fs';

const DEFAULT_LEVEL = 2;
const DEFAULT_SIZE = 50;
const PATH_TO_LOG_FILE = '../../log/logFile.txt';
const PATH_TO_ERROR_FILE = '../../log/logFile.txt';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  private log_level: number;
  private max_size: number;

  constructor(private readonly configService: ConfigService) {
    super();

    this.log_level = !!configService.get('LOG_LEVEL')
      ? configService.get('LOG_LEVEL')
      : DEFAULT_LEVEL;

    this.max_size = !!configService.get('MAX_SIZE')
      ? configService.get('MAX_SIZE')
      : DEFAULT_SIZE;
  }

  getLevel(level: string) {
    if (level === 'error') {
      return 0;
    } else if (level === 'warn') {
      return 1;
    } else if (level === 'log') {
      return 2;
    } else if (level === 'debug') {
      return 3;
    } else if (level === 'verbose') {
      return 4;
    }
    return this.log_level;
  }

  error(message: any, trace?: string) {
    if (this.log_level === 0) {
      super.error(message, trace);
      this.writeMessageToFile(
        PATH_TO_ERROR_FILE,
        `[ERROR] ${message} ${trace}`,
      );
    }
  }

  warn(message: any) {
    if (this.log_level <= 1) {
      super.warn(message);
      this.writeMessageToFile(PATH_TO_LOG_FILE, `[WARN] ${message}`);
    }
  }

  log(message: any) {
    if (this.log_level <= 2) {
      super.log(message);
      this.writeMessageToFile(PATH_TO_LOG_FILE, `[LOG] ${message}`);
    }
  }

  debug(message: any) {
    if (this.log_level <= 3) {
      super.debug(message);
      this.writeMessageToFile(PATH_TO_LOG_FILE, `[DEBUG] ${message}`);
    }
  }

  verbose(message: any) {
    if (this.log_level <= 4) {
      super.verbose(message);
      this.writeMessageToFile(PATH_TO_LOG_FILE, `[VERBOSE] ${message}`);
    }
  }

  writeMessageToFile(pathToFile = PATH_TO_LOG_FILE, message = 'From logger') {
    this.checkRotate(pathToFile);
    appendFileSync(pathToFile, message + '\n');
  }

  checkRotate(pathToFile: string) {
    if (!existsSync(pathToFile)) return;
    const size = statSync(pathToFile).size / 1024;
    if (size >= this.max_size) {
      writeFileSync(pathToFile, '');
    }
  }
}
