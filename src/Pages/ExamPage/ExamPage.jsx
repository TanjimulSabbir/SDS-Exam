import { useEffect, useState } from "react";
import Questions from "../../assets/JsonFiles/Python.json";
import Alert from "../../assets/Audio/alert.mp3"
import { Link, useLocation } from "react-router-dom";
import getExamData from "../../CustomHook/getExamData";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const ExamPage = () => {
	const Location = useLocation();
	const PathName = Location.pathname.split("/");
	const PathCourseName = PathName[2];
	const MySwal = withReactContent(Swal)
	const [ExamData] = getExamData(PathCourseName);

	const [userAnswers, setUserAnswers] = useState({});
	const [OptionStyle, setOptionStyle] = useState(null);
	const [TimeFinished, setTimeFinished] = useState(false);
	const [timeRemaining, setTimeRemaining] = useState(ExamData[0].TotalMark * 60); // 1800 seconds = 30 minutes
	const [isTimeUp, setIsTimeUp] = useState(false);

	// const [QuestionName]=getExamData()
	const handleAnswerChange = (questionId, selectedOption, option) => {
		setUserAnswers((prevAnswers) => ({
			...prevAnswers,
			[questionId]: selectedOption,
		}));
		setOptionStyle(option);

	};
	const Title = ExamData[0].CourseTitle;
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(userAnswers);

		// Add Answer to Local Storage
		const data = {
			Title,
			userAnswers: userAnswers
		};

		const getItemData = localStorage.getItem("ExamResult");
		if (!getItemData) {
			return localStorage.setItem("ExamResult", JSON.stringify([data]));
		}
		const ParseGetItemData = JSON.parse(getItemData);

		const isMatched = ParseGetItemData.some(obj => {
			const keys = Object.keys(obj);
			return keys.includes(Title);
		});
	if(!isMatched)

		localStorage.setItem("ExamResult", JSON.stringify([...ParseGetItemData, data]));
		

MySwal.fire({
  title: <p>Hello World</p>,
  didOpen: () => {
    // `MySwal` is a subclass of `Swal` with all the same instance & static methods
    MySwal.showLoading()
  },
}).then(() => {
  return MySwal.fire(<p>Shorthand works too</p>)
})
	};

	// Time Duration
	let timer;
	useEffect(() => {
		timer = setTimeout(() => {
			setTimeRemaining(prevTime => prevTime - 1);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [timeRemaining]);

	useEffect(() => {
		if (timeRemaining === 0) {
			setIsTimeUp(true);
			clearTimeout(timer); // Stop the timer when time reaches 0
			setTimeFinished(true);
		}
	}, [timeRemaining, timer]);

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	return (
		<div className={`max-w-3xl mx-auto pb-24 font-Roboto`}>

			{/*Exam Close Button  */}
			<p className="fixed bottom-10 right-10 z-40">

			</p>
			{/* Exam Title */}
			<div className="fixed top-0 inset-0 flex justify-around items-center h-10 bg-gray-500 py-10 text-white">
				<h2>Course Name: {ExamData[0].CourseTitle}</h2>
				<h2>Exam Duration: {ExamData[0].TotalMark}</h2>
				<h2>Time Remaining: {formatTime(timeRemaining)}</h2>
			</div>

			{/* Exam Body */}
			{/* Questions Json File Mapping */}
			{ExamData[1].Questions.map(Question => {
				const { QuestionNo, question, options, answer } = Question;
				return (
					<div key={QuestionNo} className="mt-24" id={QuestionNo}>
						<div className="my-10 bg-gray-100 shadow-xl px-10 py-5 rounded-lg">
							<p className="text-white bg-gray-600 inline-block rounded p-1">Question-{QuestionNo}</p>
							<h3 className="my-5 font-extrabold font-IBM sm:text-xl">{question}</h3>

							{/*Question's Options Mapping */}
							<div className="space-y-5">
								{
									options.map((Option) => {
										const { id, option } = Option;
										return (
											<p
												key={option}
												onClick={() => handleAnswerChange(QuestionNo, id, option)}
												className={`p-4 rounded-md flex items-center cursor-pointer ${userAnswers[QuestionNo] === id ? 'bg-green-600 text-white' : 'border bg-gray-50 border-gray-300'} 
														${OptionStyle === option ? "font-extrabold" : "font-normal"}`}>
												<span className="p-3 py-1 rounded-md bg-green-600 text-white">{id}</span>
												<span className={`pl-3`}>{option}</span>
											</p>)
									})
								}
							</div>
						</div>
					</div>
				)
			})}
			{/* Question Submit Button */}
			<button
				onClick={handleSubmit}
				className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
			>
				Submit Answers
			</button>

			{/* Exam Time Over Audio */}
			{isTimeUp && (
				<audio autoPlay>
					<source src={Alert} type="audio/mpeg" />
				</audio>
			)}

			{/* Exam Time Over Screen Close */}
			{
				TimeFinished ? <div className="fixed inset-0 flex justify-center transition-opacity duration-900 items-center h-full w-full bg-black bg-opacity-70">
					<div className="flex flex-col gap-4">
						<h1 className="text-4xl text-white">Exam Time Over!</h1>

						<p className="mt-10 text-xl text-green-500 space-x-10" >
							<Link className="underline link-success" to="/">Home</Link>
							<Link className="underline link-success" to="/python/exam/result">Show Your Result</Link>
						</p>
					</div>
				</div> : ""
			}

			{/* Question Scrolling Button */}
			<div className="fixed top-24 right-1 sm:right-5 md:right-10 space-y-3">
				{Questions[1].Questions.map((question, index) => {
					if (index % 10 === 0) {
						return (
							<div key={index + 1}>
								<a href={`#${index + 1}`} className="btn btn-sm bg-green-600 border-none">{index + 1}</a>
							</div>
						);
					}
					return null;
				})}

			</div>
		</div>
	)
};

export default ExamPage;
