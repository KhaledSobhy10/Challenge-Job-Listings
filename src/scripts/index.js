import { removeAllFilters, renderFilters, renderJobs } from "./views.js";

const clearFiltersBtn = document.querySelector(".clear-keywords-btn");
const jobsList = document.querySelector(".jobs");

clearFiltersBtn.onclick = (e) => {
  removeAllFilters();
};

renderFilters();
renderJobs();

new ResizeObserver((e) => {
  jobsList.style.marginTop = e[0].contentRect.height + "px";
  console.log(e[0].contentRect.height);
}).observe(document.querySelector(".filter-bar-container"));
