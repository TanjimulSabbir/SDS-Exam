import Banner from "../Banner/Banner";

import Certifications from "../Certifications/Certifications";
import Gallery from "../Gallery/Gallery";
import Features from "../Features/Features";

const Home = () => {
  return (
    <div>
      <Banner />

      {/* features  */}
      <Features />

      {/* certifications  */}
      <Certifications />

      {/* gallery  */}
      <Gallery />
    </div>
  );
};

export default Home;
