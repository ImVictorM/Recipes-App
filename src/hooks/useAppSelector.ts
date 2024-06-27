import { RootState } from "@/store/types";
import { useSelector } from "react-redux";

const useAppSelector = useSelector.withTypes<RootState>();

export default useAppSelector;
