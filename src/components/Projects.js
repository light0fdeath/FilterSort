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
  const [projects, setProjects] = useState(getProjects());
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(Math.ceil(projects.length / 3));
  const [query, setQuery] = useState("");

  const [paginate, setPaginate] = useState(
    _(projects)
      .slice(page - 1)
      .take(3)
      .value()
  );

  var searchedProject = projects.filter((project) => {
    if (query === "") {
      return project;
    } else if (project.title.toLowerCase().includes(query.toLowerCase())) {
      return project;
    }
  });

  useEffect(() => {
    setPaginate(
      _(searchedProject)
        .slice((page - 1) * pageSize)
        .take(3)
        .value()
    );
    setPage(1);
    setPageSize(Math.ceil(searchedProject.length / 3));
    setProjects(projects);
  }, [query]);

  const handleChange = (event, value) => {
    setPage(value);
    setPaginate(
      _(searchedProject)
        .slice((value - 1) * 3)
        .take(3)
        .value()
    );
  };

  const handleDelete = (project) => {
    const newProjectsDelete = searchedProject.filter(
      (p) => p._id !== project._id
    );
    const newProjects = projects.filter((p) => p._id !== project._id);
    setPageSize(Math.ceil(newProjects.length / 3));
    setPaginate(
      _(newProjectsDelete)
        .slice((page - 1) * 3)
        .take(3)
        .value()
    );
    setPageSize(Math.ceil((searchedProject.length - 1) / 3));
    console.log(searchedProject);
    setProjects(newProjects);
  };

  const handleFavourite = (project) => {
    const index = projects.indexOf(project);

    const FavLength = projects.filter((p) => p.favourite == true).length;
    console.log(FavLength);

    if (FavLength < 5) {
      projects[index].favourite = !projects[index].favourite;
      setProjects(projects);
      setPaginate(
        _(searchedProject)
          .slice((page - 1) * 3)
          .take(3)
          .value()
      );
      const date = new Date();
      projects[index].favTime = date.getTime();
    } else {
      if ((projects[index].favourite = true)) {
        projects[index].favourite = !projects[index].favourite;
        setProjects(projects);
        setPaginate(
          _(searchedProject)
            .slice((page - 1) * 3)
            .take(3)
            .value()
        );
      }
    }
    console.log(projects);
  };

  return (
    <Box sx={{ width: "100%" }} spacing={5}>
      <Button variant="contained" spacing={2} sx={{ mb: 5 }}>
        Projects
      </Button>
      <Stack spacing={2}>
        <Pagination
          count={pageSize}
          page={page}
          onChange={handleChange}
          color="secondary"
        />
      </Stack>
      <br />
      <TextField
        id="standard-basic"
        label="Search For Projects"
        variant="standard"
        sx={{ mb: 5 }}
        onChange={(event) => setQuery(event.target.value)}
      />
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
