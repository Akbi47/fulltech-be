import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app.config.service';
import { Logger, VersioningType } from '@nestjs/common';
import { GlobalValidationPipe, registerSwagger } from '@libs/infrastructure';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService = app.get(AppConfigService);
  const {
    port,
    host,
    appName,
    appVer,
    allowedOrigins,
    enableApiDoc,
    apiDocPrefix,
    apiPrefix,
  } = appConfigService.AppOptions;

  // api prefix
  app.setGlobalPrefix(apiPrefix);

  app.enableVersioning({ type: VersioningType.URI });

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.useGlobalPipes(GlobalValidationPipe);

  if (enableApiDoc) {
    registerSwagger(app, { appName, appVer, apiPrefix: `/${apiDocPrefix}` });
  }

  app.enableShutdownHooks();

  await app.listen(port, host);
  
  Logger.log(`Server started on http://${host}:${port}/api/v1`, 'Server');
  if (enableApiDoc) {
    Logger.log(
      `Api doc started on http://${host}:${port}/${apiDocPrefix}`,
      'Api Doc',
    );
  }
}
bootstrap();
