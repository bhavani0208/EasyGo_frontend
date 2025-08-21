import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
