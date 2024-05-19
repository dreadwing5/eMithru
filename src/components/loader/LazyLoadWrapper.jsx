import { Suspense } from "react";
import Loader from "./Loader";

const LazyLoadWrapper = ({ component: Component, ...props }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default LazyLoadWrapper;
