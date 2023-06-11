import { useEffect, useState } from "react";


const useExamData = (PathCourseName) => {
    const [ExamData, setExamData] = useState(null);

    console.log(PathCourseName,"PathCousreName From UseExamData");
    

    useEffect(() => {
      fetch(`https://quiz-five-beta.vercel.app/certifications/${PathCourseName}`)
        .then((res) => res.json())
        .then((data) => setExamData(data))
        .catch((err) => {
          console.log(err);
        });
    }, [PathCourseName]);

  return [ExamData];
}

export default useExamData;