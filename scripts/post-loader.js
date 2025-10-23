// post-loader.js
// Loads a post by slug (from ?slug=...) and renders its markdown.
// This file was extracted from inline script in post.html to avoid CSP blocking inline scripts.

// Obtener slug del URL
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug');

if (!slug) {
    window.location.href = 'blog.html';
}

// Usar la configuración centralizada cargada desde scripts/posts-config.js
const postData = (window.postsConfig || []).find(p => p.slug === slug);

function showUnavailable() {
    const articleTitle = document.getElementById('article-title');
    const articleDescription = document.getElementById('article-description');
    const postDate = document.getElementById('post-date');
    const postReading = document.getElementById('post-reading-time');
    const postContent = document.getElementById('post-content');

    if (articleTitle) articleTitle.textContent = 'Publicación no disponible';
    if (articleDescription) articleDescription.textContent = '';
    if (postDate) postDate.textContent = '';
    if (postReading) postReading.textContent = '';
    if (postContent) postContent.innerHTML = '';

    const docTitle = document.getElementById('post-title');
    const docDesc = document.getElementById('post-description');
    if (docTitle) docTitle.textContent = 'Publicación no disponible | David González Consulting';
    if (docDesc) docDesc.setAttribute('content', '');
}

// Always attempt to load the markdown file for the requested slug.
// If the file exists and has content, render it. Use `postsConfig` metadata
// only when available. If fetch fails or content is empty, showUnavailable().
loadPost(postData);

async function loadPost(postData) {
    try {
        const mdUrl = new URL(`posts/${slug}.md`, window.location.href).toString();
        // lightweight console hint for debugging
        console.log('Loading post:', slug, mdUrl);
        const response = await fetch(mdUrl);
        if (!response.ok) {
            showUnavailable();
            return;
        }
        const markdown = await response.text();
        if (!markdown || !markdown.trim()) {
            showUnavailable();
            return;
        }

        let html;
        if (typeof marked !== 'undefined' && marked.parse) {
            html = marked.parse(markdown);
        } else {
            html = renderMarkdownFallback(markdown);
        }

        const wordsPerMinute = 200;
        const words = markdown.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);

        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        if (postData && postData.date) {
            try {
                const formattedDate = new Date(postData.date).toLocaleDateString('es-ES', options);
                document.getElementById('post-date').textContent = formattedDate;
            } catch (e) {
                document.getElementById('post-date').textContent = '';
            }
        } else {
            document.getElementById('post-date').textContent = '';
        }

        document.getElementById('post-reading-time').textContent = `${minutes} min de lectura`;

        if (postData && postData.title) {
            document.getElementById('post-title').textContent = postData.title + ' | David Gonz\u00e1lez Consulting';
            document.getElementById('article-title').textContent = postData.title;
        } else {
            const fallbackTitle = slug.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            document.getElementById('post-title').textContent = fallbackTitle + ' | David Gonz\u00e1lez Consulting';
            document.getElementById('article-title').textContent = fallbackTitle;
        }

        if (postData && postData.description) {
            document.getElementById('post-description').setAttribute('content', postData.description);
            document.getElementById('article-description').textContent = postData.description;
        } else {
            document.getElementById('post-description').setAttribute('content', '');
            document.getElementById('article-description').textContent = '';
        }

        document.getElementById('post-content').innerHTML = html;

    } catch (error) {
        showUnavailable();
    }
}

function renderMarkdownFallback(md) {
    const escapeHtml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const lines = md.replace(/\r\n/g, '\n').split('\n');
    let out = [];
    let inCode = false;
    let inList = false;

    for (let raw of lines) {
        let line = raw;
        if (line.startsWith('```')) {
            inCode = !inCode;
            if (inCode) { out.push('<pre><code>'); } else { out.push('</code></pre>'); }
            continue;
        }
        if (inCode) {
            out.push(escapeHtml(line) + '\n');
            continue;
        }

        const h = line.match(/^\s*(#{1,6})\s+(.*)/);
        if (h) {
            const level = h[1].length;
            out.push(`<h${level}>${escapeHtml(h[2])}</h${level}>`);
            continue;
        }

        if (/^\s*[-*+]\s+/.test(line)) {
            if (!inList) { inList = true; out.push('<ul>'); }
            const item = line.replace(/^\s*[-*+]\s+/, '');
            out.push('<li>' + escapeHtml(item) + '</li>');
            continue;
        } else if (inList) {
            inList = false; out.push('</ul>');
        }

        if (line.trim() === '') {
            out.push('<p></p>');
            continue;
        }

        let processed = escapeHtml(line)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>');

        out.push('<p>' + processed + '</p>');
    }

    if (inList) out.push('</ul>');
    return out.join('\n');
}
