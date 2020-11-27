export var geoLocatorON = false;
export var login = 'none';
console.log("user:");
document.getElementById('user').style.display = login;

export function modifyGeoLocatorON( value ) { geoLocatorON = value; }
export function modifyLogin(value) {
    login = value;
    document.getElementById('user').style.display = login;
}