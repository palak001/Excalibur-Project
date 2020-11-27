export let login = 'none';
export let userMail = '';
document.getElementById('user').style.display = login;

export function modifyGeoLocatorON( value ) { geoLocatorON = value; }

export function modifyUserMail(value) {
    if(value === 'none') {
        userMail = '';
        login = 'none';
    }
    else {
        userMail = value.user.email;
        login = 'inline';
        // console.log('login');
        // console.log(login);
    }
    document.getElementById('user').style.display = login;
    var t = document.createTextNode(`${userMail}`);
    document.getElementById('user').appendChild(document.createElement('span').appendChild(t));
}

export function returnUserMail() {
    return userMail;
}