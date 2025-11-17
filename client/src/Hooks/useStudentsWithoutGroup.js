import { useState, useEffect } from "react";
import { getStudentsWithoutGroupByClass } from "../Services/StudentsService";
import { useParams } from "react-router-dom";


export const useStudentsAvailable = (id) => {

  const [studentsAvailable, setStudentAvailable] = useState([])


  const fetchStudantsAvailable = async () => {
    const data = await getStudentsWithoutGroupByClass(id);
    setStudentAvailable(data);
  };
  useEffect(() => {
    if (!id) return;
    fetchStudantsAvailable();
  }, [id]);

  return { studentsAvailable, fetchStudantsAvailable };
};