import { useState, useEffect } from "react";
import { getStudentsWithoutGroupByClass } from "../Services/StudentsService";


export const useStudentsAvailable = (id) => {

  const [studentsAvailable, setStudentAvailable] = useState([])


  const fetchStudantsAvailable = async () => {
    const data = await getStudentsWithoutGroupByClass(id);
    setStudentAvailable(data);
  };
  useEffect(() => {
    if (!id) return;
    fetchStudantsAvailable();
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [id]);

  return { studentsAvailable, fetchStudantsAvailable };
};