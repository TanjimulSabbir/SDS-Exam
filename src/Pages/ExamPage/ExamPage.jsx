import { useEffect, useState } from "react";
import Questions from "../../assets/JsonFiles/Python.json";
import Alert from "../../assets/Audio/alert.mp3"
import { Link, useNavigate, useParams } from "react-router-dom";
import getExamData from "../../CustomHook/useExamData";
import Swal from 'sweetalert2'
import './ExamPage.module.css'
import Loading from "../../Common/Css/Loader/Loading";


const ExamPage = () => {
	const [userAnswers, setUserAnswers] = useState({});
	const [OptionStyle, setOptionStyle] = useState(null);
	const [timeRemaining, setTimeRemaining] = useState(500); // 2 hours
	const [isTimeUp, setIsTimeUp] = useState(false);

	const Params = useParams();
	const PathCourseName = Params.courseName;
	// Data Fetching From Custom-Hooks
	const [ExamData] = getExamData(PathCourseName);

	const navigate = useNavigate();
	const Title = ExamData?.courseName;

	// You are Out of Exam For Screen Minimize
	// useEffect(() => {
	// 	const handleVisibilityChange = async () => {
	// 		if (document.visibilityState === 'hidden') {
	// 			// User minimized the window
	// 			Swal.fire({
	// 				allowOutsideClick: false,
	// 				allowEscapeKey: false,
	// 				title: 'You are out of Exam',
	// 				text: "You have minimized your tab. Now, You won't be able to back on exam page! ",
	// 				icon: 'error',
	// 				showCancelButton: false,
	// 				confirmButtonColor: '#3085d6',
	// 				confirmButtonText: 'Submit'
	// 			}).then((result) => {
	// 				if (result.isConfirmed) {
	// 					AddResultToLocal();
	// 					Swal.fire({
	// 						icon: 'success',
	// 						title: 'Your work has been saved',
	// 						showConfirmButton: false,
	// 						html: `
	// 						<a href="/certifications/${Title}/result" target="_blank" style='display: inline-block;
	// 									padding: 10px 20px;
	// 									background-color: #007bff;
	// 									color: #fff;
	// 									text-decoration: none;
	// 									border-radius: 4px;
	// 									box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	// 									transition: background-color 0.3s;
	// 									font-size: 16px;
	// 									font-weight: bold;'> Show Result
	// 						</a>
	// 					  `,
	// 					})
	// 					navigate('/certifications');
	// 				}
	// 			}).then(()=>{
	// 				Swal.fire({
	// 					timer:1500
	// 				})
	// 			})
	// 		}
	// 	};

	// 	window.addEventListener('visibilitychange', handleVisibilityChange);
	
	// 	return () => {
	// 		window.removeEventListener('visibilitychange', handleVisibilityChange);
	// 	};
	// }, []);

	
	const handleAnswerChange = (questionId, selectedOption, option) => {
		setUserAnswers((prevAnswers) => ({
			...prevAnswers,
			[questionId]: selectedOption,
		}));
		setOptionStyle(option);
	};

	// Employee Answer Submit Function
	const handleSubmit = (event) => {
		event.preventDefault();
		Swal.fire({
			title: 'Are you want to Submit?',
			text: "You won't be able to back on exam page!",
			icon: 'info',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Submit!'
		}).then((result) => {
			if (result.isConfirmed) {
				AddResultToLocal()
				Swal.fire({
					allowOutsideClick: false,
					allowEscapeKey: false,
					showCancelButton: false,
					showConfirmButton: false,
					icon: 'success',
					title: 'Answer Submitted!',
					html: `
					<a href="/certifications/${Title}/result" target="_blank" style='display: inline-block;
								padding: 10px 20px;
								background-color: #007bff;
								color: #fff;
								text-decoration: none;
								border-radius: 4px;
								box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
								transition: background-color 0.3s;
								font-size: 16px;
								font-weight: bold;'> Show Result
					</a>`,
				});
				navigate("/certifications");
				}
			}
		)
	

		// .then((result) => {
			
		// })
	};
	const AddResultToLocal = () => {
		// Add Employee Answer to Local Storage
		const data = {
			Title,
			userAnswers: userAnswers,
			ExamDate: new Date().toISOString()
		};

		const getItemData = localStorage.getItem("ExamResult");
		if (!getItemData) {
			return localStorage.setItem("ExamResult", JSON.stringify([data]));
		}

		const ParseGetItemData = JSON.parse(getItemData);

		const existingIndex = ParseGetItemData.findIndex(obj => obj.Title === Title);
		if (existingIndex !== -1) {
			// Updating existing answer
			ParseGetItemData[existingIndex].userAnswers = userAnswers;
		} else {
			// Adding new answer
			ParseGetItemData.push(data);
		}
		localStorage.setItem("ExamResult", JSON.stringify(ParseGetItemData));
	}

	// Time Duration Setting
	let timer;
	useEffect(() => {
		timer = setTimeout(() => {
			setTimeRemaining(prevTime => prevTime - 1);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [timeRemaining]);

	// Looking If Exam Duration Finished
	useEffect(() => {
		if (timeRemaining === 0) {
			setIsTimeUp(true);
			clearTimeout(timer); // Stop the timer when time reaches 0
		}
	}, [timeRemaining, timer]);

	if(!ExamData){
		return <Loading></Loading>
	}
	// Exam Time Formating
	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	return (
		<div className={`max-w-3xl mx-auto pb-24 font-Roboto`} style={{fontFamily:"Roboto Slab, serif"}}>

			{/*Exam Close Button  */}
			<p className="fixed bottom-10 right-10 z-40">

			</p>
			{/* Exam Title */}
			<div className="fixed top-0 inset-0 flex justify-around items-center h-10 bg-gray-500 py-10 text-white">
				<h2>Course Name: {ExamData.courseName}</h2>
				<h2>Exam Duration: {ExamData.examInfo.duration}</h2>
				<h2>Time Remaining: {formatTime(timeRemaining)}</h2>
			</div>

			{/* Exam Body */}
			{/* Questions Json File Mapping */}
			{ExamData.questionPaper.map(Question => {
				const { questionNo, question, options } = Question;
				return (
					<div key={questionNo} className="mt-24" id={questionNo}>
						<div className="my-10 bg-gray-100 shadow-xl px-10 py-5 rounded-lg">
							<p className="text-white bg-gray-600 inline-block rounded p-1">Question-{questionNo}</p>
							<h3 className="my-5 font-bold font-IBM md:text-lg">{question}</h3>

							{/*Question's Options Mapping */}
							<div className="space-y-5">
								{
									options.map((Option) => {
										const { id, option } = Option;
										return (
											<p
												key={option}
												onClick={() => handleAnswerChange(questionNo, id, option)}
												className={`p-4 rounded-md flex items-center cursor-pointer ${userAnswers[questionNo] === id ? 'bg-green-600 text-white' : 'border bg-gray-50 border-gray-300'} 
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
			<button onClick={handleSubmit} className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"> Submit Answers </button>

			{/* Exam Time Over Audio */}
			{isTimeUp && (
				<audio autoPlay>
					<source src={Alert} type="audio/mpeg" />
				</audio>
			)}

{/* Exam Time Over Screen Close */}
{
	isTimeUp && Swal.fire({
		title: 'Exam Time Over!',
		text: "Please, Submit Your Answer!",
		icon: 'success',
		showCancelButton: false,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Submit!'
	}).then((result) => {
		if (result.isConfirmed) {
			AddResultToLocal()
			Swal.fire({
				allowOutsideClick: false,
				allowEscapeKey: false,
				showCancelButton: false,
				showConfirmButton: false,
				icon: 'success',
				title: 'Your work has been saved',
				html: `
				<a href="/certifications/${Title}/result" target="_blank" style='display: inline-block;
							padding: 10px 20px;
							background-color: #007bff;
							color: #fff;
							text-decoration: none;
							border-radius: 4px;
							box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
							transition: background-color 0.3s;
							font-size: 16px;
							font-weight: bold;'> Show Result
				</a>
			  `,
			});
		}
	})
}
			{/* Question Scrolling Button */}
			<div className="fixed top-24 right-1 sm:right-5 md:right-10 space-y-3">
				{Questions[1].Questions.map((question, index) => {
					if (index % 10 === 0) {
						return (
							<div key={index + 1}>
								<a href={`#${index + 1}`} className="btn bg-green-200 btn-sm border-none">{index + 1}</a>
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
