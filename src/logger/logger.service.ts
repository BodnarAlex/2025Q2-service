import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import * as path from 'node:path';

const DEFAULT_LEVEL = 3;
const DEFAULT_SIZE = 50;
const PATH_TO_LOG_FILE = path.join(__dirname, '../../logs/logFile.txt');
const PATH_TO_ERROR_FILE = path.join(__dirname, '../../logs/errorFile.txt');

@Injectable()
export class LoggerService extends ConsoleLogger {
  private log_level: number;
  private max_size: number;

  constructor(private readonly configService: ConfigService) {
    super(undefined, {
      logLevels: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
    });

    this.log_level = this.getLevel(configService.get('LOG_LEVEL'));

    this.max_size = !!configService.get('MAX_SIZE')
      ? configService.get('MAX_SIZE')
      : DEFAULT_SIZE;
  }

  getLevel(level: string | number): number {
    switch (level) {
      case 0:
      case 'fatal':
      case 'FATAL':
        return 0;
      case 1:
      case 'error':
      case 'ERROR':
        return 1;
      case 2:
      case 'warn':
      case 'WARN':
        return 2;
      case 3:
      case 'log':
      case 'LOG':
        return 3;
      case 4:
      case 'debug':
      case 'DEBUG':
        return 4;
      case 5:
      case 'verbose':
      case 'VERBOSE':
        return 5;
      default:
        return DEFAULT_LEVEL;
    }
  }

  fatal(message: any, context?: string) {
    if (this.log_level === 0) {
      super.fatal(message, context);
      this.writeMessageToFile(
        PATH_TO_ERROR_FILE,
        `[FATAL] ${message} ${context}`,
      );
    }
  }

  error(message: any, stack?: string, context?: string) {
    if (this.log_level >= 1) {
      super.error(message, stack, context);
      this.writeMessageToFile(
        PATH_TO_ERROR_FILE,
        `[ERROR] ${message} ${stack} ${context}`,
      );
    }
  }

  warn(message: any, context?: string) {
    if (this.log_level >= 2) {
      super.warn(message, context);
      this.writeMessageToFile(PATH_TO_LOG_FILE, `[WARN] ${message}`);
    }
  }

  log(message: any, context?: string) {
    if (this.log_level >= 3) {
      super.log(message, context);
      this.writeMessageToFile(PATH_TO_LOG_FILE, `[LOG] ${message} ${context}`);
    }
  }

  debug(message: any, context?: string) {
    if (this.log_level >= 4) {
      super.debug(message, context);
      this.writeMessageToFile(
        PATH_TO_LOG_FILE,
        `[DEBUG] ${message} ${context}`,
      );
    }
  }

  verbose(message: any, context?: string) {
    if (this.log_level >= 5) {
      super.verbose(message, context);
      this.writeMessageToFile(
        PATH_TO_LOG_FILE,
        `[VERBOSE] ${message} ${context}`,
      );
    }
  }

  writeMessageToFile(pathToFile = PATH_TO_LOG_FILE, message = 'From logger') {
    this.checkRotate(pathToFile);

    const dir = path.dirname(pathToFile);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    if (!existsSync(pathToFile)) {
      writeFileSync(pathToFile, '');
    }

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
