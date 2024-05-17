import { RootState } from "@/store";
import { useSelector } from "react-redux";

const useAppSelector = useSelector.withTypes<RootState>();

export default useAppSelector;
