
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Header from "./compenents/header";
import Form from "./pages/form";
import { useEffect } from "react";
import Api from "./utils/api";
import { useDispatch } from "react-redux";
import {setError,setJobs,setLoading} from "./redux/slicies/jobSlice";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading());

    Api
      .get("/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err)));
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:mode" element={<Form />} />

      </Routes>
    </BrowserRouter>
  );

};

export default App