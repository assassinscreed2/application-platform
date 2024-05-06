import { Card, Grid, Typography, Button } from "@mui/material";
import { ElectricBolt } from "@mui/icons-material";
import "../App.css";

export default function JobCard({ job }) {
  const hanldeOpenURl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Card className="Card">
      <Grid container direction="column">
        {/* Card header */}
        <Grid container item direction="row">
          <Grid item sm={1.3}>
            <img src={job.logoUrl} className="CompanyLogo" />
          </Grid>
          <Grid
            item
            container
            direction="column"
            className="CardHeader"
            sm={10}
          >
            <Grid item>
              <Typography className="CompanyName" textAlign="left">
                {job.companyName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className="JobRole" textAlign="left">
                {job.jobRole}
              </Typography>
            </Grid>
            <Grid item>
              <Typography textAlign="left">{job.location}</Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* salary */}
        <Grid item>
          <Typography textAlign="left" className="Salary">
            Estimated Salary:{" "}
            {job.minJdSalary
              ? job.minJdSalary
              : Math.max(job.maxJdSalary - 10, 1)}{" "}
            - {job.maxJdSalary ? job.maxJdSalary : job.minJdSalary + 10}
          </Typography>
        </Grid>

        {/* about company */}
        <Grid
          item
          alignItems="center"
          justifyContent="end"
          container
          direction="column"
          className="AboutCompany"
        >
          <Grid item className="JobDescriptionContainer">
            <Typography
              variant="h6"
              textAlign="left"
              className="AboutCompanyHeader"
            >
              About Company:
            </Typography>
            <Typography
              variant="body2"
              textAlign="left"
              className="JobDescription"
            >
              {job.jobDetailsFromCompany}
            </Typography>
          </Grid>
          <Grid
            item
            justifyContent="center"
            container
            className="ShowMoreButton"
          >
            <Grid item>
              <Button disableRipple>Show more</Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Experience */}
        <Grid item container direction="column">
          <Typography textAlign="left">Minimum Experience</Typography>
          <Typography textAlign="left">{job.minExp}</Typography>
        </Grid>

        {/* Easy apply button */}
        <Grid item>
          <Button
            onClick={() => hanldeOpenURl(job.jdLink)}
            variant="contained"
            className="EasyApplyButton"
            startIcon={<ElectricBolt sx={{ color: "yellow" }} />}
          >
            <Typography
              sx={{ textTransform: "none" }}
              className="EasyApplyText"
            >
              Easy Apply
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
