export function makeid(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export function getIconUrl(iconId) {
  return `http://openweathermap.org/img/wn/${iconId}@4x.png`
}

export const generateHumanReadableDate = (dateString) => {
  var today = new Date();
  var date = new Date(dateString);

  var secondsDifference = (today.getTime() - date.getTime()) / 1000;
  if (secondsDifference < 60) {
    return 'A few seconds ago';
  }

  var minutesDifference = Math.round(
    (today.getTime() - date.getTime()) / (1000 * 60),
  );

  if (minutesDifference === 1) {
    return minutesDifference + ' minute ago';
  } else if (minutesDifference < 60) {
    return minutesDifference + ' minutes ago';
  }

  var hoursDifference = Math.round(
    (today.getTime() - date.getTime()) / (1000 * 3600),
  );

  if (hoursDifference === 1) {
    return hoursDifference + ' hour ago';
  } else if (hoursDifference <= 24) {
    return hoursDifference + ' hours ago';
  }

  var daysDifference = Math.round(
    (today.getTime() - date.getTime()) / (1000 * 3600 * 24),
  );

  if (daysDifference === 1) {
    return daysDifference + ' day ago';
  } else if (daysDifference <= 8) {
    return daysDifference + ' days ago';
  }

  if (daysDifference < 365) {
    return (
      'on ' +
      date.toLocaleString('default', { month: 'short' }) +
      ' ' +
      date.getDate()
    );
  }

  var diffYears = Math.round(
    (today.getTime() - date.getTime()) / (1000 * 3600 * 24 * 365),
  );
  if (diffYears === 1) {
    return diffYears + ' year ago';
  }

  return diffYears + ' years ago';
};