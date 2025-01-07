// import admin from 'firebase-admin';
// import serviceAccount from '../path/to/serviceAccountKey.json'; // Update with the correct path to your service account key

// export class FirebaseService {
//   constructor() {
//     this.initializeApp();
//   }

//   initializeApp() {
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//       databaseURL: 'https://<YOUR_PROJECT_ID>.firebaseio.com' // Replace with your Firebase project ID
//     });
//   }

//   async sendMessage(token, payload) {
//     try {
//       const response = await admin.messaging().send({
//         token: token,
//         notification: {
//           title: payload.title,
//           body: payload.body,
//         },
//       });
//       return response;
//     } catch (error) {
//       throw new Error(`Error sending message: ${error.message}`);
//     }
//   }
// }