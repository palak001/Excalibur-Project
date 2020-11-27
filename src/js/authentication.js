var firebaseConfig = {
            apiKey: "AIzaSyA33Udlq8psM8SiNN9zB9AtVg8eHAtuFiE",
            authDomain: "excaliber-87adf.firebaseapp.com",
            databaseURL: "https://excaliber-87adf.firebaseio.com",
            projectId: "excaliber-87adf",
            storageBucket: "excaliber-87adf.appspot.com",
            messagingSenderId: "143499356337",
            appId: "1:143499356337:web:5426b346158cda00b3da90",
            measurementId: "G-7VT848HZDE"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          firebase.analytics();
            
          
            
         function toggleSignIn() {
          if (firebase.auth().currentUser) {
            firebase.auth().signOut();
          } else {
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            if (email.length < 4) {
              alert('Please enter an email address.');
              return;
            }
            if (password.length < 4) {
              alert('Please enter a password.');
              return;
            }
            // Sign in with email and pass.
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
              } else {
                alert(errorMessage);
              }
              console.log(error);
              document.getElementById('quickstart-sign-in').disabled = false;
            });
          }
          document.getElementById('quickstart-sign-in').disabled = true;
        }
            
            
        function handleSignUp() {
          var email = document.getElementById('email').value;
          var password = document.getElementById('password').value;
          if (email.length < 4) {
            alert('Please enter an email address.');
            return;
          }
          if (password.length < 4) {
            alert('Please enter a password.');
            return;
          }
          // Create user with email and pass.
          firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
          });
        }

        
        function sendEmailVerification() {
          firebase.auth().currentUser.sendEmailVerification().then(function() {
            // Email Verification sent!
            alert('Email Verification Sent!');
          });
        }
         
        
        
        function sendPasswordReset() {
          var email = document.getElementById('email').value;
          firebase.auth().sendPasswordResetEmail(email).then(function() {
            // Password Reset Email Sent!
            alert('Password Reset Email Sent!');
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/invalid-email') {
              alert(errorMessage);
            } else if (errorCode == 'auth/user-not-found') {
              alert(errorMessage);
            }
            console.log(error);
          });
        }
            
        
      export function initApp() {
          console.log("init app function called");
          // Listening for auth state changes.
          firebase.auth().onAuthStateChanged(function(user) {
            document.getElementById('quickstart-verify-email').disabled = true;
            if (user) {
              // User is signed in.
              var displayName = user.displayName;
              var email = user.email;
              var emailVerified = user.emailVerified;
              var photoURL = user.photoURL;
              var isAnonymous = user.isAnonymous;
              var uid = user.uid;
              var providerData = user.providerData;
              //document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
              document.getElementById('quickstart-sign-in').textContent = 'Sign out';
          //   document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
              if (!emailVerified) {
                document.getElementById('quickstart-verify-email').disabled = false;
              }
            } else {
              // User is signed out.
             // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
              document.getElementById('quickstart-sign-in').textContent = 'Sign in';
              //document.getElementById('quickstart-account-details').textContent = 'null';
            }
            document.getElementById('quickstart-sign-in').disabled = false;
          });
          // [END authstatelistener]

          document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
          document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
          document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
          document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
        }

