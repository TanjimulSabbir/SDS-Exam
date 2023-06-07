import BannerImg from "../../../assets/Banner/banner-img.jpg";
import "../../../assets/Css/Common.css";

const Banner = () => {
  return (
    <div className="hero my-16 lg:min-h-screen px-[6%]">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse">
        <div className="basis-1/2">
          <img src={BannerImg} className="max-w-sm mx-auto rounded-lg" />
        </div>
        <div className="basis-1/2">
          <h1 className="text-5xl font-bold">
            The Smarter Way to Learn Anything
          </h1>
          <p className="py-6">
            Learning is very important in this modern era. Your confidence will
            be increased, If you sit for an exam. You will learn
          </p>
          <button className="btn btn-primary button-bg text-white">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
