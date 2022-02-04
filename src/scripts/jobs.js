import jobs from "../../public/data.json";


const filterjobs = (jobs, filterKeywords) => {
  if (filterKeywords.size <= 0) return jobs;
  return jobs.filter((job) => {
    for (const keyword of filterKeywords) {
      const match =
        job.role === keyword ||
        job.level === keyword ||
        job.languages.includes(keyword) ||
        job.tools.includes(keyword);
      if (!match) return false;
    }
    return true;
  });
};
export { jobs, filterjobs };
