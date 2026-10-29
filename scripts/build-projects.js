const projectData = require("../src/public/project-data.json");

const half = Math.ceil(projectData.length / 2);
const set1 = projectData.slice(0, half);
const set2 = projectData.slice(half, projectData.length);
const sets = [set1, set2];

const buildProjectSection = (templateCheerio, set, setIndex) => {
  const projectsSection = templateCheerio(
    `[data-projects-section-${setIndex + 1}]`
  );

  projectsSection.empty();

  set.forEach((project, index) => {
    const isEven = index % 2 === 0;
    const lineDirection = isEven ? "left" : "right";
    const scrollSpeed = isEven ? 8 : -8;
    const scrollDirection = isEven ? "right" : "left";
    const featured = setIndex === 0 && index === 0;

    // Add line before project
    const lineBefore = `<span class="home__projects__line ${lineDirection}"><span></span></span>`;
    projectsSection.append(lineBefore);

    const labelInner = featured
      ? `<div class="label__inner label-1">
         <p>FEATURED <br /> PROJECTS (${projectData.length})</p>
         <p>${project.role}</p>
       </div>`
      : `<div class="label__inner">
         <p>${project.role}</p>
       </div>`;

    const label = `
    <div class="home__projects__project__label">
      ${labelInner}
    </div>`;

    const title = `
    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="home__projects__project__link">
      <h1 class="home__projects__project__title"
          data-scroll=""
          data-scroll-direction="horizontal"
          data-scroll-speed="${scrollSpeed}">
        <span class="inline-ovh">
          <div class="title__main ${scrollDirection}">
            <span class="slide-up"
                  data-content="${project.title}"
                  aria-hidden="true"></span>
            ${project.title}
          </div>
        </span>
      </h1>
    </a>`;

    const button = `
    <div class="project__link">
      <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="c-button">
        <span class="c-link">
          <span class="c-link__inner">
            <span>
              Visit Site
              <span class="share-icon">
                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.337 7.845l-7.173 7.173-1.178-1.179 7.172-7.172H5.837V5h9.166v9.167h-1.666V7.845z" fill="#777"/>
                </svg>
              </span>
            </span>
          </span>
        </span>
      </a>
    </div>`;

    const mediaHtml = project.video
      ? `<div class="project-drawer__media">
           <div class="project-drawer__video-wrapper">
             <video class="project-drawer__video"
                    src="${project.video}"
                    playsinline
                    muted
                    loop
                    controls
                    preload="metadata">
             </video>
           </div>
           <div class="project-drawer__media-footer">
             <span class="project-drawer__live-dot"></span>
             <span class="project-drawer__live-text">DEMO RECORDING — AUTOPLAYS ON HOVER</span>
           </div>
         </div>`
      : `<div class="project-drawer__media">
           <div class="project-drawer__placeholder">
             <div class="placeholder-icon">
               <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                 <rect x="2" y="2" width="20" height="20" rx="4" ry="4"></rect>
                 <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"></polygon>
               </svg>
             </div>
             <h4 class="placeholder-title">Interactive Demo Visual Pending</h4>
             <p class="placeholder-desc">Demo video recording in progress. Media placeholder ready for <code>demos/</code> asset drop.</p>
             <span class="placeholder-badge">DEMO IN PROGRESS</span>
           </div>
           <div class="project-drawer__media-footer">
             <span class="project-drawer__pending-dot"></span>
             <span class="project-drawer__live-text">PREVIEW ASSET PENDING</span>
           </div>
         </div>`;

    const highlightsHtml = (project.highlights || [])
      .map(
        (h) => `
          <li class="project-drawer__highlight-item">
            <span class="highlight-bullet">▹</span>
            <span>${h}</span>
          </li>`
      )
      .join("");

    const tagsHtml = (project.tags || [])
      .map((t) => `<span class="project-drawer__tag">${t}</span>`)
      .join("");

    const shortTitle = project.title.split(" — ")[0];

    const drawer = `
    <div class="home__projects__project__drawer">
      <div class="home__projects__project__drawer__inner">
        <div class="project-drawer">
          ${mediaHtml}
          <div class="project-drawer__content">
            <div class="project-drawer__header">
              <span class="project-drawer__domain">${project.domain || "AI & Software Engineering"}</span>
              <span class="project-drawer__badge">${project.badge || "Featured Project"}</span>
            </div>
            
            <h3 class="project-drawer__title">${shortTitle}</h3>
            <p class="project-drawer__overview">${project.overview || project.description}</p>
            
            ${
              project.architecture
                ? `<div class="project-drawer__arch">
                     <h5 class="project-drawer__section-title">System Architecture</h5>
                     <p class="project-drawer__arch-text">${project.architecture}</p>
                   </div>`
                : ""
            }
            
            <div class="project-drawer__highlights">
              <h5 class="project-drawer__section-title">Key Engineering Highlights</h5>
              <ul class="project-drawer__highlight-list">
                ${highlightsHtml}
              </ul>
            </div>
            
            <div class="project-drawer__stack">
              <h5 class="project-drawer__section-title">Core Technologies</h5>
              <div class="project-drawer__tags">
                ${tagsHtml}
              </div>
            </div>
            
            <div class="project-drawer__actions">
              <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-drawer__btn">
                <span>Explore Repository</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    // Build project block
    const projectEl = `<div class="home__projects__project ${scrollDirection}" data-project-id="${project.id}">
      ${label}
      ${title}
      ${drawer}
      ${button}
    </div>`;
    projectsSection.append(projectEl);
  });

  // Add final line
  const finalLine = `<span class="home__projects__line ${
    set.length % 2 === 0 ? "left" : "right"
  }"><span></span></span>`;
  projectsSection.append(finalLine);
};

const buildProjectsSection = async (templateCheerio) => {
  sets.forEach((set, index) => {
    buildProjectSection(templateCheerio, set, index);
  });
};

module.exports = {
  buildProjectsSection,
};
