// functions.js

export function setCookie(cname, cvalue, exdays) {
  document.cookie = `${cname}=${cvalue}; expires=${exdays}; path=/`;
}

export function getCookie(cname = "accessToken") {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

export function checkCookie() {
  let accessToken = getCookie("accessToken");
  return accessToken !== null;
}
