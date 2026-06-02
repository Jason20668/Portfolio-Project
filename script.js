let totalSpreads = 8;
let current = 1;
let currentBook = 'book1';

function createTagHtml(tags) {
  return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

function createTocItems(items) {
  return items.map(item => `
      <li data-target="${item.target}" onclick="window.vueApp.goTo(${item.target})">
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

const projectDescriptions = {
  'bangkok project': 'A travel-inspired website dedicated to the vibrant city of Bangkok, Thailand. This project showcases rich cultural imagery, local attractions, and destination highlights through carefully crafted layouts and typography — capturing the energy and spirit of one of Southeast Asia\'s most dynamic cities.',
  'oda tribute project': 'A heartfelt tribute website dedicated to Eiichiro Oda, the legendary manga artist behind One Piece. This project blends fan passion with web design craft, featuring a curated look at Oda\'s career, his creative legacy, and the characters and stories that have captivated millions of readers worldwide.',
  'rps project': 'A rock-paper-scissors game built with interactive JavaScript, featuring animated gameplay, score tracking, and a clean arcade-inspired interface. This project demonstrates mastery of event handling, conditional logic, and creating engaging user experiences through thoughtful UI design.',
  'street fighter project': 'A game-themed website inspired by the Street Fighter franchise, showcasing character selection, head-to-head stats, and dynamic visual storytelling. This project highlights skills in layout design, responsive styling, and building immersive fan-driven web experiences. I learned the hard way there were way too many street fighting characters for this and regretted having to do all of them',
  'njit project': 'A polished campus-focused web experience built around NJIT\'s identity and student life. Combining professional branding with approachable content, this project demonstrates the ability to balance institutional design standards with creative web presentation.',
  'woplinger project': 'This project was made for my client Mr. Oplinger and the Lacrosse Team. It was our first time ever working with an actual client. I learned how to link a google sheet to update and display information on this website to make it acessible for a client. Rather easy and fun except that he still has not emailed me the pictures I needed for this website!'
};

const books = {
  book1: {
    title: 'My Portfolio',
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
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: '<p>Placeholder - replaced by dynamic content</p>',
        rightHtml: '<p>Placeholder - replaced by dynamic content</p>'
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: '<p>Placeholder - replaced by dynamic content</p>',
        rightHtml: '<p>Placeholder - replaced by dynamic content</p>'
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'chapter-right',
        leftHtml: '<p>Placeholder - replaced by dynamic content</p>',
        rightHtml: '<p>Placeholder - replaced by dynamic content</p>'
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'prose-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 05</div>
          <h2 class="chapter-title">Reflection</h2>
          <hr class="divider">
          <p class="body-text">I have truly enjoyed my time in the Web Design Pathway Program. Learning how to code has been an incredible journey that has challenged me to think creatively and problem-solve in new ways. The skills I've developed and the projects I've built have given me confidence in my abilities as a developer.</p>
        `,
        rightHtml: ``
      },
      {
        leftClass: 'chapter-left',
        rightClass: 'about-right',
        leftHtml: `
          <div class="chapter-label">CHAPTER 06</div>
          <h2 class="chapter-title">Future<br>Plans</h2>
          <hr class="divider">
          <p class="body-text">I am excited to pursue my passion for technology and security by attending Rochester Institute of Technology, where I plan to study Cybersecurity. This next chapter will allow me to deepen my technical knowledge and contribute to making the digital world safer.</p>
        `,
        rightHtml: `
          <div class="photo-placeholder square" style="padding:0;">
            <img src="imgs/Jason2.jpeg" alt="Jason Bach" style="width:100%;height:100%;object-fit:cover;display:block;">
          </div>
        `
      }
    ],
    customPages: {
      about: {
        leftHtml: `
          <div class="chapter-label">INTRODUCTION</div>
          <h2 class="chapter-title">About<br>the Author</h2>
          <hr class="divider">
          <p class="body-text">My name is Jason and I am in Marlboro High Schools Web Design Pathway Program. I enjoy coding, videogames, comics, and a whole lot more nerd stuff. Enjoy checking out my portfolio over my 3 years in the program!</p>
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
    title: 'Bangkok Project',
    projectName: 'Bangkok Project',
    subtitle: 'Case Study',
    spreads: []
  },
  book3: {
    title: 'Oda Tribute Project',
    projectName: 'Oda Tribute Project',
    subtitle: 'Case Study',
    spreads: []
  },
  book4: {
    title: 'RPS Project',
    projectName: 'RPS Project',
    subtitle: 'Case Study',
    spreads: []
  },
  book5: {
    title: 'SF Project',
    projectName: 'Street Fighter Project',
    subtitle: 'Case Study',
    spreads: []
  },
  book6: {
    title: 'NJIT Project',
    projectName: 'NJIT Project',
    subtitle: 'Case Study',
    spreads: []
  },
  book7: {
    title: 'Woplinger Project',
    projectName: 'Woplinger Project',
    subtitle: 'Case Study',
    spreads: []
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
    dynamicTocItems() {
      const spreads = this.book1Spreads;
      const items = [];
      
      // About Me is always at spread index 1 (display as page 2)
      items.push({ target: 2, num: '01', chapter: 'About Me', page: 'p. 2' });
      
      let sophomoreAdded = false;
      let juniorAdded = false;
      let seniorAdded = false;
      
      // Find Sophomore, Junior, Senior, Reflection, and Future Plans
      for (let i = 2; i < spreads.length; i++) {
        const leftHtml = (spreads[i].leftHtml || '').toLowerCase();
        
        if (!sophomoreAdded && leftHtml.includes('sophomore')) {
          items.push({ target: i + 1, num: '02', chapter: 'Sophomore Year', page: `p. ${i + 1}` });
          sophomoreAdded = true;
        } else if (!juniorAdded && leftHtml.includes('junior')) {
          items.push({ target: i + 1, num: '03', chapter: 'Junior Year', page: `p. ${i + 1}` });
          juniorAdded = true;
        } else if (!seniorAdded && leftHtml.includes('senior')) {
          items.push({ target: i + 1, num: '04', chapter: 'Senior Year', page: `p. ${i + 1}` });
          seniorAdded = true;
        } else if (leftHtml.includes('reflection')) {
          items.push({ target: i + 1, num: '05', chapter: 'Reflection', page: `p. ${i + 1}` });
        } else if (leftHtml.includes('future')) {
          items.push({ target: i + 1, num: '06', chapter: 'Future Plans', page: `p. ${i + 1}` });
        }
      }
      
      return items;
    },
    currentBookData() {
      if (this.currentBook === 'book1') {
        const spreads = this.book1Spreads;
        const cp = (this.books.book1 && this.books.book1.customPages) ? this.books.book1.customPages : null;
        
        // Update About page if customPages exist
        if (cp && cp.about) {
          for (let i = 0; i < spreads.length; i++) {
            const left = (spreads[i].leftHtml || '').toLowerCase();
            if (left.includes('about the author') || left.includes('about me') || left.includes('introduction')) {
              spreads[i].leftHtml = cp.about.leftHtml || spreads[i].leftHtml;
              spreads[i].rightHtml = cp.about.rightHtml || spreads[i].rightHtml;
              break;
            }
          }
        }
        
        // Update Contents page with correct TOC items
        if (spreads[0] && spreads[0].rightHtml && spreads[0].rightHtml.includes('toc-list')) {
          spreads[0].rightHtml = `
            <div class="toc-nav-label">NAVIGATION</div>
            <h2 class="toc-heading">Contents</h2>
            <ol class="toc-list">
              ${createTocItems(this.dynamicTocItems)}
            </ol>
          `;
        }
        
        return { ...this.books.book1, spreads };
      }

      const book = this.books[this.currentBook] || this.books.book1;
      const projectName = (book.projectName || book.title).toLowerCase();
      const projectMatch = this.websites.find(site => site.name.toLowerCase() === projectName);
      const projectDescription = projectDescriptions[projectName] || 'This project highlights core web design and interactivity skills, combining thoughtful layout with practical functionality.';
      const projectDisplayName = (book.projectName || book.title);

      const imageHtml = projectMatch
        ? `<img src="${projectMatch.image}" alt="${projectMatch.name}" style="width:100%;height:100%;object-fit:contain;display:block;">`
        : `<span style="color:#a09080;font-size:clamp(12px,1vw,15px);">${projectDisplayName}</span>`;

      const websiteButton = projectMatch
        ? `<a class="project-button" href="${projectMatch.link}" target="_blank" rel="noopener noreferrer">Go to Website!</a>`
        : '';

      const leftHtml = `
        <div class="chapter-label">FEATURED PROJECT</div>
        <h2 class="chapter-title">${projectDisplayName}</h2>
        <hr class="divider">
        <p class="body-text">${projectDescription}</p>
      `;

      const rightHtml = `
        <div class="featured-detail-wrapper">
          <div class="featured-preview-card">
            <div class="featured-preview-img">
              ${imageHtml}
            </div>
            <div class="featured-preview-footer">
              <strong>${projectDisplayName}</strong>
              ${websiteButton}
            </div>
          </div>
        </div>
      `;

      return {
        ...book,
        spreads: [{
          leftClass: 'about-left',
          rightClass: 'about-right featured-right-page',
          leftHtml,
          rightHtml
        }]
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
    openBook(bookId) {
      this.currentBook = bookId;
      this.viewerOpen = true;
      if (bookId === 'book1') {
        const spreads = this.book1Spreads;
        let tocIndex = 1;
        for (let i = 0; i < spreads.length; i++) {
          const right = (spreads[i].rightHtml || '').toLowerCase();
          if (right.includes('contents')) {
            tocIndex = i + 1;
            break;
          }
        }
        this.current = tocIndex;
      } else {
        this.current = 1;
      }
    },
    backToCover() {
      this.viewerOpen = false;
    },
    prevSpread() {
      if (this.current > 1) this.current -= 1;
    },
    nextSpread() {
      if (this.current < this.totalSpreads) this.current += 1;
    },
    goTo(index) {
      if (index < 1 || index > this.totalSpreads) return;
      this.current = index;
    },
    loadWebsites() {
      fetch('json.json')
        .then(r => r.json())
        .then(data => {
          if (data && Array.isArray(data.websites)) this.websites = data.websites;
        })
        .catch(err => console.error('Failed to load json.json', err));
    }
  },
  mounted() {
    this.loadWebsites();
    window.vueApp = this;
  }
});

app.mount('#app');