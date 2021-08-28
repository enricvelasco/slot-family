export const breakPoints = {
  maxContainerWidth: 996,
  mobileMaxWidth: 360,
  mobileWidth: 640,
  tabletWidth: 767,
  desktopWidth: 996,
  largeDesktopWidth: 1336,
  advertisingWidth: 1280,
  headerCompactWidth: 1140,
};

export const mediaQueries = {
  mobileOnly: `@media (max-width: ${breakPoints.desktopWidth}px)`,
  tabletOnly: `@media (max-width: ${breakPoints.tabletWidth}px)`,
  smallTablet: `@media (min-width: ${breakPoints.mobileWidth + 1}px)`,
  tablet: `@media (min-width: ${breakPoints.tabletWidth + 1}px)`,
  desktop: `@media (min-width: ${breakPoints.desktopWidth + 1}px)`,
  largeDesktop: `@media (min-width: ${breakPoints.largeDesktopWidth + 1}px)`,
};
