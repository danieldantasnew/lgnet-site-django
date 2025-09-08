import showRestoreResourcesBtn, {
  hiddenRestoreResourcesBtn,
  isInitialValues,
} from "./restoreResources.js";
import { syncHighlight } from "./highlights.js";
import hightlightLettersActionButton, { addBold, removeBold } from "./boldLetters.js";
import hiddenImagesActionButton, { hiddenImage, showImage } from "./hiddenImages.js";
import highlightLinksActionButton, { activateHighlightLinks, disableHighlightLinks } from "./links.js";
import {
  applyInitStateOfReadingMode,
  readerModeActionButton,
  removeSpeechSynthesis,
} from "./readingMode.js";
import stopSoundsButton, { pauseSounds, playSounds } from "./stopSounds.js";
import { applyInitStateOfLine, lineSpacingButton, resetLineSpacing } from "./lineSpacing.js";
import { applyInitStateOfLetter, letterSpacingButton, resetLetterSpacing } from "./letterSpacing.js";
import fontSizeActionButton, { decreaseFont, increaseFont } from "./fontSize.js";

function setStateInLocalStorage(state, reset = null) {
  if (reset) {
    localStorage.removeItem("resources");
  } else {
    localStorage.setItem("resources", JSON.stringify(state));
  }
}

function getStateInLocalStorage(state) {
  let data = localStorage.getItem("resources");
  if (data) {
    data = JSON.parse(data);
    Object.keys(data).forEach((key) => {
      state[key] = data[key];
    });

    resources.forEach((resource)=> {
      const stateResource = state[resource.stateItem];
      if(stateResource) {
        resource.applyIfActive();
        showRestoreResourcesBtn();
      }
    });
    
  }
}

export const icons = {
  readerTooltip: `<svg width="64" height="64" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.3471 18.779C17.8531 18.2313 18.4568 17.7739 19.1584 17.4069C19.86 17.0399 20.6051 16.8219 21.3939 16.753C26.0903 16.3784 30.457 16.243 34.494 16.3469C38.531 16.4507 42.2013 16.8141 45.505 17.437C48.8088 18.0598 51.7451 18.9234 54.3141 20.0277C56.8831 21.132 59.0479 22.4973 60.8084 24.1235C66.6768 29.5445 69.6082 35.7509 69.6026 42.7426C69.597 49.7344 67.2993 55.7145 62.7096 60.6831C58.1198 65.6516 52.3402 68.4153 45.3709 68.9742C38.4015 69.5331 31.9826 67.102 26.1143 61.6811C24.3537 60.0548 22.8214 58.0048 21.5173 55.5313C20.2132 53.0577 19.12 50.1989 18.2376 46.9548C17.3552 43.7108 16.7025 40.0807 16.2796 36.0646C15.8566 32.0485 15.6459 27.6848 15.6477 22.9734C15.654 22.1817 15.8123 21.4216 16.1227 20.6932C16.433 19.9648 16.8412 19.3267 17.3471 18.779ZM39.2361 38.9992C38.0435 40.2902 37.4822 41.8201 37.5523 43.5888C37.6224 45.3574 38.303 46.8381 39.594 48.0307C40.8851 49.2233 42.4149 49.7845 44.1836 49.7144C45.9522 49.6444 47.4329 48.9638 48.6255 47.6727C49.8181 46.3817 50.3794 44.8519 50.3093 43.0832C50.2392 41.3145 49.5586 39.8339 48.2676 38.6413C46.9765 37.4487 45.4467 36.8874 43.678 36.9575C41.9094 37.0276 40.4287 37.7082 39.2361 38.9992Z" fill="#0B94CF"/>
    <circle cx="43.8828" cy="43.1211" r="20" fill="white"/>
    <path d="M53.966 39.7469C53.966 40.849 53.7788 41.8992 53.4045 42.8974C53.0302 43.8957 52.5222 44.8021 51.8806 45.6167C51.6972 45.8403 51.4681 45.9601 51.1931 45.9761C50.9181 45.992 50.6736 45.8882 50.4597 45.6646C50.2611 45.457 50.1695 45.2094 50.1847 44.9219C50.2 44.6344 50.2917 44.3709 50.4597 44.1313C50.9181 43.5243 51.2733 42.8455 51.5254 42.0948C51.7774 41.3441 51.9035 40.5615 51.9035 39.7469C51.9035 38.9323 51.7774 38.1577 51.5254 37.4229C51.2733 36.6882 50.9181 36.0174 50.4597 35.4104C50.2764 35.1709 50.1809 34.9073 50.1733 34.6198C50.1656 34.3323 50.2611 34.0768 50.4597 33.8531C50.6583 33.6295 50.899 33.5217 51.1816 33.5297C51.4642 33.5377 51.6972 33.6535 51.8806 33.8771C52.5222 34.6917 53.0302 35.5981 53.4045 36.5964C53.7788 37.5946 53.966 38.6448 53.966 39.7469ZM49.7952 39.7469C49.7952 40.258 49.7188 40.7492 49.566 41.2203C49.4132 41.6915 49.1993 42.1268 48.9243 42.5261C48.7563 42.7656 48.5309 42.8894 48.2483 42.8974C47.9656 42.9054 47.7174 42.7976 47.5035 42.574C47.3049 42.3663 47.2017 42.1148 47.1941 41.8193C47.1865 41.5238 47.2514 41.2403 47.3889 40.9688C47.4806 40.7931 47.5531 40.6014 47.6066 40.3938C47.6601 40.1861 47.6868 39.9705 47.6868 39.7469C47.6868 39.5233 47.6601 39.3077 47.6066 39.1C47.5531 38.8924 47.4806 38.6927 47.3889 38.5011C47.2514 38.2295 47.1865 37.95 47.1941 37.6625C47.2017 37.375 47.3049 37.1275 47.5035 36.9198C47.7174 36.6962 47.9656 36.5884 48.2483 36.5964C48.5309 36.6044 48.7563 36.7281 48.9243 36.9677C49.1993 37.367 49.4132 37.8023 49.566 38.2735C49.7188 38.7446 49.7952 39.2358 49.7952 39.7469ZM41.1327 43.5802C40.1243 43.5802 39.2611 43.2049 38.5431 42.4542C37.825 41.7035 37.466 40.8011 37.466 39.7469C37.466 38.6927 37.825 37.7903 38.5431 37.0396C39.2611 36.2889 40.1243 35.9136 41.1327 35.9136C42.141 35.9136 43.0042 36.2889 43.7222 37.0396C44.4403 37.7903 44.7993 38.6927 44.7993 39.7469C44.7993 40.8011 44.4403 41.7035 43.7222 42.4542C43.0042 43.2049 42.141 43.5802 41.1327 43.5802ZM33.7993 49.3302V48.5636C33.7993 48.0365 33.9292 47.5413 34.1889 47.0781C34.4486 46.615 34.8076 46.2636 35.266 46.024C36.0451 45.6087 36.9236 45.2573 37.9014 44.9698C38.8792 44.6823 39.9563 44.5386 41.1327 44.5386C42.309 44.5386 43.3861 44.6823 44.3639 44.9698C45.3417 45.2573 46.2202 45.6087 46.9993 46.024C47.4577 46.2636 47.8167 46.615 48.0764 47.0781C48.3361 47.5413 48.466 48.0365 48.466 48.5636V49.3302C48.466 49.8573 48.2865 50.3085 47.9274 50.6839C47.5684 51.0592 47.1368 51.2469 46.6327 51.2469H35.6326C35.1285 51.2469 34.6969 51.0592 34.3379 50.6839C33.9788 50.3085 33.7993 49.8573 33.7993 49.3302Z" fill="#0B94CF"/>
    </svg>`,
  readerFailTooltip: `<svg width="64" height="64" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.3466 18.7751C17.8526 18.2274 18.4563 17.77 19.1579 17.403C19.8595 17.036 20.6046 16.818 21.3934 16.7491C26.0898 16.3745 30.4565 16.2391 34.4935 16.343C38.5305 16.4468 42.2008 16.8102 45.5045 17.4331C48.8083 18.0559 51.7446 18.9195 54.3136 20.0238C56.8827 21.1281 59.0474 22.4933 60.8079 24.1196C66.6763 29.5406 69.6077 35.747 69.6021 42.7387C69.5965 49.7305 67.2988 55.7106 62.7091 60.6792C58.1193 65.6477 52.3398 68.4114 45.3704 68.9703C38.401 69.5292 31.9821 67.0981 26.1138 61.6772C24.3533 60.0509 22.8209 58.0009 21.5168 55.5274C20.2127 53.0538 19.1195 50.195 18.2371 46.9509C17.3547 43.7068 16.7021 40.0768 16.2791 36.0607C15.8561 32.0446 15.6455 27.6809 15.6472 22.9695C15.6535 22.1778 15.8118 21.4177 16.1222 20.6893C16.4325 19.9609 16.8407 19.3228 17.3466 18.7751ZM39.2356 38.9953C38.043 40.2863 37.4818 41.8162 37.5518 43.5849C37.6219 45.3535 38.3025 46.8341 39.5935 48.0268C40.8846 49.2194 42.4144 49.7806 44.1831 49.7105C45.9518 49.6404 47.4324 48.9599 48.625 47.6688C49.8176 46.3778 50.3789 44.848 50.3088 43.0793C50.2387 41.3106 49.5581 39.83 48.2671 38.6374C46.976 37.4448 45.4462 36.8835 43.6775 36.9536C41.9089 37.0237 40.4282 37.7043 39.2356 38.9953Z" fill="#EF0000"/>
        <circle cx="43.8823" cy="43.1172" r="20" fill="white"/>
        <path d="M38.2772 35.3946C37.7566 34.874 36.9111 34.874 36.3905 35.3946C35.8698 35.9153 35.8698 36.7608 36.3905 37.2814L42.1132 43L36.3946 48.7228C35.874 49.2434 35.874 50.0889 36.3946 50.6095C36.9153 51.1302 37.7608 51.1302 38.2814 50.6095L44 44.8868L49.7228 50.6054C50.2434 51.126 51.0889 51.126 51.6095 50.6054C52.1302 50.0847 52.1302 49.2392 51.6095 48.7186L45.8868 43L51.6054 37.2772C52.126 36.7566 52.126 35.9111 51.6054 35.3905C51.0847 34.8698 50.2392 34.8698 49.7186 35.3905L44 41.1132L38.2772 35.3946Z" fill="#EF0000"/>
    </svg>`,
};

export const initialState = {
  readerMode: null,
  stopSounds: false,
  highlightLinks: false,
  hiddenImgs: false,
  increaseFontSize: false,
  highlightLetters: false,
  letterSpacing: 0,
  lineSpacing: 0,
};

const stateObj = { ...initialState };

export const state = new Proxy(stateObj, {
  set(target, prop, value) {
    target[prop] = value;

    const isInitialState = isInitialValues();
    if (isInitialState) {
      setStateInLocalStorage({}, true);
      hiddenRestoreResourcesBtn();
    } else {
      setStateInLocalStorage({ ...state });
      showRestoreResourcesBtn();
    }

    syncHighlight();

    return true;
  },
});

export const resources = [
  {
    name: "bold",
    numberOfIndicators: 1,
    stateItem: "highlightLetters",
    applyIfActive: addBold,
    action: hightlightLettersActionButton,
    reset: removeBold,
  },
  {
    name: "sem_imagem",
    numberOfIndicators: 1,
    stateItem: "hiddenImgs",
    applyIfActive: hiddenImage,
    action: hiddenImagesActionButton,
    reset: showImage,
  },
  {
    name: "link",
    numberOfIndicators: 1,
    stateItem: "highlightLinks",
    applyIfActive: activateHighlightLinks,
    action: highlightLinksActionButton,
    reset: disableHighlightLinks,
  },
  {
    name: "tamanho_fonte",
    numberOfIndicators: 1,
    stateItem: "increaseFontSize",
    applyIfActive: increaseFont,
    action: fontSizeActionButton,
    reset: decreaseFont,
  },
  {
    name: "sem_som",
    numberOfIndicators: 1,
    stateItem: "stopSounds",
    applyIfActive: pauseSounds,
    action: stopSoundsButton,
    reset: playSounds,
  },
  {
    name: "espaco_entre_linhas",
    numberOfIndicators: 3,
    stateItem: "lineSpacing",
    applyIfActive: applyInitStateOfLine,
    action: lineSpacingButton,
    reset: resetLineSpacing,
  },
  {
    name: "espaco_entre_letras",
    numberOfIndicators: 3,
    stateItem: "letterSpacing",
    applyIfActive: applyInitStateOfLetter,
    action: letterSpacingButton,
    reset: resetLetterSpacing,
  },
  {
    name: "leitor",
    numberOfIndicators: 3,
    stateItem: "readerMode",
    applyIfActive: applyInitStateOfReadingMode,
    action: readerModeActionButton,
    reset: () => removeSpeechSynthesis(true),
  },
];

document.addEventListener("DOMContentLoaded", () => {
  getStateInLocalStorage(stateObj);
});
