import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

const CardLoader = (props: any) => {
  return (
    <ContentLoader
      backgroundColor="#0d0d0d"
      foregroundColor="#191919"
      // backgroundOpacity={0.2}
      // foregroundOpacity={0.2}
      rtl
      viewBox="0 0 400 500"
      {...props}
    >
      {/* Cover image */}
      <rect x="10" y="10" rx="30" ry="30" width="380" height="480" />
    </ContentLoader>
  );
};

const FullPageLoader = ({ ...rest }) => (
  <ContentLoader
    backgroundColor="#0d0d0d"
    foregroundColor="#191919"
    viewBox="0 0 261 331"
    rtl
    {...rest}
  >
    {/* Image */}
    <rect x="0" y="0" rx="10" ry="10" width="260" height="120" />
    {/* Sub infor */}
    <rect x="0" y="125" rx="4" ry="4" width="80" height="10" />
    <rect x="0" y="140" rx="4" ry="4" width="30" height="10" />
    <rect x="40" y="140" rx="4" ry="4" width="30" height="10" />
    <rect x="80" y="140" rx="4" ry="4" width="30" height="10" />
    <rect x="120" y="140" rx="4" ry="4" width="30" height="10" />
    <rect x="0" y="170" rx="4" ry="4" width="60" height="14" />
  </ContentLoader>
);
const EpisodeLoader = ({ ...rest }) => (
  <ContentLoader
    backgroundColor="#0d0d0d"
    foregroundColor="#191919"
    viewBox="0 0 261 331"
    rtl
    {...rest}
  >
    {/* Sub info */}
    <rect x="0" y="170" rx="4" ry="4" width="260" height="16" />
  </ContentLoader>
);

export default CardLoader;
export { FullPageLoader, EpisodeLoader };
