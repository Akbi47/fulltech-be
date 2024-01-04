import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private config: ConfigService) { }

  get AppOptions() {
    const allowedOriginsString = this.config.get<string>('ALLOWED_ORIGINS');
    return {
      port: this.config.get('APP_PORT'),
      host: this.config.get('APP_HOST'),
      appName: this.config.get('APP_NAME'),
      appVer: this.config.get('APP_VERSION'),
      apiPrefix: this.config.get('API_PREFIX'),
      allowedOrigins: allowedOriginsString
        ? allowedOriginsString.split(',')
        : '*',
      enableApiDoc: this.config.get<string>('ENABLE_API_DOC'),
      apiDocPrefix: this.config.get<string>('API_DOC_PREFIX'),
    };
  }
}
