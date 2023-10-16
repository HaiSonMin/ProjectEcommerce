const popupWidth = 500;
const popupHeight = 600;

// Calculate the left and top positions to center the popup window
const left = window.screen.width / 2 - popupWidth / 2;
const top = 90;
export default function PopupLogin({ googleLinkURL }) {
  window.open(
    googleLinkURL,
    "_self",
    `width=${popupWidth}px,height=${popupHeight}px,location=yes,left=${left},top=${top}`
  );
}
