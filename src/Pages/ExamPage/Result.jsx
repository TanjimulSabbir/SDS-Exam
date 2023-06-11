import { useParams } from "react-router-dom";
import getExamData from "../../CustomHook/useExamData";
import Loading from "../../Common/Css/Loader/Loading";
import { useEffect, useState } from "react";


const Result = () => {
	const Params = useParams();
	const PathCourseName = Params.courseName;
	const [ExamData] = getExamData(PathCourseName);
	// const [Result, setResult] = useState(null);

	let CorrectAnswer = 0;
	let WrongAnswer = 0;
	useEffect(() => {
		// fetch(`https://quiz-five-beta.vercel.app/certifications/${PathCourseName}`)
		// 	.then((res) => res.json())
		// 	.then((data) => )
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		console.log((CorrectAnswer - WrongAnswer))

	}, [CorrectAnswer, WrongAnswer]);

	if (!ExamData) {
		return <Loading></Loading>
	}

	const GetLocalExamResult = JSON.parse(localStorage.getItem("ExamResult"));

	const MatchedResultData = GetLocalExamResult.find(result => result.Title === PathCourseName);

	const userAnswersArray = Object.entries(MatchedResultData.userAnswers).map(([key, value]) => ({
		SubmitQNo: key,
		SubmitAnswer: value
	}));


	console.log(userAnswersArray);

	const IntigratedArray = ExamData.questionPaper.map((question) => {
		const MatchedResult = userAnswersArray.find((obj) => obj.SubmitQNo == question.questionNo);

		if (MatchedResult) {
			return { ...question, Submitted: { ...MatchedResult } }
		}
		return question;
	});


	const formattedExamDate = new Date(MatchedResultData.ExamDate).toLocaleString().split(',')[0];
	console.log(CorrectAnswer, WrongAnswer, "CorrectAnswer+WrongAnswer")


	return (
		<div className="px-4 sm:px-6 md:px-10 max-w-5xl mx-auto" style={{ fontFamily: "Roboto Slab, serif" }}>
			{/* Exam Title */}
			<div className="fixed top-0 inset-0 flex justify-start sm:justify-center space-x-2 sm:space-x-4 text-xs sm:text-sm items-center h-10 bg-gray-500 py-8 text-white">
				<h2>Course Name: {MatchedResultData.Title}</h2>
				<h2>Exam Date: {formattedExamDate}</h2>
			</div>
			{
				IntigratedArray.map(Question => {
					const { questionNo, question, options, answer, Submitted: { SubmitQNo, SubmitAnswer } = {} } = Question;

					// if (SubmitQNo) {
					// 	if (SubmitAnswer === answer) {
					// 		CorrectAnswer = CorrectAnswer + 1
					// 	} else {
					// 		WrongAnswer = WrongAnswer + 1
					// 	}
					// }
					CorrectAnswer += (SubmitQNo && SubmitAnswer === answer) ? 1 : 0;
					WrongAnswer += (SubmitQNo && SubmitAnswer !== answer) ? 1 : 0;


					console.log(CorrectAnswer - WrongAnswer, "Inside");

					return (
						<div key={questionNo} className="mt-24" id={questionNo}>
							<div className="my-10 bg-gray-100 shadow-xl px-10 py-5 rounded-lg">
								<p className="text-white bg-gray-600 inline-block rounded p-1">Question-{questionNo}</p>
								<h3 className="my-5 font-bold md:text-lg">{question}</h3>

								{/*Question's Options Mapping */}
								<div className="space-y-5">
									{
										options?.map((Option) => {
											const { id, option } = Option;
											return (
												<p className={`p-4 rounded-md flex items-center
												 ${id === SubmitAnswer ? SubmitAnswer === answer ? "bg-green-600 font-bold" : "bg-red-600 font-bold" : id === answer ? "bg-sky-600 font-bold" : ""}`}

													key={option}>
													<span className={`p-3 py-1 rounded-md bg-green-600 
													 ${id === SubmitAnswer ? SubmitAnswer === answer ? "bg-green-600" : "bg-red-600" : id === answer ? "bg-sky-600" : ""}`}>{id}</span>
													<p className="pl-3" >{option}</p>
												</p>
											)
										})
									}
								</div>
							</div>
						</div>
					)
				})
			}
			<div className="fixed top-0 right-0 card bg-gray-300 p-2 md:p-4 text-xs sm:text-sm">
				{/* Color Checkup */}
				<p className="space-x-2">
					<span className="bg-green-600 badge badge-outline border-none">Correct</span>
					<span className="bg-red-600 badge badge-outline border-none">Wrong</span>
					<span className="bg-sky-600 badge badge-outline border-none">Answer</span>
				</p>
				<p className="flex flex-col mt-2 md:mt-5">
					<span>Right Answer: <span className="font-bold text-green-600">{CorrectAnswer}</span></span>
					<span>Wrong Answer: <span className="font-bold text-green-600">{WrongAnswer}</span></span>
					<span>Total Mark: <span className="font-bold text-green-600">{(CorrectAnswer - WrongAnswer) <= 0 ? 0 : CorrectAnswer - WrongAnswer}</span></span>
				</p>
			</div>
		</div>
	)
}

export default Result