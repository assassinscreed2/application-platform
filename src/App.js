import { useEffect, useState } from "react";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./App.css";

import JobCard from "./components/JobCard";
import Header from "./components/Header";

function App() {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [offset, setOffSet] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        limit: 6,
        offset: offset,
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
      let updatedData = {};
      if (data) {
        updatedData = { ...data };
        updatedData.jdList = [...updatedData.jdList, ...resData.jdList];
      } else {
        updatedData = { ...resData };
      }

      setData(updatedData);
      setFilteredData(updatedData);
      setLoading(false);
    }

    fetchData();
  }, [offset]);

  const incrementOffset = () => {
    setLoading(true);
    setOffSet((prevOffSet) => prevOffSet + 6);
  };

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
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "1em" }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid item>
            <Button
              onClick={incrementOffset}
              sx={{ textTransform: "none", color: "black" }}
            >
              <RefreshIcon />
              Load More
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default App;
