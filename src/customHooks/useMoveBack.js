import { useNavigate } from "react-router-dom";

export function useMoveBack() {
  console.log("Going back...");
  const navigate = useNavigate();
  return () => {
    navigate(-1);
  };
}
