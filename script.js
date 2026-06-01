let totalSpreads = 8;
let current = 1;
let currentBook = 'book1';

const coverScreen = document.getElementById('cover-screen');
const bookViewer = document.getElementById('book-viewer');
const bookSpread = document.getElementById('book-spread');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const bookTitle = document.getElementById('book-title');
const bookSubtitle = document.getElementById('book-subtitle');
const spreadLabel = document.getElementById('spread-label');
const dotsContainer = document.getElementById('dots');
const bookCoverButtons = document.querySelectorAll('.book-cover');
const carouselPrevBtn = document.querySelector('.carousel-prev');
const carouselNextBtn = document.querySelector('.carousel-next');
const bookTrack = document.querySelector('.book-track');
let carouselIndex = 0;

function createTagHtml(tags) {
  return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

function createTocItems(items) {
  return items.map(item => `
      <li data-target="${item.target}">
        <span class="toc-num">${item.num}</span>
        <span class="toc-chapter">${item.chapter}</span>
        <span class="toc-dots"></span>
        <span class="toc-page">${item.page}</span>
      </li>
    `).join('');
}

function createProjectCards(cards) {
  return cards.map(card => {
    const imageHtml = card.image ? `<img src="${card.image}" alt="${card.title}">` : card.img || '';
    const websiteButton = card.link ? `
        <a class="project-button" href="${card.link}" target="_blank" rel="noopener noreferrer">
          Go to Website!
        </a>
      ` : '';
    const descriptionHtml = card.description ? `<span>${card.description}</span>` : '';

    return `
      <div class="project-card ${card.size}">
        <div class="project-img">${imageHtml}</div>
        <div class="project-info">
          <strong>${card.title}</strong>
          ${descriptionHtml}
          ${websiteButton}
        </div>
      </div>
    `;
  }).join('');
}

function createProjectModalHtml(site) {
  if (!site) {
    return `<div class="project-detail-card"><div class="project-card large"><div class="project-info"><strong>Project unavailable</strong><span>No preview data found.</span></div></div></div>`;
  }
  return `
    <div class="project-detail-card">
      ${createProjectCards([
        {
          size: 'large',
          image: site.image,
          title: site.name,
          link: site.link
        }
      ])}
    </div>
  `;
}

function createYearGallerySpreads(year, chapterNum, chapterTitle, websites) {
  const yearItems = websites.filter(item => item.year.toLowerCase() === year.toLowerCase());
  if (yearItems.length === 0) {
    return [
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER ${chapterNum}</div>
          <h2 class="chapter-title">${chapterTitle}</h2>
          <p class="body-text">No projects found for ${chapterTitle} yet.</p>
        `,
        rightHtml: '<div class="project-grid"></div>'
      }
    ];
  }

  const spreads = [];
  if (year.toLowerCase() === 'sophomore') {
    return [
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER ${chapterNum}</div>
          <h2 class="chapter-title">${chapterTitle}</h2>
          <p class="chapter-quote">No sophomore projects survived the archive — the page is intentionally ripped as a fun reveal.</p>
          <hr class="divider">
          <p class="hint-text">This section is a ripped page in the story of your portfolio.</p>
        `,
        rightHtml: `
          <div class="ripped-page">
            <div class="ripped-page-text">Sophomore<br>Year<br>Ripped</div>
          </div>
        `
      }
    ];
  }
  for (let i = 0; i < yearItems.length; i += 6) {
    const group = yearItems.slice(i, i + 6);
    const leftCards = group.slice(0, 2).map(item => ({
      size: 'large',
      image: item.image,
      title: item.name,
      link: item.link
    }));
    const rightCards = group.slice(2).map(item => ({
      size: 'small',
      image: item.image,
      title: item.name,
      link: item.link
    }));
    spreads.push({
      leftClass: 'chapter-left',
      rightClass: 'chapter-right',
      leftHtml: `
        <div class="chapter-label">CHAPTER ${chapterNum}${i > 0 ? ' — CONTINUED' : ''}</div>
        <h2 class="chapter-title">${chapterTitle}</h2>
        ${createProjectCards(leftCards)}
      `,
      rightHtml: `
        <div class="project-grid">
          ${createProjectCards(rightCards)}
        </div>
      `
    });
  }
  return spreads;
}

function createFeaturedBook(bookNum) {
  return {
    title: `Featured Website ${bookNum}`,
    subtitle: 'Case Study',
    spreads: [
      {
        leftClass: '',
        rightClass: 'single-feature',
        leftHtml: '',
        rightHtml: `
          <div class="single-feature-card">
            <div class="feature-image">Featured Website ${bookNum}</div>
            <div class="feature-copy">
              <div class="feature-label">Project Highlight</div>
              <h2 class="feature-title">A single-page showcase</h2>
              <p class="feature-paragraph">A focused snapshot of this website project with one key image and supporting text, presented on the right page while the left page remains blank.</p>
            </div>
          </div>
        `
      }
    ]
  };
}

const books = {
  book1: {
    title: 'Jason Bach',
    subtitle: 'My Portfolio',
    tocItems: [
      { target: 2, num: '01', chapter: 'About Me', page: 'p. 2' },
      { target: 3, num: '02', chapter: 'Sophomore Year', page: 'p. 3' },
      { target: 4, num: '03', chapter: 'Junior Year', page: 'p. 4' },
      { target: 5, num: '04', chapter: 'Senior Year', page: 'p. 5' },
      { target: 6, num: '05', chapter: 'Reflection', page: 'p. 6' },
      { target: 7, num: '06', chapter: 'Future Plans', page: 'p. 7' }
    ],
    spreads: [
      {
        leftClass: 'toc-left',
        rightClass: 'toc-right',
        leftHtml: `
          <div class="nav-label">NAVIGATION</div>
          <div class="nav-box">
            <p><strong>Navigate:</strong> Use the arrows below to flip through chapters.</p>
            <p>Click any chapter in the contents to jump directly to it.</p>
            <p>Each chapter card links out to that project.</p>
          </div>
          <div class="portfolio-label-box">
            <div class="sub-label">PORTFOLIO</div>
            <div class="portfolio-title">4 Years of Work</div>
          </div>
        `,
        rightHtml: `
          <div class="toc-nav-label">NAVIGATION</div>
          <h2 class="toc-heading">Contents</h2>
          <ol class="toc-list">
            ${createTocItems([
              { target: 2, num: '01', chapter: 'About Me', page: 'p. 2' },
              { target: 3, num: '02', chapter: 'Sophomore Year', page: 'p. 3' },
              { target: 4, num: '03', chapter: 'Junior Year', page: 'p. 4' },
              { target: 5, num: '04', chapter: 'Senior Year', page: 'p. 5' },
              { target: 6, num: '05', chapter: 'Reflection', page: 'p. 6' },
              { target: 7, num: '06', chapter: 'Future Plans', page: 'p. 7' }
            ])}
          </ol>
        `
      },
      {
        leftClass: 'about-left',
        rightClass: 'about-right',
        leftHtml: `
          <div class="chapter-label">INTRODUCTION</div>
          <h2 class="chapter-title">About<br>the Author</h2>
          <p class="chapter-quote">"A designer and developer who spent four years crafting digital experiences — from first experiments to polished productions."</p>
          <hr class="divider">
        `,
        rightHtml: `
          <div class="photo-placeholder square">Your photo here</div>
          <p class="body-text">A short personal blurb goes here — your background, interests, what drives your design thinking, and what you hope visitors take away from this portfolio.</p>
        `
      },
      /* Featured Work spread removed */
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 02</div>
          <h2 class="chapter-title">Sophomore<br>Year</h2>
          ${createProjectCards([
            { size: 'large', img: 'Soph. 1', title: 'Soph. 1', description: 'Website design' },
            { size: 'large', img: 'Soph. 2', title: 'Soph. 2', description: 'Website design' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Soph. 3', title: 'Soph. 3', description: 'Website design' },
              { size: 'small', img: 'Soph. 4', title: 'Soph. 4', description: 'Website design' },
              { size: 'small', img: 'Soph. 5', title: 'Soph. 5', description: 'Website design' },
              { size: 'small', img: 'Soph. 6', title: 'Soph. 6', description: 'Website design' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 03</div>
          <h2 class="chapter-title">Junior<br>Year</h2>
          ${createProjectCards([
            { size: 'large', img: 'Jr. 1', title: 'Jr. 1', description: 'Website design' },
            { size: 'large', img: 'Jr. 2', title: 'Jr. 2', description: 'Website design' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Jr. 3', title: 'Jr. 3', description: 'Website design' },
              { size: 'small', img: 'Jr. 4', title: 'Jr. 4', description: 'Website design' },
              { size: 'small', img: 'Jr. 5', title: 'Jr. 5', description: 'Website design' },
              { size: 'small', img: 'Jr. 6', title: 'Jr. 6', description: 'Website design' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 04</div>
          <h2 class="chapter-title">Senior<br>Year</h2>
          ${createProjectCards([
            { size: 'large', img: 'Sr. 1', title: 'Sr. 1', description: 'Website design' },
            { size: 'large', img: 'Sr. 2', title: 'Sr. 2', description: 'Website design' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Sr. 3', title: 'Sr. 3', description: 'Website design' },
              { size: 'small', img: 'Sr. 4', title: 'Sr. 4', description: 'Website design' },
              { size: 'small', img: 'Sr. 5', title: 'Sr. 5', description: 'Website design' },
              { size: 'small', img: 'Sr. 6', title: 'Sr. 6', description: 'Website design' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'prose-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 05</div>
          <h2 class="chapter-title">Reflection</h2>
          <p class="chapter-quote">"Four years ago I opened a blank canvas. Here I reflect on what I've learned, the mistakes that shaped me, and the moments that changed how I see design."</p>
          <hr class="divider">
          <p class="hint-text">Key milestones on the right →</p>
        `,
        rightHtml: `
          <div class="photo-placeholder wide">Your photo here</div>
          <div class="blockquote-box">
            <p>Personal reflection text goes here — what growth you've experienced and what this journey has meant to you.</p>
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'prose-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 06</div>
          <h2 class="chapter-title">Future<br>Plans</h2>
          <p class="chapter-quote">"What comes next — the directions I'm headed, the skills I'm building, and the kind of work I want to make in the years ahead."</p>
          <hr class="divider">
        `,
        rightHtml: `
          <div class="photo-placeholder wide">Your photo here</div>
          <div class="blockquote-box">
            <p>Your future plans text — goals, aspirations, where you see your career heading and what excites you about what's ahead.</p>
          </div>
        `
      }
    ],
    // Minimal customPages for About only (safe, incremental)
    customPages: {
      about: {
        leftHtml: `
          <div class="chapter-label">INTRODUCTION</div>
          <h2 class="chapter-title">About<br>the Author</h2>
          <p class="chapter-quote">"A designer and developer who spent four years crafting digital experiences — from first experiments to polished productions."</p>
          <hr class="divider">
        `,
        rightHtml: `
          <div class="photo-placeholder square" style="padding:0;">
            <img src="imgs/Jason1.jpeg" alt="Jason Bach" style="width:100%;height:100%;object-fit:cover;display:block;">
          </div>
        `
      }
    }
  },
  book2: {
    title: 'Featured Website 1',
    projectName: 'AJAX Project',
    subtitle: 'Case Study',
    tocItems: [
      { target: 2, num: '01', chapter: 'Journal Intro', page: 'p. 2' },
      { target: 3, num: '02', chapter: 'Launch Story', page: 'p. 3' },
      { target: 4, num: '03', chapter: 'Editorial Lab', page: 'p. 4' },
      { target: 5, num: '04', chapter: 'Visual Rhythm', page: 'p. 5' },
      { target: 6, num: '05', chapter: 'Studio Sessions', page: 'p. 6' },
      { target: 7, num: '06', chapter: 'Reflection', page: 'p. 7' },
      { target: 8, num: '07', chapter: 'Next Chapter', page: 'p. 8' }
    ],
    spreads: [
      {
        leftClass: 'toc-left',
        rightClass: 'toc-right',
        leftHtml: `
          <div class="nav-label">NAVIGATION</div>
          <div class="nav-box">
            <p><strong>Explore:</strong> Each chapter is a moment from the journal.</p>
            <p>Tap the list to jump to a story.</p>
            <p>These pages are curated for editorial thinking.</p>
          </div>
          <div class="portfolio-label-box">
            <div class="sub-label">STORY</div>
            <div class="portfolio-title">Journal Edition</div>
          </div>
        `,
        rightHtml: `
          <div class="toc-nav-label">NAVIGATION</div>
          <h2 class="toc-heading">Contents</h2>
          <ol class="toc-list">
            ${createTocItems([
              { target: 2, num: '01', chapter: 'Journal Intro', page: 'p. 2' },
              { target: 3, num: '02', chapter: 'Launch Story', page: 'p. 3' },
              { target: 4, num: '03', chapter: 'Editorial Lab', page: 'p. 4' },
              { target: 5, num: '04', chapter: 'Visual Rhythm', page: 'p. 5' },
              { target: 6, num: '05', chapter: 'Studio Sessions', page: 'p. 6' },
              { target: 7, num: '06', chapter: 'Reflection', page: 'p. 7' },
              { target: 8, num: '07', chapter: 'Next Chapter', page: 'p. 8' }
            ])}
          </ol>
        `
      },
      {
        leftClass: 'about-left',
        rightClass: 'about-right',
        leftHtml: `
          <div class="chapter-label">INTRODUCTION</div>
          <h2 class="chapter-title">Inside<br>the Journal</h2>
          <p class="chapter-quote">"A journal of interface experiments, editorial systems, and the ideas that shaped each page."</p>
          <hr class="divider">
        `,
        rightHtml: `
          <div class="photo-placeholder square">Journal cover</div>
          <p class="body-text">This book collects editorial work, interface patterns, and stories from design practice. It is a space for notes, research, and visual direction.</p>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 01</div>
          <h2 class="chapter-title">Launch<br>Story</h2>
          ${createProjectCards([
            { size: 'large', img: 'Launch', title: 'Journal Launch', description: 'Editorial system design' },
            { size: 'large', img: 'Visual', title: 'Visual Narrative', description: 'Portfolio storytelling' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Moodboard', title: 'Moodboard', description: 'Creative direction' },
              { size: 'small', img: 'Guide', title: 'Style Guide', description: 'Typography & tone' },
              { size: 'small', img: 'Study', title: 'Interaction Study', description: 'Microcopy & flows' },
              { size: 'small', img: 'Launch', title: 'Launch Plan', description: 'Go-to-market work' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 02</div>
          <h2 class="chapter-title">Editorial<br>Lab</h2>
          ${createProjectCards([
            { size: 'large', img: 'Studio', title: 'Story Lab', description: 'Research in motion' },
            { size: 'large', img: 'Systems', title: 'Grid Systems', description: 'Layout experiments' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Copy', title: 'Copy Study', description: 'Voice testing' },
              { size: 'small', img: 'Assets', title: 'Visual Assets', description: 'Illustration set' },
              { size: 'small', img: 'Flow', title: 'Flow Map', description: 'Interaction journeys' },
              { size: 'small', img: 'Deck', title: 'Brand Deck', description: 'Story direction' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 03</div>
          <h2 class="chapter-title">Visual<br>Rhythm</h2>
          ${createProjectCards([
            { size: 'large', img: 'Motion', title: 'Motion Study', description: 'Animated system' },
            { size: 'large', img: 'Layout', title: 'Modular Layouts', description: 'Responsive concepts' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Pattern', title: 'Pattern Library', description: 'Repeatable assets' },
              { size: 'small', img: 'Palette', title: 'Color Palette', description: 'Mood & tone' },
              { size: 'small', img: 'Scale', title: 'Type Scale', description: 'Hierarchy' },
              { size: 'small', img: 'Icons', title: 'Icon Set', description: 'Visual language' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 04</div>
          <h2 class="chapter-title">Studio<br>Sessions</h2>
          ${createProjectCards([
            { size: 'large', img: 'Workshop', title: 'Workshop', description: 'Collaborative ideation' },
            { size: 'large', img: 'Review', title: 'Critique', description: 'Design reviews' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Notes', title: 'Studio Notes', description: 'Process journal' },
              { size: 'small', img: 'Timeline', title: 'Timeline', description: 'Milestone mapping' },
              { size: 'small', img: 'Prototypes', title: 'Prototypes', description: 'Interactive concepts' },
              { size: 'small', img: 'Launch', title: 'Launch', description: 'Publishing work' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'prose-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 05</div>
          <h2 class="chapter-title">Reflection</h2>
          <p class="chapter-quote">"This journal is as much about the ideas behind the pages as it is about the final visuals."</p>
          <hr class="divider">
          <p class="hint-text">Insights live on the right →</p>
        `,
        rightHtml: `
          <div class="photo-placeholder wide">Studio notes</div>
          <div class="blockquote-box">
            <p>Each entry in this book captures lessons, experiments, and the creative decisions that shaped the work.</p>
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'prose-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 06</div>
          <h2 class="chapter-title">Next<br>Chapter</h2>
          <p class="chapter-quote">"More stories are on the horizon. This book is a step toward bigger systems and bolder visual ideas."</p>
          <hr class="divider">
        `,
        rightHtml: `
          <div class="photo-placeholder wide">Future work</div>
          <div class="blockquote-box">
            <p>The next volume will explore product systems, editorial frameworks, and the craft of bringing ideas to life.</p>
          </div>
        `
      }
    ]
    ,
    // Minimal customPages for About only (safe, incremental)
    customPages: {
      about: {
        leftHtml: `
          <div class="chapter-label">INTRODUCTION</div>
          <h2 class="chapter-title">About<br>the Author</h2>
          <p class="chapter-quote">"A designer and developer who spent four years crafting digital experiences — from first experiments to polished productions."</p>
          <hr class="divider">
        `,
        rightHtml: `
          <div class="photo-placeholder square" style="padding:0;">
            <img src="imgs/Jason1.jpeg" alt="Jason Bach" style="width:100%;height:100%;object-fit:cover;display:block;">
          </div>
        `
      }
    }
  },
  book3: {
    title: 'Featured Website 2',
    projectName: 'ASYNC Project',
    subtitle: 'Case Study',
    tocItems: [
      { target: 2, num: '01', chapter: 'Studio Intro', page: 'p. 2' },
      { target: 3, num: '02', chapter: 'Collaborations', page: 'p. 3' },
      { target: 4, num: '03', chapter: 'Workflow', page: 'p. 4' },
      { target: 5, num: '04', chapter: 'Launch Cases', page: 'p. 5' },
      { target: 6, num: '05', chapter: 'Retrospective', page: 'p. 6' },
      { target: 7, num: '06', chapter: 'Reflection', page: 'p. 7' },
      { target: 8, num: '07', chapter: 'Forward', page: 'p. 8' }
    ],
    spreads: [
      {
        leftClass: 'toc-left',
        rightClass: 'toc-right',
        leftHtml: `
          <div class="nav-label">NAVIGATION</div>
          <div class="nav-box">
            <p><strong>Discover:</strong> Stories from the studio, one chapter at a time.</p>
            <p>Tap through to see how ideas evolved.</p>
            <p>Each spread highlights a different phase of work.</p>
          </div>
          <div class="portfolio-label-box">
            <div class="sub-label">STUDIO</div>
            <div class="portfolio-title">Stories in Motion</div>
          </div>
        `,
        rightHtml: `
          <div class="toc-nav-label">NAVIGATION</div>
          <h2 class="toc-heading">Contents</h2>
          <ol class="toc-list">
            ${createTocItems([
              { target: 2, num: '01', chapter: 'Studio Intro', page: 'p. 2' },
              { target: 3, num: '02', chapter: 'Collaborations', page: 'p. 3' },
              { target: 4, num: '03', chapter: 'Workflow', page: 'p. 4' },
              { target: 5, num: '04', chapter: 'Launch Cases', page: 'p. 5' },
              { target: 6, num: '05', chapter: 'Retrospective', page: 'p. 6' },
              { target: 7, num: '06', chapter: 'Reflection', page: 'p. 7' },
              { target: 8, num: '07', chapter: 'Forward', page: 'p. 8' }
            ])}
          </ol>
        `
      },
      {
        leftClass: 'about-left',
        rightClass: 'about-right',
        leftHtml: `
          <div class="chapter-label">INTRODUCTION</div>
          <h2 class="chapter-title">Inside<br>the Studio</h2>
          <p class="chapter-quote">"Inside the studio, design is a conversation — between strategy, craft, and the people who shape it."</p>
          <hr class="divider">
        `,
        rightHtml: `
          <div class="photo-placeholder square">Studio view</div>
          <p class="body-text">This book showcases the ways we collaborate, research, and turn early ideas into polished work across multiple projects.</p>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 01</div>
          <h2 class="chapter-title">Studio<br>Intro</h2>
          ${createProjectCards([
            { size: 'large', img: 'Meet', title: 'Meet the Team', description: 'Process portraits' },
            { size: 'large', img: 'Culture', title: 'Studio Culture', description: 'Creative rituals' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Ritual', title: 'Rituals', description: 'Weekly reviews' },
              { size: 'small', img: 'Tools', title: 'Tools', description: 'Workflow systems' },
              { size: 'small', img: 'Space', title: 'Space', description: 'Studio environment' },
              { size: 'small', img: 'Values', title: 'Values', description: 'Design principles' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 02</div>
          <h2 class="chapter-title">Collaborations</h2>
          ${createProjectCards([
            { size: 'large', img: 'Partner', title: 'Partner Work', description: 'Client collaborations' },
            { size: 'large', img: 'Research', title: 'Research Lab', description: 'Discovery sessions' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Workshop', title: 'Workshops', description: 'Co-creation' },
              { size: 'small', img: 'Sprints', title: 'Sprints', description: 'Rapid prototyping' },
              { size: 'small', img: 'Testing', title: 'Testing', description: 'Usability research' },
              { size: 'small', img: 'Feedback', title: 'Feedback', description: 'Iteration cycles' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 03</div>
          <h2 class="chapter-title">Workflow</h2>
          ${createProjectCards([
            { size: 'large', img: 'Map', title: 'Workflow Map', description: 'Process overview' },
            { size: 'large', img: 'Tools', title: 'Toolkit', description: 'Design resources' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Assets', title: 'Assets', description: 'Component library' },
              { size: 'small', img: 'Docs', title: 'Documentation', description: 'Guidelines' },
              { size: 'small', img: 'Review', title: 'Review Cycle', description: 'Checkpoints' },
              { size: 'small', img: 'Launch', title: 'Delivery', description: 'Project handoff' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 04</div>
          <h2 class="chapter-title">Launch<br>Cases</h2>
          ${createProjectCards([
            { size: 'large', img: 'Event', title: 'Launch Case', description: 'Published work' },
            { size: 'large', img: 'Story', title: 'Case Study', description: 'Outcome narrative' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Launch', title: 'Release', description: 'Go-live details' },
              { size: 'small', img: 'Metrics', title: 'Metrics', description: 'Impact results' },
              { size: 'small', img: 'Follow', title: 'Follow-up', description: 'Post-launch' },
              { size: 'small', img: 'Learn', title: 'Learnings', description: 'Key takeaways' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'prose-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 05</div>
          <h2 class="chapter-title">Reflection</h2>
          <p class="chapter-quote">"Looking back at the studio’s process reveals the choices and collaborations that made each project meaningful."</p>
          <hr class="divider">
          <p class="hint-text">Find the key reflections here →</p>
        `,
        rightHtml: `
          <div class="photo-placeholder wide">Studio reflection</div>
          <div class="blockquote-box">
            <p>These pages capture the lessons, observations, and creative decisions that shaped the studio’s work across every chapter.</p>
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'prose-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 06</div>
          <h2 class="chapter-title">Forward</h2>
          <p class="chapter-quote">"The studio keeps growing toward new collaborations, systems, and creative experiments."</p>
          <hr class="divider">
        `,
        rightHtml: `
          <div class="photo-placeholder wide">Future studio</div>
          <div class="blockquote-box">
            <p>The next phase will explore more immersive systems, deeper partnerships, and the evolution of creative process.</p>
          </div>
        `
      }
    ]
  },
  book4: {
    title: 'RPS Project',
    subtitle: 'Case Study',
    tocItems: [
      { target: 2, num: '01', chapter: 'Brand Research', page: 'p. 2' },
      { target: 3, num: '02', chapter: 'Identity Work', page: 'p. 3' },
      { target: 4, num: '03', chapter: 'Implementation', page: 'p. 4' },
      { target: 5, num: '04', chapter: 'Guidelines', page: 'p. 5' },
      { target: 6, num: '05', chapter: 'Systems', page: 'p. 6' },
      { target: 7, num: '06', chapter: 'Reflection', page: 'p. 7' },
      { target: 8, num: '07', chapter: 'Outlook', page: 'p. 8' }
    ],
    spreads: [
      {
        leftClass: 'toc-left',
        rightClass: 'toc-right',
        leftHtml: `
          <div class="nav-label">NAVIGATION</div>
          <div class="nav-box">
            <p><strong>Explore:</strong> A handbook for identity and system thinking.</p>
            <p>Use the index to jump to each brand chapter.</p>
            <p>Every spread shows work from concept to rollout.</p>
          </div>
          <div class="portfolio-label-box">
            <div class="sub-label">COMPENDIUM</div>
            <div class="portfolio-title">Brand Systems</div>
          </div>
        `,
        rightHtml: `
          <div class="toc-nav-label">NAVIGATION</div>
          <h2 class="toc-heading">Contents</h2>
          <ol class="toc-list">
            ${createTocItems([
              { target: 2, num: '01', chapter: 'Brand Research', page: 'p. 2' },
              { target: 3, num: '02', chapter: 'Identity Work', page: 'p. 3' },
              { target: 4, num: '03', chapter: 'Implementation', page: 'p. 4' },
              { target: 5, num: '04', chapter: 'Guidelines', page: 'p. 5' },
              { target: 6, num: '05', chapter: 'Systems', page: 'p. 6' },
              { target: 7, num: '06', chapter: 'Reflection', page: 'p. 7' },
              { target: 8, num: '07', chapter: 'Outlook', page: 'p. 8' }
            ])}
          </ol>
        `
      },
      {
        leftClass: 'about-left',
        rightClass: 'about-right',
        leftHtml: `
          <div class="chapter-label">INTRODUCTION</div>
          <h2 class="chapter-title">Brand<br>Compendium</h2>
          <p class="chapter-quote">"A curated collection of identity work, systems thinking, and the design language that binds them together."</p>
          <hr class="divider">
        `,
        rightHtml: `
          <div class="photo-placeholder square">Identity guide</div>
          <p class="body-text">This book brings together visual identity work, system rules, and the practical thinking behind strong brand design.</p>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 01</div>
          <h2 class="chapter-title">Brand<br>Research</h2>
          ${createProjectCards([
            { size: 'large', img: 'Pulse', title: 'Brand Audit', description: 'Research insights' },
            { size: 'large', img: 'Voice', title: 'Tone Study', description: 'Positioning work' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Audience', title: 'Audience', description: 'Stakeholder profiles' },
              { size: 'small', img: 'Mood', title: 'Moodboard', description: 'Visual direction' },
              { size: 'small', img: 'Persona', title: 'Persona', description: 'Brand archetype' },
              { size: 'small', img: 'Story', title: 'Story', description: 'Brand narrative' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 02</div>
          <h2 class="chapter-title">Identity<br>Work</h2>
          ${createProjectCards([
            { size: 'large', img: 'Brand', title: 'Brand System', description: 'Logo and color' },
            { size: 'large', img: 'Logo', title: 'Logo Suite', description: 'Symbol exploration' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Type', title: 'Typography', description: 'Type system' },
              { size: 'small', img: 'Color', title: 'Color', description: 'Palette rules' },
              { size: 'small', img: 'Pattern', title: 'Pattern', description: 'Texture system' },
              { size: 'small', img: 'Icon', title: 'Icon Set', description: 'Graphic language' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 03</div>
          <h2 class="chapter-title">Implementation</h2>
          ${createProjectCards([
            { size: 'large', img: 'Web', title: 'Web System', description: 'Digital application' },
            { size: 'large', img: 'Motion', title: 'Motion Rules', description: 'Interaction cues' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Print', title: 'Print', description: 'Collateral samples' },
              { size: 'small', img: 'Social', title: 'Social', description: 'Digital assets' },
              { size: 'small', img: 'Signage', title: 'Signage', description: 'Environmental system' },
              { size: 'small', img: 'Toolkit', title: 'Toolbox', description: 'Brand resources' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 04</div>
          <h2 class="chapter-title">Guidelines</h2>
          ${createProjectCards([
            { size: 'large', img: 'Rules', title: 'Guideline Book', description: 'Design principles' },
            { size: 'large', img: 'Usage', title: 'Usage Rules', description: 'Do’s & don’ts' }
          ])}
        `,
        rightHtml: `
          <div class="project-grid">
            ${createProjectCards([
              { size: 'small', img: 'Grid', title: 'Grid Rules', description: 'Layout system' },
              { size: 'small', img: 'Voice', title: 'Voice', description: 'Copy guidance' },
              { size: 'small', img: 'Assets', title: 'Assets', description: 'Downloadable files' },
              { size: 'small', img: 'Examples', title: 'Examples', description: 'Applied cases' }
            ])}
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'prose-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 05</div>
          <h2 class="chapter-title">Reflection</h2>
          <p class="chapter-quote">"Brand systems are strongest when they are both flexible and coherent."</p>
          <hr class="divider">
          <p class="hint-text">The thinking behind the system lives here →</p>
        `,
        rightHtml: `
          <div class="photo-placeholder wide">Brand reflection</div>
          <div class="blockquote-box">
            <p>These pages capture the strategy, constraints, and design decisions that shape a successful brand system.</p>
          </div>
        `
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'prose-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 06</div>
          <h2 class="chapter-title">Outlook</h2>
          <p class="chapter-quote">"Future brand work will expand this system into new channels and more expressive moments."</p>
          <hr class="divider">
        `,
        rightHtml: `
          <div class="photo-placeholder wide">Brand future</div>
          <div class="blockquote-box">
            <p>The next phase will be about bringing the brand into new environments, building stronger systems, and refining consistency across every touchpoint.</p>
          </div>
        `
      }
    ]
  },
  book5: {
    ...createFeaturedBook(4),
    title: 'Street Fighter Project'
  },
  book6: {
    ...createFeaturedBook(5),
    title: 'NJIT Project'
  },
  book7: {
    ...createFeaturedBook(6),
    title: 'Woplinger Project'
  }
};

const app = Vue.createApp({
  data() {
    return {
      viewerOpen: false,
      currentBook: 'book1',
      current: 1,
      books,
      websites: []
    };
  },
  computed: {
    bookList() {
      return Object.entries(this.books).map(([id, book]) => ({ id, title: book.title, subtitle: book.subtitle }));
    },
    topBooks() {
      return this.bookList.slice(0, 3);
    },
    bottomBooks() {
      return this.bookList.slice(3);
    },
    book1Spreads() {
      return this.books.book1.spreads.reduce((spreads, spread, index) => {
        if (index === 2) {
          spreads.push(...createYearGallerySpreads('Sophomore', '02', 'Sophomore Year', this.websites));
        } else if (index === 3) {
          spreads.push(...createYearGallerySpreads('Junior', '03', 'Junior Year', this.websites));
        } else if (index === 4) {
          spreads.push(...createYearGallerySpreads('Senior', '04', 'Senior Year', this.websites));
        } else {
          spreads.push(spread);
        }
        return spreads;
      }, []);
    },
    currentBookData() {
      if (this.currentBook === 'book1') {
        const spreads = this.book1Spreads;
        const cp = (this.books.book1 && this.books.book1.customPages) ? this.books.book1.customPages : null;
        if (cp && cp.about) {
          for (let i = 0; i < spreads.length; i++) {
            const left = (spreads[i].leftHtml || '').toLowerCase();
            const right = (spreads[i].rightHtml || '').toLowerCase();
            if (left.includes('about the author') || left.includes('about me') || left.includes('introduction')) {
              spreads[i].leftHtml = cp.about.leftHtml || spreads[i].leftHtml;
              spreads[i].rightHtml = cp.about.rightHtml || spreads[i].rightHtml;
              break;
            }
          }
        }
        return { ...this.books.book1, spreads };
      }

      const book = this.books[this.currentBook] || this.books.book1;
      const projectName = (book.projectName || book.title).toLowerCase();
      const projectMatch = this.websites.find(site => site.name.toLowerCase() === projectName);
      const projectLine = `
          <p class="body-text"><strong>Project:</strong> ${book.projectName || book.title}</p>
        `;
      const projectDescriptions = {
        'ajax project': 'Built with asynchronous request handling, this project demonstrates dynamic data loading and UI updates through AJAX calls.',
        'async project': 'A hands-on exploration of asynchronous control flow, this site shows how promises and callbacks keep interfaces responsive.',
        'rps project': 'A rock-paper-scissors game project that highlights interactive gameplay logic and responsive user interactions.',
        'street fighter project': 'A game-themed website showcasing character selection, score tracking, and arcade-style user interface design.',
        'njit project': 'A campus-focused showcase combining layout, branding, and student-centered content into a polished web experience.',
        'woplinger project': 'A creative project that emphasizes visual hierarchy, content organization, and engaging styling for a portfolio presentation.'
      };
      const projectDescription = projectDescriptions[projectName] || 'This project highlights core web design and interactivity skills, combining thoughtful layout with practical functionality.';
      const rightContent = createProjectModalHtml(projectMatch);
      const aboutPage = {
        leftHtml: `
          <div class="chapter-label">INTRODUCTION</div>
          <h2 class="chapter-title">About<br>the Project</h2>
          <p class="chapter-quote">"A closer look at the project behind this book and the story it represents."</p>
          <hr class="divider">
          ${projectLine}
          <p class="body-text">${projectDescription}</p>
        `,
        rightHtml: rightContent
      };

      return {
        ...book,
        tocItems: [{ target: 2, num: '01', chapter: 'About the Project', page: 'p. 2' }],
        spreads: [{ leftClass: 'about-left', rightClass: 'about-right project-detail-page', leftHtml: aboutPage.leftHtml, rightHtml: aboutPage.rightHtml }]
      };
    },
    currentSpread() {
      return this.currentBookData.spreads[this.current - 1] || { leftClass: '', rightClass: '', leftHtml: '', rightHtml: '' };
    },
    totalSpreads() {
      return this.currentBookData.spreads.length;
    }
  },
  methods: {
    // (removed getBook1TocTargets - reverting to simpler behaviour)
    openBook(bookId) {
      this.currentBook = bookId;
      this.viewerOpen = true;
      // If opening book1, jump directly to the About spread so content is visible
      if (bookId === 'book1') {
        const spreads = this.book1Spreads;
        let aboutIndex = 1; // fallback
        for (let i = 0; i < spreads.length; i++) {
          const left = (spreads[i].leftHtml || '').toLowerCase();
          const right = (spreads[i].rightHtml || '').toLowerCase();
          if (left.includes('about the author') || left.includes('about me') || left.includes('introduction')) {
            aboutIndex = i + 1;
            break;
          }
        }
        this.current = aboutIndex;
      } else {
        this.current = 1;
      }
    },
    backToCover() {
      this.viewerOpen = false;
    },
    prevSpread() {
      if (this.current > 1) {
        this.current -= 1;
      }
    },
    nextSpread() {
      if (this.current < this.totalSpreads) {
        this.current += 1;
      }
    },
    goTo(index) {
      if (index < 1 || index > this.totalSpreads) return;
      this.current = index;
    },
    // (removed setupTocClickHandlers - reverting to original behaviour)
    loadWebsites() {
      fetch('json.json')
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data.websites)) {
            this.websites = data.websites;
          }
        })
        .catch((error) => {
          console.error('Failed to load json.json', error);
        });
    }
  },
  mounted() {
    this.loadWebsites();
  }
});

app.mount('#app');
