import BannerImg from "../../../assets/Banner/banner-img.jpg";
import "../../../assets/Css/Common.css";

const Banner = () => {
  return (
    <div className="hero lg:min-h-16 px-[6%] py-14">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse">
        <div className="basis-1/2  my-7 md:my-0">
          <img src={BannerImg} className=" md:max-w-sm md:mx-auto rounded-lg" />
        </div>
        <div className="basis-1/2">
          <h1 className="text-3xl md:text-5xl font-bold">
            The Smarter Way to Learn{" "}
            <span className="text-[#42BEC3] underline">Anything</span>
          </h1>
          <p className="py-6">
            Learning is very important in this modern era. Your confidence will
            be increased, If you sit for an exam. You will learn
          </p>
          <button className="btn hover:bg-[#42BEC3] bg-[#42BEC3] border-0 text-white">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
