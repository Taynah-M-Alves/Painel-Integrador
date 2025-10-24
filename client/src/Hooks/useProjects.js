import { useState, useEffect } from "react";
import { getProjects } from "../Services/projectService";


export const useProjects = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return { projects, setProjects };
};