export const colors = {
  white: '255, 255, 255',
  black: '0, 0, 0',
  dark: '34, 34, 34',
  grey: '221, 221, 221',
  lightGrey: '238, 238, 238',
  blue: '102, 173, 221',
  gold: '246, 203, 71',
  green: '79, 180, 128',
  red: '221, 69, 65'
};

export const fonts = {
  small: '12px',
  medium: '14px',
  large: '16px',
  h1: '30px',
  h2: '28px',
  h3: '24px',
  h4: '18px',
  h5: '16px'
};

export const transitions = {
  short: 'all 0.1s ease-in-out',
  base: 'all 0.2s ease-in-out',
  long: 'all 0.3s ease-in-out'
};

export const padding = {
  smallPadding: '15px',
  mediumPadding: '25px',
  largePadding: '50px'
};

export const responsive = {
  xxs: {
    min: 'min-width: 319px',
    max: 'max-width: 320px'
  },
  xs: {
    min: 'min-width: 479px',
    max: 'max-width: 480px'
  },
  sm: {
    min: 'min-width: 767px',
    max: 'max-width: 768px'
  },
  md: {
    min: 'min-width: 991px',
    max: 'max-width: 992px'
  },
  lg: {
    min: 'min-width: 1199px',
    max: 'max-width: 1200px'
  }
};

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');

  html, body, #root, #router-root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: rgb(${colors.lightGrey});
    font-family: Roboto, sans-serif;
    font-weight: 300;
    font-size: ${fonts.medium};
    color: rgb(${colors.dark});
    position: relative;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button:active,
  button:focus,
  button.active {
    background-image: none;
    outline: 0;
    -webkit-box-shadow: none;
            box-shadow: none;
  }

  [tabindex] {
    outline: none;
    height: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  div {
    box-sizing: border-box;
  }

  button {
    border-style: none;
    line-height: 1em;
  }
`;
