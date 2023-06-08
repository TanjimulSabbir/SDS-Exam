/* eslint-disable react/prop-types */

const IndividualCertification = ({ course }) => {
  console.log(course);

  const { courseId, courseName, courseImg, courseInfo } = course;
  return (
    <div className="card my-5 bg-base-100 shadow-xl">
      <figure className="h-[220px]">
        <img
          src={courseImg}
          alt="course image"
          className="object-cover h-full w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{courseName}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Give Exam</button>
        </div>
      </div>
    </div>
  );
};

export default IndividualCertification;
