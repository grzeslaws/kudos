const colors = {
    colorAlert: (opacity = 1) => `rgba(255, 92, 102, ${opacity})`,
    colorLight: "#c3e7f0",
    colorInfo: (opacity = 1) => `rgba(146, 221, 255, ${opacity})`,
    colorPrimary: (opacity = 1) => `rgba(43, 169, 223, ${opacity})`,
    colorWhite: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    colorGray: (opacity = 1) => `rgba(130, 130, 130, ${opacity})`,
    colorGrayLight: (opacity = 1) => `rgba(242, 242, 242, ${opacity})`,
    colorBlack: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
};

const spacing = {
    defaultSpacing: (n = 1) => `${8 * n}px`,
};

const radius = {
    defaultRadius: "2px",
};

const fonts = {
    fontFamilyDefault: '"Montserrat", serif',
    h2: "24px",
    h3: "18px",
    sizeBase: "14px",
    sizeSmall: "12px",
    fontLight: 300,
    fontMedium: 400,
    fontBold: 600,
    lineHeight: "26px",
    lineHeightSmall: "19px",
};

const transitions = {
    transitionDefault: "300ms ease",
};

const paths = {
    imagePath: (path: string) => `/assets/images/${path}`,
};

const breakpoints = {
    huge: "1440px",
    large: "1170px",
    medium: "768px",
    small: "450px",
};

export { colors, spacing, radius, fonts, transitions, paths, breakpoints };

export interface ThemeProps {
    colors: typeof colors;
    spacing: typeof spacing;
    radius: typeof radius;
    fonts: typeof fonts;
    transitions: typeof transitions;
    paths: typeof paths;
    breakpoints: typeof breakpoints;
}
