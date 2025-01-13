import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Header from "./components/Header";
import Layout from "./components/shared/Layout";
import Overview from "./components/pages/Overview";
import RegionBoard from "./components/pages/RegionBoard";
import MakeBoard from "./components/pages/MakeBoard";
import CompareBoard from "./components/pages/CompareBoard";
import { useState, useEffect } from "react";
import EV_Data from '../data-to-visualize/Electric_Vehicle_Population_Data.csv';
import { parseCSVtoObj, getInsights } from "./util/preProcessing";

const App = () => {

  const [insights, setInsights] = useState(null);
  console.log("Inside app");
  useEffect(() => {
    console.log("In effect");
    const getData = async () => {
      console.log("CSV fetch started");
      const response = await fetch(EV_Data);
      const csvText = await response.text();
      console.log("CSV fetched successfully");

      const parsedData = parseCSVtoObj(csvText);
      console.log(parsedData);

      const insights = getInsights(parsedData);
      setInsights(insights);
    };
    getData();
  }, [])

  console.log(insights);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Layout />}>
            <Route path="/overview" element={<Overview />} />
            <Route path="/regionwise" element={<RegionBoard />} />
            <Route path="/makewise" element={<MakeBoard />} />
            <Route path="/compare" element={<CompareBoard />} />
            <Route index element={<Navigate to="/overview" replace />} />
          </Route>
        </Routes>
      </Router>
      <Header />
      <p className="text-center"> Hello</p>
    </>
  )
}

export default App;
