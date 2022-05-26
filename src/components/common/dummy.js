import React from "react";

const dummy = () => {
  const [projects, setProjects] = useState(getProjects());
  const [query, setQuery] = useState("");

  //searchedProject = searchedProject.filter((p) => p.isArchived == false);

  const projectDetails = (project) => {
    console.log(project);
  };

  const handleArchive = () => {
    defaultChecked = !defaultChecked;
    if (defaultChecked == true) {
      //console.log("Including handle archive");
    } else {
      //console.log("Excluding archive project");
    }
  };

  const favProjects = projects.filter((p) => p.favourite == true);
  const favProjectsList = favProjects.sort(function (a, b) {
    return a.favTime - b.favTime;
  });

  //   Check for Archived

  const includeArchivedProject = projects.filter((p) => {
    if (defaultChecked) {
      return projects;
    } else if (projects.filter((p) => p.isArchived == false)) {
      return projects;
    }
  });

  //   Check for Search

  var searchedProject = projects.filter((project) => {
    if (query === "") {
      return project;
    } else if (project.title.toLowerCase().includes(query.toLowerCase())) {
      return project;
    }
  });
  console.log(favProjectsList);

  const handleDelete = (project) => {
    const newProjects = projects.filter((p) => p._id !== project._id);
    setProjects(newProjects);
  };

  const handleFavourite = (project) => {
    const newProjects = [...projects];
    const index = newProjects.indexOf(project);
    newProjects[index] = { ...newProjects[index] };
    const FavLength = newProjects.filter((p) => p.favourite == true).length;

    if (FavLength < 5) {
      newProjects[index].favourite = !newProjects[index].favourite;
      setProjects(newProjects);
      const date = new Date();
      newProjects[index].favTime = date.getTime();
    } else {
      if ((newProjects[index].favourite = true)) {
        newProjects[index].favourite = !newProjects[index].favourite;
        setProjects(newProjects);
      }
    }
  };
  return (
    <Box sx={{ width: "100%" }} spacing={5}>
      <Button variant="contained" spacing={2} sx={{ mb: 5 }}>
        Projects
      </Button>
      <Stack spacing={2}>
        {/* <Typography>Page: {data[`${page - 1}`]}</Typography> */}
        <Typography>Page: {fruits}</Typography>
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
      />{" "}
      {/* <FormControlLabel
    control={
      <Checkbox
        defaultChecked
        onClick={() => handleArchive(defaultChecked)}
      />
    }
    label="Include Archived Project"
  /> */}
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
      {searchedProject.map((project) => (
        <>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            key={project._id}>
            <Grid item xs={2}>
              <Item onClick={() => projectDetails(project)}>
                {project.title}
              </Item>
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

export default dummy;
