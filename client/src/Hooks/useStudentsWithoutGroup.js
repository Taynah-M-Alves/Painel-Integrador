import { useState, useEffect } from "react";
import { getStudentsWithoutGroup } from "../Services/StudentsService";


export const useStudentsWithoutGroup = () => {

  const [students, setStudent] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getStudentsWithoutGroup();
      setStudent(data);
    };

    fetchProjects();
  }, []);

  return { students, setStudent };
};