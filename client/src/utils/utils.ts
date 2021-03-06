export const setCookie = (name: string, value: any) => {
  var expires = '';
  var date = new Date();
  date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
  expires = '; expires=' + date.toUTCString();
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

export const getCookie = (name: string) => {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const destroyCookie = (name: string) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-EN', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(date);
};
