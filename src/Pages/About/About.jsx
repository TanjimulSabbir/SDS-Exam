import ExamImg from "../../assets/About/exam.jpg";
import clockImg from "../../assets/About/clock.jpg";
import studyImg from "../../assets/About/study.jpg";

const About = () => {
  return (
    <div>
      {/* heading  */}
      <div className="p-20 bg-[#44b2bf33]">
        <h1 className="text-center font-roboto text-4xl font-semibold">
          About Us
        </h1>
      </div>

      {/* welcome message  */}
      <div className="flex justify-between items-center w-[70%] mx-auto my-20">
        <div className="basis-1/2">
          <h1 className="text-5xl font-roboto font-bold mb-3">
            Welcome to <span className="text-[#44b2bf]">SDS</span>
          </h1>
          <p className="text-sm font-poppins">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            totam sapiente ratione tempore illo officia cum! Quidem animi alias
            eaque!
          </p>
        </div>
        <div className="basis-1/2 relative">
          {/* big image  */}
          <div>
            <img
              src={ExamImg}
              alt="exam image"
              className="w-[400px] h-[400px] mx-auto rounded-[50%] object-cover"
            />
          </div>

          {/* absolute images  */}
          <div className="absolute top-[20%] left-0">
            <img
              src={clockImg}
              alt="clock image"
              className="w-[80px] h-[80px] rounded-[50%] ring ring-[#44b2bf] ring-offset-4 ring-offset-[#fff] object-cover"
            />
          </div>
          <div className="absolute bottom-[-40px] left-[20%]">
            <img
              src={studyImg}
              alt="study image"
              className="w-[100px] h-[100px] rounded-[50%] ring ring-[#44b2bf] ring-offset-4 ring-offset-[#fff] object-cover"
            />
          </div>

          {/* .absolute circles  */}
          <div className="absolute top-[50%] right-0 w-[40px] h-[40px] bg-[#44b2bfb3] rounded-[50%]"></div>
          <div className="absolute bottom-0 right-[30%] w-[20px] h-[20px] bg-[#44b2bf] rounded-[50%]"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
