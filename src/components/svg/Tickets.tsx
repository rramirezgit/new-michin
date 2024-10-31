import React from 'react';

const TicketsIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 21" fill="none" style={style || {}}>
    <g clipPath="url(#clip0_4921_115212)">
      <path
        d="M25.374 18.4277C25.3017 18.6464 25.2516 18.8757 25.1532 19.0818C24.6454 20.1453 23.7813 20.6287 22.6161 20.6278C18.396 20.6244 14.1758 20.6264 9.95573 20.6264C7.75744 20.6264 5.55914 20.6229 3.36087 20.6282C2.45982 20.6303 1.70902 20.3226 1.15139 19.6009C0.806863 19.155 0.626982 18.6467 0.626089 18.0799C0.625024 17.4033 0.624808 16.7268 0.626045 16.0503C0.626752 15.6639 0.80855 15.4786 1.1958 15.4557C1.51596 15.4368 1.84525 15.4531 2.15397 15.382C3.11839 15.1599 3.79462 14.2249 3.71226 13.2773C3.61994 12.2151 2.83408 11.4268 1.79455 11.359C1.58588 11.3454 1.37576 11.3545 1.16698 11.342C0.808555 11.3206 0.627228 11.1274 0.626279 10.7699C0.624439 10.0773 0.622024 9.38465 0.626873 8.69207C0.635768 7.42163 1.6662 6.31162 2.93128 6.19358C3.08038 6.17967 3.22963 6.13109 3.37124 6.07826C8.69695 4.09161 14.0217 2.10246 19.3468 0.113963C20.2457 -0.22173 21.1448 0.205067 21.4558 1.11968C22.0062 2.73814 22.5536 4.35764 23.0995 5.97762C23.1451 6.11277 23.1948 6.20733 23.3581 6.24834C24.4356 6.51893 25.093 7.20464 25.3316 8.29095C25.338 8.3202 25.3595 8.34612 25.374 8.3736V10.9838C25.2333 11.2586 25.0058 11.3654 24.7025 11.3481C24.5345 11.3386 24.3648 11.3481 24.1965 11.3591C23.3426 11.4148 22.6146 11.9956 22.375 12.8082C22.1288 13.6436 22.4226 14.5208 23.1073 15.0429C23.5771 15.4012 24.1135 15.481 24.6786 15.4539C24.9865 15.4391 25.2288 15.5306 25.374 15.8175C25.374 16.6876 25.374 17.5577 25.374 18.4277ZM1.68754 10.2921C3.5072 10.3546 4.73126 11.8084 4.75289 13.3254C4.76349 14.0688 4.5507 14.7388 4.08453 15.3184C3.47005 16.0824 2.66088 16.4707 1.66405 16.5059C1.66405 16.8344 1.65878 17.1475 1.66553 17.4603C1.6723 17.7736 1.64937 18.0954 1.71292 18.398C1.86401 19.1175 2.49446 19.5852 3.27007 19.5868C5.07417 19.5906 6.87828 19.5881 8.68239 19.5875C8.73643 19.5874 8.79047 19.579 8.87299 19.572C8.87299 19.3947 8.86206 19.2261 8.87533 19.0595C8.90055 18.7429 9.11647 18.5468 9.41015 18.5569C9.70249 18.5669 9.89991 18.7813 9.90534 19.0984C9.90804 19.2566 9.90581 19.4148 9.90581 19.5881C10.0317 19.5881 10.1271 19.5881 10.2224 19.5881C13.8064 19.5881 17.3905 19.5881 20.9745 19.5881C21.5705 19.5881 22.1666 19.5938 22.7625 19.5864C23.5236 19.577 24.203 19.0797 24.2887 18.3659C24.3618 17.7567 24.3038 17.1317 24.3038 16.5135C22.4512 16.451 21.2373 14.9478 21.2419 13.3922C21.2466 11.8242 22.4886 10.3504 24.3353 10.2898C24.3353 9.82612 24.3377 9.36091 24.3348 8.89573C24.3284 7.84462 23.6957 7.21366 22.6471 7.21351C18.4912 7.2129 14.3353 7.21326 10.1794 7.21325H9.90588C9.90588 7.37822 9.90648 7.51372 9.90576 7.64921C9.90382 8.01073 9.7222 8.23035 9.41496 8.24359C9.0965 8.25731 8.88497 8.03925 8.86948 7.67413C8.86316 7.52495 8.86844 7.37528 8.86844 7.21837C6.92191 7.21837 5.01342 7.19992 3.1056 7.2278C2.38196 7.23837 1.74937 7.82394 1.69721 8.49185C1.65106 9.08283 1.68754 9.68026 1.68754 10.2921ZM22.0292 6.15809C22.0335 6.11971 22.0407 6.10238 22.0362 6.08903C21.5067 4.52378 20.9793 2.9578 20.4434 1.39474C20.3392 1.09078 20.0733 0.977157 19.7649 1.07244C19.696 1.09373 19.6286 1.12029 19.561 1.14555C15.6531 2.60492 11.7452 4.06433 7.83744 5.52401C7.30885 5.72146 6.78081 5.92039 6.25251 6.11864C6.25543 6.13179 6.25836 6.14494 6.26129 6.15809H22.0292Z"
        fill="#2DCDFF"
      />
      <path
        d="M9.90603 11.2249C9.90603 11.5063 9.90891 11.7877 9.90526 12.069C9.90126 12.3765 9.69366 12.602 9.40941 12.6156C9.136 12.6287 8.88588 12.4101 8.87788 12.1049C8.86251 11.5186 8.86212 10.9313 8.87607 10.3449C8.88376 10.022 9.129 9.80893 9.42127 9.82672C9.70358 9.8439 9.90234 10.0688 9.90547 10.3808C9.90829 10.6621 9.90606 10.9435 9.90603 11.2249Z"
        fill="#2DCDFF"
      />
      <path
        d="M9.90632 15.5872C9.90632 15.8685 9.90918 16.1499 9.90554 16.4312C9.90157 16.7381 9.69273 16.9629 9.40928 16.9732C9.13468 16.9832 8.88996 16.7839 8.88212 16.4901C8.86583 15.8801 8.86576 15.2688 8.88414 14.6588C8.8928 14.3713 9.15713 14.165 9.42212 14.186C9.70059 14.2081 9.90075 14.4246 9.90531 14.7191C9.90978 15.0084 9.90628 15.2978 9.90632 15.5872Z"
        fill="#2DCDFF"
      />
    </g>
    <defs>
      <clipPath id="clip0_4921_115212">
        <rect width="24.75" height="20.6282" fill="white" transform="translate(0.624512)" />
      </clipPath>
    </defs>
  </svg>
);

export default TicketsIcon;
