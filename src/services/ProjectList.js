const projects = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Project One",
    numOfFlows: 5,
    env: "production",
    status: "active",
    favourite: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Project Two",
    numOfFlows: 3,
    env: "deployment",
    status: "inactive",
    favourite: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Project Three",
    numOfFlows: 4,
    env: "production",
    status: "active",
    favourite: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Project Four",
    numOfFlows: 7,
    env: "production",
    status: "active",
    favourite: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47171a",
    title: "Project Five",
    numOfFlows: 5,
    env: "production",
    status: "active",
    favourite: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47281a",
    title: "Project Six",
    numOfFlows: 6,
    env: "production",
    status: "active",
    favourite: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd48181a",
    title: "Project Seven",
    numOfFlows: 3,
    env: "production",
    status: "active",
    favourite: true,
  },
];

export function getProjects() {
  return projects;
}

export function getProject(id) {
  return projects.find((p) => p._id === id);
}

export function deleteProject(id) {
  let projectDb = projects.find((p) => p._id === id);
  projects.splice(projects.indexOf(projectDb), 1);
  return projectDb;
}
