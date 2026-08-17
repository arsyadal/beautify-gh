const availableSkills = [
  { id: 'rust', label: 'Rust' },
  { id: 'ts', label: 'TypeScript' },
  { id: 'js', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'go', label: 'Go' },
  { id: 'c', label: 'C' },
  { id: 'cpp', label: 'C++' },
  { id: 'react', label: 'React' },
  { id: 'nextjs', label: 'Next.js' },
  { id: 'tailwind', label: 'Tailwind CSS' },
  { id: 'nodejs', label: 'Node.js' },
  { id: 'fastapi', label: 'FastAPI' },
  { id: 'postgres', label: 'PostgreSQL' },
  { id: 'sqlite', label: 'SQLite' },
  { id: 'redis', label: 'Redis' },
  { id: 'docker', label: 'Docker' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'githubactions', label: 'GitHub Actions' },
  { id: 'git', label: 'Git' },
  { id: 'linux', label: 'Linux' }
];

const gifPresets = [
  { id: 'lofi', label: 'Lofi Coding', url: 'https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif' },
  { id: 'terminal', label: 'Pixel Terminal', url: 'https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif' },
  { id: 'octocat', label: 'Octocat Typing', url: 'https://media.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif' },
  { id: 'synthwave', label: 'Synthwave Dev', url: 'https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif' },
  { id: 'matrix', label: 'Cyber Matrix', url: 'https://media.giphy.com/media/ule4vhcY1xEKQ/giphy.gif' }
];

let selectedSkills = ['rust', 'ts', 'react', 'nextjs', 'postgres', 'docker', 'linux'];
let activeGifUrl = gifPresets[0].url;

function init() {
  // Populate skills
  const skillsContainer = document.getElementById('skills-selector');
  skillsContainer.innerHTML = '';
  availableSkills.forEach(skill => {
    const chip = document.createElement('div');
    chip.className = `skill-chip ${selectedSkills.includes(skill.id) ? 'active' : ''}`;
    chip.innerText = skill.label;
    chip.onclick = () => {
      if (selectedSkills.includes(skill.id)) {
        selectedSkills = selectedSkills.filter(s => s !== skill.id);
      } else {
        selectedSkills.push(skill.id);
      }
      chip.classList.toggle('active');
      renderMarkdown();
    };
    skillsContainer.appendChild(chip);
  });

  // Populate GIF Presets
  const gifContainer = document.getElementById('gif-presets');
  gifContainer.innerHTML = '';
  gifPresets.forEach(preset => {
    const card = document.createElement('div');
    card.className = `gif-preset-card ${activeGifUrl === preset.url ? 'active' : ''}`;
    card.innerHTML = `
      <img src="${preset.url}" alt="${preset.label}" loading="lazy" />
      <span class="gif-preset-label">${preset.label}</span>
    `;
    card.onclick = () => {
      document.querySelectorAll('.gif-preset-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      activeGifUrl = preset.url;
      document.getElementById('input-custom-gif').value = '';
      renderMarkdown();
    };
    gifContainer.appendChild(card);
  });

  // Custom GIF input listener
  document.getElementById('input-custom-gif').addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val) {
      document.querySelectorAll('.gif-preset-card').forEach(c => c.classList.remove('active'));
      activeGifUrl = val;
    } else {
      activeGifUrl = gifPresets[0].url;
      document.querySelector('.gif-preset-card')?.classList.add('active');
    }
    renderMarkdown();
  });

  // Attach input listeners
  ['input-username', 'input-name', 'input-headline', 'input-website'].forEach(id => {
    document.getElementById(id).addEventListener('input', renderMarkdown);
  });

  // Attach checkbox listeners
  ['toggle-banner', 'toggle-gif', 'toggle-stats', 'toggle-snake', 'toggle-projects', 'toggle-blog'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
      const gifGroup = document.getElementById('gif-config-group');
      if (id === 'toggle-gif') {
        gifGroup.style.display = document.getElementById('toggle-gif').checked ? 'block' : 'none';
      }
      renderMarkdown();
    });
  });

  // Copy button
  document.getElementById('btn-copy').addEventListener('click', () => {
    const code = document.getElementById('output-markdown').innerText;
    navigator.clipboard.writeText(code).then(() => {
      const copyText = document.getElementById('copy-text');
      copyText.innerText = '✅ Copied to Clipboard!';
      setTimeout(() => {
        copyText.innerText = '📋 Copy Markdown';
      }, 2000);
    });
  });

  renderMarkdown();
}

function renderMarkdown() {
  const username = document.getElementById('input-username').value.trim() || 'username';
  const name = document.getElementById('input-name').value.trim() || 'Your Name';
  const headline = document.getElementById('input-headline').value.trim() || 'Software Engineer';
  const website = document.getElementById('input-website').value.trim() || 'https://example.com';

  const showBanner = document.getElementById('toggle-banner').checked;
  const showGif = document.getElementById('toggle-gif').checked;
  const showStats = document.getElementById('toggle-stats').checked;
  const showSnake = document.getElementById('toggle-snake').checked;
  const showProjects = document.getElementById('toggle-projects').checked;
  const showBlog = document.getElementById('toggle-blog').checked;

  let md = '';

  if (showBanner) {
    const bannerText = encodeURIComponent(`Hi, I'm ${name} 👋`);
    const bannerDesc = encodeURIComponent(`${headline}`);
    md += `<div align="center">\n`;
    md += `  <picture>\n`;
    md += `    <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,5&height=190&section=header&text=${bannerText}&fontSize=38&fontAlignY=38&desc=${bannerDesc}&descAlignY=58&descAlign=50&theme=dark" />\n`;
    md += `    <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=24,28,30&height=190&section=header&text=${bannerText}&fontSize=38&fontAlignY=38&desc=${bannerDesc}&descAlignY=58&descAlign=50&theme=light" />\n`;
    md += `    <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=190&section=header&text=${bannerText}&fontSize=38" alt="Header Banner" width="100%" />\n`;
    md += `  </picture>\n\n`;
    md += `  <p align="center">\n`;
    md += `    <a href="${website}"><img src="https://img.shields.io/badge/Website-2563EB?style=flat-square&logo=safari&logoColor=white" alt="Website" /></a>\n`;
    md += `    <a href="https://linkedin.com/in/${username}"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n`;
    md += `    <a href="mailto:contact@${username}.com"><img src="https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>\n`;
    md += `  </p>\n`;
    md += `</div>\n\n---\n\n`;
  }

  if (showGif && activeGifUrl) {
    md += `<div align="center">\n`;
    md += `  <img src="${activeGifUrl}" alt="Coding Animation" width="380" style="border-radius: 8px;" />\n`;
    md += `</div>\n\n---\n\n`;
  }

  md += `### 👨‍💻 About Me\n\n`;
  md += `- 🔭 **Focus:** ${headline}\n`;
  md += `- 🌱 **Continuous Learning:** Exploring scalable distributed architectures & modern tooling\n`;
  md += `- 🌐 **Portfolio & Website:** [${website}](${website})\n\n---\n\n`;

  if (selectedSkills.length > 0) {
    const skillList = selectedSkills.join(',');
    md += `### 🛠️ Tech Stack & Toolkit\n\n`;
    md += `<p align="left">\n`;
    md += `  <img src="https://skillicons.dev/icons?i=${skillList}" alt="Tech Stack" />\n`;
    md += `</p>\n\n---\n\n`;
  }

  if (showProjects) {
    md += `### 🚀 Featured Projects\n\n`;
    md += `| Project | Description | Tech Stack | Links |\n`;
    md += `| :--- | :--- | :--- | :---: |\n`;
    md += `| **⚡ Project Alpha** | High-performance core service engine. | \`Rust\` \`PostgreSQL\` | [Repo](https://github.com/${username}) |\n`;
    md += `| **🛡️ Dev Engine** | Modern automated workflow utility. | \`TypeScript\` \`Docker\` | [Repo](https://github.com/${username}) |\n\n---\n\n`;
  }

  if (showStats) {
    md += `### 📊 GitHub Analytics\n\n`;
    md += `<div align="center">\n`;
    md += `  <picture>\n`;
    md += `    <source media="(prefers-color-scheme: dark)" srcset="https://streak-stats.demolab.com/?user=${username}&theme=tokyonight&hide_border=true" />\n`;
    md += `    <source media="(prefers-color-scheme: light)" srcset="https://streak-stats.demolab.com/?user=${username}&theme=default&hide_border=true" />\n`;
    md += `    <img src="https://streak-stats.demolab.com/?user=${username}&hide_border=true" alt="Streak Stats" />\n`;
    md += `  </picture>\n`;
    md += `  <br/><br/>\n`;
    md += `  <picture>\n`;
    md += `    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats-eight-theta.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&hide_border=true&count_private=true" />\n`;
    md += `    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats-eight-theta.vercel.app/api?username=${username}&show_icons=true&theme=default&hide_border=true&count_private=true" />\n`;
    md += `    <img src="https://github-readme-stats-eight-theta.vercel.app/api?username=${username}&show_icons=true&hide_border=true" alt="GitHub Stats" />\n`;
    md += `  </picture>\n`;
    md += `  <picture>\n`;
    md += `    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight&hide_border=true" />\n`;
    md += `    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=default&hide_border=true" />\n`;
    md += `    <img src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=${username}&layout=compact&hide_border=true" alt="Top Languages" />\n`;
    md += `  </picture>\n`;
    md += `</div>\n\n---\n\n`;
  }

  if (showSnake) {
    md += `### 🐍 Contribution Graph\n\n`;
    md += `<div align="center">\n`;
    md += `  <picture>\n`;
    md += `    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/github-snake-dark.svg" />\n`;
    md += `    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/github-snake.svg" />\n`;
    md += `    <img alt="Snake Game" src="https://raw.githubusercontent.com/${username}/${username}/output/github-snake.svg" width="100%" />\n`;
    md += `  </picture>\n`;
    md += `</div>\n\n`;
  }

  if (showBlog) {
    md += `---\n\n### ✍️ Recent Blog Posts\n`;
    md += `<!-- BLOG-POST-LIST:START -->\n`;
    md += `<!-- Automatically populated via GitHub Actions -->\n`;
    md += `<!-- BLOG-POST-LIST:END -->\n\n`;
  }

  md += `<div align="center">\n`;
  md += `  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%" alt="Footer" />\n`;
  md += `</div>\n`;

  document.getElementById('output-markdown').innerText = md;
}

document.addEventListener('DOMContentLoaded', init);
