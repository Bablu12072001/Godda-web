import React, { Suspense } from "react";

const LazyHeader = React.lazy(() => import("../Component/AppBar"));
const LazyCarousel = React.lazy(() => import("../Component/Carousel"));
const LazyNavBarUnderCarousel = React.lazy(() =>
  import("../Component/NavBarUnderCarousel")
);
const LazyInfoHome = React.lazy(() => import("../Component/InfoHome"));
const LazyFooter = React.lazy(() => import("../Component/footer"));
const LazyContactForm = React.lazy(() => import("../Component/contactForm"));
const LazyPresidentMessageHome = React.lazy(() =>
  import("../Component/PresidentMessageHome")
);
const LazyGloriousMoments = React.lazy(() =>
  import("../Component/GloriousMoments")
);
const LazyCircularMarquee = React.lazy(() =>
  import("../Component/CircularMarquee")
);
const LazyVisitorCounter = React.lazy(() =>
  import("../Component/VisitorCounter")
);
const LazyNoticeBoard = React.lazy(() => import("../Component/NoticeBoard"));
export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>...</div>}>
        <LazyHeader value={0} />
        <br />
        <br />
        <LazyCarousel />
        <LazyNavBarUnderCarousel />
        <br />
        <LazyCircularMarquee />
        <br />
        <LazyInfoHome />
        <br />
        <LazyNoticeBoard />
        <br />
        <LazyPresidentMessageHome />
        <br />
        <LazyGloriousMoments />
        <br />
        {/* <LazyContactForm /> */}
        <br />

        <LazyVisitorCounter className="mt-4" />
        <br />
        <LazyFooter />
      </Suspense>
    </div>
  );
}
