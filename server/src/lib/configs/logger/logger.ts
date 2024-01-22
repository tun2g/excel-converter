import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModuleAsyncParams } from 'nestjs-pino';
import { Level } from 'pino';
import { HeaderKey, REDACTED_FIELD_MESSAGE, RedactedHeaderKey } from 'src/lib/constants';

const loggerModuleParams: LoggerModuleAsyncParams = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    pinoHttp: {
      level: configService.get<Level>('LOG_LVL'),
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd'T'HH:mm:ss.l'Z'",
          singleLine: configService.get<string>('NODE_ENV') === 'dev',
          errorLikeObjectKeys: ['err', 'error'],
        },
      },
      formatters: {
        level: (label: string) => ({ level: label }),
      },
      genReqId: (req) => req.headers[HeaderKey.X_REQUEST_ID] as string,
      serializers: {
        req(req) {
          const redactedReq = {
            id: req.id,
            method: req.method,
            url: req.url,
            query: req.query,
            params: req.param,
            headers: {},
            remoteAddress: req.remoteAddress,
            remotePort: req.remotePort,
            body: {},
          };
          for (const header in req.headers) {
            if (header.toLowerCase() in RedactedHeaderKey) {
              redactedReq.headers[header] = REDACTED_FIELD_MESSAGE;
            } else {
              redactedReq.headers[header] = req.headers[header];
            }
          }
          const logLvl = configService.get<Level>('logLvl');
          if (logLvl === 'debug' || logLvl === 'trace') {
            redactedReq.body = req.raw.body;
          }
          return redactedReq;
        },
      },
      customReceivedMessage: (req) => {
        return 'Request received: ' + req.headers[HeaderKey.X_REQUEST_ID];
      },
      customSuccessMessage: (_req, res) => {
        return 'Request completed: ' + res.req.headers[HeaderKey.X_REQUEST_ID];
      },
      customErrorMessage: (_error, res) => {
        return 'Request errored: ' + res.req.headers[HeaderKey.X_REQUEST_ID];
      },
    },
  }),
};

export default loggerModuleParams;
