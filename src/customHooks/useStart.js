// src/customHooks/useStart.js
import { useContext } from "react";
import { StartContext } from "../context/StartContext";

export function useStart() {
  return useContext(StartContext);
}
