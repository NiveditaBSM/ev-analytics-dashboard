import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Layout from "./components/shared/Layout";
import Overview from "./components/pages/Overview";
import RegionBoard from "./components/pages/RegionBoard";
import MakeBoard from "./components/pages/MakeBoard";
import CompareBoard from "./components/pages/CompareBoard";
import { useState, useEffect, useContext } from "react";
import EV_Data from '../data-to-visualize/Electric_Vehicle_Population_Data.csv';
import { parseCSVtoObj, getInsights } from "./util/preProcessing";
import { DataContext } from "./context/DataContext";

const App = () => {
  const [isLoading, setIsloading] = useState(true);
  const { insights, setInsights } = useContext(DataContext);

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
      setIsloading(false);
    };
    getData();
  }, [])

  console.log(insights);

  if (isLoading) return (
    <div> Loading Data...</div>
  )

  return (
    <>
      {/* <Router>
        <div className='flex h-screen bg-slate-50 text-gray-950'>
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-slate-300 opacity-80" />
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/overview" element={<Overview />} />
              <Route path="/regionwise" element={<RegionBoard />} />
              <Route path="/makewise" element={<MakeBoard />} />
              <Route path="/compare" element={<CompareBoard />} />
              <Route index element={<Navigate to="/overview" replace />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router> */}
    </>
  )
}

export default App;
