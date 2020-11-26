export let sendEmail = async (email, region, zone) => { 
    let messageBody = `You have entered ${region} which has been declared ${zone} zone.`
    Email.send({ 
      Host: "smtp.gmail.com", 
      Username: "teamamigosxcal@gmail.com", 
      Password: "excalibur2020", 
      To: email, 
      From: "teamamigosxcal@gmail.com", 
      Subject: "Location based notification", 
      Body: messageBody, 
    }) 
      .then(function (message) { 
          console.log(message); 
      }); 
  }