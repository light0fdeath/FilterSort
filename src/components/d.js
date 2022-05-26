const handleDelete = (project) => {
  const newProjects = projects.filter((p) => p._id !== project._id);
  setProjects(newProjects);
  setPaginate(
    _(newProjects)
      .slice((page - 1) * pageSize)
      .take(3)
      .value()
  );
};

const handleFavourite = (project) => {
  const newProjects = [...projects];
  const index = newProjects.indexOf(project);
  newProjects[index] = { ...newProjects[index] };
  const FavLength = newProjects.filter((p) => p.favourite == true).length;

  if (FavLength < 5) {
    newProjects[index].favourite = !newProjects[index].favourite;
    setProjects(newProjects);
    setPaginate(
      _(newProjects)
        .slice((page - 1) * 3)
        .take(3)
        .value()
    );
    const date = new Date();
    newProjects[index].favTime = date.getTime();
  } else {
    if ((newProjects[index].favourite = true)) {
      newProjects[index].favourite = !newProjects[index].favourite;
      setProjects(newProjects);
      setPaginate(
        _(newProjects)
          .slice((page - 1) * 3)
          .take(3)
          .value()
      );
    }
  }
};

///

const handleDelete = (project) => {
  const newProjects = projects.filter((p) => p._id !== project._id);
  setProjects(newProjects);

  setPaginate(
    _(newProjects)
      .slice((page - 1) * pageSize)
      .take(3)
      .value()
  );
};

const handleFavourite = (project) => {
  const newProjects = [...projects];
  const index = newProjects.indexOf(project);
  newProjects[index] = { ...newProjects[index] };
  const FavLength = newProjects.filter((p) => p.favourite == true).length;

  if (FavLength < 5) {
    newProjects[index].favourite = !newProjects[index].favourite;
    setProjects(newProjects);
    setPaginate(
      _(newProjects)
        .slice((page - 1) * 3)
        .take(3)
        .value()
    );
    const date = new Date();
    newProjects[index].favTime = date.getTime();
  } else {
    if ((newProjects[index].favourite = true)) {
      newProjects[index].favourite = !newProjects[index].favourite;
      setProjects(newProjects);
      setPaginate(
        _(newProjects)
          .slice((page - 1) * 3)
          .take(3)
          .value()
      );
    }
  }
};

var pageSize = Math.ceil(projects.length / 3);

const handleSearchedProject = (query) => {
  const newProjects = projects.filter((project) => {
    if (query === "") {
      return project;
    } else if (project.title.toLowerCase().includes(query.toLowerCase())) {
      return project;
    }
  });

  setProjects(projects);
  setPaginate(
    _(newProjects)
      .slice((page - 1) * 3)
      .take(3)
      .value()
  );
};
