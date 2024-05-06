import { OutlinedInput, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Select from "react-select";

export default function Header({ data, setFilteredData }) {
  const [companyName, setCompanyName] = useState();

  const applyFilters = (filters) => {
    let newData = { ...data };

    if (filters.jobRole.length > 0) {
      newData.jdList = newData.jdList.filter((item) =>
        filters.jobRole.includes(item.jobRole)
      );
    }

    if (filters.employeesCount) {
      newData.jdList = newData.jdList.filter(
        (item) => item.employeesCount === filters.employeesCount
      );
    }
    if (filters.experience) {
      newData.jdList = newData.jdList.filter(
        (item) => item.minExp <= filters.experience
      );
    }

    if (filters.location.length > 0) {
      newData.jdList = newData.jdList.filter((item) => {
        if (item.location === "remote") {
          return filters.location.includes("remote");
        } else if (item.location === "hybrid") {
          return filters.location.includes("hybrid");
        }

        return filters.location.includes("in-office");
      });
    }

    if (filters.minJdSalary) {
      newData.jdList = newData.jdList.filter((item) => {
        return item.minJdSalary >= filters.minJdSalary;
      });
    }

    if (companyName) {
      newData.jdList = newData.jdList.filter((item) =>
        item.companyName.toLowerCase().includes(companyName.toLowerCase())
      );
    }

    setFilteredData(newData);
  };

  const [filters, setFilters] = useState({
    jobRole: [],
    employeesCount: "",
    experience: null,
    location: [],
    minJdSalary: null,
    companyName: "",
  });

  const handleFilterChange = (filterType, event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: event ? event.value : event,
    }));
  };

  useEffect(() => {
    const applyFilter = () => {
      applyFilters(filters);
    };

    data && applyFilter();
  }, [filters, companyName]);

  const roleOptions = [
    {
      label: "Engineering",
      options: [
        { value: "fullstack", label: "Full Stack" },
        { value: "frontend", label: "FrontEnd" },
        { value: "backend", label: "Backend" },
        { value: "android", label: "Android" },
        { value: "ios", label: "IOS" },
      ],
    },
    {
      label: "Product",
      options: [{ value: "tech lead", label: "Tech Lead" }],
    },
  ];

  const employeeNumberOptions = [
    { value: "0-1", label: "0-1" },
    { value: "11-20", label: "11-20" },
    { value: "21-50", label: "21-50" },
    { value: "51-100", label: "51-100" },
    { value: "101-200", label: "101-200" },
    { value: "201-500", label: "201-500" },
    { value: "500+", label: "500+" },
  ];

  const experienceOption = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
  ];

  const remoteOption = [
    { value: "remote", label: "Remote" },
    { value: "in-office", label: "In-Office" },
    { value: "hybrid", label: "Hybrid" },
  ];

  const minBasePay = [
    { value: 0, label: "0L" },
    { value: 10, label: "10L" },
    { value: 20, label: "20L" },
    { value: 30, label: "30L" },
    { value: 40, label: "40L" },
    { value: 50, label: "50L" },
    { value: 60, label: "60L" },
    { value: 70, label: "70L" },
  ];

  return (
    <Grid container direction="row" justifyContent="space-evenly">
      <Grid item style={{ display: "inline-block", minWidth: "10em" }}>
        <div style={{ minHeight: "1.5em" }}>
          {filters.jobRole.length > 0 && <Typography>Roles</Typography>}
        </div>
        <Select
          isMulti
          options={roleOptions}
          onChange={(e) => {
            handleFilterChange(
              "jobRole",
              Array.from(e, (option) => option.value)
            );
          }}
        />
      </Grid>
      <Grid item style={{ display: "inline-block", minWidth: "10em" }}>
        <div style={{ minHeight: "1.5em" }}>
          {filters.employeesCount && <Typography>No Of Employes</Typography>}
        </div>
        <Select
          isClearable
          options={employeeNumberOptions}
          onChange={(e) => {
            handleFilterChange("employeesCount", e);
          }}
        />
      </Grid>
      <Grid item style={{ display: "inline-block", minWidth: "10em" }}>
        <div style={{ minHeight: "1.5em" }}>
          {filters.experience && <Typography>Experience</Typography>}
        </div>
        <Select
          isClearable
          options={experienceOption}
          onChange={(e) => {
            handleFilterChange("experience", e.value);
          }}
        />
      </Grid>
      <Grid item style={{ display: "inline-block", minWidth: "10em" }}>
        <div style={{ minHeight: "1.5em" }}>
          {filters.location.length > 0 && <Typography>Remote</Typography>}
        </div>
        <Select
          isMulti
          options={remoteOption}
          onChange={(e) => {
            handleFilterChange(
              "location",
              Array.from(e, (option) => option.value)
            );
          }}
        />
      </Grid>
      <Grid item style={{ display: "inline-block", minWidth: "10em" }}>
        <div style={{ minHeight: "1.5em" }}>
          {filters.minJdSalary && <Typography>Min Base Pay</Typography>}
        </div>
        <Select
          isClearable
          options={minBasePay}
          onChange={(e) => {
            handleFilterChange("minJdSalary", e);
          }}
        />
      </Grid>
      <Grid item style={{ display: "inline-block", minWidth: "10em" }}>
        <div style={{ minHeight: "1.5em" }}>
          {companyName && <Typography>Company Name</Typography>}
        </div>
        <OutlinedInput
          sx={{ maxHeight: "2.3em" }}
          placeholder="Company Name"
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />
      </Grid>
    </Grid>
  );
}
