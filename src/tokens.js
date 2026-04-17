/**
 * @typedef {Object} Theme
 * All values are CSS color strings (hex, rgba) or CSS property strings.
 * @property {string} bg             - Page background
 * @property {string} bgSurface      - Elevated surface background (cards, panels)
 * @property {string} bgHover        - Subtle hover fill for interactive rows
 * @property {string} text           - Primary text
 * @property {string} textSecondary  - Secondary / supporting text
 * @property {string} textMuted      - De-emphasised text (captions, timestamps)
 * @property {string} textFaint      - Barely-visible placeholder text
 * @property {string} accent         - Brand accent (links, highlights)
 * @property {string} accentSecondary - Hover-state accent
 * @property {string} accentLabel    - Accent used on chip / tag labels
 * @property {string} accentFaint    - Subdued accent for ambient fills
 * @property {string} border         - Default 1px divider color
 * @property {string} borderStrong   - Emphasis divider color
 * @property {string} scanline       - CRT scanline overlay tint
 * @property {string} dotColor       - Dot-grid pattern dot color
 * @property {string} dotVignette    - Radial vignette color for dot grid
 * @property {string} dotBloom       - Center glow for dot grid
 * @property {string} navBg          - Navigation bar background (with alpha)
 * @property {string} glitchA        - Glitch effect layer A color
 * @property {string} glitchB        - Glitch effect layer B color
 * @property {string} glitchGlow     - Glitch glow bloom color
 * @property {string} stroke         - CSS border shorthand for outline/stroke text
 * @property {string} selection      - ::selection background color
 * @property {string} scrollThumb    - Scrollbar thumb color
 * @property {string} scrollHover    - Scrollbar thumb hover color
 * @property {string} pulseColor     - Pulsing status dot color
 * @property {string} pulseShadow    - Box-shadow color for pulse animation
 * @property {string} toggleLabel    - Theme-toggle button label text
 */

// ─── COLOR PALETTE (Material Design–style 50→950) ──────────────────────────────
// Three monotonic scales. Every step is strictly darker than the one before.
// WCAG rule: steps 50–400 use dark text (neutral.950), steps 500–950 use light text (neutral.50).
export const PALETTE = {
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

/**
 * WCAG contrast-text helper.
 * @param {string} hex - 6-digit hex color, e.g. "#3E3284"
 * @returns {string} Dark (jaguar[950]) or light (jaguar[50]) text color for AA contrast
 */
export const contrastText = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const L = 0.2126 * r ** 2.2 + 0.7152 * g ** 2.2 + 0.0722 * b ** 2.2;
  return L > 0.18 ? PALETTE.jaguar[950] : PALETTE.jaguar[50];
};

/**
 * rgba helper — transparent variants from palette hex values.
 * @param {string} hex   - 6-digit hex color, e.g. "#8C99F0"
 * @param {number} a     - Alpha 0–1
 * @returns {string} CSS rgba() string
 */
export const alpha = (hex, a) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
};

// ─── TREE BLUEPRINT (custom SVG — viewBox 0 0 256 696) ──────────────────────
// Single blueprint used for all treeline instances
export const TREE_BLUEPRINT = new Path2D('M109.944 39.7827C113.382 39.4617 116.775 39.5123 118.92 36.6509C120.804 34.1458 119.182 29.3981 120.048 26.8101C123.011 17.958 125.809 8.96717 128.332 0C131.99 12.5627 136.438 17.2353 134.54 29.4891C138.789 31.9933 137.827 31.1451 139.937 34.742C143.086 40.1142 152.601 48.0648 154.443 54.2823C151.941 56.8717 144.605 56.8366 140.824 57.1171C146.118 62.7152 148.38 64.5751 155.99 67.1671C157.152 69.2656 158.039 70.8573 159.421 72.8374L159.483 74.5226C157.104 76.6609 153.502 76.6513 150.14 77.0363L156.547 88.4284C161.71 90.2477 167.238 92.3076 172.428 93.9406C168.345 97.2793 164.357 100.574 160.129 103.735C164.529 106.642 168.785 109.173 173.803 110.923C167.609 113.752 164.398 114.68 157.922 116.663C167.362 119.496 169.266 119.979 179.104 119.58L176.313 128.505C179.792 128.661 183.504 128.759 186.955 129.006C184.46 132.954 181.868 137.21 179.228 141.023C172.497 141.809 165.622 142.69 158.878 143.266C170.806 149.143 176.698 151.878 189.946 154.254C186.749 158.838 183.827 163.148 180.225 167.426C186.77 168.34 190.936 168.69 197.598 168.572C195.872 172.457 194.27 176.2 192.242 179.942L199.867 184.48C192.153 190.327 184.996 193.578 176.478 198.087C189.087 201.56 195.473 202.537 208.646 201.488C205.683 207.286 203.641 210.898 199.977 216.302C206.027 216.864 211.052 217.389 217.123 217.265C215.308 221.362 212.991 226.965 210.901 230.774C202.355 234.06 193.844 237.429 185.367 240.879C196.319 243.58 204.356 245.461 215.7 246.625C211.987 251.541 208.213 256.127 203.462 260.116C212.31 262.743 217.907 263.64 227.263 263.675C223.73 268.679 220.526 273.145 216.697 277.921C207.821 280.516 199.715 282.828 190.716 284.97C206.907 290.687 216.999 293.586 234.53 295.151C230.481 299.623 226.356 304.022 222.155 308.346C227.284 309.191 233.437 310.367 238.525 310.946C229.635 316.295 223.214 318.177 213.252 321.11C222.843 322.34 231.801 323.56 241.529 323.5C239.412 325.965 230.804 334.991 229.903 336.852C231.567 337.637 232.207 337.66 234.042 337.976L234.132 338.862C231.017 341.679 222.128 346.789 218.188 348.879C229.209 350.64 237.205 351.643 248.507 351.984C243.867 358.3 238.483 365.68 232.763 370.98L208.082 373.451C223.077 379.636 235.919 383.26 252.172 385.18C247.696 391.188 244.478 395.584 239.329 401.065C243.832 402.174 248.624 403.478 253.189 404.166C246.025 410.385 236.318 412.036 227.043 412.826C236.194 417.526 245.255 421.443 255.217 424.152C247.813 429.935 244.231 432.274 235.74 436.267L207.065 426.751C210.2 430.261 213.424 433.979 216.648 437.374C205.703 433.905 184.776 431.813 172.36 428.958C185.271 436.579 198.375 443.869 211.657 450.821L209.794 452.977C200.368 449.672 190.922 446.425 181.455 443.238C185.615 447.369 190.654 452.114 194.593 456.334C194.119 457.284 193.927 457.973 193.012 458.477C183.965 452.381 175.007 446.142 166.158 439.761C162.7 437.286 156.808 432.748 153.398 430.729C160.294 441.827 170.345 463.663 176.787 472.386L177.048 472.751C179.331 475.836 205.463 489.124 210.392 492.227C212.145 493.329 217.508 495.492 219.034 496.918C215.686 496.542 201.613 489.781 197.543 488.025C184.948 482.584 177.839 482.47 169.094 471.502L144.894 440.883C145.382 462.205 145.692 483.532 145.822 504.86C153.997 500.14 155.33 497.654 161.394 490.224C159.985 493.461 158.183 497.978 156.575 501.005C158.403 501.454 159.332 501.729 161.243 501.858L161.442 502.508C153.976 505.193 152.326 506.644 146.228 511.796C146.413 525.422 146.922 540.331 146.709 553.857C151.755 550.829 158.445 547.06 163.168 543.783C157.874 549.117 152.14 554.692 147.046 560.166C147.445 580.744 147.967 601.319 148.62 621.89C148.888 629.739 148.689 664.615 155.475 668.191C161.298 665.454 159.593 635.911 162.563 630.702C163.518 643.861 163.622 663.715 166.887 676.297C168.819 669.442 171.672 637.593 172.291 629.182C174.113 604.247 177.798 577.851 179.551 553.114C180.699 551.292 181.194 550.329 182.095 548.421L182.858 549.48C182.535 565.028 183.6 584.635 184.04 600.417L186.316 680.526C188.674 681.742 191.17 682.918 193.562 684.094C197.302 682.086 202.424 678.532 206.109 676.111C204.246 679.054 202.383 683.159 200.815 686.356C211.128 689.271 221.495 691.98 231.925 694.476C161.525 696.133 88.5898 694.627 17.8708 695.115C27.9262 692.668 38.1335 691.018 48.2068 688.137C59.8537 684.816 70.2721 680.443 81.4653 675.912C83.6736 645.643 83.5195 613.346 85.5628 582.776C88.2399 612.202 92.708 641.987 95.1383 671.512L101.414 668.308C103.502 654.259 103.674 638.102 104.456 623.863C105.924 597.136 105.849 569.829 107.152 543.196L90.554 535.603C95.6374 536.861 101.736 537.865 106.954 538.846L107.364 521.721C101.675 518.964 82.2119 512.536 79.8455 509.702L80.6864 508.678L83.5278 508.542C87.6886 509.248 93.2037 510.814 97.418 511.898C95.92 507.618 94.7176 502.224 93.5935 497.733C94.1256 496.902 94.875 496.777 95.8327 496.421C99.3809 504.265 99.1904 509.644 107.81 512.988C109.278 484.235 109.172 453.972 110.024 424.955C101.356 439.852 92.8428 454.839 84.4855 469.913C89.3771 455.555 93.951 438.247 98.1743 423.535C85.8254 434.886 74.3167 447.976 61.358 459.629C60.8685 458.774 60.9895 457.104 60.9778 456.025C64.2517 451.221 68.0384 446.273 71.511 441.571C64.4634 445.844 58.7957 449.088 51.4573 452.903L49.6217 450.825C56.6974 445.106 68.9157 435.013 76.5284 430.474C58.894 434.166 41.8584 437.508 24.2323 441.472C31.8298 434.501 40.513 426.796 47.751 419.493C36.1597 423.239 24.1876 426.053 12.8129 429.808C10.1193 427.372 7.50267 424.992 4.70386 422.669C9.16849 421.021 12.4595 419.855 16.689 417.645C14.6451 416.995 11.4159 416.067 9.53973 415.276C6.25348 410.768 3.07312 406.185 0 401.53C14.7063 399.494 24.6132 397.251 38.9001 394.631C32.1021 392.689 22.9687 390.284 16.5199 387.904L9.5459 378.721C17.501 377.805 23.9456 376.8 31.7714 374.947C20.8903 369.655 15.3532 367.103 7.45592 357.538L20.5301 357.509C17.71 354.03 15.2377 350.877 12.6032 347.255C26.3065 347.241 34.6569 346.822 47.5936 341.821C42.2627 337.425 36.2182 332.403 31.0853 327.709C30.5215 327.193 27.467 328.225 26.0232 326.557C21.5566 321.399 17.4198 315.019 13.3608 309.635C22.6043 308.742 31.3293 306.988 40.4064 305.079C36.8362 302.791 32.5297 300.316 29.6285 297.31L29.4312 296.297L31.8732 295.315C31.141 292.946 24.2392 282.686 22.2853 278.637C41.8206 278.155 44.3382 274.917 62.3665 282.085C72.3917 277.084 84.8059 271.204 94.2439 265.541C77.8002 267.517 57.7981 270.29 41.4713 271.269C39.8241 269.588 34.3399 264.584 34.0608 262.908L37.5168 262.373C38.5302 260.06 33.5452 252.239 32.329 249.409C39.1009 249.56 52.0788 250.745 57.7356 246.769C59.0838 245.822 59.9005 244.552 61.8461 245.128C70.5815 247.717 77.1354 243.276 86.0619 242.072C73.084 238.186 59.5409 233.973 46.961 228.981C44.8263 224.639 42.7357 220.275 40.6876 215.891C46.4035 215.298 52.2665 214.763 57.937 213.914C51.7454 208.153 50.6357 205.235 47.2856 197.509C56.4637 197.298 62.9365 196.496 72.0135 195.424C67.3255 194.151 62.6505 192.83 57.9899 191.46C55.6813 187.516 53.462 183.519 51.3342 179.474L61.7485 179.638C60.2215 174.868 58.8067 170.593 57.7039 165.696C65.3482 165.796 73.1307 166.044 80.6843 164.771C76.8693 160.975 74.0018 157.029 71.2051 152.431C84.6175 150.779 92.3814 148.044 105.114 143.13C94.7011 143.003 80.8507 142.887 70.8242 140.473C73.8086 138.964 74.5532 139.189 76.1351 136.769C76.0169 133.969 73.7694 131.442 72.4845 128.787C81.0438 128.73 87.3743 129.186 95.1287 125.018C92.1222 122.812 88.563 120.33 85.6645 118.063C84.4745 115.079 83.2521 112.119 82.2525 109.065C87.1956 107.081 91.7764 105.288 96.1826 102.191C91.5399 99.4328 87.6459 97.256 83.4694 93.8203C92.3959 89.0947 94.9905 88.0957 104.78 85.4939C105.313 82.9727 105.853 80.0719 106.58 77.6359L97.7508 73.2891C101.392 68.6144 102.384 66.373 108.744 65.7941C113.569 65.3547 116.221 62.9751 120.055 60.3438L114.621 55.5791C110.968 56.2529 107.028 57.0697 103.359 57.4712L110.582 49.7672L104.567 46.9729C106.336 44.6146 108.237 42.1669 109.944 39.7827ZM116.746 651.96C114.509 662.395 113.035 665.083 108.075 674.668C100.162 677.28 93.401 679.859 85.6728 682.904C92.9115 681.784 100.123 680.484 107.299 679.02C108.353 681.969 106.182 682.554 107.81 683.413C124.297 672.509 123.128 647.879 124.008 630.119C124.73 636.928 126.607 659.346 128.855 664.354L129.824 665.049C131.151 662.161 127.315 596.639 126.565 588.566C125.596 594.035 124.95 598.829 124.303 604.348L123.485 604.531C123.148 601.931 122.798 599.335 122.42 596.741C121.175 574.528 121.182 547.984 120.88 525.427C120.997 517.439 121.065 499.617 119.883 492.073C119.133 502.513 118.281 517.333 118.185 527.819C118.061 531.736 117.648 552.1 117.018 554.684C116.638 534.955 116.039 515.23 115.219 495.514C113.58 504.797 113.437 533.609 113.108 544.713L110.726 612.439C110.185 628.99 110.004 647.248 108.6 663.591C112.297 659.222 113.8 656.903 116.746 651.96ZM172.697 307.787L196.347 305.889L196.649 305.292C190.812 301.735 181.833 299.249 175.041 295.557C168.022 291.745 162.728 285.865 157.042 282.415C160.982 290.093 167.891 300.4 172.697 307.787ZM153.845 172.182L169.603 167.918L171.239 167.269C170.882 166.939 138.81 153.396 135.331 151.84C141.408 158.644 147.513 165.631 153.845 172.182ZM106.866 189.538C95.2504 197.068 82.687 203.991 70.6482 210.921L78.5297 214.119C81.8159 215.54 85.5758 217.061 88.7459 218.637C97.7831 207.292 102.673 199.662 116.836 193.675C118.783 192.852 124.276 191.311 124.565 189.452L122.31 189.424C116.89 189.619 112.287 189.683 106.866 189.538ZM100.398 123.271C104.156 122.075 108.403 120.607 112.199 119.712C121.416 117.44 123.939 115.967 132.492 112.242C127.844 111.052 122.805 109.855 118.26 108.45L100.398 123.271ZM120.866 374.694C107.552 385.097 93.4402 395.25 79.8228 405.317C88.1375 401.766 96.426 398.155 104.688 394.484C111.431 391.584 118.116 388.543 124.73 385.366C133.743 387.081 142.357 388.631 151.226 391.016C142.46 385.981 128.573 379.519 120.866 374.694ZM94.842 313.151L81.7018 313.492C71.819 323.378 61.8722 333.2 51.8616 342.958C61.3992 339.097 70.9768 335.336 80.5928 331.675C93.2318 326.394 99.8408 326.836 113.319 326.207C108.613 324.487 103.882 322.837 99.1265 321.257C107.292 318.473 115.761 315.708 123.836 312.729C114.293 312.854 104.345 312.843 94.842 313.151Z');

// ─── TYPE SCALE ─────────────────────────────────────────────────────────────────
export const TYPE = {
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
/** @type {{ midnight: Theme, primal: Theme }} */
export const THEMES = {
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

/**
 * Convert a Theme object into a flat map of CSS custom-property names → values,
 * suitable for spreading onto an element's `style` attribute.
 * @param {Theme} t
 * @returns {Record<string, string>} e.g. { '--bg': '#03020e', '--accent': '#697DEB', ... }
 */
export const themeToVars = (t) => {
  const vars = {};
  for (const [key, val] of Object.entries(t)) {
    vars[`--${toKebab(key)}`] = val;
  }
  // Expose bg with alpha for backdrop blur effects
  vars['--bg-alpha'] = alpha(t.bg, 0.85);
  return vars;
};
