/* @flow */
import WebpushGcmProvider from './gcm'
import WebpushLoggerProvider from '../logger'
import WebpushNotificationCatcherProvider from './notificationCatcher'
// Types
import type {WebpushRequestType} from '../../models/notification-request'

export interface WebpushProviderType {
  id: string,
  send(request: WebpushRequestType): Promise<string>
}

export default function factory ({type, ...config}: Object): WebpushProviderType {
  switch (type) {
    case 'custom':
      return config

    case 'gcm':
      return new WebpushGcmProvider(config)

    case 'notificationcatcher':
      return new WebpushNotificationCatcherProvider('webpush')

    case 'logger':
      return new WebpushLoggerProvider(config, 'webpush')

    default:
      throw new Error(`Unknown webpush provider "${type}".`)
  }
}
