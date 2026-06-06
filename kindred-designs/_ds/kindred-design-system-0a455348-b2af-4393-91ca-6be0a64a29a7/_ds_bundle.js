/* @ds-bundle: {"format":3,"namespace":"KindredDesignSystem_0a4553","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"InterestTag","sourcePath":"components/social/InterestTag.jsx"},{"name":"MatchScore","sourcePath":"components/social/MatchScore.jsx"},{"name":"ProfileCard","sourcePath":"components/social/ProfileCard.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"877e6293826a","components/core/Badge.jsx":"8b9e02cbdc0e","components/core/Button.jsx":"178c02bf7045","components/core/Card.jsx":"84fadb61ccb3","components/core/Input.jsx":"84b7ef8564ad","components/core/Switch.jsx":"d8bc793d3207","components/core/Tag.jsx":"b6808bdc9c4e","components/social/InterestTag.jsx":"6571064e3533","components/social/MatchScore.jsx":"7eadb8fa4ac2","components/social/ProfileCard.jsx":"ae341565d7b8","ui_kits/app/ConnectionsScreen.jsx":"6db4d0f3c83f","ui_kits/app/DiscoverScreen.jsx":"e8f4e87fea43","ui_kits/app/MyProfileScreen.jsx":"3c377359cf4c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KindredDesignSystem_0a4553 = window.KindredDesignSystem_0a4553 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const AVATAR_CSS = `
.kd-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-avatar);
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background: var(--coral-100);
  color: var(--coral-600);
  font-family: var(--font-sans);
  font-weight: var(--weight-bold);
  user-select: none;
}
.kd-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
.kd-avatar--xs  { width: 20px; height: 20px; font-size: 8px; }
.kd-avatar--sm  { width: 28px; height: 28px; font-size: 10px; }
.kd-avatar--md  { width: 40px; height: 40px; font-size: 14px; }
.kd-avatar--lg  { width: 56px; height: 56px; font-size: 18px; }
.kd-avatar--xl  { width: 80px; height: 80px; font-size: 24px; }
.kd-avatar--2xl { width: 112px; height: 112px; font-size: 32px; }

/* Ring variants */
.kd-avatar--ring-primary {
  box-shadow: 0 0 0 2.5px var(--surface-raised), 0 0 0 5px var(--color-primary);
}
.kd-avatar--ring-secondary {
  box-shadow: 0 0 0 2.5px var(--surface-raised), 0 0 0 5px var(--color-secondary);
}

/* Presence dot */
.kd-avatar__presence {
  position: absolute;
  border: 2px solid var(--surface-raised);
  border-radius: 50%;
}
.kd-avatar--xs  .kd-avatar__presence,
.kd-avatar--sm  .kd-avatar__presence { width: 7px; height: 7px; bottom: 0; right: 0; }
.kd-avatar--md  .kd-avatar__presence { width: 10px; height: 10px; bottom: 1px; right: 1px; }
.kd-avatar--lg  .kd-avatar__presence { width: 13px; height: 13px; bottom: 2px; right: 2px; }
.kd-avatar--xl  .kd-avatar__presence { width: 17px; height: 17px; bottom: 3px; right: 3px; }
.kd-avatar--2xl .kd-avatar__presence { width: 22px; height: 22px; bottom: 4px; right: 4px; }

.kd-avatar__presence--online  { background: var(--color-online); }
.kd-avatar__presence--offline { background: var(--neutral-300); }
.kd-avatar__presence--away    { background: var(--color-warning); }

/* Stack group */
.kd-avatar-group { display: flex; }
.kd-avatar-group .kd-avatar {
  box-shadow: 0 0 0 2px var(--surface-raised);
  margin-left: -8px;
}
.kd-avatar-group .kd-avatar:first-child { margin-left: 0; }
`;
if (typeof document !== 'undefined' && !document.getElementById('kd-avatar-styles')) {
  const el = document.createElement('style');
  el.id = 'kd-avatar-styles';
  el.textContent = AVATAR_CSS;
  document.head.appendChild(el);
}
function getInitials(name = '') {
  return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

/**
 * Kindred Avatar — user profile picture with initials fallback and presence.
 */
function Avatar({
  src,
  name,
  size = 'md',
  presence,
  ring,
  alt,
  ...props
}) {
  const classes = ['kd-avatar', `kd-avatar--${size}`, ring ? `kd-avatar--ring-${ring}` : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes
  }, props), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || name || 'avatar'
  }) : /*#__PURE__*/React.createElement("span", null, getInitials(name)), presence && /*#__PURE__*/React.createElement("span", {
    className: `kd-avatar__presence kd-avatar__presence--${presence}`
  }));
}

/**
 * AvatarGroup — renders a horizontal stack of overlapping avatars.
 */
function AvatarGroup({
  children,
  max,
  ...props
}) {
  const kids = React.Children.toArray(children);
  const shown = max ? kids.slice(0, max) : kids;
  const overflow = max ? kids.length - max : 0;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "kd-avatar-group"
  }, props), shown, overflow > 0 && /*#__PURE__*/React.createElement(Avatar, {
    name: `+${overflow}`,
    size: shown[0]?.props?.size || 'md'
  }));
}
Object.assign(__ds_scope, { Avatar, AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BADGE_CSS = `
.kd-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  border-radius: var(--radius-badge);
  white-space: nowrap;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}
.kd-badge--sm { font-size: var(--text-2xs); padding: 2px 7px; height: 18px; }
.kd-badge--md { font-size: var(--text-xs);  padding: 3px 9px; height: 22px; }

.kd-badge--primary   { background: var(--coral-100);   color: var(--coral-700); }
.kd-badge--secondary { background: var(--amber-100);   color: var(--amber-700); }
.kd-badge--success   { background: var(--sage-100);    color: var(--sage-500); }
.kd-badge--warning   { background: var(--amber-100);   color: var(--amber-600); }
.kd-badge--error     { background: var(--rose-100);    color: var(--rose-500); }
.kd-badge--neutral   { background: var(--neutral-200); color: var(--neutral-700); }
.kd-badge--solid-primary   { background: var(--coral-500); color: #fff; }
.kd-badge--solid-secondary { background: var(--amber-400); color: var(--navy-800); }
.kd-badge--solid-success   { background: var(--sage-400);  color: #fff; }

.kd-badge__dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.kd-badge--primary   .kd-badge__dot { background: var(--coral-500); }
.kd-badge--secondary .kd-badge__dot { background: var(--amber-500); }
.kd-badge--success   .kd-badge__dot { background: var(--sage-400); }
.kd-badge--warning   .kd-badge__dot { background: var(--amber-500); }
.kd-badge--error     .kd-badge__dot { background: var(--rose-500); }
.kd-badge--neutral   .kd-badge__dot { background: var(--neutral-500); }

.kd-badge__dot--pulse {
  animation: kd-badge-pulse 2s ease-in-out infinite;
}
@keyframes kd-badge-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
`;
if (typeof document !== 'undefined' && !document.getElementById('kd-badge-styles')) {
  const el = document.createElement('style');
  el.id = 'kd-badge-styles';
  el.textContent = BADGE_CSS;
  document.head.appendChild(el);
}

/**
 * Kindred Badge — status label, count indicator, or category tag.
 */
function Badge({
  variant = 'neutral',
  size = 'md',
  children,
  dot = false,
  dotPulse = false,
  icon,
  ...props
}) {
  const classes = ['kd-badge', `kd-badge--${variant}`, `kd-badge--${size}`].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classes
  }, props), dot && /*#__PURE__*/React.createElement("span", {
    className: `kd-badge__dot${dotPulse ? ' kd-badge__dot--pulse' : ''}`
  }), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BUTTON_CSS = `
.kd-btn {
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wide);
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-sm);
  border-radius: var(--radius-button);
  transition: var(--transition-button);
  text-decoration: none;
  white-space: nowrap;
  line-height: 1;
  position: relative;
  outline: none;
  -webkit-font-smoothing: antialiased;
}
.kd-btn:focus-visible { box-shadow: var(--focus-ring); }
.kd-btn:disabled { opacity: 0.45; cursor: not-allowed; pointer-events: none; }
.kd-btn:active:not(:disabled) { transform: scale(0.97); }

/* Sizes */
.kd-btn--sm { height: 32px; padding: 0 var(--inset-sm); font-size: var(--text-xs); gap: var(--gap-xs); }
.kd-btn--md { height: 40px; padding: 0 var(--inset-md); font-size: var(--text-sm); }
.kd-btn--lg { height: 48px; padding: 0 var(--inset-lg); font-size: var(--text-md); gap: var(--gap-md); }

/* Icon-only */
.kd-btn--icon-sm { width: 32px; height: 32px; padding: 0; }
.kd-btn--icon-md { width: 40px; height: 40px; padding: 0; }
.kd-btn--icon-lg { width: 48px; height: 48px; padding: 0; }

/* Full width */
.kd-btn--full { width: 100%; }

/* Variants */
.kd-btn--primary {
  background: var(--color-primary);
  color: var(--text-on-primary);
  box-shadow: 0 2px 8px rgba(255, 87, 51, 0.30);
}
.kd-btn--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
  box-shadow: 0 4px 16px rgba(255, 87, 51, 0.40);
}
.kd-btn--primary:active:not(:disabled) { background: var(--color-primary-active); }

.kd-btn--secondary {
  background: var(--color-secondary);
  color: var(--text-on-secondary);
  box-shadow: 0 2px 8px rgba(255, 191, 0, 0.28);
}
.kd-btn--secondary:hover:not(:disabled) {
  background: var(--color-secondary-hover);
  box-shadow: 0 4px 16px rgba(255, 191, 0, 0.36);
}

.kd-btn--soft {
  background: var(--surface-primary-subtle);
  color: var(--color-primary);
}
.kd-btn--soft:hover:not(:disabled) {
  background: var(--coral-100);
}

.kd-btn--ghost {
  background: transparent;
  color: var(--text-primary);
  box-shadow: inset 0 0 0 1.5px var(--border-default);
}
.kd-btn--ghost:hover:not(:disabled) {
  background: var(--surface-sunken);
  box-shadow: inset 0 0 0 1.5px var(--border-strong);
}

.kd-btn--danger {
  background: var(--color-error);
  color: #fff;
  box-shadow: 0 2px 8px rgba(232, 39, 74, 0.28);
}
.kd-btn--danger:hover:not(:disabled) {
  background: #c0183a;
}

.kd-btn--neutral {
  background: var(--surface-sunken);
  color: var(--text-secondary);
}
.kd-btn--neutral:hover:not(:disabled) {
  background: var(--neutral-200);
  color: var(--text-primary);
}

/* Loading spinner */
.kd-btn__spinner {
  width: 1em; height: 1em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: kd-spin 0.6s linear infinite;
  opacity: 0.7;
}
@keyframes kd-spin { to { transform: rotate(360deg); } }
`;
if (typeof document !== 'undefined' && !document.getElementById('kd-btn-styles')) {
  const el = document.createElement('style');
  el.id = 'kd-btn-styles';
  el.textContent = BUTTON_CSS;
  document.head.appendChild(el);
}

/**
 * Kindred Button — primary interactive action element.
 */
function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconTrailing,
  iconOnly = false,
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) {
  const classes = ['kd-btn', `kd-btn--${variant}`, iconOnly ? `kd-btn--icon-${size}` : `kd-btn--${size}`, fullWidth ? 'kd-btn--full' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: classes,
    disabled: disabled || loading,
    onClick: onClick
  }, props), loading ? /*#__PURE__*/React.createElement("span", {
    className: "kd-btn__spinner",
    "aria-hidden": "true"
  }) : icon && /*#__PURE__*/React.createElement("span", {
    className: "kd-btn__icon",
    "aria-hidden": "true"
  }, icon), !iconOnly && children, !loading && iconTrailing && /*#__PURE__*/React.createElement("span", {
    className: "kd-btn__icon-trailing",
    "aria-hidden": "true"
  }, iconTrailing));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CARD_CSS = `
.kd-card {
  font-family: var(--font-sans);
  border-radius: var(--radius-card);
  overflow: hidden;
  position: relative;
  transition: var(--transition-card);
}
.kd-card--flat    { background: var(--surface-raised); }
.kd-card--raised  { background: var(--surface-raised); box-shadow: var(--shadow-card); }
.kd-card--outlined{ background: var(--surface-raised); border: 1.5px solid var(--border-subtle); }
.kd-card--sunken  { background: var(--surface-sunken); }

.kd-card--hoverable:hover { transform: translateY(-2px); box-shadow: var(--shadow-card-hover); cursor: pointer; }
.kd-card--hoverable:active { transform: translateY(0); box-shadow: var(--shadow-card); }

/* Padding sizes */
.kd-card--pad-none { padding: 0; }
.kd-card--pad-sm   { padding: var(--inset-sm); }
.kd-card--pad-md   { padding: var(--inset-md); }
.kd-card--pad-lg   { padding: var(--inset-lg); }
.kd-card--pad-xl   { padding: var(--inset-xl); }
`;
if (typeof document !== 'undefined' && !document.getElementById('kd-card-styles')) {
  const el = document.createElement('style');
  el.id = 'kd-card-styles';
  el.textContent = CARD_CSS;
  document.head.appendChild(el);
}

/**
 * Kindred Card — base container with rounded corners, shadows, and hover lift.
 */
function Card({
  variant = 'raised',
  padding = 'md',
  hoverable = false,
  children,
  onClick,
  style,
  ...props
}) {
  const classes = ['kd-card', `kd-card--${variant}`, `kd-card--pad-${padding}`, hoverable || onClick ? 'kd-card--hoverable' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes,
    onClick: onClick,
    style: style
  }, props), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const INPUT_CSS = `
.kd-field {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
  font-family: var(--font-sans);
}
.kd-field__label {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
  line-height: var(--leading-snug);
}
.kd-field__label--required::after {
  content: ' *';
  color: var(--color-error);
}
.kd-field__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.kd-field__input {
  width: 100%;
  font-family: var(--font-sans);
  font-size: var(--text-md);
  font-weight: var(--weight-regular);
  color: var(--text-primary);
  background: var(--surface-raised);
  border: 1.5px solid var(--border-default);
  border-radius: var(--radius-input);
  outline: none;
  transition: var(--transition-input);
  -webkit-font-smoothing: antialiased;
}
.kd-field__input--md { height: 44px; padding: 0 var(--inset-md); }
.kd-field__input--lg { height: 52px; padding: 0 var(--inset-lg); font-size: var(--text-lg); }
.kd-field__input--sm { height: 36px; padding: 0 var(--inset-sm); font-size: var(--text-sm); }

.kd-field__input::placeholder { color: var(--text-tertiary); }
.kd-field__input:hover:not(:disabled) { border-color: var(--border-strong); }
.kd-field__input:focus { border-color: var(--border-focus); box-shadow: var(--focus-ring); }
.kd-field__input:disabled { opacity: 0.5; cursor: not-allowed; background: var(--surface-sunken); }
.kd-field__input--error { border-color: var(--color-error) !important; }
.kd-field__input--error:focus { box-shadow: 0 0 0 3px rgba(232, 39, 74, 0.20); }

/* With icons */
.kd-field__input--has-prefix { padding-left: 42px; }
.kd-field__input--has-suffix { padding-right: 42px; }
.kd-field__prefix, .kd-field__suffix {
  position: absolute;
  top: 50%; transform: translateY(-50%);
  display: flex; align-items: center;
  color: var(--text-tertiary);
  pointer-events: none;
}
.kd-field__prefix { left: 14px; }
.kd-field__suffix { right: 14px; }
.kd-field__suffix--btn { pointer-events: auto; cursor: pointer; background: none; border: none; padding: 0; }

/* Helper / error text */
.kd-field__hint {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  line-height: var(--leading-normal);
}
.kd-field__hint--error { color: var(--color-error); }
`;
if (typeof document !== 'undefined' && !document.getElementById('kd-input-styles')) {
  const el = document.createElement('style');
  el.id = 'kd-input-styles';
  el.textContent = INPUT_CSS;
  document.head.appendChild(el);
}

/**
 * Kindred Input — text field with label, helper text, icons, and error state.
 */
function Input({
  label,
  size = 'md',
  placeholder,
  value,
  onChange,
  type = 'text',
  prefix,
  suffix,
  hint,
  error,
  required,
  disabled,
  id,
  ...props
}) {
  const inputId = id || `kd-input-${Math.random().toString(36).slice(2, 7)}`;
  const inputClasses = ['kd-field__input', `kd-field__input--${size}`, prefix ? 'kd-field__input--has-prefix' : '', suffix ? 'kd-field__input--has-suffix' : '', error ? 'kd-field__input--error' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: "kd-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    className: `kd-field__label${required ? ' kd-field__label--required' : ''}`
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "kd-field__wrapper"
  }, prefix && /*#__PURE__*/React.createElement("span", {
    className: "kd-field__prefix"
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    className: inputClasses,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    required: required,
    "aria-invalid": !!error,
    "aria-describedby": hint || error ? `${inputId}-hint` : undefined
  }, props)), suffix && /*#__PURE__*/React.createElement("span", {
    className: "kd-field__suffix"
  }, suffix)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    id: `${inputId}-hint`,
    className: `kd-field__hint${error ? ' kd-field__hint--error' : ''}`
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SWITCH_CSS = `
.kd-switch {
  display: inline-flex;
  align-items: center;
  gap: var(--gap-md);
  cursor: pointer;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
.kd-switch--disabled { opacity: 0.45; cursor: not-allowed; }

.kd-switch__track {
  position: relative;
  border-radius: var(--radius-full);
  background: var(--neutral-300);
  transition: var(--transition-switch);
  flex-shrink: 0;
}
.kd-switch__track--sm { width: 36px; height: 20px; }
.kd-switch__track--md { width: 44px; height: 24px; }
.kd-switch__track--checked { background: var(--color-primary); }
.kd-switch__track--checked-secondary { background: var(--color-success); }

.kd-switch__thumb {
  position: absolute;
  top: 2px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0,0,0,0.20);
  transition: var(--transition-switch);
}
.kd-switch__track--sm .kd-switch__thumb { width: 16px; height: 16px; left: 2px; }
.kd-switch__track--md .kd-switch__thumb { width: 20px; height: 20px; left: 2px; }

.kd-switch__track--sm.kd-switch__track--checked .kd-switch__thumb { left: 18px; }
.kd-switch__track--md.kd-switch__track--checked .kd-switch__thumb { left: 22px; }

.kd-switch__label {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-primary);
  line-height: var(--leading-snug);
}
.kd-switch__label--sm { font-size: var(--text-xs); }

.kd-switch:focus-within .kd-switch__track {
  box-shadow: var(--focus-ring);
}
`;
if (typeof document !== 'undefined' && !document.getElementById('kd-switch-styles')) {
  const el = document.createElement('style');
  el.id = 'kd-switch-styles';
  el.textContent = SWITCH_CSS;
  document.head.appendChild(el);
}

/**
 * Kindred Switch — toggle for on/off settings.
 */
function Switch({
  checked = false,
  onChange,
  size = 'md',
  label,
  labelPosition = 'right',
  disabled = false,
  color = 'primary',
  id,
  ...props
}) {
  const switchId = id || `kd-switch-${Math.random().toString(36).slice(2, 7)}`;
  const trackClasses = ['kd-switch__track', `kd-switch__track--${size}`, checked ? `kd-switch__track--checked${color === 'success' ? '-secondary' : ''}` : ''].filter(Boolean).join(' ');
  const wrapClasses = ['kd-switch', disabled ? 'kd-switch--disabled' : ''].filter(Boolean).join(' ');
  const handleClick = () => {
    if (!disabled && onChange) onChange(!checked);
  };
  const labelEl = label && /*#__PURE__*/React.createElement("span", {
    className: `kd-switch__label kd-switch__label--${size}`
  }, label);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: wrapClasses,
    onClick: handleClick,
    role: "switch",
    "aria-checked": checked,
    "aria-disabled": disabled,
    tabIndex: disabled ? -1 : 0,
    onKeyDown: e => e.key === ' ' && handleClick()
  }, props), labelPosition === 'left' && labelEl, /*#__PURE__*/React.createElement("div", {
    className: trackClasses,
    id: switchId
  }, /*#__PURE__*/React.createElement("div", {
    className: "kd-switch__thumb"
  })), labelPosition === 'right' && labelEl);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TAG_CSS = `
.kd-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--gap-xs);
  font-family: var(--font-sans);
  font-weight: var(--weight-medium);
  border-radius: var(--radius-chip);
  cursor: default;
  transition: var(--transition-button);
  user-select: none;
  -webkit-font-smoothing: antialiased;
  border: 1.5px solid transparent;
}
.kd-tag--sm { font-size: var(--text-xs); padding: 3px 10px; height: 26px; }
.kd-tag--md { font-size: var(--text-sm); padding: 5px 13px; height: 32px; }

/* Default */
.kd-tag--default {
  background: var(--neutral-100);
  color: var(--text-secondary);
  border-color: var(--border-subtle);
}
.kd-tag--default:hover { background: var(--neutral-200); color: var(--text-primary); }

/* Selected */
.kd-tag--selected {
  background: var(--coral-50);
  color: var(--coral-600);
  border-color: var(--coral-300);
  font-weight: var(--weight-semibold);
}
.kd-tag--selected:hover { background: var(--coral-100); }

/* Selectable cursor */
.kd-tag--selectable { cursor: pointer; }
.kd-tag--selectable:active { transform: scale(0.96); }

/* Remove button */
.kd-tag__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  color: inherit;
  opacity: 0.6;
  transition: opacity 120ms, background 120ms;
  flex-shrink: 0;
}
.kd-tag__remove:hover { opacity: 1; background: rgba(0,0,0,0.1); }
.kd-tag__remove svg { width: 10px; height: 10px; }
`;
if (typeof document !== 'undefined' && !document.getElementById('kd-tag-styles')) {
  const el = document.createElement('style');
  el.id = 'kd-tag-styles';
  el.textContent = TAG_CSS;
  document.head.appendChild(el);
}

/**
 * Kindred Tag — selectable or removable pill for interests, categories, filters.
 */
function Tag({
  children,
  size = 'md',
  selected = false,
  selectable = false,
  onSelect,
  onRemove,
  icon,
  ...props
}) {
  const variant = selected ? 'selected' : 'default';
  const classes = ['kd-tag', `kd-tag--${size}`, `kd-tag--${variant}`, selectable || onSelect ? 'kd-tag--selectable' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classes,
    onClick: onSelect,
    role: onSelect ? 'button' : undefined,
    tabIndex: onSelect ? 0 : undefined,
    onKeyDown: onSelect ? e => e.key === 'Enter' && onSelect(e) : undefined
  }, props), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '2px'
    }
  }, icon), children, onRemove && /*#__PURE__*/React.createElement("button", {
    className: "kd-tag__remove",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    },
    "aria-label": "Remove",
    type: "button"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 10 10",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "2",
    x2: "8",
    y2: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "2",
    y2: "8"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/social/InterestTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const INTEREST_TAG_CSS = `
.kd-interest-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-sans);
  font-weight: var(--weight-medium);
  border-radius: var(--radius-full);
  border: 1.5px solid transparent;
  cursor: default;
  transition: var(--transition-button);
  user-select: none;
  -webkit-font-smoothing: antialiased;
  white-space: nowrap;
}
.kd-interest-tag--sm { font-size: var(--text-xs); padding: 4px 10px; height: 26px; }
.kd-interest-tag--md { font-size: var(--text-sm); padding: 6px 13px; height: 32px; }
.kd-interest-tag--lg { font-size: var(--text-md); padding: 8px 16px; height: 40px; }

.kd-interest-tag--selectable { cursor: pointer; }
.kd-interest-tag--selectable:active { transform: scale(0.95); }

/* Category color schemes */
.kd-interest-tag--outdoors   { background: #F0FAF5; color: #178050; border-color: #88D4AB; }
.kd-interest-tag--food       { background: #FFFBF0; color: #A37100; border-color: #FFE480; }
.kd-interest-tag--arts       { background: #FFF3F0; color: #C22D0C; border-color: #FFBAA8; }
.kd-interest-tag--music      { background: #F3F0FF; color: #5B2FD4; border-color: #C4B0F5; }
.kd-interest-tag--sports     { background: #F0F7FF; color: #1A5CB8; border-color: #A8CCF5; }
.kd-interest-tag--tech       { background: #F0F7FF; color: #1A5CB8; border-color: #A8CCF5; }
.kd-interest-tag--books      { background: #F5F0FF; color: #6B2FB8; border-color: #C8AAEA; }
.kd-interest-tag--travel     { background: #FFF8F0; color: #A85800; border-color: #FFD4A0; }
.kd-interest-tag--wellness   { background: #F0FAF5; color: #178050; border-color: #88D4AB; }
.kd-interest-tag--gaming     { background: #F3F0FF; color: #5B2FD4; border-color: #C4B0F5; }
.kd-interest-tag--default    { background: var(--neutral-100); color: var(--text-secondary); border-color: var(--border-subtle); }

/* Selected state — always coral */
.kd-interest-tag--selected {
  background: var(--coral-50) !important;
  color: var(--coral-700) !important;
  border-color: var(--coral-300) !important;
  font-weight: var(--weight-semibold) !important;
}
.kd-interest-tag--selected:hover { background: var(--coral-100) !important; }

.kd-interest-tag__emoji { font-size: 1em; line-height: 1; }
`;
if (typeof document !== 'undefined' && !document.getElementById('kd-interest-tag-styles')) {
  const el = document.createElement('style');
  el.id = 'kd-interest-tag-styles';
  el.textContent = INTEREST_TAG_CSS;
  document.head.appendChild(el);
}

/**
 * Kindred InterestTag — color-coded interest/hobby pill.
 */
function InterestTag({
  label,
  emoji,
  category = 'default',
  size = 'md',
  selected = false,
  onSelect,
  ...props
}) {
  const classes = ['kd-interest-tag', `kd-interest-tag--${size}`, selected ? 'kd-interest-tag--selected' : `kd-interest-tag--${category}`, onSelect ? 'kd-interest-tag--selectable' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classes,
    onClick: onSelect,
    role: onSelect ? 'button' : undefined,
    tabIndex: onSelect ? 0 : undefined,
    onKeyDown: onSelect ? e => e.key === 'Enter' && onSelect(e) : undefined
  }, props), emoji && /*#__PURE__*/React.createElement("span", {
    className: "kd-interest-tag__emoji"
  }, emoji), label);
}
Object.assign(__ds_scope, { InterestTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/social/InterestTag.jsx", error: String((e && e.message) || e) }); }

// components/social/MatchScore.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const MATCH_SCORE_CSS = `
.kd-match-score {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-xs);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
.kd-match-score__ring {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.kd-match-score__svg { transform: rotate(-90deg); }
.kd-match-score__track { fill: none; }
.kd-match-score__fill {
  fill: none;
  stroke-linecap: round;
  transition: stroke-dashoffset var(--duration-slower) var(--ease-smooth);
}
.kd-match-score__inner {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.kd-match-score__value {
  font-weight: var(--weight-black);
  line-height: 1;
  letter-spacing: var(--tracking-tight);
}
.kd-match-score__pct {
  font-weight: var(--weight-semibold);
  color: var(--text-tertiary);
  line-height: 1;
}
.kd-match-score__label {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  color: var(--text-tertiary);
  text-align: center;
  letter-spacing: var(--tracking-wide);
}

/* Sizes */
.kd-match-score--sm .kd-match-score__value { font-size: var(--text-md); }
.kd-match-score--sm .kd-match-score__pct   { font-size: var(--text-2xs); }
.kd-match-score--md .kd-match-score__value { font-size: var(--text-2xl); }
.kd-match-score--md .kd-match-score__pct   { font-size: var(--text-xs); }
.kd-match-score--lg .kd-match-score__value { font-size: var(--text-4xl); }
.kd-match-score--lg .kd-match-score__pct   { font-size: var(--text-sm); }
`;
if (typeof document !== 'undefined' && !document.getElementById('kd-match-score-styles')) {
  const el = document.createElement('style');
  el.id = 'kd-match-score-styles';
  el.textContent = MATCH_SCORE_CSS;
  document.head.appendChild(el);
}
function getColor(score) {
  if (score >= 75) return 'var(--sage-400)';
  if (score >= 50) return 'var(--amber-400)';
  if (score >= 25) return 'var(--coral-400)';
  return 'var(--neutral-300)';
}
const SIZES = {
  sm: {
    dim: 56,
    stroke: 5,
    r: 22
  },
  md: {
    dim: 80,
    stroke: 7,
    r: 32
  },
  lg: {
    dim: 120,
    stroke: 9,
    r: 50
  }
};

/**
 * Kindred MatchScore — circular arc showing shared-interest compatibility.
 */
function MatchScore({
  score = 0,
  size = 'md',
  label = 'in common',
  showLabel = true,
  ...props
}) {
  const {
    dim,
    stroke,
    r
  } = SIZES[size] || SIZES.md;
  const cx = dim / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - Math.min(Math.max(score, 0), 100) / 100 * circumference;
  const color = getColor(score);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `kd-match-score kd-match-score--${size}`
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "kd-match-score__ring"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "kd-match-score__svg",
    width: dim,
    height: dim,
    viewBox: `0 0 ${dim} ${dim}`
  }, /*#__PURE__*/React.createElement("circle", {
    className: "kd-match-score__track",
    cx: cx,
    cy: cx,
    r: r,
    stroke: "var(--neutral-200)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    className: "kd-match-score__fill",
    cx: cx,
    cy: cx,
    r: r,
    stroke: color,
    strokeWidth: stroke,
    strokeDasharray: circumference,
    strokeDashoffset: offset
  })), /*#__PURE__*/React.createElement("div", {
    className: "kd-match-score__inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kd-match-score__value",
    style: {
      color
    }
  }, score), /*#__PURE__*/React.createElement("span", {
    className: "kd-match-score__pct"
  }, "%"))), showLabel && /*#__PURE__*/React.createElement("span", {
    className: "kd-match-score__label"
  }, label));
}
Object.assign(__ds_scope, { MatchScore });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/social/MatchScore.jsx", error: String((e && e.message) || e) }); }

// components/social/ProfileCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PROFILE_CARD_CSS = `
.kd-profile-card {
  position: relative;
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--surface-raised);
  box-shadow: var(--shadow-profile);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  display: flex;
  flex-direction: column;
  user-select: none;
}

/* Photo area */
.kd-profile-card__photo {
  position: relative;
  flex-shrink: 0;
  background: linear-gradient(135deg, var(--coral-200) 0%, var(--amber-200) 100%);
  overflow: hidden;
}
.kd-profile-card__photo img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}
.kd-profile-card__photo-gradient {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 55%;
  background: linear-gradient(to top, rgba(13,18,38,0.75) 0%, transparent 100%);
  pointer-events: none;
}

/* Info overlay on photo */
.kd-profile-card__overlay {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: var(--inset-lg);
  color: #fff;
}
.kd-profile-card__name-row {
  display: flex;
  align-items: baseline;
  gap: var(--gap-sm);
  margin-bottom: var(--space-1);
}
.kd-profile-card__name {
  font-size: var(--style-name-size);
  font-weight: var(--style-name-weight);
  letter-spacing: var(--style-name-tracking);
  line-height: var(--style-name-leading);
  color: #fff;
}
.kd-profile-card__age {
  font-size: var(--text-xl);
  font-weight: var(--weight-medium);
  color: rgba(255,255,255,0.80);
}
.kd-profile-card__location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: rgba(255,255,255,0.70);
}

/* Content area below photo */
.kd-profile-card__body {
  padding: var(--inset-md) var(--inset-lg);
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}
.kd-profile-card__bio {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.kd-profile-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-sm);
}
.kd-profile-card__mutual {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  font-weight: var(--weight-medium);
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Actions bar */
.kd-profile-card__actions {
  padding: var(--inset-sm) var(--inset-lg) var(--inset-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-xl);
}
.kd-profile-card__action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-full);
  transition: var(--transition-button);
  flex-shrink: 0;
}
.kd-profile-card__action-btn:active { transform: scale(0.92); }

.kd-profile-card__action-btn--pass {
  width: 52px; height: 52px;
  background: var(--surface-sunken);
  color: var(--text-tertiary);
  font-size: 22px;
}
.kd-profile-card__action-btn--pass:hover { background: var(--rose-100); color: var(--rose-500); }

.kd-profile-card__action-btn--wave {
  width: 44px; height: 44px;
  background: var(--amber-50);
  color: var(--amber-500);
  font-size: 18px;
}
.kd-profile-card__action-btn--wave:hover { background: var(--amber-100); }

.kd-profile-card__action-btn--connect {
  width: 64px; height: 64px;
  background: var(--color-primary);
  color: #fff;
  font-size: 26px;
  box-shadow: 0 4px 16px rgba(255,87,51,0.35);
}
.kd-profile-card__action-btn--connect:hover {
  background: var(--color-primary-hover);
  box-shadow: 0 6px 20px rgba(255,87,51,0.45);
}

/* Compact variant */
.kd-profile-card--compact .kd-profile-card__body { padding: var(--inset-sm) var(--inset-md); }
.kd-profile-card--compact .kd-profile-card__actions { padding: var(--inset-xs) var(--inset-md) var(--inset-md); }
`;
if (typeof document !== 'undefined' && !document.getElementById('kd-profile-card-styles')) {
  const el = document.createElement('style');
  el.id = 'kd-profile-card-styles';
  el.textContent = PROFILE_CARD_CSS;
  document.head.appendChild(el);
}
const PIN_ICON = /*#__PURE__*/React.createElement("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "10",
  r: "3"
}));
const HEART_ICON = /*#__PURE__*/React.createElement("svg", {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/React.createElement("path", {
  d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
}));

/**
 * Kindred ProfileCard — the primary discovery card showing a user's profile.
 */
function ProfileCard({
  name,
  age,
  location,
  bio,
  photoSrc,
  interests = [],
  mutualCount = 0,
  photoHeight = 320,
  compact = false,
  onPass,
  onWave,
  onConnect,
  showActions = true,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `kd-profile-card${compact ? ' kd-profile-card--compact' : ''}`,
    style: style
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "kd-profile-card__photo",
    style: {
      height: photoHeight
    }
  }, photoSrc && /*#__PURE__*/React.createElement("img", {
    src: photoSrc,
    alt: name
  }), /*#__PURE__*/React.createElement("div", {
    className: "kd-profile-card__photo-gradient"
  }), /*#__PURE__*/React.createElement("div", {
    className: "kd-profile-card__overlay"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kd-profile-card__name-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kd-profile-card__name"
  }, name), age && /*#__PURE__*/React.createElement("span", {
    className: "kd-profile-card__age"
  }, age)), location && /*#__PURE__*/React.createElement("div", {
    className: "kd-profile-card__location"
  }, PIN_ICON, location))), /*#__PURE__*/React.createElement("div", {
    className: "kd-profile-card__body"
  }, bio && /*#__PURE__*/React.createElement("p", {
    className: "kd-profile-card__bio"
  }, bio), interests.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "kd-profile-card__tags"
  }, interests.map((tag, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 10px',
      borderRadius: '9999px',
      background: 'var(--neutral-100)',
      color: 'var(--text-secondary)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      border: '1.5px solid var(--border-subtle)'
    }
  }, tag.emoji && /*#__PURE__*/React.createElement("span", null, tag.emoji), tag.label || tag))), mutualCount > 0 && /*#__PURE__*/React.createElement("div", {
    className: "kd-profile-card__mutual"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
  })), mutualCount, " mutual ", mutualCount === 1 ? 'interest' : 'interests')), showActions && /*#__PURE__*/React.createElement("div", {
    className: "kd-profile-card__actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "kd-profile-card__action-btn kd-profile-card__action-btn--pass",
    onClick: onPass,
    title: "Pass",
    type: "button"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "kd-profile-card__action-btn kd-profile-card__action-btn--connect",
    onClick: onConnect,
    title: "Connect",
    type: "button"
  }, HEART_ICON), /*#__PURE__*/React.createElement("button", {
    className: "kd-profile-card__action-btn kd-profile-card__action-btn--wave",
    onClick: onWave,
    title: "Wave",
    type: "button"
  }, "\uD83D\uDC4B")));
}
Object.assign(__ds_scope, { ProfileCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/social/ProfileCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ConnectionsScreen.jsx
try { (() => {
const CONNECTIONS = [{
  id: 1,
  name: 'Sam Rivera',
  city: 'Williamsburg',
  mutual: 6,
  gradient: 'linear-gradient(155deg,#A8CCF5,#3B5790)',
  active: 'Active now',
  unread: 2
}, {
  id: 2,
  name: 'Jordan Lee',
  city: 'Park Slope',
  mutual: 3,
  gradient: 'linear-gradient(155deg,#88D4AB,#22A063)',
  active: '1h ago',
  unread: 0
}, {
  id: 3,
  name: 'Morgan Chen',
  city: 'DUMBO',
  mutual: 5,
  gradient: 'linear-gradient(155deg,#FFD4A0,#F0A800)',
  active: 'Yesterday',
  unread: 0
}, {
  id: 4,
  name: 'Casey Morgan',
  city: 'Bushwick',
  mutual: 2,
  gradient: 'linear-gradient(155deg,#C4B0F5,#5B2FD4)',
  active: '2 days ago',
  unread: 1
}];
const MESSAGES = {
  1: [{
    from: 'them',
    text: "Hey! I saw you're into specialty coffee too — have you been to Onyx in Bushwick?",
    time: '10:12 AM'
  }, {
    from: 'me',
    text: 'Yes!! Their single origin stuff is amazing. I go like every Saturday morning',
    time: '10:14 AM'
  }, {
    from: 'them',
    text: 'Same. We should grab one sometime 😄',
    time: '10:15 AM'
  }, {
    from: 'me',
    text: "Absolutely — I'm usually free Sunday mornings too if you ever want company on the farmers market run",
    time: '10:17 AM'
  }, {
    from: 'them',
    text: 'That sounds perfect. Sunday it is 🙌',
    time: '10:18 AM'
  }],
  2: [{
    from: 'them',
    text: 'Hey! Loved your photography work on your profile',
    time: 'Yesterday'
  }, {
    from: 'me',
    text: 'Thank you! Are you into photography too?',
    time: 'Yesterday'
  }, {
    from: 'them',
    text: 'More of a subject than a photographer haha. But I love good light',
    time: 'Yesterday'
  }]
};
function ConnectionsScreen({
  navigate
}) {
  const [chatId, setChatId] = React.useState(null);
  const [input, setInput] = React.useState('');
  const [localMsgs, setLocalMsgs] = React.useState(MESSAGES);
  const bottomRef = React.useRef(null);
  React.useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
  }, [chatId, localMsgs]);
  const sendMsg = () => {
    if (!input.trim()) return;
    setLocalMsgs(m => ({
      ...m,
      [chatId]: [...(m[chatId] || []), {
        from: 'me',
        text: input.trim(),
        time: 'Now'
      }]
    }));
    setInput('');
  };
  if (chatId) {
    const person = CONNECTIONS.find(c => c.id === chatId);
    const msgs = localMsgs[chatId] || [];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '10px 16px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setChatId(null),
      style: backBtn
    }, /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19 12H5M12 5l-7 7 7 7"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: person.gradient,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1.2
      }
    }, person.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--sage-400)',
        fontWeight: 600
      }
    }, person.active === 'Active now' ? '● Active now' : person.active))), /*#__PURE__*/React.createElement("div", {
      ref: bottomRef,
      style: {
        flex: 1,
        overflowY: 'auto',
        padding: '16px 16px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, msgs.map((m, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '76%',
        padding: '9px 13px',
        borderRadius: m.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: m.from === 'me' ? 'var(--coral-500)' : 'var(--surface-raised)',
        color: m.from === 'me' ? '#fff' : 'var(--text-primary)',
        fontSize: 14,
        lineHeight: 1.45,
        boxShadow: m.from === 'me' ? 'none' : 'var(--shadow-xs)'
      }
    }, m.text, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        opacity: 0.65,
        marginTop: 3,
        textAlign: m.from === 'me' ? 'right' : 'left'
      }
    }, m.time))))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '10px 16px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--surface-raised)'
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: input,
      onChange: e => setInput(e.target.value),
      onKeyDown: e => e.key === 'Enter' && sendMsg(),
      placeholder: "Type a message\u2026",
      style: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        border: '1.5px solid var(--border-default)',
        padding: '0 14px',
        fontSize: 14,
        fontFamily: 'var(--font-sans)',
        outline: 'none',
        background: 'var(--surface-base)',
        color: 'var(--text-primary)'
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: sendMsg,
      style: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'var(--coral-500)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "white",
      strokeWidth: "2.5",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "22",
      y1: "2",
      x2: "11",
      y2: "13"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: "22 2 15 22 11 13 2 9 22 2"
    })))));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 20px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: 'var(--text-primary)',
      letterSpacing: '-0.5px'
    }
  }, "Your people"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      padding: '3px 10px',
      background: 'var(--coral-50)',
      color: 'var(--coral-600)',
      borderRadius: 99,
      border: '1px solid var(--coral-200)'
    }
  }, "4 connections")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '4px 16px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, CONNECTIONS.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    onClick: () => setChatId(c.id),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 10px',
      borderRadius: 16,
      cursor: 'pointer',
      background: c.unread ? 'var(--coral-50)' : 'transparent',
      transition: 'background 0.12s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: c.gradient,
      flexShrink: 0
    }
  }), c.active === 'Active now' && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 1,
      right: 1,
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: 'var(--sage-400)',
      border: '2px solid var(--surface-base)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, c.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--text-tertiary)'
    }
  }, c.active)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)',
      marginTop: 1
    }
  }, c.mutual, " shared interests \xB7 ", c.city)), c.unread > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: 'var(--coral-500)',
      color: '#fff',
      fontSize: 11,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, c.unread)))));
}
const backBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 6,
  borderRadius: 8,
  color: 'var(--text-secondary)',
  display: 'flex',
  alignItems: 'center'
};
window.ConnectionsScreen = ConnectionsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ConnectionsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/DiscoverScreen.jsx
try { (() => {
const PROFILES = [{
  id: 1,
  name: 'Alex Kim',
  age: 28,
  city: 'Brooklyn, NY',
  bio: 'Always down for a new hiking trail or a really good pour-over. I know every specialty coffee shop in a 3-mile radius.',
  gradient: 'linear-gradient(155deg, #FF9278 0%, #FF5733 50%, #7A1806 100%)',
  interests: [{
    label: 'Hiking',
    emoji: '🥾',
    cat: 'outdoors'
  }, {
    label: 'Coffee',
    emoji: '☕',
    cat: 'food'
  }, {
    label: 'Indie films',
    emoji: '🎬',
    cat: 'arts'
  }, {
    label: 'Photography',
    emoji: '📷',
    cat: 'arts'
  }],
  mutual: 4
}, {
  id: 2,
  name: 'Sam Rivera',
  age: 31,
  city: 'Williamsburg',
  bio: 'Musician, home cook, occasional 5am runner. Looking for someone to hit up the farmers market with.',
  gradient: 'linear-gradient(155deg, #A8CCF5 0%, #3B5790 50%, #0A1020 100%)',
  interests: [{
    label: 'Guitar',
    emoji: '🎸',
    cat: 'music'
  }, {
    label: 'Cooking',
    emoji: '🍳',
    cat: 'food'
  }, {
    label: 'Running',
    emoji: '🏃',
    cat: 'sports'
  }, {
    label: 'Farmers market',
    emoji: '🌿',
    cat: 'food'
  }],
  mutual: 6
}, {
  id: 3,
  name: 'Jordan Lee',
  age: 26,
  city: 'Park Slope',
  bio: 'Rock climber by weekend, designer by week. I will absolutely convince you to host a game night.',
  gradient: 'linear-gradient(155deg, #88D4AB 0%, #22A063 50%, #0E4A2E 100%)',
  interests: [{
    label: 'Bouldering',
    emoji: '🧗',
    cat: 'sports'
  }, {
    label: 'Board games',
    emoji: '🎲',
    cat: 'gaming'
  }, {
    label: 'Design',
    emoji: '✏️',
    cat: 'arts'
  }, {
    label: 'Yoga',
    emoji: '🧘',
    cat: 'wellness'
  }],
  mutual: 3
}, {
  id: 4,
  name: 'Casey Morgan',
  age: 29,
  city: 'Bushwick',
  bio: 'Video game dev by day, competitive Scrabble player by night. My cat is named after a Miyazaki character.',
  gradient: 'linear-gradient(155deg, #C4B0F5 0%, #5B2FD4 50%, #2A1260 100%)',
  interests: [{
    label: 'Gaming',
    emoji: '🎮',
    cat: 'gaming'
  }, {
    label: 'Cats',
    emoji: '🐱',
    cat: 'default'
  }, {
    label: 'Sci-fi',
    emoji: '🚀',
    cat: 'books'
  }, {
    label: 'Anime',
    emoji: '🎌',
    cat: 'arts'
  }],
  mutual: 2
}, {
  id: 5,
  name: 'Morgan Chen',
  age: 33,
  city: 'DUMBO',
  bio: 'Architect who loves jazz, long walks across bridges, and finding the best noodles in every neighbourhood.',
  gradient: 'linear-gradient(155deg, #FFD4A0 0%, #F0A800 50%, #523800 100%)',
  interests: [{
    label: 'Jazz',
    emoji: '🎷',
    cat: 'music'
  }, {
    label: 'Architecture',
    emoji: '🏛️',
    cat: 'arts'
  }, {
    label: 'Travel',
    emoji: '✈️',
    cat: 'travel'
  }, {
    label: 'Noodles',
    emoji: '🍜',
    cat: 'food'
  }],
  mutual: 5
}];
window.__KD_PROFILES = PROFILES;
function DiscoverScreen({
  navigate
}) {
  const {
    ProfileCard,
    Button
  } = window.KindredDesignSystem_0a4553;
  const [idx, setIdx] = React.useState(0);
  const [anim, setAnim] = React.useState(null);
  const advance = direction => {
    setAnim(direction);
    setTimeout(() => {
      setIdx(i => (i + 1) % PROFILES.length);
      setAnim(null);
    }, 260);
  };
  const cur = PROFILES[idx];
  const next = PROFILES[(idx + 1) % PROFILES.length];
  const prev = PROFILES[(idx + 2) % PROFILES.length];
  const cardTransform = anim === 'left' ? 'translateX(-120%) rotate(-18deg)' : anim === 'right' ? 'translateX(120%) rotate(18deg)' : 'none';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 20px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      background: 'var(--coral-500)',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "20",
    viewBox: "0 0 16 20",
    fill: "none",
    stroke: "white",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "1",
    x2: "3",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "10",
    x2: "13",
    y2: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "10",
    x2: "13",
    y2: "19"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      letterSpacing: '-0.5px',
      color: 'var(--navy-700)'
    }
  }, "kindred")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('filter'),
    style: iconBtn
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-secondary)",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "6",
    x2: "20",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "12",
    x2: "16",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "11",
    y1: "18",
    x2: "13",
    y2: "18"
  }))), /*#__PURE__*/React.createElement("button", {
    style: {
      ...iconBtn,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-secondary)",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--coral-500)',
      border: '1.5px solid var(--surface-base)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '0 16px',
      gap: 16,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '0 4px',
      transform: 'scale(0.91) translateY(22px)',
      transformOrigin: 'top center',
      borderRadius: 24,
      overflow: 'hidden',
      background: prev.gradient,
      opacity: 0.6,
      zIndex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '0 2px',
      transform: 'scale(0.955) translateY(10px)',
      transformOrigin: 'top center',
      borderRadius: 24,
      overflow: 'hidden',
      background: next.gradient,
      opacity: 0.8,
      zIndex: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 3,
      transition: anim ? 'transform 0.26s cubic-bezier(0.4,0,1,1), opacity 0.26s' : 'none',
      transform: cardTransform,
      opacity: anim ? 0 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      borderRadius: 24,
      overflow: 'hidden',
      background: cur.gradient,
      boxShadow: 'var(--shadow-profile)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(13,18,38,0.80) 0%, rgba(13,18,38,0.15) 50%, transparent 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '0 20px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: '-0.5px'
    }
  }, cur.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 500,
      color: 'rgba(255,255,255,0.78)'
    }
  }, cur.age)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      marginBottom: 10,
      color: 'rgba(255,255,255,0.70)',
      fontSize: 13,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })), cur.city), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.82)',
      lineHeight: 1.5,
      margin: '0 0 10px',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, cur.bio), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 5
    }
  }, cur.interests.slice(0, 3).map(t => /*#__PURE__*/React.createElement("span", {
    key: t.label,
    style: {
      padding: '3px 9px',
      background: 'rgba(255,255,255,0.18)',
      backdropFilter: 'blur(8px)',
      borderRadius: 99,
      fontSize: 12,
      color: '#fff',
      fontWeight: 500,
      border: '1px solid rgba(255,255,255,0.25)'
    }
  }, t.emoji, " ", t.label)), cur.mutual > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '3px 9px',
      background: 'rgba(255,191,0,0.25)',
      borderRadius: 99,
      fontSize: 12,
      color: '#FFD340',
      fontWeight: 600,
      border: '1px solid rgba(255,191,0,0.3)'
    }
  }, cur.mutual, " in common")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      paddingBottom: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => advance('left'),
    style: {
      width: 52,
      height: 52,
      borderRadius: '50%',
      background: 'var(--surface-raised)',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-md)',
      color: 'var(--neutral-400)',
      transition: 'transform 0.12s'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => advance('right'),
    style: {
      width: 68,
      height: 68,
      borderRadius: '50%',
      background: 'var(--coral-500)',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 6px 20px rgba(255,87,51,0.40)',
      color: '#fff',
      fontSize: 28
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {},
    style: {
      width: 52,
      height: 52,
      borderRadius: '50%',
      background: 'var(--amber-50)',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-md)',
      fontSize: 22
    }
  }, "\uD83D\uDC4B"))));
}
const iconBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 6,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center'
};
window.DiscoverScreen = DiscoverScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/DiscoverScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/MyProfileScreen.jsx
try { (() => {
const MY_INTERESTS = [{
  label: 'Coffee',
  emoji: '☕',
  cat: 'food',
  sel: true
}, {
  label: 'Hiking',
  emoji: '🥾',
  cat: 'outdoors',
  sel: true
}, {
  label: 'Photography',
  emoji: '📷',
  cat: 'arts',
  sel: true
}, {
  label: 'Cooking',
  emoji: '🍳',
  cat: 'food',
  sel: true
}, {
  label: 'Indie films',
  emoji: '🎬',
  cat: 'arts',
  sel: false
}, {
  label: 'Live music',
  emoji: '🎵',
  cat: 'music',
  sel: false
}, {
  label: 'Yoga',
  emoji: '🧘',
  cat: 'wellness',
  sel: false
}, {
  label: 'Travel',
  emoji: '✈️',
  cat: 'travel',
  sel: false
}];
function MyProfileScreen() {
  const {
    Switch
  } = window.KindredDesignSystem_0a4553;
  const [interests, setInterests] = React.useState(MY_INTERESTS);
  const [notifs, setNotifs] = React.useState(true);
  const [location, setLocation] = React.useState(true);
  const [available, setAvailable] = React.useState(true);
  const toggleInterest = label => setInterests(is => is.map(i => i.label === label ? {
    ...i,
    sel: !i.sel
  } : i));
  const CAT_COLORS = {
    food: '#FFFBF0,#A37100',
    outdoors: '#F0FAF5,#178050',
    arts: '#FFF3F0,#C22D0C',
    music: '#F3F0FF,#5B2FD4',
    wellness: '#F0FAF5,#178050',
    travel: '#FFF8F0,#A85800',
    default: '#F5EFE9,#614D3E'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 260,
      background: 'linear-gradient(155deg,#FF9278 0%,#FF5733 50%,#721806 100%)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(13,18,38,0.60) 0%, transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      position: 'absolute',
      top: 12,
      right: 16,
      background: 'rgba(255,255,255,0.18)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.25)',
      borderRadius: 99,
      padding: '6px 14px',
      color: '#fff',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, "Edit profile"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 16,
      left: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: '-0.5px'
    }
  }, "You")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      color: 'rgba(255,255,255,0.72)',
      fontSize: 12,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })), "Brooklyn, NY"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px 0',
      background: 'var(--surface-raised)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      lineHeight: 1.6,
      borderBottom: '1px solid var(--border-subtle)',
      paddingBottom: 16
    }
  }, "Always down for a new hiking trail or a really good pour-over. I know every specialty coffee shop in a 3-mile radius.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      background: 'var(--surface-raised)',
      borderBottom: '8px solid var(--surface-base)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--text-tertiary)',
      marginBottom: 10
    }
  }, "Your interests"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 7
    }
  }, interests.map(i => {
    const [bg, col] = (CAT_COLORS[i.cat] || CAT_COLORS.default).split(',');
    return /*#__PURE__*/React.createElement("span", {
      key: i.label,
      onClick: () => toggleInterest(i.label),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '5px 12px',
        borderRadius: 99,
        background: i.sel ? 'var(--coral-50)' : bg,
        color: i.sel ? 'var(--coral-600)' : col,
        border: `1.5px solid ${i.sel ? 'var(--coral-300)' : 'transparent'}`,
        fontSize: 13,
        fontWeight: i.sel ? 600 : 500,
        cursor: 'pointer',
        transition: 'all 0.12s'
      }
    }, i.emoji, " ", i.label);
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '5px 12px',
      borderRadius: 99,
      border: '1.5px dashed var(--border-default)',
      fontSize: 13,
      color: 'var(--text-tertiary)',
      cursor: 'pointer'
    }
  }, "+ Add more"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      background: 'var(--surface-raised)',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--text-tertiary)',
      marginBottom: 2
    }
  }, "Settings"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, "Push notifications"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, "New connections and messages")), /*#__PURE__*/React.createElement(Switch, {
    checked: notifs,
    onChange: setNotifs,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-subtle)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, "Share location"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, "Show distance on your profile")), /*#__PURE__*/React.createElement(Switch, {
    checked: location,
    onChange: setLocation,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-subtle)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, "Available to meet up"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, "Let people know you're free this week")), /*#__PURE__*/React.createElement(Switch, {
    checked: available,
    onChange: setAvailable,
    size: "sm",
    color: "success"
  }))));
}
window.MyProfileScreen = MyProfileScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/MyProfileScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.InterestTag = __ds_scope.InterestTag;

__ds_ns.MatchScore = __ds_scope.MatchScore;

__ds_ns.ProfileCard = __ds_scope.ProfileCard;

})();
