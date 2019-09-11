import { environment } from 'src/environments/environment';

export class Constants {
  static WRAPPER_PATH_BASE = environment.local ?
    'http://localhost:4201/api/' :
    'http://devservices.practicevelocity.com/angulartemplate/api/';

  static API_PATH_BASE = environment.local ?
    'http://localhost:5000/api/' :
    'http://devservices.practicevelocity.com/messagingapi/api/';
}
