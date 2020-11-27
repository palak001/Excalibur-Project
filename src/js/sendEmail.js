export let sendEmail = async (region, zone) => { 
    
    let mail = document.getElementById('user').innerText.trim();
    // console.log("mail");
    // console.log(mail);
    let messageBody = `You have entered ${region} which has been declared ${zone} zone.`
    Email.send({ 
      Host: "smtp.gmail.com", 
      Username: "teamamigosxcal@gmail.com", 
      Password: "excalibur2020", 
      To: `${mail}`, 
      From: "teamamigosxcal@gmail.com", 
      Subject: "Location based notification", 
      Body: messageBody, 
    }) 
      .then(function (message) { 
          console.log(message); 
      }); 
  }