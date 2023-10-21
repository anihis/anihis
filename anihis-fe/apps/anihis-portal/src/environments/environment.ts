// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Local
  //WITHOUT LOCAL BACKEND UNCOMMENT LINE BELOW
  // apiUrl: 'https://portal-geekywiki-qa.azurewebsites.net/api',
  authorityUrl: 'http://localhost:8080/realms/Anihis',
  portalUrl: 'http://localhost:4000',
  apiUrl: 'https://localhost:5101',
  sentryDSN: '',
  //WITHOUT LOCAL BACKEND UNCOMMENT LINE BELOW
  // authorityUrl: 'https://authority-geekywiki-qa.azurewebsites.net/auth/realms/GeekyWiki'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
