import * as React from 'react';

/**
 * @private
 */

const TextDirectionContext = /*#__PURE__*/React.createContext('ltr');
/**
 * @public
 */

const TextDirectionProvider = ({
  children,
  dir
}) => {
  return /*#__PURE__*/React.createElement(TextDirectionContext.Provider, {
    value: dir
  }, children);
};
/**
 * Returns current directionality of the element's text.
 *
 * @private
 */

function useTextDirection() {
  return React.useContext(TextDirectionContext);
}

export { TextDirectionProvider, useTextDirection };
//# sourceMappingURL=TextDirectionContext.esm.js.map
