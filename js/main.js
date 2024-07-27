document.addEventListener('DOMContentLoaded', () => {
    fetch('data/content.json')
        .then(response => response.json())
        .then(data => {
            // Hero Section
            document.getElementById('hero-title').textContent = data.hero.title;
            document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
            document.getElementById('hero').style.backgroundImage = `url(${data.hero.background_image})`;

            // Content Sections
            const contentSections = document.getElementById('content-sections');
            data.sections.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.classList.add('section');

                const img = document.createElement('img');
                img.src = section.image.src;
                img.alt = section.image.alt;

                const contentDiv = document.createElement('div');
                contentDiv.classList.add('section-content');

                const p = document.createElement('p');
                p.textContent = section.content.text;

                const a = document.createElement('a');
                a.href = section.content.link.href;
                a.textContent = section.content.link.text;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';

                contentDiv.appendChild(p);
                contentDiv.appendChild(a);

                sectionDiv.appendChild(img);
                sectionDiv.appendChild(contentDiv);

                contentSections.appendChild(sectionDiv);
            });

            // Second Sections
            const secondSections = document.getElementById('second-sections');
            data.second_sections.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.classList.add('section');

                const img = document.createElement('img');
                img.src = section.image.src;
                img.alt = section.image.alt;

                const contentDiv = document.createElement('div');
                contentDiv.classList.add('section-content');

                const p = document.createElement('p');
                p.textContent = section.content.text;

                const a = document.createElement('a');
                a.href = section.content.link.href;
                a.textContent = section.content.link.text;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';

                contentDiv.appendChild(p);
                contentDiv.appendChild(a);

                sectionDiv.appendChild(img);
                sectionDiv.appendChild(contentDiv);

                secondSections.appendChild(sectionDiv);
            });

            // Posts Pagination
            let currentPage = 0;

            function loadMorePosts() {
                const postsContainer = document.querySelector('.post-container');
                const postsPerPage = 4; // Número de posts a cargar por página

                for (let i = 0; i < postsPerPage; i++) {
                    if (currentPage < data.posts.length) {
                        const post = data.posts[currentPage];
                        const postElement = document.createElement('div');
                        postElement.className = 'post';
                        postElement.innerHTML = `
                            <h3>${post.title}</h3>
                            <p>${post.content}</p>
                            <a href="post-details.html?post=${currentPage}" class="post-button">Details</a>
                        `;
                        postsContainer.appendChild(postElement);
                        currentPage++;
                    }
                }

                if (currentPage >= data.posts.length) {
                    document.getElementById('load-more').style.display = 'none';
                }
            }

            document.getElementById('load-more').addEventListener('click', loadMorePosts);

            // Initial load
            loadMorePosts();
        })
        .catch(error => console.error('Error loading content:', error));
});
