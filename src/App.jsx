import React, { useState, useEffect, useRef } from 'react';
import './app.css';

// ═══════════════════════════════════════════════════════════════════════════════
// FOUNDATION — Design tokens, color palette, type scale, theme mapping
// ═══════════════════════════════════════════════════════════════════════════════

// ─── INLINE SVG ICONS (no external deps) ─────────────────────────────────────
const Icon = ({ size = 14, children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}>{children}</svg>
);
const ArrowUpRight  = ({ size, style }) => <Icon size={size} style={style}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></Icon>;
const ArrowRight    = ({ size, style }) => <Icon size={size} style={style}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></Icon>;
const ExternalLink  = ({ size, style }) => <Icon size={size} style={style}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></Icon>;
const Check         = ({ size, style }) => <Icon size={size} style={style}><polyline points="20 6 9 12 4 9"/></Icon>;
const Twitter       = ({ size, style }) => <Icon size={size} style={style}><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2-4.52 4.5 0 .35.04.7.11 1.03C7.69 5.37 4.07 3.58 1.64.9a4.53 4.53 0 0 0-.61 2.27c0 1.56.8 2.94 2 3.75A4.49 4.49 0 0 1 .96 6v.06c0 2.18 1.55 4 3.6 4.42a4.52 4.52 0 0 1-2.04.08 4.53 4.53 0 0 0 4.22 3.14A9.05 9.05 0 0 1 0 15.54 12.8 12.8 0 0 0 6.92 17.5c8.3 0 12.84-6.88 12.84-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0 0 22 2.92a9 9 0 0 1-2.6.71A4.52 4.52 0 0 0 21.5 1 9 9 0 0 1 23 3z"/></Icon>;
const Mail          = ({ size, style }) => <Icon size={size} style={style}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></Icon>;
const Settings      = ({ size, style }) => <Icon size={size} style={style}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Icon>;
const MousePointer  = ({ size, style }) => <Icon size={size} style={style}><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></Icon>;
const Wind          = ({ size, style }) => <Icon size={size} style={style}><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></Icon>;
const Palette       = ({ size, style }) => <Icon size={size} style={style}><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></Icon>;
const Activity      = ({ size, style }) => <Icon size={size} style={style}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Icon>;

// ─── COLOR PALETTE (Material Design–style 50→950) ──────────────────────────────
// Three monotonic scales. Every step is strictly darker than the one before.
// WCAG rule: steps 50–400 use dark text (neutral.950), steps 500–950 use light text (neutral.50).
const PALETTE = {
  // Downriver — vivid blue (accent / brand)
  downriver: {
    50:  '#EFF0FD',
    100: '#D6DAFA',
    200: '#8C99F0',
    300: '#697DEB',
    400: '#2D4DC3',
    500: '#213B99',
    600: '#0C1A4E',
    700: '#050D31',
  },
  // Jaguar — deep purple (surfaces / text hierarchy)
  jaguar: {
    50:  '#F0F0F9',
    100: '#DAD8F0',
    200: '#B9B5E3',
    300: '#9C95D8',
    400: '#8278CB',
    500: '#695DBE',
    600: '#5344AC',
    700: '#3E3284',
    800: '#2B2260',
    900: '#19133E',
    950: '#03020E',
  },
};

// WCAG contrast-text helper — returns dark or light text color for any swatch
const contrastText = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const L = 0.2126 * r ** 2.2 + 0.7152 * g ** 2.2 + 0.0722 * b ** 2.2;
  return L > 0.18 ? PALETTE.jaguar[950] : PALETTE.jaguar[50];
};

// rgba helper — transparent variants from palette hex values
const alpha = (hex, a) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
};

// ─── TREE BLUEPRINT (custom SVG — viewBox 0 0 256 696) ──────────────────────
// Single blueprint used for all treeline instances
const TREE_BLUEPRINT = new Path2D('M109.944 39.7827C113.382 39.4617 116.775 39.5123 118.92 36.6509C120.804 34.1458 119.182 29.3981 120.048 26.8101C123.011 17.958 125.809 8.96717 128.332 0C131.99 12.5627 136.438 17.2353 134.54 29.4891C138.789 31.9933 137.827 31.1451 139.937 34.742C143.086 40.1142 152.601 48.0648 154.443 54.2823C151.941 56.8717 144.605 56.8366 140.824 57.1171C146.118 62.7152 148.38 64.5751 155.99 67.1671C157.152 69.2656 158.039 70.8573 159.421 72.8374L159.483 74.5226C157.104 76.6609 153.502 76.6513 150.14 77.0363L156.547 88.4284C161.71 90.2477 167.238 92.3076 172.428 93.9406C168.345 97.2793 164.357 100.574 160.129 103.735C164.529 106.642 168.785 109.173 173.803 110.923C167.609 113.752 164.398 114.68 157.922 116.663C167.362 119.496 169.266 119.979 179.104 119.58L176.313 128.505C179.792 128.661 183.504 128.759 186.955 129.006C184.46 132.954 181.868 137.21 179.228 141.023C172.497 141.809 165.622 142.69 158.878 143.266C170.806 149.143 176.698 151.878 189.946 154.254C186.749 158.838 183.827 163.148 180.225 167.426C186.77 168.34 190.936 168.69 197.598 168.572C195.872 172.457 194.27 176.2 192.242 179.942L199.867 184.48C192.153 190.327 184.996 193.578 176.478 198.087C189.087 201.56 195.473 202.537 208.646 201.488C205.683 207.286 203.641 210.898 199.977 216.302C206.027 216.864 211.052 217.389 217.123 217.265C215.308 221.362 212.991 226.965 210.901 230.774C202.355 234.06 193.844 237.429 185.367 240.879C196.319 243.58 204.356 245.461 215.7 246.625C211.987 251.541 208.213 256.127 203.462 260.116C212.31 262.743 217.907 263.64 227.263 263.675C223.73 268.679 220.526 273.145 216.697 277.921C207.821 280.516 199.715 282.828 190.716 284.97C206.907 290.687 216.999 293.586 234.53 295.151C230.481 299.623 226.356 304.022 222.155 308.346C227.284 309.191 233.437 310.367 238.525 310.946C229.635 316.295 223.214 318.177 213.252 321.11C222.843 322.34 231.801 323.56 241.529 323.5C239.412 325.965 230.804 334.991 229.903 336.852C231.567 337.637 232.207 337.66 234.042 337.976L234.132 338.862C231.017 341.679 222.128 346.789 218.188 348.879C229.209 350.64 237.205 351.643 248.507 351.984C243.867 358.3 238.483 365.68 232.763 370.98L208.082 373.451C223.077 379.636 235.919 383.26 252.172 385.18C247.696 391.188 244.478 395.584 239.329 401.065C243.832 402.174 248.624 403.478 253.189 404.166C246.025 410.385 236.318 412.036 227.043 412.826C236.194 417.526 245.255 421.443 255.217 424.152C247.813 429.935 244.231 432.274 235.74 436.267L207.065 426.751C210.2 430.261 213.424 433.979 216.648 437.374C205.703 433.905 184.776 431.813 172.36 428.958C185.271 436.579 198.375 443.869 211.657 450.821L209.794 452.977C200.368 449.672 190.922 446.425 181.455 443.238C185.615 447.369 190.654 452.114 194.593 456.334C194.119 457.284 193.927 457.973 193.012 458.477C183.965 452.381 175.007 446.142 166.158 439.761C162.7 437.286 156.808 432.748 153.398 430.729C160.294 441.827 170.345 463.663 176.787 472.386L177.048 472.751C179.331 475.836 205.463 489.124 210.392 492.227C212.145 493.329 217.508 495.492 219.034 496.918C215.686 496.542 201.613 489.781 197.543 488.025C184.948 482.584 177.839 482.47 169.094 471.502L144.894 440.883C145.382 462.205 145.692 483.532 145.822 504.86C153.997 500.14 155.33 497.654 161.394 490.224C159.985 493.461 158.183 497.978 156.575 501.005C158.403 501.454 159.332 501.729 161.243 501.858L161.442 502.508C153.976 505.193 152.326 506.644 146.228 511.796C146.413 525.422 146.922 540.331 146.709 553.857C151.755 550.829 158.445 547.06 163.168 543.783C157.874 549.117 152.14 554.692 147.046 560.166C147.445 580.744 147.967 601.319 148.62 621.89C148.888 629.739 148.689 664.615 155.475 668.191C161.298 665.454 159.593 635.911 162.563 630.702C163.518 643.861 163.622 663.715 166.887 676.297C168.819 669.442 171.672 637.593 172.291 629.182C174.113 604.247 177.798 577.851 179.551 553.114C180.699 551.292 181.194 550.329 182.095 548.421L182.858 549.48C182.535 565.028 183.6 584.635 184.04 600.417L186.316 680.526C188.674 681.742 191.17 682.918 193.562 684.094C197.302 682.086 202.424 678.532 206.109 676.111C204.246 679.054 202.383 683.159 200.815 686.356C211.128 689.271 221.495 691.98 231.925 694.476C161.525 696.133 88.5898 694.627 17.8708 695.115C27.9262 692.668 38.1335 691.018 48.2068 688.137C59.8537 684.816 70.2721 680.443 81.4653 675.912C83.6736 645.643 83.5195 613.346 85.5628 582.776C88.2399 612.202 92.708 641.987 95.1383 671.512L101.414 668.308C103.502 654.259 103.674 638.102 104.456 623.863C105.924 597.136 105.849 569.829 107.152 543.196L90.554 535.603C95.6374 536.861 101.736 537.865 106.954 538.846L107.364 521.721C101.675 518.964 82.2119 512.536 79.8455 509.702L80.6864 508.678L83.5278 508.542C87.6886 509.248 93.2037 510.814 97.418 511.898C95.92 507.618 94.7176 502.224 93.5935 497.733C94.1256 496.902 94.875 496.777 95.8327 496.421C99.3809 504.265 99.1904 509.644 107.81 512.988C109.278 484.235 109.172 453.972 110.024 424.955C101.356 439.852 92.8428 454.839 84.4855 469.913C89.3771 455.555 93.951 438.247 98.1743 423.535C85.8254 434.886 74.3167 447.976 61.358 459.629C60.8685 458.774 60.9895 457.104 60.9778 456.025C64.2517 451.221 68.0384 446.273 71.511 441.571C64.4634 445.844 58.7957 449.088 51.4573 452.903L49.6217 450.825C56.6974 445.106 68.9157 435.013 76.5284 430.474C58.894 434.166 41.8584 437.508 24.2323 441.472C31.8298 434.501 40.513 426.796 47.751 419.493C36.1597 423.239 24.1876 426.053 12.8129 429.808C10.1193 427.372 7.50267 424.992 4.70386 422.669C9.16849 421.021 12.4595 419.855 16.689 417.645C14.6451 416.995 11.4159 416.067 9.53973 415.276C6.25348 410.768 3.07312 406.185 0 401.53C14.7063 399.494 24.6132 397.251 38.9001 394.631C32.1021 392.689 22.9687 390.284 16.5199 387.904L9.5459 378.721C17.501 377.805 23.9456 376.8 31.7714 374.947C20.8903 369.655 15.3532 367.103 7.45592 357.538L20.5301 357.509C17.71 354.03 15.2377 350.877 12.6032 347.255C26.3065 347.241 34.6569 346.822 47.5936 341.821C42.2627 337.425 36.2182 332.403 31.0853 327.709C30.5215 327.193 27.467 328.225 26.0232 326.557C21.5566 321.399 17.4198 315.019 13.3608 309.635C22.6043 308.742 31.3293 306.988 40.4064 305.079C36.8362 302.791 32.5297 300.316 29.6285 297.31L29.4312 296.297L31.8732 295.315C31.141 292.946 24.2392 282.686 22.2853 278.637C41.8206 278.155 44.3382 274.917 62.3665 282.085C72.3917 277.084 84.8059 271.204 94.2439 265.541C77.8002 267.517 57.7981 270.29 41.4713 271.269C39.8241 269.588 34.3399 264.584 34.0608 262.908L37.5168 262.373C38.5302 260.06 33.5452 252.239 32.329 249.409C39.1009 249.56 52.0788 250.745 57.7356 246.769C59.0838 245.822 59.9005 244.552 61.8461 245.128C70.5815 247.717 77.1354 243.276 86.0619 242.072C73.084 238.186 59.5409 233.973 46.961 228.981C44.8263 224.639 42.7357 220.275 40.6876 215.891C46.4035 215.298 52.2665 214.763 57.937 213.914C51.7454 208.153 50.6357 205.235 47.2856 197.509C56.4637 197.298 62.9365 196.496 72.0135 195.424C67.3255 194.151 62.6505 192.83 57.9899 191.46C55.6813 187.516 53.462 183.519 51.3342 179.474L61.7485 179.638C60.2215 174.868 58.8067 170.593 57.7039 165.696C65.3482 165.796 73.1307 166.044 80.6843 164.771C76.8693 160.975 74.0018 157.029 71.2051 152.431C84.6175 150.779 92.3814 148.044 105.114 143.13C94.7011 143.003 80.8507 142.887 70.8242 140.473C73.8086 138.964 74.5532 139.189 76.1351 136.769C76.0169 133.969 73.7694 131.442 72.4845 128.787C81.0438 128.73 87.3743 129.186 95.1287 125.018C92.1222 122.812 88.563 120.33 85.6645 118.063C84.4745 115.079 83.2521 112.119 82.2525 109.065C87.1956 107.081 91.7764 105.288 96.1826 102.191C91.5399 99.4328 87.6459 97.256 83.4694 93.8203C92.3959 89.0947 94.9905 88.0957 104.78 85.4939C105.313 82.9727 105.853 80.0719 106.58 77.6359L97.7508 73.2891C101.392 68.6144 102.384 66.373 108.744 65.7941C113.569 65.3547 116.221 62.9751 120.055 60.3438L114.621 55.5791C110.968 56.2529 107.028 57.0697 103.359 57.4712L110.582 49.7672L104.567 46.9729C106.336 44.6146 108.237 42.1669 109.944 39.7827ZM116.746 651.96C114.509 662.395 113.035 665.083 108.075 674.668C100.162 677.28 93.401 679.859 85.6728 682.904C92.9115 681.784 100.123 680.484 107.299 679.02C108.353 681.969 106.182 682.554 107.81 683.413C124.297 672.509 123.128 647.879 124.008 630.119C124.73 636.928 126.607 659.346 128.855 664.354L129.824 665.049C131.151 662.161 127.315 596.639 126.565 588.566C125.596 594.035 124.95 598.829 124.303 604.348L123.485 604.531C123.148 601.931 122.798 599.335 122.42 596.741C121.175 574.528 121.182 547.984 120.88 525.427C120.997 517.439 121.065 499.617 119.883 492.073C119.133 502.513 118.281 517.333 118.185 527.819C118.061 531.736 117.648 552.1 117.018 554.684C116.638 534.955 116.039 515.23 115.219 495.514C113.58 504.797 113.437 533.609 113.108 544.713L110.726 612.439C110.185 628.99 110.004 647.248 108.6 663.591C112.297 659.222 113.8 656.903 116.746 651.96ZM172.697 307.787L196.347 305.889L196.649 305.292C190.812 301.735 181.833 299.249 175.041 295.557C168.022 291.745 162.728 285.865 157.042 282.415C160.982 290.093 167.891 300.4 172.697 307.787ZM153.845 172.182L169.603 167.918L171.239 167.269C170.882 166.939 138.81 153.396 135.331 151.84C141.408 158.644 147.513 165.631 153.845 172.182ZM106.866 189.538C95.2504 197.068 82.687 203.991 70.6482 210.921L78.5297 214.119C81.8159 215.54 85.5758 217.061 88.7459 218.637C97.7831 207.292 102.673 199.662 116.836 193.675C118.783 192.852 124.276 191.311 124.565 189.452L122.31 189.424C116.89 189.619 112.287 189.683 106.866 189.538ZM100.398 123.271C104.156 122.075 108.403 120.607 112.199 119.712C121.416 117.44 123.939 115.967 132.492 112.242C127.844 111.052 122.805 109.855 118.26 108.45L100.398 123.271ZM120.866 374.694C107.552 385.097 93.4402 395.25 79.8228 405.317C88.1375 401.766 96.426 398.155 104.688 394.484C111.431 391.584 118.116 388.543 124.73 385.366C133.743 387.081 142.357 388.631 151.226 391.016C142.46 385.981 128.573 379.519 120.866 374.694ZM94.842 313.151L81.7018 313.492C71.819 323.378 61.8722 333.2 51.8616 342.958C61.3992 339.097 70.9768 335.336 80.5928 331.675C93.2318 326.394 99.8408 326.836 113.319 326.207C108.613 324.487 103.882 322.837 99.1265 321.257C107.292 318.473 115.761 315.708 123.836 312.729C114.293 312.854 104.345 312.843 94.842 313.151Z');

// ─── TYPE SCALE ─────────────────────────────────────────────────────────────────
const TYPE = {
  // Display — Big Shoulders Display (hero titles, section headings)
  display: {
    hero: { fontFamily: "'Big Shoulders Display', Impact, sans-serif", fontSize: 'clamp(5rem,15vw,10rem)', fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.03em', lineHeight: 0.75, textTransform: 'uppercase' },
    xl:  { fontFamily: "'Big Shoulders Display', Impact, sans-serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95, textTransform: 'uppercase' },
    lg:  { fontFamily: "'Big Shoulders Display', Impact, sans-serif", fontSize: 'clamp(1.25rem,3vw,2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, textTransform: 'uppercase' },
    md:  { fontFamily: "'Big Shoulders Display', Impact, sans-serif", fontSize: 'clamp(1rem,2.5vw,1.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, textTransform: 'uppercase' },
  },
  // Heading — Syne (design-system section headings)
  heading: {
    xl:  { fontFamily: 'Syne, sans-serif', fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 },
    lg:  { fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 },
    md:  { fontFamily: 'Syne, sans-serif', fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.2 },
    sm:  { fontFamily: 'Syne, sans-serif', fontSize: '1.375rem', fontWeight: 700, lineHeight: 1.3 },
  },
  // Body — Inter
  body: {
    intro: { fontFamily: 'Inter, sans-serif', fontSize: '1.125rem', fontWeight: 300, lineHeight: 1.8 },
    xl:  { fontFamily: 'Inter, sans-serif', fontSize: '1.25rem', fontWeight: 400, lineHeight: 1.6 },
    lg:  { fontFamily: 'Inter, sans-serif', fontSize: '1.125rem', fontWeight: 400, lineHeight: 1.7 },
    md:  { fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 400, lineHeight: 1.7 },
    sm:  { fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.6 },
    xs:  { fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 300, lineHeight: 1.5 },
  },
  // Mono — JetBrains Mono (UI chrome, labels)
  mono: {
    lg: { fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', fontWeight: 500, letterSpacing: '0.35em', textTransform: 'uppercase' },
    md: { fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase' },
    sm: { fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase' },
  },
  // Numeral — Bebas Neue (step numbers, metrics)
  numeral: {
    xl: { fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '2.5rem', fontWeight: 400, letterSpacing: '0.04em', lineHeight: 1 },
  },
  // Label — Barlow Condensed (type tags, badges)
  label: {
    md: { fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif", fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' },
  },
};

// ─── THEME TOKENS ────────────────────────────────────────────────────────────
const THEMES = {
  midnight: {
    bg:           PALETTE.jaguar[950],
    bgSurface:    PALETTE.jaguar[900],
    bgHover:      alpha(PALETTE.downriver[600], 0.07),
    text:         PALETTE.jaguar[50],
    textSecondary: PALETTE.jaguar[300],
    textMuted:    PALETTE.jaguar[400],
    textFaint:    PALETTE.jaguar[500],
    accent:       PALETTE.downriver[300],
    accentSecondary:   PALETTE.downriver[200],
    accentLabel:  PALETTE.jaguar[300],
    accentFaint:    PALETTE.jaguar[500],
    border:       alpha(PALETTE.downriver[300], 0.15),
    borderStrong: alpha(PALETTE.downriver[300], 0.30),
    scanline:     alpha(PALETTE.downriver[400], 0.015),
    dotColor:     alpha(PALETTE.downriver[200], 0.22),
    dotVignette:  PALETTE.jaguar[950],
    dotBloom:     alpha(PALETTE.downriver[500], 0.12),
    navBg:        alpha(PALETTE.jaguar[950], 0.88),
    glitchA:      alpha(PALETTE.downriver[300], 0.9),
    glitchB:      alpha(PALETTE.jaguar[500], 0.8),
    glitchGlow:   alpha(PALETTE.downriver[300], 0.35),
    stroke:       `1px ${PALETTE.jaguar[50]}`,
    selection:    PALETTE.downriver[400],
    scrollThumb:  PALETTE.jaguar[800],
    scrollHover:  PALETTE.downriver[300],
    pulseColor:   PALETTE.downriver[300],
    pulseShadow:  alpha(PALETTE.downriver[300], 0.8),
    toggleLabel:  'SOFT PRIMAL \u2192',
  },
  primal: {
    bg:           PALETTE.jaguar[50],
    bgSurface:    PALETTE.jaguar[100],
    bgHover:      alpha(PALETTE.downriver[600], 0.06),
    text:         PALETTE.jaguar[900],
    textSecondary: PALETTE.jaguar[800],
    textMuted:    PALETTE.jaguar[700],
    textFaint:    PALETTE.jaguar[400],
    accent:       PALETTE.downriver[500],
    accentSecondary:   PALETTE.downriver[400],
    accentLabel:  PALETTE.downriver[500],
    accentFaint:    PALETTE.jaguar[300],
    border:       alpha(PALETTE.jaguar[600], 0.16),
    borderStrong: alpha(PALETTE.jaguar[600], 0.26),
    scanline:     alpha(PALETTE.jaguar[600], 0.022),
    dotColor:     alpha(PALETTE.jaguar[600], 0.14),
    dotVignette:  PALETTE.jaguar[50],
    dotBloom:     alpha(PALETTE.downriver[200], 0.08),
    navBg:        alpha(PALETTE.jaguar[50], 0.98),
    glitchA:      alpha(PALETTE.downriver[300], 0.85),
    glitchB:      alpha(PALETTE.jaguar[400], 0.75),
    glitchGlow:   alpha(PALETTE.downriver[500], 0.18),
    stroke:       `1px ${alpha(PALETTE.jaguar[900], 0.9)}`,
    selection:    PALETTE.downriver[200],
    scrollThumb:  PALETTE.jaguar[200],
    scrollHover:  PALETTE.downriver[500],
    pulseColor:   PALETTE.downriver[400],
    pulseShadow:  alpha(PALETTE.downriver[400], 0.45),
    toggleLabel:  '\u2190 MIDNIGHT',
  },
};

// Convert camelCase theme keys to --kebab-case CSS custom properties
const toKebab = (s) => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const themeToVars = (t) => {
  const vars = {};
  for (const [key, val] of Object.entries(t)) {
    vars[`--${toKebab(key)}`] = val;
  }
  // Expose bg with alpha for backdrop blur effects
  vars['--bg-alpha'] = alpha(t.bg, 0.85);
  return vars;
};


// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS — Reusable UI primitives
// ═══════════════════════════════════════════════════════════════════════════════

// ─── TAG (category label, reusable across all sections) ─────────────────────
// Sizes: sm (default), md, lg — all use mono.sm base with size-specific overrides
const Tag = ({ children, t, size = 'sm', onClick }) => (
  <span className={`tag tag--${size}${onClick ? ' tag--clickable' : ''}`}
    style={{ '--tag-color': t.accentLabel }}
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
  >{children}</span>
);

// ─── TAG GLOSSARY DATA ──────────────────────────────────────────────────────
const TAG_GLOSSARY = {
  'CULTURE': {
    title: 'Culture',
    tagline: 'The invisible operating system.',
    body: 'Culture is the layer that cannot be shipped in a deploy. It is how a community talks, what it values, how decisions get made. I pay attention to culture because it decides whether anything you build actually sticks. Technology is the vehicle. Culture is the road.',
  },
  'SOCIAL AI': {
    title: 'Social AI',
    tagline: 'Where behavior meets the machine.',
    body: 'Social AI is the space where human behavior and artificial intelligence actually touch. Not AI that replaces people, but AI that understands how groups think, talk, and connect. I care about this layer because it decides whether technology pulls us closer or pushes us apart.',
  },
  'COMMUNITY AI': {
    title: 'Community AI',
    tagline: 'Intelligence built from the group up.',
    body: 'Community AI uses the real signals a group generates, messages, voice time, reactions, contribution, to surface who is active, what matters, and what the community actually cares about. The goal is not to automate community management. The goal is to make invisible contribution visible so the right behavior gets recognized and reinforced.',
  },
  'BRAND': {
    title: 'Brand',
    tagline: 'The system that makes everything feel like one thing.',
    body: 'Brand is not a logo or a color palette. It is the decision architecture that makes every touchpoint feel like it came from the same source. A strong brand compresses trust, because people already know what to expect. I build brand systems as behavioral infrastructure, starting from the identity a product needs to create, not the aesthetics a client wants to express.',
  },
  'NETWORK': {
    title: 'Network',
    tagline: 'Value that compounds with every node.',
    body: 'A network is not a list of users. It is a system where each person added increases the value for everyone already there. Designing for network effects means designing for the interactions between people, not just the features they use alone. The hardest part is the cold start. The second hardest part is keeping the density once you have it.',
  },
  'DESIGN': {
    title: 'Design',
    tagline: 'Clarity you can feel.',
    body: 'Design is not decoration. It is the quiet decision about what matters and what gets cut. Good design removes friction you never knew was there. I treat design as a behavioral tool, not a visual one. Underneath that sit the rules: balance, contrast, emphasis, movement, proportion, repetition, rhythm, and unity. They are how visual elements get arranged into something organized, clear, and easy to feel. Knowing them is the craft. Knowing when to break them is the taste.',
  },
  'WEB3': {
    title: 'Web3',
    tagline: 'Ownership, rewritten.',
    body: 'Web3 is not about tokens or charts. It is about who gets to own what they help build. I pay attention to it because the best parts of it, real contribution and shared stake, line up with how healthy communities already work. In the age of AI, that matters even more. Ownership, provenance, and knowing what is real become harder every week, and the tools that prove authorship and origin stop being optional.',
  },
  'VIBE CODE': {
    title: 'Vibe Code',
    tagline: 'Building by feel, shipping with intent.',
    body: 'Vibe code is what happens when you stop overthinking the stack and start moving with the idea. Fast, intuitive, a little messy, and closer to how people actually create. I use it to turn half thoughts into working things before the doubt catches up.',
  },
  'VIBE_CODE': {
    title: 'Vibe Code',
    tagline: 'Building by feel, shipping with intent.',
    body: 'Vibe code is what happens when you stop overthinking the stack and start moving with the idea. Fast, intuitive, a little messy, and closer to how people actually create. I use it to turn half thoughts into working things before the doubt catches up.',
  },
  'BUILD': {
    title: 'Build',
    tagline: 'Made, not talked about.',
    body: 'Build means something actually exists now that did not before. A prototype, a flow, a system, a small thing that works. I tag posts with build when the focus is making, not planning.',
  },
  'READING': {
    title: 'Reading',
    tagline: 'Input before output.',
    body: 'Reading is the quiet work behind everything else. Books, essays, research, long threads. I tag things as reading when the point is what went in, not what came out. You cannot think clearly on an empty shelf.',
  },
  'THINKING': {
    title: 'Thinking',
    tagline: 'Working it out loud.',
    body: 'Thinking is the space before the answer. Half formed ideas, open questions, notes to myself. I tag posts with thinking when they are honest drafts of reasoning, not conclusions dressed up as certainty.',
  },
  'AI': {
    title: 'AI',
    tagline: 'The tool we are learning to live with.',
    body: 'AI is not the future. It is the present we are still adjusting to. I lean in early because waiting for change makes it harder to catch up. I would rather adapt while the ground is still moving than try to learn it once it has settled. I write about AI from the user side, not the hype side, because what matters is how it changes the way real people work, decide, and connect.',
  },
  'PRODUCT': {
    title: 'Product',
    tagline: 'Where ideas meet people.',
    body: 'Product is the moment an idea stops being an idea and starts having users. It is the decisions about what to build, what to cut, and what to hold the line on. I care about product because it is where taste and behavior collide.',
  },
  'WCAG': {
    title: 'WCAG',
    tagline: 'Design that leaves no one behind.',
    body: 'WCAG stands for the Web Content Accessibility Guidelines. It is the baseline for making sure the web works for people with different abilities, devices, and situations. I treat it as a floor, not a ceiling. Accessible design is just good design with fewer excuses.',
  },
  'ENTERPRISE': {
    title: 'Enterprise',
    tagline: 'Complexity, made usable.',
    body: 'Enterprise is the world of dashboards, workflows, and tools built for people whose job depends on them. Insurance, banks, internal platforms, anything where the data is dense and the stakes are real. I like this space because there is nowhere to hide. If the design is bad, the user feels it every single day.',
  },
  'BEHAVIOR': {
    title: 'Behavior',
    tagline: 'The why behind every click.',
    body: 'Behavior is the real subject of UX and UI design. Everything else is just surface. I lean on behavioral & persuasion models like Myers-Briggs Type Indicator, Cialdini persuasion, Fogg Behavior & Hook Model, because they explain why people actually do what they do, not what you hope they will. Good design respects behavior. Great design shapes it.',
  },
  'DESIGN SYSTEMS': {
    title: 'Design Systems',
    tagline: 'Consistency as a thinking tool.',
    body: 'Design systems are how I keep quality up without slowing work down. I am a systems thinker, so building on shared components, colors, and rules fits how I work. A strong system also forces clarity: if you want to add something new, you have to explain why. That constraint is the point, not the problem.',
  },
  // Tools
  'CLAUDE': {
    title: 'Claude',
    tagline: 'The daily driver.',
    body: 'Claude is the AI model I use most. In the early days I picked it for writing because the tone of voice felt more human than anything else. Now it is also my daily coding driver. Most of what I write, structure, or ship passes through Claude at some point.',
    url: 'https://claude.ai',
  },
  'FIGMA': {
    title: 'Figma',
    tagline: 'Where the idea becomes a thing you can see.',
    body: 'Figma is where I draft, shape, and refine everything user experience and visual before it becomes code. It is the middle step between thinking and building. Fast enough to keep up with the idea, precise enough to respect it.',
    url: 'https://figma.com',
  },
  'VERCEL': {
    title: 'Vercel',
    tagline: 'Ship it, see it live.',
    body: 'Vercel is where the work goes public. I use it because it removes the gap between writing code and putting something in front of real people. Less friction between the idea and the world.',
    url: 'https://vercel.com',
  },
  'PERPLEXITY': {
    title: 'Perplexity',
    tagline: 'Answers with receipts.',
    body: 'Perplexity is where I go when I need real information with sources, not a confident guess. I also use it as a browser companion, which comes with the subscription, so it sits next to whatever I am reading and answers in context. The part I like most: I can pick which model answers, depending on the question.',
    url: 'https://perplexity.ai',
  },
  'GEMINI': {
    title: 'Gemini',
    tagline: 'Deep research, long context.',
    body: 'Gemini is my main driver for deep research. It covers ground fast and holds long context well, which makes it the right tool when I need to understand a space, not just skim it. I pair it with Claude when I want to turn all that raw text into something interactive I can actually see and think with. As a visual thinker, that step matters.',
    url: 'https://gemini.google.com',
  },
  'AFFINITY': {
    title: 'Affinity',
    tagline: 'Precision without the subscription tax.',
    body: 'Affinity is where I do the heavier visual work. Vector, layout, photo, all in one place, owned outright. I use it when I need control that browser tools cannot give me and when the work deserves something sharper than a quick export.',
    url: 'https://affinity.serif.com',
  },
  'LOVABLE': {
    title: 'Lovable',
    tagline: 'From prompt to working product.',
    body: 'Lovable is what I reach for when I want to productize or prototype an idea fast without the usual setup tax. I use it less now that Claude handles more of that work, but it still earns its place when I want something running in minutes, not hours.',
    url: 'https://lovable.dev',
  },
};

// Normalize tag key for glossary lookup
const glossaryKey = (tag) => {
  const upper = tag.toUpperCase();
  return TAG_GLOSSARY[upper] ? upper : Object.keys(TAG_GLOSSARY).find(k => k === upper) || upper;
};

// ─── OFF-CANVAS GLOSSARY PANEL ──────────────────────────────────────────────
const GlossaryPanel = ({ tag, t, onClose }) => {
  const entry = TAG_GLOSSARY[glossaryKey(tag)];
  if (!entry) return null;

  return (
    <>
      <div className="glossary-overlay" onClick={onClose} />
      <aside className="glossary-panel">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:40 }}>
          <Tag t={t} size="md">{tag}</Tag>
          <button className="glossary-panel__close" onClick={onClose}
            style={{ ...TYPE.mono.sm, letterSpacing:'0.3em', color:t.textMuted, background:'none', border:'none', cursor:'crosshair' }}
          >CLOSE ×</button>
        </div>
        <h2 style={{ ...TYPE.heading.lg, color:t.text, marginBottom:12 }}>{entry.title}</h2>
        <p style={{ ...TYPE.body.intro, color:t.accent, marginBottom:32 }}>{entry.tagline}</p>
        <p style={{ ...TYPE.body.md, color:t.textSecondary }}>{entry.body}</p>
        {entry.url && (
          <a href={entry.url} target="_blank" rel="noopener noreferrer"
            className="glossary-panel__link"
            style={{ ...TYPE.mono.sm, letterSpacing:'0.4em', color:t.accentLabel, marginTop:40, display:'inline-flex', alignItems:'center', gap:10, textDecoration:'none' }}
          >{entry.title.toUpperCase()} <ArrowUpRight size={12} /></a>
        )}
      </aside>
    </>
  );
};

// ─── STATUS BADGE (static indicator for live/archive/version states) ────────
const StatusBadge = ({ status, t, active = false }) => (
  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
    <div style={{
      width: 5, height: 5, borderRadius: '50%',
      background: active ? t.pulseColor : t.accentFaint,
      boxShadow: active ? `0 0 6px ${t.pulseShadow}` : 'none',
      animation: active ? 'pulse 2s infinite' : 'none',
    }} />
    <span style={{
      ...TYPE.mono.sm, fontSize: '0.5625rem',
      letterSpacing: '0.25em',
      color: active ? t.pulseColor : t.textFaint,
    }}>{status}</span>
  </div>
);

// ─── SECTION LABEL ───────────────────────────────────────────────────────────
const SectionLabel = ({ filled, outline, tagline, t }) => {
  const baseStyle = {
    fontFamily: 'Big Shoulders Display, Impact, sans-serif',
    fontSize: '2.5rem',
    fontWeight: 900,
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: '-0.03em',
    lineHeight: 0.88,
    display: 'block',
  };
  return (
    <div className="section-label">
      <h2 className="section-label__titles" style={{ margin:0 }}>
        <span style={{ ...baseStyle, color: t.text, display:'block' }}>{filled}</span>
        <span style={{ ...baseStyle, color: 'transparent', WebkitTextStroke: t.stroke, display:'block' }}>{outline}</span>
      </h2>
      {tagline && (
        <p className="section-label__tagline" style={{ ...TYPE.body.md, color: t.textMuted }}>{tagline}</p>
      )}
    </div>
  );
};

// ─── HERO SCENE (canvas) ──────────────────────────────────────────────────────
const HeroScene = ({ scrollY, theme, density = 300, fogLevel = 80, fogTopOpacity = 0, fogBottomOpacity = 50 }) => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const stateRef  = useRef(null);

  // Store mutable props in refs so the render loop reads them live
  // without the useEffect needing to restart
  const propsRef = useRef({ density, fogLevel, fogTopOpacity, fogBottomOpacity });
  propsRef.current = { density, fogLevel, fogTopOpacity, fogBottomOpacity };

  // Stars and particles are created once and persist across density changes
  const starsRef = useRef(null);
  const particlesRef = useRef(null);
  if (!starsRef.current) {
    starsRef.current = Array.from({ length: 180 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.55,
      r: Math.random() < 0.08 ? 1.4 + Math.random() * 0.8 : Math.random() * 1.0 + 0.15,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.5 + 0.2,
      bloom: Math.random() < 0.12,
    }));
  }
  if (!particlesRef.current) {
    particlesRef.current = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random(),
      y: 0.3 + Math.random() * 0.4,
      vy: -(0.00015 + Math.random() * 0.0006),
      vx: (Math.random() - 0.5) * 0.00012,
      size: 1 + Math.random() * (i % 5 === 0 ? 4 : 2.5),
      alpha: Math.random(),
      phase: Math.random() * Math.PI * 2,
      wobble: 0.0001 + Math.random() * 0.0002,
    }));
  }

  useEffect(() => {
    const isDark = theme === 'midnight';
    const stars = starsRef.current;
    const particles = particlesRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── resize ───────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // stars and particles from refs (persist across density changes)

    // ── seeded RNG — stable per-layer across frames ──────────────────────────
    const seededRng = (seed) => {
      let s = seed;
      return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    };

    // ── blueprint treeline — parabolic valley, SPIRE/SHARD mix ───────────────
    const valleyCurve = (cx) => Math.pow(Math.abs(cx - 0.5) * 2, 2.2);

    const layerConfigs = [
      { factor: 0.30, scale: 0.45, opacity: 0.30, groundBase: 0.92 },
      { factor: 0.35, scale: 0.60, opacity: 0.60, groundBase: 0.95 },
      { factor: 0.35, scale: 0.80, opacity: 1.00, groundBase: 0.98 },
    ];

    // Pre-generate a large pool of trees per layer (max density 500)
    // At render time, only draw up to propsRef.current.density
    const maxDensity = 500;
    const treeLayers = layerConfigs.map((cfg, layerIdx) => {
      const poolSize = Math.round(maxDensity * cfg.factor);
      const rng = seededRng(layerIdx * 7919 + 1);
      const trees = Array.from({ length: poolSize }, () => {
        const cx = rng();
        const centerDip = valleyCurve(cx);
        const baseH = 120 + centerDip * 280;
        const scaleVar = 0.7 + rng() * 0.5;
        const groundY = cfg.groundBase + (rng() - 0.5) * 0.03;
        return { cx, baseH, scaleVar, groundY };
      });
      return { trees, factor: cfg.factor, scale: cfg.scale, opacity: cfg.opacity };
    });

    // ── draw blueprint tree via Path2D ───────────────────────────────────────
    // SVG viewBox is 256×696 — centre at x=128, base at y=696
    const drawBlueprintTree = (ctx, tree, layerScale, w, h, color) => {
      const px = tree.cx * w;
      const py = tree.groundY * h;
      const treePixelH = (tree.baseH / 100) * h * 0.25 * layerScale * tree.scaleVar;
      const scaleFactor = treePixelH / 696;

      ctx.save();
      ctx.translate(px, py);
      ctx.scale(scaleFactor, scaleFactor);
      ctx.translate(-128, -696);  // anchor at centre-bottom of 256×696 viewBox
      ctx.fillStyle = color;
      ctx.fill(TREE_BLUEPRINT);
      ctx.restore();
    };

    stateRef.current = { t: 0 };

    const drawDiamond = (ctx, x, y, r) => {
      ctx.beginPath();
      ctx.moveTo(x,     y - r);
      ctx.lineTo(x + r, y);
      ctx.lineTo(x,     y + r);
      ctx.lineTo(x - r, y);
      ctx.closePath();
    };

    // ── render loop ───────────────────────────────────────────────────────────
    const render = (now) => {
      rafRef.current = requestAnimationFrame(render);
      const s = stateRef.current;
      s.t = now * 0.001;

      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      // ── sky ──
      if (isDark) {
        // gradient: deep top → brighter blue near horizon → dark at bottom
        const sky = ctx.createLinearGradient(0, 0, 0, h);
        sky.addColorStop(0,    PALETTE.jaguar[950]);
        sky.addColorStop(0.45, PALETTE.downriver[700]);
        sky.addColorStop(0.62, PALETTE.downriver[600]);
        sky.addColorStop(0.80, PALETTE.jaguar[900]);
        sky.addColorStop(1,    PALETTE.jaguar[950]);
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, w, h);

        // horizon glow — bright bloom behind the treetops
        const glow = ctx.createRadialGradient(w * 0.5, h * 0.65, 0, w * 0.5, h * 0.65, w * 0.55);
        glow.addColorStop(0,   alpha(PALETTE.downriver[500], 0.30));
        glow.addColorStop(0.3, alpha(PALETTE.jaguar[700], 0.18));
        glow.addColorStop(1,   'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);

        const a2 = 0.06 + 0.04 * Math.sin(s.t * 0.5);
        const glow2 = ctx.createRadialGradient(w * 0.5, h * 0.62, 0, w * 0.5, h * 0.62, w * 0.35);
        glow2.addColorStop(0, alpha(PALETTE.downriver[400], a2));
        glow2.addColorStop(1, 'transparent');
        ctx.fillStyle = glow2;
        ctx.fillRect(0, 0, w, h);
      } else {
        // flat white — no gradient, no glow, no line
        ctx.fillStyle = PALETTE.jaguar[50];
        ctx.fillRect(0, 0, w, h);
      }

      // ── stars (midnight only) — varied sizes, some with bloom ──
      if (isDark) {
        for (const star of stars) {
          const sa = 0.3 + 0.7 * Math.sin(star.phase + s.t * star.speed);
          const sx = star.x * w;
          const sy = star.y * h;
          if (star.bloom) {
            ctx.save();
            ctx.shadowColor = PALETTE.downriver[200];
            ctx.shadowBlur = 6 + 4 * sa;
            ctx.beginPath();
            ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
            ctx.fillStyle = alpha(PALETTE.jaguar[50], sa * 0.9);
            ctx.fill();
            ctx.restore();
          } else {
            ctx.beginPath();
            ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
            ctx.fillStyle = alpha(PALETTE.jaguar[200], sa * 0.85);
            ctx.fill();
          }
        }
      }

      // ── layered treeline — back to front, increasing darkness ──
      const curDensity = propsRef.current.density;
      for (const layer of treeLayers) {
        const count = Math.round(curDensity * layer.factor);
        const layerAlpha = isDark ? layer.opacity : layer.opacity * 0.35;
        const treeCol = isDark
          ? alpha(PALETTE.jaguar[950], layerAlpha)
          : alpha(PALETTE.jaguar[300], layerAlpha * 0.6);
        for (let i = 0; i < count && i < layer.trees.length; i++) drawBlueprintTree(ctx, layer.trees[i], layer.scale, w, h, treeCol);
      }

      // particles — subtle floating diamonds above treeline
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx + p.wobble * Math.sin(s.t * 1.1 + p.phase);
        p.alpha += 0.006 + Math.abs(p.vy) * 4;
        if (p.y < -0.05 || p.x < -0.05 || p.x > 1.05 || p.alpha > 1) {
          p.x     = Math.random();
          p.y     = 0.55 + Math.random() * 0.25;
          p.alpha = 0;
          p.vx    = (Math.random() - 0.5) * 0.00012;
          p.vy    = -(0.00015 + Math.random() * 0.0005);
          p.size  = 1 + Math.random() * 3;
        }
        const fade = Math.sin(p.alpha * Math.PI);
        ctx.save();
        ctx.globalAlpha = fade * (isDark ? 0.55 : 0.30);
        ctx.shadowColor = PALETTE.downriver[300];
        ctx.shadowBlur  = p.size > 2.5 ? 8 : 4;
        drawDiamond(ctx, p.x * w, p.y * h, p.size);
        ctx.fillStyle = isDark
          ? alpha(PALETTE.downriver[200], 0.85)
          : alpha(PALETTE.downriver[400], 0.5);
        ctx.fill();
        ctx.restore();
      }

      // ground fog — reads live from propsRef
      const bgColor = isDark ? PALETTE.jaguar[950] : PALETTE.jaguar[50];
      const p = propsRef.current;
      const fogStart = p.fogLevel / 100;
      const topAlpha = p.fogTopOpacity / 100;
      const botAlpha = p.fogBottomOpacity / 100;
      const fog = ctx.createLinearGradient(0, h * fogStart, 0, h);
      fog.addColorStop(0, 'transparent');
      fog.addColorStop(0.3, alpha(bgColor, topAlpha));
      fog.addColorStop(0.7, alpha(bgColor, botAlpha));
      fog.addColorStop(1, bgColor);
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, w, h);
      // solid fill at very bottom
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, h * 0.95, w, h * 0.05 + 1);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
        opacity: Math.max(0, 1 - scrollY / 480),
        transition: 'opacity 0.08s linear',
      }}
    />
  );
};

// ─── DESIGN SYSTEM PAGE ──────────────────────────────────────────────────────
const DesignSystem = ({ t, onBack }) => {
  const μ = (color, extra = {}) => ({ ...TYPE.mono.sm, letterSpacing: '0.4em', color, ...extra });
  const β = (color, extra = {}) => ({ ...TYPE.mono.sm, letterSpacing: '0.5em', color, ...extra });

  const headingWeights = [
    { weight: 400, label: 'Regular 400' },
    { weight: 500, label: 'Medium 500' },
    { weight: 600, label: 'SemiBold 600' },
    { weight: 700, label: 'Bold 700' },
    { weight: 800, label: 'ExtraBold 800' },
  ];
  const bodyWeights = [
    { weight: 300, label: 'Light 300' },
    { weight: 400, label: 'Regular 400' },
    { weight: 900, label: 'Black 900' },
    { weight: 900, label: 'Black 900 Italic', italic: true },
  ];
  const headingScale = [
    { name: 'Headings/XL',  size: '3.5rem',   px: '56px', weight: 800, lh: '1'    },
    { name: 'Headings/LG',  size: '2.5rem',   px: '40px', weight: 800, lh: '1.1'  },
    { name: 'Headings/MD',  size: '1.75rem',  px: '28px', weight: 700, lh: '1.2'  },
    { name: 'Headings/SM',  size: '1.375rem', px: '22px', weight: 700, lh: '1.3'  },
  ];
  const bodyScale = [
    { name: 'Body/Intro', size: '1.125rem', px: '18px', weight: 300, lh: '1.8' },
    { name: 'Body/XL',    size: '1.25rem',  px: '20px', weight: 400, lh: '1.6', isDefault: true },
    { name: 'Body/LG',    size: '1.125rem', px: '18px', weight: 400, lh: '1.7' },
    { name: 'Body/MD',    size: '1rem',     px: '16px', weight: 400, lh: '1.7' },
    { name: 'Body/SM',    size: '0.875rem', px: '14px', weight: 300, lh: '1.6' },
    { name: 'Body/XS',    size: '0.75rem',  px: '12px', weight: 300, lh: '1.5' },
  ];
  const monoScale = [
    { name: 'Mono/LG', size: '1rem',      px: '16px', weight: 500, ls: '0.35em' },
    { name: 'Mono/MD', size: '0.875rem',  px: '14px', weight: 400, ls: '0.3em',  isDefault: true },
    { name: 'Mono/SM', size: '0.75rem',   px: '12px', weight: 300, ls: '0.25em' },
  ];

  // Palette scales (50→950)
  const paletteScales = [
    { name: 'DOWNRIVER : BLUE',   steps: Object.entries(PALETTE.downriver).map(([step, hex]) => ({ step, hex })) },
    { name: 'JAGUAR : PURPLE',  steps: Object.entries(PALETTE.jaguar).map(([step, hex]) => ({ step, hex })) },
  ];

  // Theme token mapping
  const tokenGroups = [
    { name: 'BACKGROUNDS', tokens: [
      { name: 'bg',        midnight: 'jaguar.950', primal: 'jaguar.50' },
      { name: 'bgSurface', midnight: 'jaguar.900', primal: 'jaguar.100' },
    ]},
    { name: 'TEXT', tokens: [
      { name: 'text',          midnight: 'jaguar.50',  primal: 'jaguar.900' },
      { name: 'textSecondary', midnight: 'jaguar.300', primal: 'jaguar.800' },
      { name: 'textMuted',     midnight: 'jaguar.400', primal: 'jaguar.700' },
      { name: 'textFaint',     midnight: 'jaguar.600', primal: 'jaguar.300' },
    ]},
    { name: 'ACCENT', tokens: [
      { name: 'accent',      midnight: 'downriver.300', primal: 'downriver.500' },
      { name: 'accentSecondary',  midnight: 'downriver.200', primal: 'downriver.400' },
      { name: 'accentLabel', midnight: 'jaguar.400',    primal: 'downriver.500' },
      { name: 'accentFaint',   midnight: 'jaguar.500',    primal: 'jaguar.300' },
    ]},
    { name: 'EFFECTS', tokens: [
      { name: 'pulseColor', midnight: 'downriver.300', primal: 'downriver.400' },
      { name: 'selection',  midnight: 'downriver.400', primal: 'downriver.200' },
    ]},
  ];

  const SectionHeader = ({ num, title, sub }) => (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:48, borderBottom:`1px solid ${t.border}`, paddingBottom:10 }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:16 }}>
        <span style={μ(t.accentFaint)}>{num}</span>
        <span style={μ(t.text, { fontSize:12, letterSpacing:'0.35em' })}>{title}</span>
      </div>
      <span style={μ(t.textFaint, { fontSize:12 })}>{sub}</span>
    </div>
  );

  return (
    <div style={{ maxWidth:960, margin:'0 auto', padding:'160px 24px 160px' }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ marginBottom:112, display:'flex', flexDirection:'column', gap:8 }}>
        <button onClick={onBack} style={{ alignSelf:'flex-start', ...μ(t.textMuted, { letterSpacing:'0.3em' }), background:'none', border:'none', cursor:'crosshair', marginBottom:32, display:'flex', alignItems:'center', gap:8, transition:'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = t.accent}
          onMouseLeave={e => e.currentTarget.style.color = t.textMuted}
        >← RETURN</button>
        <h1 style={{ fontSize:'clamp(3.5rem,10vw,7.5rem)', fontWeight:900, fontStyle:'italic', textTransform:'uppercase', letterSpacing:'-0.07em', color:'transparent', WebkitTextStroke:t.stroke, lineHeight:0.85 }}>BRAND</h1>
        <h1 style={{ fontSize:'clamp(3.5rem,10vw,7.5rem)', fontWeight:900, fontStyle:'italic', textTransform:'uppercase', letterSpacing:'-0.07em', color:t.text, lineHeight:0.85 }}>OPERATING<br/>SYSTEM.</h1>
        <p style={{ ...μ(t.textMuted, { fontSize:12, lineHeight:2 }), maxWidth:480, marginTop:32 }}>
          Visual language / token library / interactive primitives.<br/>The atoms that compose lauwverse.
        </p>
      </div>

      {/* ── 01 TYPOGRAPHY ── */}
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="01" title="FOUNDATION // TYPE" sub="Syne + Inter + JetBrains Mono" />

        {/* Font family cards — one card per typeface */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:1, background:t.border, border:`1px solid ${t.border}`, marginBottom:64 }}>

          {/* Syne — section headings */}
          <div style={{ padding:'40px', background:t.bg }}>
            <span style={{ ...μ(t.accentLabel), padding:'4px 10px', border:`1px solid ${t.borderStrong}`, display:'inline-block', marginBottom:28 }}>HEADINGS</span>
            <div style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:800, color:t.text, lineHeight:1, marginBottom:24 }}>Syne</div>
            <div style={{ fontFamily:'Syne, sans-serif', fontSize:15, color:t.textMuted, lineHeight:1.8, fontWeight:400, marginBottom:36 }}>
              AaBbCcDdEeFfGg<br/>HhIiJjKkLlMmNn<br/>01234567890
            </div>
            <div style={{ border:`1px solid ${t.border}`, display:'flex', flexDirection:'column' }}>
              {headingWeights.map(({ weight, label }, i, arr) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 20px', borderBottom: i < arr.length-1 ? `1px solid ${t.border}` : 'none' }}>
                  <span style={{ fontFamily:'Syne, sans-serif', fontSize:14, fontWeight:weight, color:t.textSecondary }}>{label}</span>
                  <span style={μ(t.textFaint)}>Aa</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inter — body & display */}
          <div style={{ padding:'40px', background:t.bg }}>
            <span style={{ ...μ(t.accentLabel), padding:'4px 10px', border:`1px solid ${t.borderStrong}`, display:'inline-block', marginBottom:28 }}>BODY & DISPLAY</span>
            <div style={{ fontFamily:'Inter, sans-serif', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:900, fontStyle:'italic', color:t.text, lineHeight:1, marginBottom:24 }}>Inter</div>
            <div style={{ fontFamily:'Inter, sans-serif', fontSize:15, color:t.textMuted, lineHeight:1.8, fontWeight:400, marginBottom:36 }}>
              AaBbCcDdEeFfGg<br/>HhIiJjKkLlMmNn<br/>01234567890
            </div>
            <div style={{ border:`1px solid ${t.border}`, display:'flex', flexDirection:'column' }}>
              {bodyWeights.map(({ weight, label, italic }, i, arr) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 20px', borderBottom: i < arr.length-1 ? `1px solid ${t.border}` : 'none' }}>
                  <span style={{ fontFamily:'Inter, sans-serif', fontSize:14, fontWeight:weight, fontStyle: italic ? 'italic' : 'normal', color:t.textSecondary }}>{label}</span>
                  <span style={μ(t.textFaint)}>Aa</span>
                </div>
              ))}
            </div>
          </div>

          {/* JetBrains Mono — UI labels */}
          <div style={{ padding:'40px', background:t.bg }}>
            <span style={{ ...μ(t.accentLabel), padding:'4px 10px', border:`1px solid ${t.borderStrong}`, display:'inline-block', marginBottom:28 }}>UI LABELS</span>
            <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'clamp(1.5rem,3.5vw,2.5rem)', fontWeight:500, color:t.text, lineHeight:1, marginBottom:24 }}>JetBrains<br/>Mono</div>
            <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize:13, color:t.textMuted, lineHeight:1.8, fontWeight:300, marginBottom:36 }}>
              AaBbCcDdEeFfGg<br/>HhIiJjKkLlMmNn<br/>01234567890
            </div>
            <div style={{ border:`1px solid ${t.border}`, display:'flex', flexDirection:'column' }}>
              {[
                { weight: 300, label: 'Light 300' },
                { weight: 500, label: 'Medium 500' },
              ].map(({ weight, label }, i, arr) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 20px', borderBottom: i < arr.length-1 ? `1px solid ${t.border}` : 'none' }}>
                  <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:14, fontWeight:weight, color:t.textSecondary }}>{label}</span>
                  <span style={μ(t.textFaint)}>Aa</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Headings scale */}
        <div style={{ marginBottom:56 }}>
          <span style={{ ...μ(t.textFaint), display:'block', marginBottom:20 }}>HEADINGS SCALE : SYNE</span>
          <div style={{ display:'flex', flexDirection:'column', border:`1px solid ${t.border}` }}>
            {headingScale.map((item, i, arr) => (
              <div key={item.name} style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'20px 24px', borderBottom: i < arr.length-1 ? `1px solid ${t.border}` : 'none', flexWrap:'wrap', gap:8 }}>
                <span style={{ fontFamily:'Syne, sans-serif', fontSize:item.size, fontWeight:item.weight, color:t.text, lineHeight:item.lh }}>{item.name}</span>
                <span style={μ(t.textFaint, { fontSize:12 })}>{item.size} / {item.px}  {item.weight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body scale */}
        <div style={{ marginBottom:56 }}>
          <span style={{ ...μ(t.textFaint), display:'block', marginBottom:20 }}>BODY SCALE : INTER</span>
          <div style={{ display:'flex', flexDirection:'column', border:`1px solid ${t.border}` }}>
            {bodyScale.map((item, i, arr) => (
              <div key={item.name} style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'16px 24px', borderBottom: i < arr.length-1 ? `1px solid ${t.border}` : 'none', flexWrap:'wrap', gap:8 }}>
                <div style={{ display:'flex', alignItems:'baseline', gap:12 }}>
                  <span style={{ fontFamily:'Inter, sans-serif', fontSize:item.size, fontWeight:item.weight, color:t.text, lineHeight:item.lh }}>{item.name}</span>
                  {item.isDefault && <span style={{ ...μ(t.accentLabel), padding:'2px 8px', border:`1px solid ${t.borderStrong}` }}>DEFAULT</span>}
                </div>
                <span style={μ(t.textFaint)}>{item.size} / {item.px}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mono scale */}
        <div>
          <span style={{ ...μ(t.textFaint), display:'block', marginBottom:20 }}>MONO SCALE : JETBRAINS MONO</span>
          <div style={{ display:'flex', flexDirection:'column', border:`1px solid ${t.border}` }}>
            {monoScale.map((item, i, arr) => (
              <div key={item.name} style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'16px 24px', borderBottom: i < arr.length-1 ? `1px solid ${t.border}` : 'none', flexWrap:'wrap', gap:8 }}>
                <div style={{ display:'flex', alignItems:'baseline', gap:12 }}>
                  <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:item.size, fontWeight:item.weight, letterSpacing:item.ls, textTransform:'uppercase', color:t.text }}>{item.name}</span>
                  {item.isDefault && <span style={{ ...μ(t.accentLabel), padding:'2px 8px', border:`1px solid ${t.borderStrong}` }}>DEFAULT</span>}
                </div>
                <span style={μ(t.textFaint)}>{item.size} / {item.px}  {item.weight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 COLOR SYSTEM ── */}
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="02" title="FOUNDATION // COLOR" sub="Palette 50→950 · WCAG" />

        {/* Palette scales — swatches with WCAG contrast text */}
        {paletteScales.map(scale => (
          <div key={scale.name} style={{ marginBottom:48 }}>
            <span style={{ ...μ(t.textFaint), display:'block', marginBottom:16 }}>{scale.name}</span>
            <div style={{ display:'flex', gap:1, background:t.border, border:`1px solid ${t.border}` }}>
              {scale.steps.map(({ step, hex }) => {
                const txtColor = contrastText(hex);
                return (
                  <div key={step} style={{ flex:1, background:hex, display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'12px 6px', minHeight:80 }}>
                    <span style={{ ...TYPE.mono.sm, fontSize:'0.625rem', color:txtColor, letterSpacing:'0.15em' }}>{step}</span>
                    <span style={{ ...TYPE.mono.sm, fontSize:'0.5625rem', color:txtColor, letterSpacing:'0.05em', textTransform:'uppercase' }}>{hex}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Theme token mapping */}
        <div style={{ marginTop:64 }}>
          <span style={{ ...μ(t.textFaint), display:'block', marginBottom:20 }}>TOKEN MAPPING</span>
          <div style={{ display:'grid', gridTemplateColumns:'140px 1fr 1fr', gap:16, marginBottom:16, paddingBottom:10, borderBottom:`1px solid ${t.border}` }}>
            <div />
            <span style={μ(t.textMuted)}>MIDNIGHT</span>
            <span style={μ(t.textMuted)}>PRIMAL</span>
          </div>
          {tokenGroups.map(group => (
            <div key={group.name} style={{ marginBottom:32 }}>
              <span style={{ ...μ(t.textFaint, { fontSize:'0.625rem' }), display:'block', marginBottom:10 }}>{group.name}</span>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {group.tokens.map(token => {
                  const mVal = THEMES.midnight[token.name];
                  const pVal = THEMES.primal[token.name];
                  return (
                    <div key={token.name} style={{ display:'grid', gridTemplateColumns:'140px 1fr 1fr', gap:16, alignItems:'center' }}>
                      <span style={μ(t.textFaint)}>{token.name}</span>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:32, height:18, background:mVal, border:`1px solid rgba(255,255,255,0.06)`, flexShrink:0 }} />
                        <span style={{ ...TYPE.mono.sm, fontSize:'0.625rem', color:t.textFaint, letterSpacing:'0.08em', textTransform:'none' }}>{token.midnight}</span>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:32, height:18, background:pVal, border:`1px solid rgba(0,0,0,0.08)`, flexShrink:0 }} />
                        <span style={{ ...TYPE.mono.sm, fontSize:'0.625rem', color:t.textFaint, letterSpacing:'0.08em', textTransform:'none' }}>{token.primal}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03 TAGS ── */}
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="03" title="COMPONENTS // TAGS" sub="SM · MD · LG : Default + Hover" />

        {/* Tag sizes — full width showcase */}
        <div style={{ display:'flex', flexDirection:'column', border:`1px solid ${t.border}` }}>
          {[
            { size: 'sm', label: 'TAG / SM', desc: '0.5625rem · 3px 8px. Card footers, metadata, lineage', examples: ['SOCIAL AI', 'DESIGN', 'VIBE_CODE', 'WCAG'] },
            { size: 'md', label: 'TAG / MD', desc: '0.625rem · 4px 12px. Signal badges, process tools, filters', examples: ['BUILD', 'READING', 'THINKING', 'CLAUDE'] },
            { size: 'lg', label: 'TAG / LG', desc: '0.75rem · 5px 14px. Prominent labels, standalone usage', examples: ['AI', 'PRODUCT', 'WEB3'] },
          ].map((row, i, arr) => (
            <div key={row.size} style={{ display:'grid', gridTemplateColumns:'200px 1fr', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ padding:'28px 24px', borderRight:`1px solid ${t.border}`, display:'flex', flexDirection:'column', justifyContent:'center', gap:6 }}>
                <span style={μ(t.accentLabel)}>{row.label}</span>
                <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:t.textFaint, letterSpacing:'0.1em', textTransform:'none', lineHeight:1.6 }}>{row.desc}</span>
              </div>
              <div style={{ padding:'28px 24px', display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
                {row.examples.map(ex => (
                  <Tag key={ex} t={t} size={row.size}>{ex}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tag hover behaviour note */}
        <div style={{ marginTop:16, display:'flex', alignItems:'center', gap:12 }}>
          <span style={μ(t.textFaint, { fontSize:10 })}>HOVER</span>
          <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:t.textFaint, letterSpacing:'0.08em', textTransform:'none' }}>border → accent · color → accentSecondary</span>
        </div>
      </section>

      {/* ── 04 BUTTONS & LINKS ── */}
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="04" title="COMPONENTS // ACTIONS" sub="Buttons · Links · Navigation" />

        {/* Buttons — state matrix */}
        <div style={{ display:'flex', flexDirection:'column', border:`1px solid ${t.border}` }}>
          {[
            {
              label: 'PRIMARY_CTA',
              desc: 'Hero action. Bold accent underline',
              states: [
                { name: 'DEFAULT', el: <button style={{ ...β(t.text), background:'none', border:'none', borderBottom:`2px solid ${t.accent}`, paddingBottom:4, cursor:'crosshair' }}>DISCOVER</button> },
                { name: 'HOVER', el: <button style={{ ...β(t.accentSecondary), background:'none', border:'none', borderBottom:`2px solid ${t.accentSecondary}`, paddingBottom:4, cursor:'crosshair' }}>DISCOVER</button> },
              ],
            },
            {
              label: 'SECONDARY_LINK',
              desc: 'Subdued. Dim accent underline',
              states: [
                { name: 'DEFAULT', el: <button style={{ ...β(t.accentFaint), background:'none', border:'none', borderBottom:`1px solid ${t.accentFaint}`, paddingBottom:4, cursor:'crosshair' }}>BRAND_OS →</button> },
                { name: 'HOVER', el: <button style={{ ...β(t.accent), background:'none', border:'none', borderBottom:`1px solid ${t.accent}`, paddingBottom:4, cursor:'crosshair' }}>BRAND_OS →</button> },
              ],
            },
            {
              label: 'NAV_LINK',
              desc: 'Section navigation. Active shows accent underline',
              states: [
                { name: 'DEFAULT', el: <span style={{ ...μ(t.text), borderBottom:'2px solid transparent', paddingBottom:4 }}>LAB</span> },
                { name: 'HOVER', el: <span style={{ ...μ(t.accentFaint), borderBottom:`2px solid ${t.accentFaint}`, paddingBottom:4 }}>LAB</span> },
                { name: 'ACTIVE', el: <span style={{ ...μ(t.text), borderBottom:`2px solid ${t.accent}`, paddingBottom:4 }}>LAB</span> },
              ],
            },
            {
              label: 'THEME_TOGGLE',
              desc: 'Nav element. Bordered box, fill on hover',
              states: [
                { name: 'DEFAULT', el: <button style={{ ...μ(t.accentSecondary), padding:'6px 14px', border:`1px solid ${t.borderStrong}`, background:'transparent', cursor:'crosshair', letterSpacing:'0.3em' }}>{t.toggleLabel}</button> },
                { name: 'HOVER', el: <button style={{ ...μ(t.accent), padding:'6px 14px', border:`1px solid ${t.borderStrong}`, background:t.bgHover, cursor:'crosshair', letterSpacing:'0.3em' }}>{t.toggleLabel}</button> },
              ],
            },
            {
              label: 'EXTERNAL_LINK',
              desc: 'Mono label + arrow. Opens in new tab',
              states: [
                { name: 'DEFAULT', el: <span style={{ ...μ(t.accentLabel), display:'flex', alignItems:'center', gap:8 }}>ENTER_KIZUNA <ExternalLink size={10}/></span> },
                { name: 'HOVER', el: <span style={{ ...μ(t.accent), display:'flex', alignItems:'center', gap:8 }}>ENTER_KIZUNA <ExternalLink size={10}/></span> },
              ],
            },
          ].map((item, i, arr) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'200px 1fr', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ padding:'28px 24px', borderRight:`1px solid ${t.border}`, display:'flex', flexDirection:'column', justifyContent:'center', gap:6 }}>
                <span style={μ(t.accentLabel)}>{item.label}</span>
                <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:t.textFaint, letterSpacing:'0.1em', textTransform:'none', lineHeight:1.6 }}>{item.desc}</span>
              </div>
              <div style={{ padding:'28px 24px', display:'flex', gap:32, alignItems:'center' }}>
                {item.states.map(s => (
                  <div key={s.name} style={{ display:'flex', flexDirection:'column', gap:10, alignItems:'flex-start' }}>
                    <span style={μ(t.textFaint, { fontSize:9 })}>{s.name}</span>
                    {s.el}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 05 INDICATORS & STATUS ── */}
      <section style={{ marginBottom:128 }}>
        <SectionHeader num="05" title="COMPONENTS // STATUS" sub="Indicators · Badges" />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:t.border, border:`1px solid ${t.border}` }}>
          {/* Active indicator */}
          <div style={{ padding:'40px', background:t.bg, display:'flex', flexDirection:'column', gap:28 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <span style={μ(t.accentLabel)}>ACTIVE_INDICATOR</span>
              <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:t.textFaint, letterSpacing:'0.1em', textTransform:'none' }}>Pulsing dot. Live / in-progress state</span>
            </div>
            <div style={{ display:'flex', gap:32, alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:t.pulseColor, boxShadow:`0 0 8px ${t.pulseShadow}`, animation:'pulse 2s infinite' }} />
                <span style={μ(t.pulseColor)}>ACTIVE</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:t.accentFaint }} />
                <span style={μ(t.textFaint)}>INACTIVE</span>
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div style={{ padding:'40px', background:t.bg, display:'flex', flexDirection:'column', gap:28 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <span style={μ(t.accentLabel)}>STATUS_BADGE</span>
              <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:t.textFaint, letterSpacing:'0.1em', textTransform:'none' }}>Project lifecycle: live, archive, version</span>
            </div>
            <div style={{ display:'flex', gap:16, alignItems:'center' }}>
              <StatusBadge status="LIVE" t={t} active />
              <StatusBadge status="ARCHIVE" t={t} />
              <StatusBadge status="v1.7" t={t} />
            </div>
          </div>

          {/* Section label */}
          <div style={{ padding:'40px', background:t.bg, display:'flex', flexDirection:'column', gap:28 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <span style={μ(t.accentLabel)}>SECTION_LABEL</span>
              <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:t.textFaint, letterSpacing:'0.1em', textTransform:'none' }}>Filled + stroke headline pair</span>
            </div>
            <div style={{ transform:'scale(0.65)', transformOrigin:'left center' }}>
              <SectionLabel filled="Signal" outline="Feed" t={t} />
            </div>
          </div>

          {/* Filter button */}
          <div style={{ padding:'40px', background:t.bg, display:'flex', flexDirection:'column', gap:28 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <span style={μ(t.accentLabel)}>FILTER_BUTTON</span>
              <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:t.textFaint, letterSpacing:'0.1em', textTransform:'none' }}>Toggle filter. Active / inactive states</span>
            </div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <span style={{ ...TYPE.mono.sm, fontSize:'0.625rem', letterSpacing:'0.25em', color:t.text, background:alpha(t.accent, 0.12), border:`1px solid ${t.accent}`, padding:'6px 14px' }}>ACTIVE</span>
              <span style={{ ...TYPE.mono.sm, fontSize:'0.625rem', letterSpacing:'0.25em', color:t.textFaint, border:`1px solid ${t.border}`, padding:'6px 14px' }}>INACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 SPACING & GRID ── */}
      <section style={{ marginBottom:64 }}>
        <SectionHeader num="06" title="FOUNDATION // LAYOUT" sub="Grid · Spacing · Borders" />

        <div style={{ display:'flex', flexDirection:'column', gap:48 }}>
          {/* Grid system */}
          <div>
            <span style={{ ...μ(t.textFaint), display:'block', marginBottom:20 }}>GRID</span>
            <div style={{ display:'flex', flexDirection:'column', border:`1px solid ${t.border}` }}>
              {[
                { prop: 'MAX_WIDTH', value: '960px', desc: 'Content container' },
                { prop: 'GUTTER', value: '24px', desc: 'Horizontal padding' },
                { prop: 'GAP_CELL', value: '1px', desc: 'Grid cell separator' },
              ].map((row, i, arr) => (
                <div key={row.prop} style={{ display:'grid', gridTemplateColumns:'160px 100px 1fr', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                  <span style={{ padding:'14px 20px', ...μ(t.text) }}>{row.prop}</span>
                  <span style={{ padding:'14px 20px', ...μ(t.accent), borderLeft:`1px solid ${t.border}` }}>{row.value}</span>
                  <span style={{ padding:'14px 20px', fontFamily:'JetBrains Mono, monospace', fontSize:11, color:t.textFaint, letterSpacing:'0.08em', textTransform:'none', borderLeft:`1px solid ${t.border}` }}>{row.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spacing scale */}
          <div>
            <span style={{ ...μ(t.textFaint), display:'block', marginBottom:20 }}>SPACING SCALE</span>
            <div style={{ display:'flex', gap:1, background:t.border, border:`1px solid ${t.border}` }}>
              {[
                { label: 'XS', value: '8px' },
                { label: 'SM', value: '16px' },
                { label: 'MD', value: '24px' },
                { label: 'LG', value: '48px' },
                { label: 'XL', value: '64px' },
                { label: '2XL', value: '96px' },
                { label: '3XL', value: '128px' },
                { label: '4XL', value: '192px' },
              ].map(step => (
                <div key={step.label} style={{ flex:1, background:t.bg, padding:'20px 8px', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
                  <div style={{ width:parseInt(step.value), height:parseInt(step.value), maxWidth:'100%', maxHeight:48, background:alpha(t.accent, 0.15), border:`1px solid ${alpha(t.accent, 0.3)}` }} />
                  <span style={μ(t.text, { fontSize:10 })}>{step.label}</span>
                  <span style={μ(t.textFaint, { fontSize:9 })}>{step.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Border tokens */}
          <div>
            <span style={{ ...μ(t.textFaint), display:'block', marginBottom:20 }}>BORDERS</span>
            <div style={{ display:'flex', flexDirection:'column', border:`1px solid ${t.border}` }}>
              {[
                { name: 'border', style: `1px solid ${t.border}`, desc: 'Default separator' },
                { name: 'borderStrong', style: `1px solid ${t.borderStrong}`, desc: 'Emphasis / interactive' },
                { name: 'accent', style: `2px solid ${t.accent}`, desc: 'Active state / CTA' },
              ].map((row, i, arr) => (
                <div key={row.name} style={{ display:'grid', gridTemplateColumns:'160px 1fr 1fr', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                  <span style={{ padding:'16px 20px', ...μ(t.text) }}>{row.name}</span>
                  <div style={{ padding:'16px 20px', borderLeft:`1px solid ${t.border}`, display:'flex', alignItems:'center' }}>
                    <div style={{ width:'100%', borderBottom:row.style }} />
                  </div>
                  <span style={{ padding:'16px 20px', fontFamily:'JetBrains Mono, monospace', fontSize:11, color:t.textFaint, letterSpacing:'0.08em', textTransform:'none', borderLeft:`1px solid ${t.border}` }}>{row.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PATTERNS — Composed layouts and interaction flows
// ═══════════════════════════════════════════════════════════════════════════════

// ─── LAB ARTIFACT CANVAS ─────────────────────────────────────────────────────
// Each project gets a unique generative canvas — a living visual fingerprint.
const LabCanvas = ({ type, theme, animating = false }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const animatingRef = useRef(animating);
  const renderRef = useRef(null);
  const hasDrawnRef = useRef(false);

  useEffect(() => { animatingRef.current = animating; }, [animating]);

  // Start/stop animation loop based on animating prop
  useEffect(() => {
    if (animating && renderRef.current) {
      rafRef.current = requestAnimationFrame(renderRef.current);
    }
    if (!animating) {
      cancelAnimationFrame(rafRef.current);
    }
  }, [animating]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const isDark = theme === 'midnight';

    let cw = 0, ch = 0;
    let drawStaticFrame = null; // set by each canvas type
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      canvas.width = cw * devicePixelRatio;
      canvas.height = ch * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      // Redraw static frame on resize if not actively animating
      if (!animatingRef.current && drawStaticFrame) {
        requestAnimationFrame(drawStaticFrame);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const W = () => cw;
    const H = () => ch;

    if (type === 'network') {
      // ── KIZUNA: Network graph — nodes connected by lines ──
      const nodes = Array.from({ length: 40 }, () => ({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        r: 1.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
      }));

      const drawFrame = (now) => {
        const w = W(), h = H();
        ctx.clearRect(0, 0, w, h);
        const time = now * 0.001;
        const nodeColor = isDark ? PALETTE.downriver[300] : PALETTE.downriver[500];
        const lineColor = isDark ? PALETTE.downriver[300] : PALETTE.downriver[400];

        if (animatingRef.current) {
          for (const n of nodes) {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > 1) n.vx *= -1;
            if (n.y < 0 || n.y > 1) n.vy *= -1;
          }
        }

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = (nodes[i].x - nodes[j].x) * w;
            const dy = (nodes[i].y - nodes[j].y) * h;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              const a = (1 - dist / 100) * 0.3;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
              ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
              ctx.strokeStyle = alpha(lineColor, a);
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        for (const n of nodes) {
          const pulse = 0.5 + 0.5 * Math.sin(n.phase + time * 0.8);
          ctx.beginPath();
          ctx.arc(n.x * w, n.y * h, n.r, 0, Math.PI * 2);
          ctx.fillStyle = alpha(nodeColor, 0.3 + pulse * 0.5);
          ctx.fill();
          if (n.r > 3) {
            ctx.beginPath();
            ctx.arc(n.x * w, n.y * h, n.r + 4 * pulse, 0, Math.PI * 2);
            ctx.fillStyle = alpha(nodeColor, pulse * 0.1);
            ctx.fill();
          }
        }
      };

      const render = (now) => {
        drawFrame(now);
        if (animatingRef.current) {
          rafRef.current = requestAnimationFrame(render);
        }
      };
      renderRef.current = render;
      drawStaticFrame = drawFrame;

      // Draw initial static frame after layout (rAF ensures dimensions are ready)
      requestAnimationFrame((now) => {
        drawFrame(now);
        hasDrawnRef.current = true;
      });

      if (animatingRef.current) {
        rafRef.current = requestAnimationFrame(render);
      }

    } else if (type === 'swarm') {
      // ── WOLVES: Pack movement — coordinated swarm particles ──
      const wolves = Array.from({ length: 60 }, (_, i) => {
        const pack = Math.floor(i / 15);
        const cx = 0.2 + pack * 0.25;
        const cy = 0.3 + (pack % 2) * 0.3;
        return {
          x: cx + (Math.random() - 0.5) * 0.15,
          y: cy + (Math.random() - 0.5) * 0.15,
          pack, speed: 0.0004 + Math.random() * 0.0006,
          angle: Math.random() * Math.PI * 2,
          size: 1 + Math.random() * 2,
          trail: [],
        };
      });
      const packTargets = [
        { x: 0.3, y: 0.4 }, { x: 0.7, y: 0.6 },
        { x: 0.5, y: 0.3 }, { x: 0.6, y: 0.7 },
      ];

      const drawFrame = (now) => {
        const w = W(), h = H();
        ctx.clearRect(0, 0, w, h);
        const time = now * 0.001;
        const wolfColor = isDark ? PALETTE.jaguar[300] : PALETTE.jaguar[600];
        const trailColor = isDark ? PALETTE.jaguar[500] : PALETTE.jaguar[400];

        for (let p = 0; p < 4; p++) {
          packTargets[p].x = 0.3 + 0.4 * Math.sin(time * 0.15 + p * 1.5);
          packTargets[p].y = 0.3 + 0.3 * Math.cos(time * 0.12 + p * 2.0);
        }

        for (const wolf of wolves) {
          const target = packTargets[wolf.pack];
          const dx = target.x - wolf.x;
          const dy = target.y - wolf.y;
          const targetAngle = Math.atan2(dy, dx);
          let angleDiff = targetAngle - wolf.angle;
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
          if (animatingRef.current) {
            wolf.angle += angleDiff * 0.03;
            wolf.x += Math.cos(wolf.angle) * wolf.speed;
            wolf.y += Math.sin(wolf.angle) * wolf.speed;
            wolf.trail.push({ x: wolf.x, y: wolf.y });
            if (wolf.trail.length > 12) wolf.trail.shift();
          }

          for (let i = 0; i < wolf.trail.length - 1; i++) {
            const a = (i / wolf.trail.length) * 0.15;
            ctx.beginPath();
            ctx.arc(wolf.trail[i].x * w, wolf.trail[i].y * h, wolf.size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = alpha(trailColor, a);
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(wolf.x * w, wolf.y * h, wolf.size, 0, Math.PI * 2);
          ctx.fillStyle = alpha(wolfColor, 0.7);
          ctx.fill();
        }
      };

      const render = (now) => {
        drawFrame(now);
        if (animatingRef.current) {
          rafRef.current = requestAnimationFrame(render);
        }
      };
      renderRef.current = render;
      drawStaticFrame = drawFrame;

      // Draw initial static frame after layout (rAF ensures dimensions are ready)
      requestAnimationFrame((now) => {
        drawFrame(now);
        hasDrawnRef.current = true;
      });

      if (animatingRef.current) {
        rafRef.current = requestAnimationFrame(render);
      }
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [type, theme]);

  return (
    <canvas ref={canvasRef} aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
};

// ─── LAB ARTIFACTS DATA ──────────────────────────────────────────────────────
const LAB_FEATURED = [
  {
    title: 'KIZUNA',
    desc: 'Discord-native community intelligence platform. Turns messages, voice hours, and real contribution into automatic recognition through Smart Raffles.',
    url: 'https://www.kizuna.gg',
    tags: ['COMMUNITY AI', 'PRODUCT'],
    status: 'LIVE',
    active: true,
    canvas: 'network',
  },
  {
    title: 'WOLVES',
    desc: 'Premier network for builders. Brand architecture and design system for a professional space where founders, creators, investors, and operators level up together.',
    url: 'https://www.wolves.co',
    tags: ['BRAND', 'NETWORK'],
    status: 'LIVE',
    active: false,
    canvas: 'swarm',
  },
];

const LAB_INDEX = [
  { title: 'LAUWVERSE_OS', desc: 'This site. Interactive portfolio, behavioral design playground, and living brand system.', url: '/case/lauwverse-os', tags: ['VIBE_CODE'], status: 'LIVE' },
  { title: 'BRAND_OS', desc: 'Design token library and interactive primitives powering every Lauwverse surface.', url: '#design', tags: ['DESIGN'], status: 'v1.7' },
];

// ─── LAB CARD (featured, with hover-activated canvas) ────────────────────────
const LabCard = ({ project, theme, t, onTagClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <article>
      <a className="lab-card__link" href={project.url} target="_blank" rel="noopener noreferrer"
        style={{ background: hovered ? t.bgHover : t.bg }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="lab-card__visual">
          <LabCanvas type={project.canvas} theme={theme} animating={hovered} />
          <h3 className="lab-card__title" style={{
            ...TYPE.display.xl, color:t.text,
            textShadow: theme === 'midnight' ? '0 2px 20px rgba(3,2,14,0.8)' : '0 2px 20px rgba(240,240,249,0.6)',
          }}>{project.title}</h3>
        </div>

        <div className="lab-card__body">
          <p style={{ ...TYPE.body.sm, color:t.textMuted }}>{project.desc}</p>
        </div>

        <div className="lab-card__footer">
          <div className="lab-card__tags">
            {project.tags.map(tag => (
              <Tag key={tag} t={t} onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTagClick(tag); }}>{tag}</Tag>
            ))}
          </div>
          <span style={{ ...TYPE.mono.sm, fontSize:'0.6875rem', letterSpacing:'0.25em', color: hovered ? t.accent : t.accentFaint, transition:'color 0.3s' }}>ENTER &#8599;</span>
        </div>
      </a>
    </article>
  );
};

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme]           = useState('midnight');
  const [emailCopied, setEmailCopied] = useState(false);
  const [page, setPage]             = useState('home');
  const treeDensityTarget = useRef(200 + Math.floor(Math.random() * 200)).current;
  const [treeDensity, setTreeDensity] = useState(20);
  const fogLevel = 75;
  const fogTopOpacity = 0;
  const fogBottomOpacity = 100;
  const [mousePos, setMousePos]     = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered]   = useState(false);
  const [scrollY, setScrollY]       = useState(0);
  const [signalFilter, setSignalFilter] = useState('ALL');
  const [glossaryTag, setGlossaryTag]   = useState(null);
  const textRef = useRef(null);
  const t = THEMES[theme];

  const openGlossary = (tag) => setGlossaryTag(tag);
  const closeGlossary = () => setGlossaryTag(null);

  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const scrollTimerRef = useRef(null);

  // Animate tree density from sparse → target over ~60 seconds (feels alive)
  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 60000;
    const from = 20;
    const to = treeDensityTarget;
    const ease = (t) => 1 - Math.pow(1 - t, 2.5); // gentle ease-out
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setTreeDensity(Math.round(from + (to - from) * ease(progress)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [treeDensityTarget]);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 150);
    };
    window.addEventListener('scroll', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(scrollTimerRef.current); };
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const ids = ['lab', 'signal', 'protocol'];
    const observers = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [page]);

  // Animate tree density from sparse → target over ~30 seconds (feels alive)
  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 60000;
    const from = 20;
    const to = treeDensityTarget;
    const ease = (t) => 1 - Math.pow(1 - t, 2.5); // gentle ease-out
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setTreeDensity(Math.round(from + (to - from) * ease(progress)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [treeDensityTarget]);

  const handleMouseMove = (e) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const factor = 16;
    setMousePos({
      x: ((e.clientX - (rect.left + rect.width / 2))  / (rect.width  / 2)) * factor,
      y: ((e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2)) * (factor / 2),
    });
  };

  const copyEmail = () => {
    try { navigator.clipboard.writeText('hello@lauwverse.io'); } catch {
      const el = document.createElement('textarea');
      el.value = 'hello@lauwverse.io';
      document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
    }
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const signalLog = [
    { date: '15.APR', title: 'Behavior_vs_Sentiment_Manifesto',  type: 'THINKING', source: 'Lauwverse',    note: 'Why sentiment is the wrong north star for AI products.',         link: '/signal/behavior-vs-sentiment' },
    { date: '12.APR', title: 'Kizuna_v2_Spec_Sprint',            type: 'BUILD',    source: 'Kizuna',       note: 'Smart Raffles v2 and contribution signal tuning.',               link: null },
    { date: '04.APR', title: 'Lauwverse_Portfolio_Rebuild',      type: 'BUILD',    source: 'Self',         note: 'New hero, expanded Lab, full SEO + GEO pass.',                  link: null },
    { date: '01.APR', title: 'Claude_Code_Skills_Architecture',  type: 'READING',  source: 'Anthropic Docs', note: 'How Claude Code skill injection works under the hood.',        link: null },
    { date: '28.MAR', title: 'Agentic_Interface_Sprint',         type: 'BUILD',    source: 'Kizuna',       note: 'Designing for AI agents as first-class users.',                 link: null },
    { date: '25.MAR', title: 'Community_Signal_Processing',      type: 'THINKING', source: 'Research',     note: 'What real contribution looks like vs. what gets counted.',      link: null },
    { date: '22.MAR', title: 'Neural_Design_Tokens_v2',          type: 'BUILD',    source: 'Brand OS',     note: 'Semantic token architecture for dual-theme systems.',           link: null },
  ];

  const signalTypes = ['ALL', 'BUILD', 'READING', 'THINKING'];
  const filteredSignal = signalFilter === 'ALL' ? signalLog : signalLog.filter(s => s.type === signalFilter);

  const lineage = [
    { year: '2020-NOW',  entity: 'LAUW_STUDIO',   role: 'Design Partner',   tags: ['AI', 'PRODUCT', 'VIBE CODE'] },
    { year: '2011-2025', entity: 'LEAD_DESIGNER',  role: 'UX/UI Design',    tags: ['WCAG', 'ENTERPRISE', 'BEHAVIOR', 'DESIGN SYSTEMS'] },
  ];

  // Mono style shortcuts (based on TYPE.mono.sm)
  const μ     = (color, extra = {}) => ({ ...TYPE.mono.sm, letterSpacing: '0.4em', color, ...extra });   // micro label
  const τ     = (color, extra = {}) => ({ ...TYPE.mono.sm, letterSpacing: '0.2em', color, ...extra });   // tiny label
  const β     = (color, extra = {}) => ({ ...TYPE.mono.sm, letterSpacing: '0.5em', color, ...extra });   // btn

  const isGlitching = isHovered || isScrolling;

  const glitchShadow = isGlitching
    ? `${mousePos.x}px ${mousePos.y}px ${t.glitchA}, ${-mousePos.x}px ${-mousePos.y}px ${t.glitchB}, 0 0 30px ${t.glitchGlow}`
    : 'none';

  const futureTitleStyle = {
    ...TYPE.display.hero,
    cursor: 'default', userSelect: 'none',
    color: 'transparent',
    WebkitTextStroke: t.stroke,
    textShadow: glitchShadow,
    transition: 'color 0.5s ease',
    animationDuration: '0.80s',
    animationName: isGlitching ? 'delayed-shard-jitter' : 'none',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'steps(1)',
  };

  return (
    <div className="site" style={themeToVars(t)}>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <header>
      <nav className="nav">
        <div className="nav__brand" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}>
          <div className="nav__pulse" />
          <span style={{ ...μ(t.text), transition:'color 0.5s ease' }}>LAUWVERSE</span>
        </div>
        <div className="nav__links">
          {[{ label:'LAB', id:'lab' }, { label:'SIGNAL', id:'signal' }, { label:'ORIGIN', id:'protocol' }].map(({ label, id }) => (
            <button key={id}
              className={`nav__link${activeSection === id ? ' nav__link--active' : ''}`}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' })}
              style={{ ...TYPE.mono.sm, letterSpacing: '0.4em' }}
            >{label}</button>
          ))}
          <button className="nav__theme-toggle"
            onClick={() => setTheme(theme === 'midnight' ? 'primal' : 'midnight')}
            style={μ(t.accentSecondary)}
          >{t.toggleLabel}</button>
        </div>
      </nav>
      </header>

      {/* ── MAIN ─────────────────────────────────────────────────────────── */}
      {page === 'design' ? (
        <DesignSystem t={t} onBack={() => setPage('home')} />
      ) : (<>

        {/* HERO — full width */}
        <section className="hero animate-in">
          <HeroScene scrollY={scrollY} theme={theme} density={treeDensity} fogLevel={fogLevel} fogTopOpacity={fogTopOpacity} fogBottomOpacity={fogBottomOpacity} />

          {/* HERO TITLE — parallax cross (single semantic h1) */}
          <h1 className="hero__titles">
            <span style={{ ...TYPE.display.hero, color:t.text, transform:`translateY(${scrollY*0.12}px)`, willChange:'transform', transition:'color 0.5s ease', display:'block' }}>PRIMAL</span>
            <span ref={textRef} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { setIsHovered(false); setMousePos({x:0,y:0}); }} style={{ display:'inline-block', overflow:'visible', transform:`translateY(${-scrollY*0.18}px)`, willChange:'transform' }}>
              <span style={{ ...futureTitleStyle, display:'block' }}>FUTURE.</span>
            </span>
          </h1>

          {/* HERO INTRODUCTION — tagline + subline + actions */}
          <div className="hero__intro">
            <div className="hero__intro-copy">
              <p className="hero__tagline-line" style={{ ...TYPE.body.xl, color:t.text }}>
                Designing for behavior, not sentiment.
              </p>
              <p className="hero__subline" style={{ ...TYPE.mono.md, color:t.textMuted }}>
                BEHAVIORAL PRODUCTS AND BRAND SYSTEMS FOR AI COMPANIES.
              </p>
            </div>
            <div className="hero__actions">
              <button className="hero__cta hero__cta--primary"
                onClick={() => document.getElementById('lab')?.scrollIntoView({ behavior:'smooth', block:'start' })}
                style={TYPE.label.md}
              >
                <span className="hero__cta-label">ENTER THE LAB</span>
                <span className="hero__cta-shadow" aria-hidden="true" />
              </button>
              <button className="hero__cta hero__cta--secondary"
                onClick={() => document.getElementById('signal')?.scrollIntoView({ behavior:'smooth', block:'start' })}
                style={TYPE.mono.sm}
              >
                SIGNAL FEED
                <span className="hero__cta-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>

      <main className="main">

        {/* LAB ARTIFACTS */}
        <section id="lab" className="section section--lab">
          <SectionLabel filled="Lab" outline="Output" tagline="What I make. Products, systems, and the things in between." t={t} />

          {/* Featured — 2-column canvas cards */}
          <div role="list" className="lab__grid">
            {LAB_FEATURED.map(project => (
              <LabCard key={project.title} project={project} theme={theme} t={t} onTagClick={openGlossary} />
            ))}
          </div>

          {/* Index — full-width horizontal bars */}
          <div className="lab__index">
            {LAB_INDEX.map(project => (
              <a key={project.title} className="lab__index-item"
                href={project.url === '#design' ? undefined : project.url}
                target={project.url.startsWith('http') ? '_blank' : undefined}
                rel={project.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={project.url === '#design' ? (e) => { e.preventDefault(); setPage('design'); window.scrollTo({ top:0 }); } : undefined}
              >
                <div className="lab__index-info">
                  <h3 style={{ ...TYPE.display.lg, color:t.text, minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{project.title}</h3>
                  <p style={{ ...TYPE.body.sm, color:t.textMuted, flex:1, minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{project.desc}</p>
                </div>
                <div className="lab__index-meta">
                  {project.tags.map(tag => (
                    <Tag key={tag} t={t} onClick={(e) => { e.preventDefault(); e.stopPropagation(); openGlossary(tag); }}>{tag}</Tag>
                  ))}
                  <ArrowRight size={14} style={{ color:t.accent }} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── SIGNAL — Living Log ── */}
        <section id="signal" className="section section--signal">
          <SectionLabel filled="Signal" outline="Feed" tagline="Low noise log. Signals I pick up and can't stop thinking about." t={t} />

          {/* Filter buttons */}
          <div className="signal__filters">
            {signalTypes.map(type => (
              <button key={type} className="signal__filter-btn"
                onClick={(e) => {
                  setSignalFilter(type);
                  const parent = e.currentTarget.parentElement;
                  parent.classList.remove('filter-glitch');
                  void parent.offsetWidth;
                  parent.classList.add('filter-glitch');
                }}
                style={{
                  ...TYPE.mono.sm, fontSize:'0.625rem', letterSpacing:'0.25em',
                  color: signalFilter === type ? t.text : t.textFaint,
                  background: signalFilter === type ? alpha(t.accent, 0.12) : 'transparent',
                  border: `1px solid ${signalFilter === type ? t.accent : t.border}`,
                }}
                onMouseEnter={e => { if (signalFilter !== type) { e.currentTarget.style.borderColor = t.borderStrong; e.currentTarget.style.color = t.textMuted; }}}
                onMouseLeave={e => { if (signalFilter !== type) { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textFaint; }}}
              >{type}</button>
            ))}
            <span className="signal__count" style={{ ...TYPE.mono.sm, fontSize:'0.5625rem', letterSpacing:'0.2em', color:t.textFaint }}>
              {filteredSignal.length} ENTRIES
            </span>
          </div>

          {/* Log entries */}
          <ol className="signal__list">
            {filteredSignal.map((entry, i) => {
              const inner = (
                <>
                  <div className="signal__entry-info">
                    <time style={τ(t.textMuted, { minWidth:56, flexShrink:0, fontSize:'0.6875rem' })}>{entry.date}</time>
                    <div className="signal__entry-text">
                      <h3 className="signal__entry-title">{entry.title}</h3>
                      {entry.note && <p className="signal__entry-note" style={{ ...TYPE.body.sm, color:t.textMuted, marginTop:2 }}>{entry.note}</p>}
                    </div>
                  </div>
                  <div className="signal__entry-meta">
                    <span style={{ ...TYPE.mono.sm, fontSize:'0.5625rem', letterSpacing:'0.15em', color:t.textFaint, textTransform:'none' }}>{entry.source}</span>
                    <Tag t={t} size="md" onClick={(e) => { e.preventDefault(); e.stopPropagation(); openGlossary(entry.type); }}>{entry.type}</Tag>
                  </div>
                </>
              );
              return entry.link ? (
                <li key={`${entry.date}-${entry.title}`}
                  className="signal__entry signal__entry--animate signal__entry--linked"
                  style={{ animationDelay:`${i * 0.04}s` }}
                >
                  <a href={entry.link} className="signal__entry-link">{inner}</a>
                </li>
              ) : (
                <li key={`${entry.date}-${entry.title}`}
                  className="signal__entry signal__entry--animate"
                  style={{ animationDelay:`${i * 0.04}s` }}
                >
                  {inner}
                </li>
              );
            })}
          </ol>
        </section>

        {/* ── ORIGIN — Lineage + Process + Connect ── */}
        <section id="protocol" className="section section--origin">
          <SectionLabel filled="Origin" outline="Arc" tagline="How I got here. How I work. How to reach me." t={t} />

          {/* ABOUT */}
          <div className="origin__subsection" style={{ marginBottom:64 }}>
            <h3 className="origin__subsection-title" style={μ(t.textFaint)}>ABOUT</h3>
            <p style={{ ...TYPE.body.md, color:t.textSecondary, maxWidth:640, lineHeight:1.6 }}>
              I'm Laurens, a product designer working at the intersection of behavioral design, UX/UI, and AI.
              Lauwverse is my lab and my lens. I build products, interfaces, and brand systems for AI companies
              and the teams building with AI, with one rule: design for behavior, not sentiment.
              Kizuna, a community intelligence platform, is the current flagship coming out of the lab.
            </p>
          </div>

          {/* LINEAGE */}
          <div className="origin__subsection">
            <h3 className="origin__subsection-title" style={μ(t.textFaint)}>LINEAGE</h3>
            <ul className="lineage__list">
              {lineage.map((item, i) => (
                <li key={i} className="lineage__item">
                  <div className="lineage__item-info">
                    <time style={τ(t.textMuted, { minWidth:88, flexShrink:0 })}>{item.year}</time>
                    <div>
                      <h3 className="lineage__item-entity" style={{ color:t.text }}>{item.entity}</h3>
                      <p className="lineage__item-role" style={{ color:t.textMuted }}>{item.role}</p>
                    </div>
                  </div>
                  <div className="lineage__item-tags">
                    {item.tags.map(tag => (
                      <Tag key={tag} t={t} onClick={() => openGlossary(tag)}>{tag}</Tag>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* PROCESS */}
          <div className="origin__subsection">
            <h3 className="origin__subsection-title" style={μ(t.textFaint)}>PROCESS</h3>
            <div className="process__grid">
              {[
                {
                  phase: 'THINK', num: '01',
                  desc: 'Pattern recognition before execution. Map the behavior you want to create or break before touching a pixel. Example: before redesigning a Discord onboarding, audit which first-session actions predict month-two retention.',
                  tools: [
                    { name: 'Claude', url: 'https://claude.ai' },
                    { name: 'Perplexity', url: 'https://perplexity.ai' },
                    { name: 'Gemini', url: 'https://gemini.google.com' },
                  ],
                },
                {
                  phase: 'DESIGN', num: '02',
                  desc: 'Systems before aesthetics. Translate behavioral intent into spatial logic and reusable primitives. Example: every Kizuna screen starts from a signal, not a layout.',
                  tools: [
                    { name: 'Figma', url: 'https://figma.com' },
                    { name: 'Stitch', url: 'https://stitchdesign.io' },
                    { name: 'Affinity', url: 'https://affinity.serif.com' },
                  ],
                },
                {
                  phase: 'BUILD', num: '03',
                  desc: 'Ship at the speed of thought. Vibe-code first, refine after, instrument everything that matters. Example: this site was rebuilt, measured, and re-shipped inside a week.',
                  tools: [
                    { name: 'Claude', url: 'https://claude.ai' },
                    { name: 'Vercel', url: 'https://vercel.com' },
                    { name: 'Gemini', url: 'https://gemini.google.com' },
                    { name: 'Lovable', url: 'https://lovable.dev' },
                  ],
                },
              ].map((col) => (
                <div key={col.phase} className="process__phase">
                  <div className="process__phase-header">
                    <div className="process__phase-num">
                      <span style={{ ...TYPE.numeral.xl, color:t.textFaint }}>{col.num}</span>
                    </div>
                    <span style={{ ...TYPE.display.xl, color:t.text, display:'block' }}>{col.phase}</span>
                  </div>
                  <div className="process__phase-body">
                    <p style={{ ...TYPE.body.md, fontWeight:300, color:t.textSecondary }}>{col.desc}</p>
                  </div>
                  <div className="process__tools">
                    {col.tools.map(tool => (
                      <Tag key={tool.name} t={t} size="md" onClick={() => openGlossary(tool.name)}>{tool.name}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <h3 className="origin__subsection-title" style={μ(t.textFaint)}>CONNECT</h3>
            <div className="connect__grid">
              <a className="connect__item" href="https://x.com/lauwverse" target="_blank" rel="noopener noreferrer">
                <div className="connect__item-info">
                  <Twitter size={14} style={{ color:t.textMuted }} />
                  <span style={β(t.textSecondary)}>X_NETWORK</span>
                </div>
                <ArrowUpRight size={14} style={{ color:t.accent }} />
              </a>
              <button className="connect__item" onClick={copyEmail}>
                <div className="connect__item-info">
                  <Mail size={14} style={{ color:t.textMuted }} />
                  <span style={β(t.textSecondary)}>{emailCopied ? 'EMAIL_SYNCED' : 'VAULT_EMAIL'}</span>
                </div>
                <Check size={14} style={{ color:t.accent, opacity: emailCopied ? 1 : 0, transition:'opacity 0.3s' }} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site__footer">
        <span style={μ(t.textMuted)}>SYSTEM_v1.7 // PARAMETERS_STABLE</span>
      </footer>
      </>)}

      {/* Glossary off-canvas */}
      {glossaryTag && <GlossaryPanel tag={glossaryTag} t={t} onClose={closeGlossary} />}
    </div>
  );
}
