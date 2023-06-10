import Python from "../assets/JsonFiles/Python.json";
import Java from "../assets/JsonFiles/Java.json";
import CCNA from "../assets/JsonFiles/ccna.json";
import CCSP from "../assets/JsonFiles/ccsp.json";
import Hadoop from "../assets/JsonFiles/hadoop.json";

const jsonData = {
  Python,
  Java,
  CCNA,
  CCSP,
  Hadoop,
};

const getExamData = (PathCourseName) => {
  return [jsonData[PathCourseName]] || null;
};

export default getExamData;
