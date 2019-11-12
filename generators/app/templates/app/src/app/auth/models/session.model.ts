import { ApplicationCredentials } from './application-credentials.model';

export class Session {
  isAuthenticated?: boolean;
  appCredentials?: ApplicationCredentials;
}
