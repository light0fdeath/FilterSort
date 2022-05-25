const projects = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Project One",
    numOfFlows: 5,
    env: "production",
    status: "active",
    favourite: true,
    favTime: 6,
    isArchived: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Project Two",
    numOfFlows: 3,
    env: "deployment",
    status: "inactive",
    favourite: true,
    favTime: 3,
    isArchived: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Project Three",
    numOfFlows: 4,
    env: "production",
    status: "active",
    favourite: false,
    favTime: 2,
    isArchived: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Project Four",
    numOfFlows: 7,
    env: "production",
    status: "active",
    favourite: false,
    favTime: 7,
    isArchived: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47171a",
    title: "Project Five",
    numOfFlows: 5,
    env: "production",
    status: "active",
    favourite: false,
    favTime: 4,
    isArchived: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47281a",
    title: "Project Six",
    numOfFlows: 6,
    env: "production",
    status: "active",
    favourite: false,
    favTime: 5,
    isArchived: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd48181a",
    title: "Project Seven",
    numOfFlows: 3,
    env: "production",
    status: "active",
    favourite: true,
    favTime: 1,
    isArchived: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd48771a",
    title: "Project Eight",
    numOfFlows: 4,
    env: "production",
    status: "active",
    favourite: false,
    favTime: 9,
    isArchived: false,
  },
  {
    _id: "5b23ca3eeb7f6fbccd48181a",
    title: "Project Nine",
    numOfFlows: 6,
    env: "production",
    status: "active",
    favourite: false,
    favTime: 8,
    isArchived: false,
  },
  {
    _id: "5b23ca4eeb7f6fbccd48181a",
    title: "Project Nine",
    numOfFlows: 6,
    env: "production",
    status: "active",
    favourite: false,
    favTime: 8,
    isArchived: false,
  },
  {
    _id: "5b23ca36eb7f6fbccd48181a",
    title: "Project Nine",
    numOfFlows: 6,
    env: "production",
    status: "active",
    favourite: false,
    favTime: 8,
    isArchived: false,
  },
  {
    _id: "5b237a3eeb7f6fbccd48181a",
    title: "Project Nine",
    numOfFlows: 6,
    env: "production",
    status: "active",
    favourite: false,
    favTime: 8,
    isArchived: false,
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
