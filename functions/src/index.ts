import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);
export const newCustomerNotification = functions.database
    .ref('requests/{uid1}/{uid2}')
    .onCreate((snapshot, context) => {
        const userId = context.params.uid1;
        const pushId = context.params.uid2
        console.log(`New Customer ${userId} with pushId ${pushId}`);

        const newRequest = snapshot.val();
        console.log(newRequest);
        const park = newRequest.park;
        console.log(park);
        const attendedTo = newRequest.attendedTo;
        console.log(attendedTo);
        const customerName = newRequest.name;
        console.log(customerName);
        const uid = newRequest.uid
        console.log(uid);
        const photoURL = newRequest.photoURL;
        console.log(photoURL);

        const payload: admin.messaging.MessagingPayload = {
            notification: {
                title: 'New Customer',
                body: `${customerName} is requesting a ride`,
                icon: photoURL,
            },

        }

        interface Devices {
            uid?: string,
            token: string
        }

        interface Parks {
            address?: string,
            name?: string,
            phoneNumber?: string,
            photoURL?: string,
            uid?: string
        }

        const parkRef = admin.database().ref(park);
        const deviceTokenRef = admin.database().ref('tokens');
        const parks: Array<Parks> = [];
        const devices: Array<Devices> = [];


        parkRef.once('value').then((res) => {
            res.forEach((child) => {
                console.log("Park Ref responses", child.val());
                parks.push(child.val());
                console.log("Parks>>> ", parks);
                console.log("Park number>>>", parks.length);
            })
        }).catch(err => {
            console.log("Error At getting Parks");
        })

        deviceTokenRef.once('value').then((result) => {
            result.forEach((data) => {
                console.log("device Token References ", data.val());
                devices.push(data.val());
                console.log("Devices>>> ", devices);
                console.log("Device number>>> ", devices.length);
            });

            setTimeout(() => {
                const tokens: string[] = []
                console.log("set timeout Devices... ", devices);
                console.log("set timeout parks...", parks);
                devices.forEach((e1) => parks.forEach((e2) => {
                    console.log("e1.uid>>>", e1.uid);
                    console.log("e2.uid>>>", e2.uid);
                    if (e1.uid === e2.uid) {
                        console.log("forEach loop working>>>> ", e1.uid, e2.uid);
                        tokens.push(e1.token);
                        console.log("token arr>> ", tokens);
                        console.log("tokens arr length>> ", tokens.length)
                    } else {
                        console.log("Couldn't find any items");
                    }
                }))
                return admin.messaging().sendToDevice(tokens, payload).then((res) => {
                    console.log("Successfully sent messages ", res);
                }).catch((err) => {
                    console.log("Error sending message ", err);
                })
            }, 1000)

        }).catch(err => {
            console.log("Errors At getting devices tokens");
        })

    })

export const requestAccepted = functions.database
    .ref('requests/{uid1}/{uid2}')
    .onUpdate((change, context) => {
        const userId = context.params.uid1;
        const pushId = context.params.uid2;

        const requestRef = admin.database().ref('/requests/' + userId + '/' + pushId)
        requestRef.once('value').then((snap1) => {

            const cusName = snap1.val().name;
            console.log("customer name>>> ", cusName);
            const photoURL = snap1.val().photoURL;
            console.log("PhotoURL>>> ", photoURL);
            const token = snap1.val().token;
            console.log("token>>> ", token);
            const driverid = snap1.val().attendedToBy;
            const driverRef = admin.database().ref('/users/' + driverid)
            driverRef.once('value').then((snap2) => {
                const driverName = snap2.val().displayName
                console.log("DriverName>>> ", driverName);
                const payload: admin.messaging.MessagingPayload = {
                    notification: {
                        title: 'Request Accepted',
                        body: `${driverName} accepted your request. Tap to negotiate`,
                        icon: photoURL,
                    },
                }
                return admin.messaging().sendToDevice(token, payload).then((res) => {
                    console.log("Sent confirmation request to user>>> ", res);
                }).catch((err) => {
                    console.log("Couldn't send confirmation to " + `${userId}`);
                })
            }).catch((err) => {
                console.log("error from inner>>> ", err);
            })
        }).catch((err) => {
            console.log(err);
        })
    })

