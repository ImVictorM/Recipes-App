import { AppDispatch } from "@/store/types";
import { useDispatch } from "react-redux";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;
