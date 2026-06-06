/* @ds-bundle: {"format":3,"namespace":"DriftBoundDesignSystem_e0b32a","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"DiceRoll","sourcePath":"components/play/DiceRoll.jsx"},{"name":"TurnCard","sourcePath":"components/play/TurnCard.jsx"},{"name":"ZoneChip","sourcePath":"components/play/ZoneChip.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"4b2be5a5adfd","components/core/Badge.jsx":"64c87c8be91e","components/core/Button.jsx":"3ecb538b6408","components/core/Card.jsx":"318df7fa4e9e","components/forms/Input.jsx":"78aa978802ad","components/forms/Switch.jsx":"3c0f427ab788","components/play/DiceRoll.jsx":"058e8445d24b","components/play/TurnCard.jsx":"ad5168f043ee","components/play/ZoneChip.jsx":"a9e2ddff3ba3","ui_kits/mobile/kit-app.jsx":"9e1138a5f60c","ui_kits/mobile/kit-lib.jsx":"ee1680a07130","ui_kits/mobile/kit-screens.jsx":"7b993b4994cf"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DriftBoundDesignSystem_e0b32a = window.DriftBoundDesignSystem_e0b32a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Drift Bound — Avatar
 * Player / character token. Initials on a deterministic ink tint,
 * or an image. A GM wears an ember ring; an active turn pulses.
 */
function Avatar({
  name = '',
  src = null,
  size = 'md',
  ring = 'none',
  // 'none' | 'gm' | 'active' | 'drift'
  square = false,
  style = {},
  ...rest
}) {
  const sizes = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72
  };
  const px = sizes[size] || (typeof size === 'number' ? size : 40);
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join('') || '?';

  // deterministic tint from name
  const tints = [['#2E3A5E', '#AEEDE4'], ['#3A2E4E', '#D2AC55'], ['#1E3A38', '#4FD0C0'], ['#3E2A1E', '#EC8B45'], ['#2A2E4E', '#A88BE6'], ['#1E2E3E', '#7FB7E8']];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = h * 31 + name.charCodeAt(i) >>> 0;
  const [bg, fg] = tints[h % tints.length];
  const rings = {
    none: {},
    gm: {
      boxShadow: '0 0 0 2px var(--bg-app), 0 0 0 4px var(--ember-500)'
    },
    active: {
      boxShadow: '0 0 0 2px var(--bg-app), 0 0 0 4px var(--drift-500), var(--glow-drift)'
    },
    drift: {
      boxShadow: '0 0 0 2px var(--bg-app), 0 0 0 4px var(--drift-500)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: px,
      height: px,
      flex: 'none',
      borderRadius: square ? 'var(--radius-md)' : '50%',
      background: src ? `center/cover no-repeat url(${src})` : bg,
      color: fg,
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: Math.round(px * 0.38),
      letterSpacing: '0.02em',
      userSelect: 'none',
      ...rings[ring],
      ...style
    },
    title: name || undefined
  }, rest), !src && initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Drift Bound — Badge
 * Compact status/scope marker. Tones map to the domain:
 * visibility scopes (public/gm/whisper), turn status, and
 * neutral metadata. Optional leading dot.
 */
function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  // 'soft' | 'outline' | 'solid'
  dot = false,
  size = 'md',
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      c: 'var(--text-muted)',
      base: 'var(--bone-400)'
    },
    public: {
      c: 'var(--drift-400)',
      base: 'var(--drift-500)'
    },
    gm: {
      c: 'var(--ember-400)',
      base: 'var(--ember-500)'
    },
    whisper: {
      c: 'var(--whisper-400)',
      base: 'var(--whisper-500)'
    },
    pending: {
      c: 'var(--amber-warn)',
      base: 'var(--amber-warn)'
    },
    resolved: {
      c: 'var(--sage-500)',
      base: 'var(--sage-500)'
    },
    harm: {
      c: 'var(--rose-500)',
      base: 'var(--rose-500)'
    },
    brass: {
      c: 'var(--brass-300)',
      base: 'var(--brass-500)'
    }
  };
  const t = tones[tone] || tones.neutral;
  const sizes = {
    sm: {
      padding: '2px 8px',
      font: 11,
      gap: 5,
      dotSize: 5
    },
    md: {
      padding: '4px 10px',
      font: 12,
      gap: 6,
      dotSize: 6
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    soft: {
      background: `color-mix(in srgb, ${t.base} 16%, transparent)`,
      color: t.c,
      border: `1px solid color-mix(in srgb, ${t.base} 30%, transparent)`
    },
    outline: {
      background: 'transparent',
      color: t.c,
      border: `1px solid color-mix(in srgb, ${t.base} 45%, transparent)`
    },
    solid: {
      background: t.base,
      color: 'var(--ink-950)',
      border: '1px solid transparent'
    }
  };
  const v = variants[variant] || variants.soft;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: s.gap,
      padding: s.padding,
      fontFamily: 'var(--font-ui)',
      fontSize: s.font,
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.02em',
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      ...v,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: s.dotSize,
      height: s.dotSize,
      borderRadius: '50%',
      background: variant === 'solid' ? 'var(--ink-950)' : t.base,
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Drift Bound — Button
 * Primary actions ("Submit turn"), secondary, ghost, and danger.
 * Ember-lit primary carries a candlelight glow; press shrinks subtly.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '0 14px',
      height: 36,
      font: 13,
      radius: 'var(--radius-sm)',
      gap: 7
    },
    md: {
      padding: '0 20px',
      height: 44,
      font: 14,
      radius: 'var(--radius-md)',
      gap: 9
    },
    lg: {
      padding: '0 26px',
      height: 52,
      font: 16,
      radius: 'var(--radius-md)',
      gap: 10
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--primary)',
      color: 'var(--text-on-ember)',
      border: '1px solid transparent',
      boxShadow: 'var(--glow-ember)'
    },
    secondary: {
      background: 'var(--surface-raised)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-strong)',
      boxShadow: 'var(--seam-top)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: '1px solid transparent',
      boxShadow: 'none'
    },
    accent: {
      background: 'transparent',
      color: 'var(--drift-400)',
      border: '1px solid var(--border-strong)',
      boxShadow: 'var(--glow-drift)'
    },
    danger: {
      background: 'transparent',
      color: 'var(--rose-500)',
      border: '1px solid color-mix(in srgb, var(--rose-500) 45%, transparent)',
      boxShadow: 'none'
    }
  };
  const v = variants[variant] || variants.primary;
  const [pressed, setPressed] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const hoverBg = {
    primary: 'var(--primary-hover)',
    secondary: 'var(--surface-overlay)',
    ghost: 'color-mix(in srgb, var(--bone-50) 7%, transparent)',
    accent: 'color-mix(in srgb, var(--drift-500) 12%, transparent)',
    danger: 'color-mix(in srgb, var(--rose-500) 12%, transparent)'
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled || loading,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      width: fullWidth ? '100%' : 'auto',
      height: s.height,
      minWidth: s.height,
      padding: s.padding,
      fontFamily: 'var(--font-ui)',
      fontSize: s.font,
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
      borderRadius: s.radius,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transform: pressed ? 'scale(0.97)' : 'scale(1)',
      transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...v,
      background: hover && !disabled ? hoverBg : v.background,
      ...style
    }
  }, rest), loading && /*#__PURE__*/React.createElement(Spinner, null), !loading && icon, children && /*#__PURE__*/React.createElement("span", null, children), !loading && iconRight);
}
function Spinner() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 15,
      height: 15,
      borderRadius: '50%',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      display: 'inline-block',
      animation: 'db-spin 0.7s linear infinite'
    }
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes db-spin{to{transform:rotate(360deg)}}'));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Drift Bound — Card
 * The base surface container. Raised ink panel with a hairline
 * bone border and a faint top seam. Optional ember/drift glow
 * for active or highlighted cards, and an interactive lift.
 */
function Card({
  children,
  glow = 'none',
  // 'none' | 'ember' | 'drift'
  interactive = false,
  padding = 'var(--space-5)',
  as = 'div',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = as;
  const glows = {
    none: 'var(--shadow-md), var(--seam-top)',
    ember: 'var(--glow-ember), var(--shadow-md)',
    drift: 'var(--glow-drift), var(--shadow-md)'
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    onMouseEnter: interactive ? () => setHover(true) : undefined,
    onMouseLeave: interactive ? () => setHover(false) : undefined,
    style: {
      background: 'var(--surface-raised)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding,
      boxShadow: hover ? 'var(--shadow-lg), var(--seam-top)' : glows[glow],
      transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      cursor: interactive ? 'pointer' : 'default',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Drift Bound — Input / Textarea
 * Labeled text field on a recessed ink well. Drift focus ring.
 * Set `multiline` for Turn composition. Supports error + hint.
 */
function Input({
  label,
  value,
  onChange,
  placeholder = '',
  hint = '',
  error = '',
  multiline = false,
  rows = 4,
  icon = null,
  type = 'text',
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  const Field = multiline ? 'textarea' : 'input';
  const borderColor = error ? 'var(--rose-500)' : focus ? 'var(--drift-500)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-muted)',
      letterSpacing: '0.01em'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: multiline ? 'flex-start' : 'center',
      gap: 10,
      background: 'var(--bg-deep)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      padding: multiline ? '12px 14px' : '0 14px',
      height: multiline ? 'auto' : 44,
      boxShadow: focus ? 'var(--ring)' : 'none',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      opacity: disabled ? 0.5 : 1
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)',
      display: 'flex',
      marginTop: multiline ? 2 : 0
    }
  }, icon), /*#__PURE__*/React.createElement(Field, _extends({
    id: inputId,
    type: multiline ? undefined : type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    rows: multiline ? rows : undefined,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      width: '100%',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      resize: multiline ? 'vertical' : undefined,
      color: 'var(--text-strong)',
      fontFamily: multiline ? 'var(--font-narrative)' : 'var(--font-ui)',
      fontSize: multiline ? 16 : 15,
      lineHeight: multiline ? 1.6 : 1.4,
      padding: 0
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 12,
      color: error ? 'var(--rose-500)' : 'var(--text-faint)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Drift Bound — Switch
 * Toggle for binary settings (quiet hours, push, GM-only draft).
 * Drift-on, ink-off. The thumb is a small bone disc.
 */
function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const inputId = id || React.useId();
  const W = 46,
    H = 28,
    pad = 3,
    thumb = H - pad * 2;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: W,
      height: H,
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--drift-500)' : 'var(--ink-600)',
      border: `1px solid ${checked ? 'var(--drift-600)' : 'var(--border-strong)'}`,
      boxShadow: checked ? 'var(--glow-drift)' : 'inset 0 1px 3px rgba(0,0,0,0.4)',
      transition: 'background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: pad,
      left: checked ? W - thumb - pad - 1 : pad,
      width: thumb,
      height: thumb,
      borderRadius: '50%',
      background: checked ? 'var(--ink-950)' : 'var(--bone-200)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
      transition: 'left var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)'
    }
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/play/DiceRoll.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Drift Bound — DiceRoll
 * A mono dice result. Notation → total, with the individual dice
 * shown. Natural max reads as a crit (ember), natural 1 a fumble
 * (rose). Tabular numerals throughout.
 */
function DiceRoll({
  notation = '2d6',
  rolls = [],
  // e.g. [4, 5]
  modifier = 0,
  total = null,
  faces = null,
  // d-faces for crit/fumble detection (e.g. 20)
  label = '',
  style = {},
  ...rest
}) {
  const sum = total != null ? total : rolls.reduce((a, b) => a + b, 0) + modifier;
  const single = rolls.length === 1 && faces;
  const crit = single && rolls[0] === faces;
  const fumble = single && rolls[0] === 1;
  const totalColor = crit ? 'var(--ember-400)' : fumble ? 'var(--rose-500)' : 'var(--brass-300)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '7px 12px',
      background: 'var(--bg-deep)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--text-faint)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, notation), rolls.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 4
    }
  }, rolls.map((r, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      minWidth: 22,
      textAlign: 'center',
      padding: '1px 4px',
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 500,
      background: 'var(--surface-raised)',
      border: '1px solid var(--border)',
      color: 'var(--text-body)'
    }
  }, r))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)',
      fontSize: 12
    }
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: totalColor
    }
  }, sum), crit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--ember-400)',
      letterSpacing: '0.1em'
    }
  }, "CRIT"), fumble && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--rose-500)',
      letterSpacing: '0.1em'
    }
  }, "FUMBLE"));
}
Object.assign(__ds_scope, { DiceRoll });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/play/DiceRoll.jsx", error: String((e && e.message) || e) }); }

// components/play/TurnCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Drift Bound — TurnCard
 * The atomic unit of play-by-post progression: one participant's
 * submission. Author + role, visibility scope, narrative prose,
 * optional dice, and a timestamp. GM turns carry an ember edge.
 */
function TurnCard({
  author = 'Player',
  role = 'player',
  // 'player' | 'gm'
  scope = 'public',
  // 'public' | 'gm' | 'whisper'
  whisperTo = '',
  body = '',
  dice = null,
  // <DiceRoll/> props or node
  when = '',
  turnNo = null,
  unread = false,
  style = {},
  ...rest
}) {
  const isGM = role === 'gm';
  const scopeMap = {
    public: {
      tone: 'public',
      label: 'Public'
    },
    gm: {
      tone: 'gm',
      label: 'GM only'
    },
    whisper: {
      tone: 'whisper',
      label: whisperTo ? `Whisper · ${whisperTo}` : 'Whisper'
    }
  };
  const sc = scopeMap[scope] || scopeMap.public;
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      position: 'relative',
      display: 'flex',
      gap: 'var(--space-3)',
      background: 'var(--surface-raised)',
      border: '1px solid var(--border)',
      borderLeft: isGM ? '2px solid var(--ember-500)' : '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-4) var(--space-5)',
      boxShadow: isGM ? 'var(--glow-soft), var(--shadow-md)' : 'var(--shadow-md)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: author,
    ring: isGM ? 'gm' : 'none',
    size: "md"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--text-strong)',
      whiteSpace: 'nowrap'
    }
  }, author), isGM && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--ember-400)'
    }
  }, "Game Master"), /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: sc.tone,
    dot: true,
    size: "sm"
  }, sc.label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), turnNo != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-faint)'
    }
  }, "#", turnNo), unread && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--drift-400)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-narrative)',
      fontSize: 17,
      lineHeight: 1.65,
      color: 'var(--text-body)'
    }
  }, body), dice && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, React.isValidElement(dice) ? dice : /*#__PURE__*/React.createElement(__ds_scope.DiceRoll, dice)), when && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-faint)'
    }
  }, when)));
}
Object.assign(__ds_scope, { TurnCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/play/TurnCard.jsx", error: String((e && e.message) || e) }); }

// components/play/ZoneChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Drift Bound — ZoneChip
 * A node in the zone graph (exploration model). Tone follows the
 * Close→Distant distance ramp. Unrevealed zones read as locked.
 */
function ZoneChip({
  name,
  distance = 'near',
  // 'close' | 'near' | 'far' | 'distant'
  revealed = true,
  current = false,
  count = null,
  // characters present
  onClick,
  style = {},
  ...rest
}) {
  const tones = {
    close: 'var(--zone-close)',
    near: 'var(--zone-near)',
    far: 'var(--zone-far)',
    distant: 'var(--zone-distant)'
  };
  const tone = tones[distance] || tones.near;
  if (!revealed) {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 14px',
        borderRadius: 'var(--radius-pill)',
        background: 'transparent',
        border: '1px dashed var(--border-strong)',
        color: 'var(--text-faint)',
        fontFamily: 'var(--font-ui)',
        fontSize: 13,
        fontWeight: 500,
        fontStyle: 'italic',
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: 0.7
      }
    }, "\u25C7"), " Unrevealed");
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      padding: '8px 14px',
      borderRadius: 'var(--radius-pill)',
      background: current ? `color-mix(in srgb, ${tone} 18%, transparent)` : 'var(--surface-raised)',
      border: `1px solid ${current ? tone : 'var(--border-strong)'}`,
      boxShadow: current ? `0 0 18px -6px ${tone}` : 'none',
      color: 'var(--text-body)',
      fontFamily: 'var(--font-ui)',
      fontSize: 13,
      fontWeight: 600,
      cursor: onClick ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: tone,
      flex: 'none'
    }
  }), name, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: tone
    }
  }, distance), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)',
      paddingLeft: 6,
      borderLeft: '1px solid var(--border)'
    }
  }, count, "\u25CF"));
}
Object.assign(__ds_scope, { ZoneChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/play/ZoneChip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/kit-app.jsx
try { (() => {
/* ============================================================
   Drift Bound — Mobile UI Kit · app shell, data & screens
   Uses window.DB (kit-lib) + window.React. Icons via Lucide.
   ============================================================ */
const {
  useState,
  useEffect,
  useRef
} = React;
const {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Switch,
  DiceRoll,
  ZoneChip,
  TurnCard
} = window.DB;
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  style
}) {
  return /*#__PURE__*/React.createElement("i", {
    "data-lucide": name,
    style: {
      width: size,
      height: size,
      color,
      display: 'inline-flex',
      ...style
    }
  });
}
function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

/* ---------------------------- sample data ---------------------------- */
const CAMPAIGNS = [{
  id: 'tide',
  title: 'The Hollow Tide',
  role: 'gm',
  blurb: 'A drowned city wakes beneath the harbor.',
  members: ['Mara Vel', 'Brannon Ash', 'Sela Dun'],
  state: 'ACTIVE',
  yourMove: true,
  unread: 3,
  last: '4h ago · Day 3'
}, {
  id: 'ashfall',
  title: 'Ashfall Vigil',
  role: 'player',
  blurb: 'The volcano has not spoken in a hundred years.',
  members: ['The Keeper', 'Mara Vel', 'Orin', 'Pell'],
  state: 'ACTIVE',
  yourMove: false,
  unread: 0,
  last: 'yesterday · Day 11'
}, {
  id: 'salt',
  title: 'Saltmere Below',
  role: 'player',
  blurb: 'Caravan of the Deep Market, lost to the fog.',
  members: ['GM Vane', 'Mara Vel', 'Tace'],
  state: 'PAUSED',
  yourMove: false,
  unread: 0,
  last: '6 days ago'
}];
const ZONES = [{
  name: 'Rope Bridge',
  distance: 'close',
  revealed: true,
  current: true,
  count: 2
}, {
  name: 'Far Bank',
  distance: 'near',
  revealed: true,
  count: 1
}, {
  name: 'Mist Gorge',
  distance: 'far',
  revealed: true
}, {
  name: 'The Spire',
  distance: 'distant',
  revealed: false
}];
const INITIAL_FEED = [{
  id: 1,
  author: 'The Keeper',
  role: 'gm',
  scope: 'public',
  turnNo: 12,
  body: 'A rope bridge spans the gorge, its planks slick with the cold mist that rises off the water far below. On the far bank, a lantern burns where none should.',
  when: 'Yesterday · Day 2'
}, {
  id: 2,
  author: 'Brannon Ash',
  role: 'player',
  scope: 'public',
  turnNo: 13,
  body: 'Brannon tests the first plank with the butt of his spear, listening for rot. "I don\u2019t like that light," he mutters, low enough for only Mara to hear.',
  when: '8 hours ago'
}, {
  id: 3,
  author: 'The Keeper',
  role: 'gm',
  scope: 'gm',
  turnNo: 14,
  body: 'The plank holds \u2014 but the third one is split. Mara, you\u2019re lighter. Roll Dexterity to cross ahead and scout the lantern.',
  dice: {
    label: 'DC 14',
    notation: 'd20+2',
    rolls: [20],
    modifier: 2,
    faces: 20
  },
  when: '4 hours ago'
}];

/* ---------------------------- phone frame ---------------------------- */
function Phone({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 844,
      position: 'relative',
      flex: 'none',
      borderRadius: 52,
      padding: 13,
      background: 'linear-gradient(160deg, #20283f, #0c1120)',
      boxShadow: '0 50px 100px -30px rgba(0,0,0,0.85), inset 0 0 0 1.5px rgba(250,246,236,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 120,
      height: 30,
      background: '#05070d',
      borderRadius: 18,
      zIndex: 30
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "db-backdrop",
    style: {
      width: '100%',
      height: '100%',
      borderRadius: 40,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-app)'
    }
  }, children));
}
function StatusBar({
  light
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 54,
      flex: 'none',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: '0 26px 6px',
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      fontWeight: 600,
      color: light ? '#241B0E' : 'var(--text-strong)',
      position: 'relative',
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "signal",
    size: 16
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "wifi",
    size: 16
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "battery-full",
    size: 18
  })));
}
function HomeIndicator({
  light
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24,
      flex: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 134,
      height: 5,
      borderRadius: 3,
      background: light ? 'rgba(36,27,14,.4)' : 'rgba(250,246,236,.35)'
    }
  }));
}
window.KIT = {
  Phone,
  StatusBar,
  HomeIndicator,
  Icon,
  refreshIcons,
  CAMPAIGNS,
  ZONES,
  INITIAL_FEED
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/kit-app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/kit-lib.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ============================================================
   Drift Bound — UI Kit component library (build artifact)
   Mirrors /components/** so this kit renders standalone without
   the generated _ds_bundle.js. Same source as the design-system
   primitives, exposed on window.DB for the kit screens.
   ============================================================ */
const React = window.React;

// ===== Avatar.jsx =====

/**
 * Drift Bound — Avatar
 * Player / character token. Initials on a deterministic ink tint,
 * or an image. A GM wears an ember ring; an active turn pulses.
 */
function Avatar({
  name = '',
  src = null,
  size = 'md',
  ring = 'none',
  // 'none' | 'gm' | 'active' | 'drift'
  square = false,
  style = {},
  ...rest
}) {
  const sizes = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72
  };
  const px = sizes[size] || (typeof size === 'number' ? size : 40);
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join('') || '?';

  // deterministic tint from name
  const tints = [['#2E3A5E', '#AEEDE4'], ['#3A2E4E', '#D2AC55'], ['#1E3A38', '#4FD0C0'], ['#3E2A1E', '#EC8B45'], ['#2A2E4E', '#A88BE6'], ['#1E2E3E', '#7FB7E8']];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = h * 31 + name.charCodeAt(i) >>> 0;
  const [bg, fg] = tints[h % tints.length];
  const rings = {
    none: {},
    gm: {
      boxShadow: '0 0 0 2px var(--bg-app), 0 0 0 4px var(--ember-500)'
    },
    active: {
      boxShadow: '0 0 0 2px var(--bg-app), 0 0 0 4px var(--drift-500), var(--glow-drift)'
    },
    drift: {
      boxShadow: '0 0 0 2px var(--bg-app), 0 0 0 4px var(--drift-500)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: px,
      height: px,
      flex: 'none',
      borderRadius: square ? 'var(--radius-md)' : '50%',
      background: src ? `center/cover no-repeat url(${src})` : bg,
      color: fg,
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: Math.round(px * 0.38),
      letterSpacing: '0.02em',
      userSelect: 'none',
      ...rings[ring],
      ...style
    },
    title: name || undefined
  }, rest), !src && initials);
}

// ===== Badge.jsx =====

/**
 * Drift Bound — Badge
 * Compact status/scope marker. Tones map to the domain:
 * visibility scopes (public/gm/whisper), turn status, and
 * neutral metadata. Optional leading dot.
 */
function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  // 'soft' | 'outline' | 'solid'
  dot = false,
  size = 'md',
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      c: 'var(--text-muted)',
      base: 'var(--bone-400)'
    },
    public: {
      c: 'var(--drift-400)',
      base: 'var(--drift-500)'
    },
    gm: {
      c: 'var(--ember-400)',
      base: 'var(--ember-500)'
    },
    whisper: {
      c: 'var(--whisper-400)',
      base: 'var(--whisper-500)'
    },
    pending: {
      c: 'var(--amber-warn)',
      base: 'var(--amber-warn)'
    },
    resolved: {
      c: 'var(--sage-500)',
      base: 'var(--sage-500)'
    },
    harm: {
      c: 'var(--rose-500)',
      base: 'var(--rose-500)'
    },
    brass: {
      c: 'var(--brass-300)',
      base: 'var(--brass-500)'
    }
  };
  const t = tones[tone] || tones.neutral;
  const sizes = {
    sm: {
      padding: '2px 8px',
      font: 11,
      gap: 5,
      dotSize: 5
    },
    md: {
      padding: '4px 10px',
      font: 12,
      gap: 6,
      dotSize: 6
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    soft: {
      background: `color-mix(in srgb, ${t.base} 16%, transparent)`,
      color: t.c,
      border: `1px solid color-mix(in srgb, ${t.base} 30%, transparent)`
    },
    outline: {
      background: 'transparent',
      color: t.c,
      border: `1px solid color-mix(in srgb, ${t.base} 45%, transparent)`
    },
    solid: {
      background: t.base,
      color: 'var(--ink-950)',
      border: '1px solid transparent'
    }
  };
  const v = variants[variant] || variants.soft;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: s.gap,
      padding: s.padding,
      fontFamily: 'var(--font-ui)',
      fontSize: s.font,
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.02em',
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      ...v,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: s.dotSize,
      height: s.dotSize,
      borderRadius: '50%',
      background: variant === 'solid' ? 'var(--ink-950)' : t.base,
      flex: 'none'
    }
  }), children);
}

// ===== Button.jsx =====

/**
 * Drift Bound — Button
 * Primary actions ("Submit turn"), secondary, ghost, and danger.
 * Ember-lit primary carries a candlelight glow; press shrinks subtly.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '0 14px',
      height: 36,
      font: 13,
      radius: 'var(--radius-sm)',
      gap: 7
    },
    md: {
      padding: '0 20px',
      height: 44,
      font: 14,
      radius: 'var(--radius-md)',
      gap: 9
    },
    lg: {
      padding: '0 26px',
      height: 52,
      font: 16,
      radius: 'var(--radius-md)',
      gap: 10
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--primary)',
      color: 'var(--text-on-ember)',
      border: '1px solid transparent',
      boxShadow: 'var(--glow-ember)'
    },
    secondary: {
      background: 'var(--surface-raised)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-strong)',
      boxShadow: 'var(--seam-top)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: '1px solid transparent',
      boxShadow: 'none'
    },
    accent: {
      background: 'transparent',
      color: 'var(--drift-400)',
      border: '1px solid var(--border-strong)',
      boxShadow: 'var(--glow-drift)'
    },
    danger: {
      background: 'transparent',
      color: 'var(--rose-500)',
      border: '1px solid color-mix(in srgb, var(--rose-500) 45%, transparent)',
      boxShadow: 'none'
    }
  };
  const v = variants[variant] || variants.primary;
  const [pressed, setPressed] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const hoverBg = {
    primary: 'var(--primary-hover)',
    secondary: 'var(--surface-overlay)',
    ghost: 'color-mix(in srgb, var(--bone-50) 7%, transparent)',
    accent: 'color-mix(in srgb, var(--drift-500) 12%, transparent)',
    danger: 'color-mix(in srgb, var(--rose-500) 12%, transparent)'
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled || loading,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      width: fullWidth ? '100%' : 'auto',
      height: s.height,
      minWidth: s.height,
      padding: s.padding,
      fontFamily: 'var(--font-ui)',
      fontSize: s.font,
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
      borderRadius: s.radius,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transform: pressed ? 'scale(0.97)' : 'scale(1)',
      transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...v,
      background: hover && !disabled ? hoverBg : v.background,
      ...style
    }
  }, rest), loading && /*#__PURE__*/React.createElement(Spinner, null), !loading && icon, children && /*#__PURE__*/React.createElement("span", null, children), !loading && iconRight);
}
function Spinner() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 15,
      height: 15,
      borderRadius: '50%',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      display: 'inline-block',
      animation: 'db-spin 0.7s linear infinite'
    }
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes db-spin{to{transform:rotate(360deg)}}'));
}

// ===== Card.jsx =====

/**
 * Drift Bound — Card
 * The base surface container. Raised ink panel with a hairline
 * bone border and a faint top seam. Optional ember/drift glow
 * for active or highlighted cards, and an interactive lift.
 */
function Card({
  children,
  glow = 'none',
  // 'none' | 'ember' | 'drift'
  interactive = false,
  padding = 'var(--space-5)',
  as = 'div',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = as;
  const glows = {
    none: 'var(--shadow-md), var(--seam-top)',
    ember: 'var(--glow-ember), var(--shadow-md)',
    drift: 'var(--glow-drift), var(--shadow-md)'
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    onMouseEnter: interactive ? () => setHover(true) : undefined,
    onMouseLeave: interactive ? () => setHover(false) : undefined,
    style: {
      background: 'var(--surface-raised)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding,
      boxShadow: hover ? 'var(--shadow-lg), var(--seam-top)' : glows[glow],
      transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      cursor: interactive ? 'pointer' : 'default',
      ...style
    }
  }, rest), children);
}

// ===== Input.jsx =====

/**
 * Drift Bound — Input / Textarea
 * Labeled text field on a recessed ink well. Drift focus ring.
 * Set `multiline` for Turn composition. Supports error + hint.
 */
function Input({
  label,
  value,
  onChange,
  placeholder = '',
  hint = '',
  error = '',
  multiline = false,
  rows = 4,
  icon = null,
  type = 'text',
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  const Field = multiline ? 'textarea' : 'input';
  const borderColor = error ? 'var(--rose-500)' : focus ? 'var(--drift-500)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-muted)',
      letterSpacing: '0.01em'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: multiline ? 'flex-start' : 'center',
      gap: 10,
      background: 'var(--bg-deep)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      padding: multiline ? '12px 14px' : '0 14px',
      height: multiline ? 'auto' : 44,
      boxShadow: focus ? 'var(--ring)' : 'none',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      opacity: disabled ? 0.5 : 1
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)',
      display: 'flex',
      marginTop: multiline ? 2 : 0
    }
  }, icon), /*#__PURE__*/React.createElement(Field, _extends({
    id: inputId,
    type: multiline ? undefined : type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    rows: multiline ? rows : undefined,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      width: '100%',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      resize: multiline ? 'vertical' : undefined,
      color: 'var(--text-strong)',
      fontFamily: multiline ? 'var(--font-narrative)' : 'var(--font-ui)',
      fontSize: multiline ? 16 : 15,
      lineHeight: multiline ? 1.6 : 1.4,
      padding: 0
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 12,
      color: error ? 'var(--rose-500)' : 'var(--text-faint)'
    }
  }, error || hint));
}

// ===== Switch.jsx =====

/**
 * Drift Bound — Switch
 * Toggle for binary settings (quiet hours, push, GM-only draft).
 * Drift-on, ink-off. The thumb is a small bone disc.
 */
function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const inputId = id || React.useId();
  const W = 46,
    H = 28,
    pad = 3,
    thumb = H - pad * 2;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: W,
      height: H,
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--drift-500)' : 'var(--ink-600)',
      border: `1px solid ${checked ? 'var(--drift-600)' : 'var(--border-strong)'}`,
      boxShadow: checked ? 'var(--glow-drift)' : 'inset 0 1px 3px rgba(0,0,0,0.4)',
      transition: 'background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: pad,
      left: checked ? W - thumb - pad - 1 : pad,
      width: thumb,
      height: thumb,
      borderRadius: '50%',
      background: checked ? 'var(--ink-950)' : 'var(--bone-200)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
      transition: 'left var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)'
    }
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}

// ===== DiceRoll.jsx =====

/**
 * Drift Bound — DiceRoll
 * A mono dice result. Notation → total, with the individual dice
 * shown. Natural max reads as a crit (ember), natural 1 a fumble
 * (rose). Tabular numerals throughout.
 */
function DiceRoll({
  notation = '2d6',
  rolls = [],
  // e.g. [4, 5]
  modifier = 0,
  total = null,
  faces = null,
  // d-faces for crit/fumble detection (e.g. 20)
  label = '',
  style = {},
  ...rest
}) {
  const sum = total != null ? total : rolls.reduce((a, b) => a + b, 0) + modifier;
  const single = rolls.length === 1 && faces;
  const crit = single && rolls[0] === faces;
  const fumble = single && rolls[0] === 1;
  const totalColor = crit ? 'var(--ember-400)' : fumble ? 'var(--rose-500)' : 'var(--brass-300)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '7px 12px',
      background: 'var(--bg-deep)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--text-faint)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, notation), rolls.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 4
    }
  }, rolls.map((r, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      minWidth: 22,
      textAlign: 'center',
      padding: '1px 4px',
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 500,
      background: 'var(--surface-raised)',
      border: '1px solid var(--border)',
      color: 'var(--text-body)'
    }
  }, r))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)',
      fontSize: 12
    }
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: totalColor
    }
  }, sum), crit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--ember-400)',
      letterSpacing: '0.1em'
    }
  }, "CRIT"), fumble && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--rose-500)',
      letterSpacing: '0.1em'
    }
  }, "FUMBLE"));
}

// ===== ZoneChip.jsx =====

/**
 * Drift Bound — ZoneChip
 * A node in the zone graph (exploration model). Tone follows the
 * Close→Distant distance ramp. Unrevealed zones read as locked.
 */
function ZoneChip({
  name,
  distance = 'near',
  // 'close' | 'near' | 'far' | 'distant'
  revealed = true,
  current = false,
  count = null,
  // characters present
  onClick,
  style = {},
  ...rest
}) {
  const tones = {
    close: 'var(--zone-close)',
    near: 'var(--zone-near)',
    far: 'var(--zone-far)',
    distant: 'var(--zone-distant)'
  };
  const tone = tones[distance] || tones.near;
  if (!revealed) {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 14px',
        borderRadius: 'var(--radius-pill)',
        background: 'transparent',
        border: '1px dashed var(--border-strong)',
        color: 'var(--text-faint)',
        fontFamily: 'var(--font-ui)',
        fontSize: 13,
        fontWeight: 500,
        fontStyle: 'italic',
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: 0.7
      }
    }, "\u25C7"), " Unrevealed");
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      padding: '8px 14px',
      borderRadius: 'var(--radius-pill)',
      background: current ? `color-mix(in srgb, ${tone} 18%, transparent)` : 'var(--surface-raised)',
      border: `1px solid ${current ? tone : 'var(--border-strong)'}`,
      boxShadow: current ? `0 0 18px -6px ${tone}` : 'none',
      color: 'var(--text-body)',
      fontFamily: 'var(--font-ui)',
      fontSize: 13,
      fontWeight: 600,
      cursor: onClick ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: tone,
      flex: 'none'
    }
  }), name, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: tone
    }
  }, distance), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)',
      paddingLeft: 6,
      borderLeft: '1px solid var(--border)'
    }
  }, count, "\u25CF"));
}

// ===== TurnCard.jsx =====

/**
 * Drift Bound — TurnCard
 * The atomic unit of play-by-post progression: one participant's
 * submission. Author + role, visibility scope, narrative prose,
 * optional dice, and a timestamp. GM turns carry an ember edge.
 */
function TurnCard({
  author = 'Player',
  role = 'player',
  // 'player' | 'gm'
  scope = 'public',
  // 'public' | 'gm' | 'whisper'
  whisperTo = '',
  body = '',
  dice = null,
  // <DiceRoll/> props or node
  when = '',
  turnNo = null,
  unread = false,
  style = {},
  ...rest
}) {
  const isGM = role === 'gm';
  const scopeMap = {
    public: {
      tone: 'public',
      label: 'Public'
    },
    gm: {
      tone: 'gm',
      label: 'GM only'
    },
    whisper: {
      tone: 'whisper',
      label: whisperTo ? `Whisper · ${whisperTo}` : 'Whisper'
    }
  };
  const sc = scopeMap[scope] || scopeMap.public;
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      position: 'relative',
      display: 'flex',
      gap: 'var(--space-3)',
      background: 'var(--surface-raised)',
      border: '1px solid var(--border)',
      borderLeft: isGM ? '2px solid var(--ember-500)' : '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-4) var(--space-5)',
      boxShadow: isGM ? 'var(--glow-soft), var(--shadow-md)' : 'var(--shadow-md)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(Avatar, {
    name: author,
    ring: isGM ? 'gm' : 'none',
    size: "md"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--text-strong)',
      whiteSpace: 'nowrap'
    }
  }, author), isGM && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--ember-400)'
    }
  }, "Game Master"), /*#__PURE__*/React.createElement(Badge, {
    tone: sc.tone,
    dot: true,
    size: "sm"
  }, sc.label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), turnNo != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-faint)'
    }
  }, "#", turnNo), unread && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--drift-400)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-narrative)',
      fontSize: 17,
      lineHeight: 1.65,
      color: 'var(--text-body)'
    }
  }, body), dice && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, React.isValidElement(dice) ? dice : /*#__PURE__*/React.createElement(DiceRoll, dice)), when && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-faint)'
    }
  }, when)));
}
window.DB = {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Switch,
  DiceRoll,
  ZoneChip,
  TurnCard
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/kit-lib.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/kit-screens.jsx
try { (() => {
/* ============================================================
   Drift Bound — Mobile UI Kit · screens & router
   ============================================================ */
const {
  Phone,
  StatusBar,
  HomeIndicator,
  Icon,
  refreshIcons,
  CAMPAIGNS,
  ZONES,
  INITIAL_FEED
} = window.KIT;
const {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Switch,
  DiceRoll,
  ZoneChip,
  TurnCard
} = window.DB;
const {
  useState,
  useEffect,
  useRef
} = React;

/* ------------------------------- Sign in ------------------------------- */
function SignIn({
  onSent
}) {
  const [email, setEmail] = useState('mara@table.night');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '0 28px',
      justifyContent: 'center',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    width: "76",
    alt: "",
    style: {
      color: 'var(--bone-200)'
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 46,
      fontWeight: 600,
      color: 'var(--text-strong)',
      marginTop: 14,
      lineHeight: 1
    }
  }, "Drift Bound"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-narrative)',
      fontStyle: 'italic',
      color: 'var(--text-muted)',
      fontSize: 17,
      marginTop: 8
    }
  }, "Adventures that wait for you.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 18
    }),
    hint: "No passwords. We send a one-time link."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: onSent,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Send magic link")), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      fontFamily: 'var(--font-ui)',
      fontSize: 12,
      color: 'var(--text-faint)'
    }
  }, "By continuing you agree to keep the fiction kind."));
}
function LinkSent({
  onEnter
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '0 28px',
      justifyContent: 'center',
      gap: 22,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 76,
      height: 76,
      borderRadius: '50%',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'color-mix(in srgb, var(--drift-500) 16%, transparent)',
      border: '1px solid var(--border-drift, var(--drift-600))',
      boxShadow: 'var(--glow-drift)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail-check",
    size: 34,
    color: "var(--drift-400)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 32,
      color: 'var(--text-strong)'
    }
  }, "Check your inbox"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-narrative)',
      fontSize: 17,
      color: 'var(--text-body)',
      marginTop: 10,
      lineHeight: 1.6
    }
  }, "We sent a link to ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-strong)'
    }
  }, "mara@table.night"), ". It expires in 15 minutes.")), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    fullWidth: true,
    onClick: onEnter,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "wand-sparkles",
      size: 18
    })
  }, "I tapped the link"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 13,
      color: 'var(--text-faint)'
    }
  }, "Didn't get it? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--link)'
    }
  }, "Resend")));
}

/* ----------------------------- Campaigns ----------------------------- */
function CampaignCard({
  c,
  onOpen
}) {
  return /*#__PURE__*/React.createElement(Card, {
    interactive: true,
    onClick: () => onOpen(c),
    padding: "var(--space-4)",
    style: {
      borderRadius: 'var(--radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 23,
      color: 'var(--text-strong)'
    }
  }, c.title), c.role === 'gm' && /*#__PURE__*/React.createElement(Badge, {
    tone: "gm",
    size: "sm",
    dot: true
  }, "GM")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-narrative)',
      fontStyle: 'italic',
      fontSize: 15,
      color: 'var(--text-muted)',
      marginBottom: 12
    }
  }, c.blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, c.members.slice(0, 3).map((m, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      marginLeft: i ? -10 : 0
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: m,
    size: "xs"
  })))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-faint)'
    }
  }, c.last))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: c.state === 'ACTIVE' ? 'resolved' : 'neutral',
    size: "sm",
    variant: "outline"
  }, c.state), c.yourMove && /*#__PURE__*/React.createElement(Badge, {
    tone: "gm",
    size: "sm",
    dot: true
  }, "Your move"), c.unread > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--drift-400)'
    }
  }, c.unread, " new"))));
}
function Campaigns({
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      padding: '4px 24px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "t-eyebrow",
    style: {
      margin: 0
    }
  }, "Day 3 \xB7 Two await you"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 38,
      color: 'var(--text-strong)',
      lineHeight: 1
    }
  }, "Campaigns")), /*#__PURE__*/React.createElement(Avatar, {
    name: "Mara Vel",
    size: "md"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 24px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, CAMPAIGNS.map(c => /*#__PURE__*/React.createElement(CampaignCard, {
    key: c.id,
    c: c,
    onOpen: onOpen
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      marginTop: 4,
      height: 52,
      borderRadius: 'var(--radius-md)',
      border: '1px dashed var(--border-strong)',
      background: 'transparent',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 18
  }), " Start a new campaign")));
}

/* --------------------------- Session thread --------------------------- */
function ZoneRail() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      padding: '12px 24px',
      borderBottom: '1px solid var(--border)'
    }
  }, ZONES.map((z, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(ZoneChip, z))));
}
function SessionThread({
  campaign,
  feed,
  onBack,
  onCompose
}) {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [feed.length]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      padding: '2px 18px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: 'transparent',
      border: 'none',
      color: 'var(--text-body)',
      cursor: 'pointer',
      padding: 6,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 24
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      color: 'var(--text-strong)',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, campaign.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 12,
      color: 'var(--text-faint)',
      marginTop: 3
    }
  }, "Session: The Rope Bridge")), /*#__PURE__*/React.createElement(Badge, {
    tone: "resolved",
    size: "sm",
    dot: true
  }, "ACTIVE")), /*#__PURE__*/React.createElement(ZoneRail, null), /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 18px 90px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-faint)',
      letterSpacing: '0.08em'
    }
  }, "\u2014 DAY 2 \u2014"), feed.map(t => /*#__PURE__*/React.createElement(TurnCard, {
    key: t.id,
    author: t.author,
    role: t.role,
    scope: t.scope,
    turnNo: t.turnNo,
    body: t.body,
    dice: t.dice,
    when: t.when,
    unread: t.unread
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 24,
      padding: '12px 18px',
      display: 'flex',
      gap: 10,
      background: 'linear-gradient(to top, var(--bg-app) 55%, transparent)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: onCompose,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "feather",
      size: 18
    })
  }, "Write your turn")));
}

/* ------------------------------ Composer ------------------------------ */
const SCOPES = [{
  id: 'public',
  label: 'Public',
  icon: 'users',
  tone: 'public'
}, {
  id: 'gm',
  label: 'GM only',
  icon: 'shield',
  tone: 'gm'
}, {
  id: 'whisper',
  label: 'Whisper',
  icon: 'ear',
  tone: 'whisper'
}];
function Composer({
  onCancel,
  onSubmit
}) {
  const [scope, setScope] = useState('public');
  const [text, setText] = useState('');
  const [withDice, setWithDice] = useState(false);
  const canSend = text.trim().length > 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 40,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-deep)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 54
    }
  }), /*#__PURE__*/React.createElement("header", {
    style: {
      padding: '0 20px 14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    style: {
      background: 'transparent',
      border: 'none',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-ui)',
      fontSize: 15,
      cursor: 'pointer'
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      color: 'var(--text-strong)',
      whiteSpace: 'nowrap'
    }
  }, "Your turn"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    disabled: !canSend,
    onClick: () => onSubmit({
      scope,
      text,
      withDice
    })
  }, "Submit")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "t-eyebrow",
    style: {
      marginBottom: 8
    }
  }, "Who can read this"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, SCOPES.map(s => {
    const active = scope === s.id;
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      onClick: () => setScope(s.id),
      style: {
        flex: 1,
        height: 56,
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        fontFamily: 'var(--font-ui)',
        fontSize: 12,
        fontWeight: 600,
        background: active ? `color-mix(in srgb, var(--scope-${s.id}) 18%, transparent)` : 'var(--surface-raised)',
        border: `1px solid ${active ? `var(--scope-${s.id})` : 'var(--border-strong)'}`,
        color: active ? `var(--scope-${s.id})` : 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: s.icon,
      size: 18
    }), " ", s.label);
  }))), /*#__PURE__*/React.createElement(Input, {
    label: "Narration",
    multiline: true,
    rows: 7,
    value: text,
    onChange: e => setText(e.target.value),
    placeholder: "Mara breathes once, then steps onto the split plank\u2026"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 14px',
      background: 'var(--surface-raised)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "dice-5",
    size: 20,
    color: "var(--brass-300)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-body)'
    }
  }, "Attach a roll"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-faint)'
    }
  }, "d20+2 \xB7 Dexterity"))), /*#__PURE__*/React.createElement(Switch, {
    checked: withDice,
    onChange: e => setWithDice(e.target.checked)
  }))), /*#__PURE__*/React.createElement(HomeIndicator, null));
}

/* ------------------------------- Tab bar ------------------------------- */
function TabBar({
  tab,
  setTab
}) {
  const tabs = [{
    id: 'campaigns',
    icon: 'scroll',
    label: 'Play'
  }, {
    id: 'map',
    icon: 'compass',
    label: 'Atlas'
  }, {
    id: 'alerts',
    icon: 'bell',
    label: 'Alerts'
  }, {
    id: 'me',
    icon: 'user',
    label: 'You'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      padding: '8px 12px 0',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-deep)'
    }
  }, tabs.map(t => {
    const active = tab === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => setTab(t.id),
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '4px 0',
        color: active ? 'var(--ember-400)' : 'var(--text-faint)',
        fontFamily: 'var(--font-ui)',
        fontSize: 11,
        fontWeight: 600,
        position: 'relative'
      }
    }, t.id === 'alerts' && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: -2,
        right: '32%',
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: 'var(--ember-500)'
      }
    }), /*#__PURE__*/React.createElement(Icon, {
      name: t.icon,
      size: 22
    }), " ", t.label);
  }));
}

/* -------------------------------- App -------------------------------- */
function App() {
  const [screen, setScreen] = useState('signin'); // signin | sent | home | session
  const [tab, setTab] = useState('campaigns');
  const [active, setActive] = useState(null);
  const [feed, setFeed] = useState(INITIAL_FEED);
  const [composing, setComposing] = useState(false);
  useEffect(() => {
    refreshIcons();
  });
  const openCampaign = c => {
    setActive(c);
    setFeed(INITIAL_FEED);
    setScreen('session');
  };
  const submitTurn = ({
    scope,
    text,
    withDice
  }) => {
    setFeed(f => [...f, {
      id: Date.now(),
      author: 'Mara Vel',
      role: 'player',
      scope,
      turnNo: 15,
      body: text.trim(),
      unread: false,
      when: 'just now',
      dice: withDice ? {
        label: 'Dexterity',
        notation: 'd20+2',
        rolls: [17],
        modifier: 2,
        faces: 20
      } : null
    }]);
    setComposing(false);
  };
  const light = false;
  let content;
  if (screen === 'signin') content = /*#__PURE__*/React.createElement(SignIn, {
    onSent: () => setScreen('sent')
  });else if (screen === 'sent') content = /*#__PURE__*/React.createElement(LinkSent, {
    onEnter: () => setScreen('home')
  });else if (screen === 'session') content = /*#__PURE__*/React.createElement(SessionThread, {
    campaign: active,
    feed: feed,
    onBack: () => setScreen('home'),
    onCompose: () => setComposing(true)
  });else content = /*#__PURE__*/React.createElement(Campaigns, {
    onOpen: openCampaign
  });
  const showTabs = screen === 'home';
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement(StatusBar, {
    light: light
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      position: 'relative'
    }
  }, content), showTabs && /*#__PURE__*/React.createElement(TabBar, {
    tab: tab,
    setTab: setTab
  }), (screen === 'home' || screen === 'signin' || screen === 'sent') && /*#__PURE__*/React.createElement(HomeIndicator, {
    light: light
  }), composing && /*#__PURE__*/React.createElement(Composer, {
    onCancel: () => setComposing(false),
    onSubmit: submitTurn
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
setTimeout(refreshIcons, 60);
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/kit-screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.DiceRoll = __ds_scope.DiceRoll;

__ds_ns.TurnCard = __ds_scope.TurnCard;

__ds_ns.ZoneChip = __ds_scope.ZoneChip;

})();
