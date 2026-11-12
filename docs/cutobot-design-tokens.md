# CUTOBOT design tokens and the portfolio coin

## What CUTOBOT ships

CUTOBOT opens with an oversized wordmark, a light textured backdrop, and a robot on a fixed Three.js canvas. Wheel, touch, and keyboard input move the opening copy horizontally through editorial columns. Entering the film changes the camera, lighting, and environment. The film uses Lenis to turn vertical scroll into timeline progress, which drives the camera and the robot's motion. Pointer input adds a smoothed camera offset. [CUTOBOT](https://cutobot.byholm.co/) · [Published JavaScript](https://cutobot.byholm.co/assets/main-CrLPVPSo.js)

The linked CSS contains the Inter Variable and JetBrains Mono Variable font declarations. The initial HTML supplies the canvas layout, loader, focus styles, and mobile rotation prompt. The visible opening copy and its inline styles come from JavaScript. A desktop browser capture confirmed the generated columns, the inline typography, and the separate Three.js canvas. [Published stylesheet](https://cutobot.byholm.co/assets/main-CoKKXZpN.css) · [Page HTML](https://cutobot.byholm.co/) · [Published JavaScript](https://cutobot.byholm.co/assets/main-CrLPVPSo.js)

### Where the values connect

| Area | Value in the published build | Where it is applied |
| --- | --- | --- |
| Opening surface | `K0.sayfaRenk` is `#E9E9E9`. `K0.sayfaFon` adds grain and a radial gradient from `#FFFFFF` to `#97979F`. | The surface color sets the page and backdrop. The gradient and grain go on the fixed backdrop. |
| Opening foreground | `K0.yaziRenk` is `#0C101A`. | Wordmark, column headings and copy, and controls. The booking link swaps the foreground and surface colors on hover. |
| Type | `K0.punto` is `clamp(64px, 16vw, 280px)`. The wordmark uses Inter at weight 400, line height 0.9, and tracking `-0.03em`. | The wordmark reads the shared size. Column headings use their own Inter clamp of `22px` to `40px`. Body copy uses JetBrains Mono at `11px` to `14px` with line height 1.7. |
| Column layout | `K0.perdeAra` is `10vw` and `K0.yaziKaydir` is `-26vh`. | The generated columns share inline padding and vertical offset. Body columns use `min(46ch, 30vw)`, with an `84vw` override at widths up to `899px`. |
| Robot material | A base linear RGB tuple of `[0.025, 0.042, 0.331]` is shared by the shell and legs. The panel multiplies each channel by `1.05`. | The material presets assign the shared or derived color by mesh role, with per-role roughness. |
| Film atmosphere | The `Li.ilk` preset includes `#0A0814` for the upper sky, `#D8B4E2` for the lower sky, and `#FF7AB8` at the horizon. | The scene selects an atmosphere preset and copies its values into shader uniforms. Lighting, exposure, and shader blending affect the visible colors. |

The public build exposes two useful forms of reuse. On the page, one named value such as `K0.yaziRenk` feeds several DOM properties directly. In WebGL, a palette value feeds a material or scene preset, which supplies a Three.js material or shader uniform. The inspected HTML, CSS, and JavaScript exposed no Figma file link, collection metadata, or token export. The original collection names, modes, and alias IDs are therefore unverified. [Published JavaScript](https://cutobot.byholm.co/assets/main-CrLPVPSo.js) · [Published stylesheet](https://cutobot.byholm.co/assets/main-CoKKXZpN.css)

## Brand, Alias, and Mapped collections for the portfolio

The portfolio implements three token layers in CSS. **Brand** owns literal values. **Alias** assigns those values to roles such as page surface, text, and coin metal. **Mapped** connects each role to the specific property used by a component or scene. Read each row left to right to follow a value into the site. [`tokens.css`](../src/styles/tokens.css)

| Brand value | Alias role | Mapped property | Consumer |
| --- | --- | --- | --- |
| `--brand-paper` `#E5E5E2`, `--brand-charcoal` `#171718` | `--alias-surface-page` in light and dark | `--hero-background` | Opening backdrop |
| `--brand-ink` `#101014`, `--brand-chalk` `#F0EFE9` | `--alias-text-primary` in light and dark | `--hero-title-color`, `--section-heading-color` | Portfolio name and section headings |
| `--brand-font-inter` Inter, `--brand-font-jetbrains-mono` JetBrains Mono | `--alias-type-display-family`, `--alias-type-editorial-family` | `--hero-title-family`, `--editorial-copy-family` | Portfolio name and editorial copy |
| `--brand-gold-base` `#D4A84B`, `--brand-gold-rim` `#FFF3C4` | `--alias-coin-base`, `--alias-coin-rim` | `--coin-base-color`, `--coin-rim-color` | Shader uniforms `uBase` and `uRim` |

For example, the spotlight reads `--hero-background`, which references `--alias-surface-page`. The alias points to `--brand-paper` by default and `--brand-charcoal` under the dark theme. In Figma, an equivalent mapping uses the target variable ID in each mode's alias value. Verifying CUTOBOT's original chain would require its Figma file or a variables export with collection IDs and per-mode values. [Figma variable types](https://developers.figma.com/docs/rest-api/variables-types/) · [Figma local variables endpoint](https://developers.figma.com/docs/rest-api/variables-endpoints/#get-local-variables)

## Portfolio implementation

Playwright recorded the opening at 1280 by 740 while sending wheel input in both directions. FFmpeg frame samples showed the character staying near center as the upper columns translated horizontally. The DOM measurement confirmed that the copy track sits at z-index 0 and the canvas at z-index 1. During one forward sequence, the track moved from x = 33 to x = −1772 while the document scroll position stayed at zero. The incoming heading and copy also revealed at different rates. [CUTOBOT](https://cutobot.byholm.co/) · [Published JavaScript](https://cutobot.byholm.co/assets/main-CrLPVPSo.js)

The portfolio pins the opening to the viewport and uses native vertical scroll to move the name, six experience entries, and six featured projects sideways through a text layer behind the coin. The headings reveal before their descriptions. Narrow screens briefly hold each column in the readable area. The opening uses 2.8 viewport heights of scroll on desktop and 3.2 on narrow screens, then releases into the full portfolio. [`Hero.tsx`](../src/components/sections/Hero.tsx)

The coin uses the same progress for its path distance and roll angle. Its camera follows the path to keep the coin close to center, with a small pointer offset. Scrolling back reverses both the text and the roll. The mapped material tokens resolve directly into shader colors. Reduced-motion visitors see the static coin and can read the complete experience and projects in the regular page flow. [`Coin.tsx`](../src/components/three/Coin.tsx) · [`CoinScene.tsx`](../src/components/three/CoinScene.tsx)

<!-- REA evidence for the published bundle and desktop DOM capture.
Static bundle ev_51a1a6b0aa42306acaf47aa8b2041187b304b15ec5db80fc405ada799867b549
Browser DOM ev_0a96eed64d25c67f3b9f904a0bf0dc8022ac0b50ea7cf82ec4c00b6e46b2a670
-->
