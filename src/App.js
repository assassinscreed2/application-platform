import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import "./App.css";

import JobCard from "./components/JobCard";
import Header from "./components/Header";

function App() {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    async function fetchData() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        limit: 10,
        offset: 0,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      const resData = await response.json();
      console.log(resData);
      setData(resData);
      setFilteredData(resData);
    }

    fetchData();
  }, []);

  return (
    <>
      <Header data={data} setFilteredData={setFilteredData} />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "3em" }}
      >
        {filteredData &&
          filteredData.jdList.map((job) => {
            return (
              <Grid item container justifyContent="center" lg={4} md={6} sm={8}>
                <JobCard job={job} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}

export default App;
