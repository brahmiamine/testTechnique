import moment from "moment";
import "moment/locale/fr";

export const formatDate = (createdAt) => {
  const date = moment(createdAt);
  if (date.isSame(moment(), "day")) {
    return date.format("HH:mm");
  } else {
    return date.locale("fr").format("DD MMMM");
  }
};

export function truncate(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num);
}

export function getNextPart(str, start, length) {
  if (str.length <= start) {
    return "";
  }
  const end = start + length;
  return str.length > end ? str.slice(start, end) + "..." : str.slice(start);
}
