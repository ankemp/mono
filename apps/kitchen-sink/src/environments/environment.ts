// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD_GyLFLv9_Ar_36e9wrI0XDbxh6zduiz0',
    authDomain: 'mono-kitchen-sink.firebaseapp.com',
    databaseURL: 'https://mono-kitchen-sink.firebaseio.com',
    projectId: 'mono-kitchen-sink',
    storageBucket: 'gs://mono-kitchen-sink.appspot.com',
    messagingSenderId: '766031976497'
  },
  auth: {
    providers: ['email', 'google']
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
