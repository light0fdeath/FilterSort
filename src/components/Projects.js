import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { getProjects } from "../services/ProjectList";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Favourite from "./common/Favourite";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import _ from "lodash";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Projects = () => {
  const count = 5;
  const [env, setEnv] = useState("");
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState("");
  const [projects, setProjects] = useState(getProjects());
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(Math.ceil(projects.length / count));
  const [query, setQuery] = useState("");
  const [paginate, setPaginate] = useState([]);
  const FavLength = projects.filter((p) => p.favourite == true).length;

  const handleEnvChange = (event) => {
    setEnv(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleArchive = (event) => {
    setChecked(event.target.checked);
  };

  var projectData = projects.filter(
    (project) =>
      (project.env == env || env == "") &&
      (project.status == status || status == "") &&
      (checked ? true : project.isArchived)
  );

  var searchedProject = projectData.filter((project) => {
    const data = project.title.toLowerCase().includes(query.toLowerCase());
    if (query === "") {
      return project;
    } else if (data) {
      return project;
    }
  });

  useEffect(() => {
    setPaginate(
      _(searchedProject)
        .slice((page - 1) * pageSize)
        .take(count)
        .value()
    );
    setPage(1);
    setPageSize(Math.ceil(searchedProject.length / count));
    setProjects(projects);
  }, [query, env, status, checked]);

  const handleChange = (event, value) => {
    setPage(value);
    setPaginate(
      _(searchedProject)
        .slice((value - 1) * count)
        .take(count)
        .value()
    );
  };

  const handleDelete = (project) => {
    const searchedProjectDelete = searchedProject.filter(
      (p) => p._id !== project._id
    );
    const newProjects = projects.filter((p) => p._id !== project._id);
    setPaginate(
      _(searchedProjectDelete)
        .slice((page - 1) * count)
        .take(count)
        .value()
    );
    setPageSize(Math.ceil((searchedProject.length - 1) / count));
    setProjects(newProjects);
  };

  const handleFavourite = (project) => {
    const index = projects.indexOf(project);
    if (FavLength < 5 || (projects[index].favourite = true)) {
      projects[index].favourite = !projects[index].favourite;
    }
    setPaginate(
      _(searchedProject)
        .slice((page - 1) * count)
        .take(count)
        .value()
    );
    setProjects(projects);
    const date = new Date();
    projects[index].favTime = date.getTime();
  };

  return (
    <Box sx={{ width: "100%" }} spacing={5}>
      <Button variant="contained" spacing={2} sx={{ m: 5 }}>
        Projects
      </Button>

      <br />

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={3}>
          <TextField
            id="standard-basic"
            label="Search For Projects"
            variant="standard"
            sx={{ mb: 5 }}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Environment</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={env}
              label="Environement"
              onChange={handleEnvChange}>
              <MenuItem value={"production"}>Prod</MenuItem>
              <MenuItem value={"dev"}>Dev</MenuItem>
              <MenuItem value={"server"}>Server</MenuItem>
              <MenuItem value={""}>Clear Selected</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label-status">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label-status"
              id="demo-simple-select-status"
              value={status}
              label="Environement"
              onChange={handleStatusChange}>
              <MenuItem value={"active"}>Active</MenuItem>
              <MenuItem value={"inactive"}>Inactive</MenuItem>
              <MenuItem value={""}>Clear Status</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleArchive}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Include Archived Projects"
          />
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Stack spacing={2} sx={{ mb: 5 }}>
          <Pagination
            count={pageSize}
            page={page}
            onChange={handleChange}
            color="secondary"
          />
        </Stack>
      </Grid>

      <Grid
        container
        spacing={2}
        justifyContent="flex-start
  "
        alignItems="center">
        <Grid item xs={2}>
          <Item>
            <b>Project Name</b>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <b>No of Flows</b>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <b>Environment</b>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <b>Status</b>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <b>Favourite</b>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <b>Delete</b>
          </Item>
        </Grid>
      </Grid>
      <br></br>
      {paginate.map((project) => (
        <>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            key={project._id}>
            <Grid item xs={2}>
              <Item>{project.title}</Item>
            </Grid>
            <Grid item xs={2}>
              <Item>{project.numOfFlows}</Item>
            </Grid>
            <Grid item xs={2}>
              <Item>{project.env}</Item>
            </Grid>
            <Grid item xs={2}>
              <Item>{project.status}</Item>
            </Grid>
            <Grid item xs={2}>
              <Favourite
                variant="button"
                favourite={project.favourite}
                onClick={() => handleFavourite(project)}
              />
            </Grid>
            <Grid item xs={2}>
              <Item>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(project)}>
                  Delete
                </Button>
              </Item>
            </Grid>
          </Grid>
        </>
      ))}
    </Box>
  );
};

export default Projects;
