import { useState, useEffect } from "react";
import { getProjects } from "../Services/projectService";


export const useProjects = () => {
  const [projects, setProjects] = useState([])


  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };
  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  return { projects, fetchProjects };
};