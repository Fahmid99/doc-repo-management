import React from "react";
import { ChangeRequest } from "@/app/library/types/changeRequest";

interface TaskRouterProps {
  selectedRequest: ChangeRequest;
}

const TaskRouter = ({ selectedRequest }: TaskRouterProps) => {
    const {user} = useAuth(); 
  return <div>TaskRouter</div>;
  const getTaskComponent = () => { 
    
  }
  
};

export default TaskRouter;
