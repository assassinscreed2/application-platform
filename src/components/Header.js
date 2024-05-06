import { OutlinedInput } from "@mui/material";
import { useState, useEffect } from "react";
import Select from "react-select";

export default function Header({ data, setFilteredData }) {
  const [companyName, setCompanyName] = useState();

  const applyFilters = (filters) => {
    console.log(data);
    let newData = { ...data };
    newData.jdList.map((job) => console.log("newData", job));

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
        console.log(item.location);
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
        console.log("salary", item.minJdSalary);

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

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
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
    <>
      <div style={{ display: "inline-block", minWidth: "10em" }}>
        {filters.jobRole.length > 0 && <label>Roles:</label>}
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
      </div>
      <div style={{ display: "inline-block", minWidth: "10em" }}>
        <label>Employees Number:</label>
        <Select
          options={employeeNumberOptions}
          onChange={(e) => {
            handleFilterChange("employeesCount", e.value);
          }}
        />
      </div>
      <div style={{ display: "inline-block", minWidth: "10em" }}>
        <label>Experience:</label>
        <Select
          options={experienceOption}
          onChange={(e) => {
            handleFilterChange("experience", e.value);
          }}
        />
      </div>
      <div style={{ display: "inline-block", minWidth: "10em" }}>
        <label>Remote:</label>
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
      </div>
      <div style={{ display: "inline-block", minWidth: "10em" }}>
        <label>Min Base Pay:</label>
        <Select
          options={minBasePay}
          onChange={(e) => {
            handleFilterChange("minJdSalary", e.value);
          }}
        />
      </div>
      <div style={{ display: "inline-block", minWidth: "10em" }}>
        <label>Roles:</label>
        <OutlinedInput
          sx={{ maxHeight: "2.3em" }}
          placeholder="Company Name"
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />
      </div>
    </>
  );
}
