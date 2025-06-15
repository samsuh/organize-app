const paths = {
  home() {},
  projectShow(projectSlug: string) {
    return `/projects/${projectSlug}`
  },
  taskCreate(projectSlug: string) {
    return `/projets/${projectSlug}/tasks/new}`
  },
  taskShow(projectSlug: string, taskId: string) {
    return `/projects/${projectSlug}/tasks/${taskId}}`
  },
}

export default paths
