var smsSendingDate;
var dbref;
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

var firebaseConfig = {
apiKey: "AIzaSyAqmm0c9RXGEuZKxSc9XcJ9rjZsy46F20I",
authDomain: "pucweb-57bb9.firebaseapp.com",
projectId: "pucweb-57bb9",
storageBucket: "pucweb-57bb9.appspot.com",
messagingSenderId: "670218484177",
appId: "1:670218484177:web:5c6c651b67f15656d988f0",
measurementId: "G-4JN9Z865MX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// Validate Login Data
function validate(){
    var email = document.myForm.email.value;
    var password = document.myForm.pass.value;
    var user;

    if(email != "" && password != "")
    {   
        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
            window.location.replace('registeration.html');
            user = userCredential.user; 
        }).catch((error) => {
            alert(error.message);
        });
        test = "test";
    }
    else
    {
        alert("Please fill out all fields.");
    }
}

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        if(user.email == 'mr.masoodtamboli@gmail.com'){
           window.dbref = db.collection('Test Users');
        }else if(user.email == 'sunrisepuccenter@gmail.com'){
            window.dbref = db.collection('Katraj Users');
        }else if(user.email == 'magarpuccenter@gmail.com'){
            window.dbref = db.collection('Sayyed Nagar Users');
        }else{
            window.dbref = db.collection('Shevalwadi Users');
        }
    }
});

function extendDateBy6(){
    n = new Date();
    y = n.getFullYear();
    m = n.getMonth()+7;
    d = n.getDate()-1;
    sd = n.getDate()-2;
    document.getElementById('expDate').value = d + '-' + m + '-' + y;
    smsSendingDate = sd + '-' + m + '-' + y;
}

function extendDateBy12(){
    n = new Date();
    y = n.getFullYear()+1;
    m = n.getMonth()+1;
    d = n.getDate()-1;
    sd = n.getDate()-2;
    document.getElementById('expDate').value = d + '-' + m + '-' + y;
    smsSendingDate = sd + '-' + m + '-' + y;
}

function uploadData(){
    window.dbref.doc(document.getElementById("vehNum").value).set({
        'Mobile Number': document.getElementById("mobNum").value,
        'Expiry Date': document.getElementById("expDate").value,
        'SMS Sending Date': smsSendingDate,
        'SMS Sent': false,
    }).then(() => {
        alert('Data added Successfully');
    }).catch((error) => {
        alert('Error Writing Data '+error);
    });

    document.getElementById("vehNum").value = "";
    document.getElementById("mobNum").value = "";
    document.getElementById("expDate").value = "";
}

function smsService(){
    todayDate = new Date();
    d = todayDate.getDate();
    m = todayDate.getMonth() + 1;
    y = todayDate.getFullYear();
    finalDate = d + '-' + m + '-' + y;
    window.dbref.where("SMS Sent", "==", false).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data()['SMS Sending Date'] == finalDate)
            {
                sendSMS();
            }
        })
    }).catch((error) => {
        alert("Failed to Send SMS "+error);
        console.log(error);
    });
}

function sendSMS(){
    
}

function logoutUser(){
    firebase.auth().signOut().then(() => {
        window.location.replace('index.html');
    }).cathc((error) => {
        alert("Failed to Logout "+error);
    });
}