const leftNodes = document.querySelectorAll('.skills-col.left .skill-node');
const rightNodes = document.querySelectorAll('.skills-col.right .skill-node');
const svg = document.getElementById('connections-svg');

// Define connections: id -> [ids]
const connections = {
    'dl': ['tf', 'pt', 'hf', 'cloud'],
    'cv': ['tf', 'pt', 'sk'],
    'nlp': ['pt', 'hf'],
    'recsys': ['sk', 'cloud', 'pt']
};

function drawConnections() {
    svg.innerHTML = ''; // Clear previous lines
    const svgRect = svg.getBoundingClientRect();

    leftNodes.forEach(left => {
        const leftId = left.getAttribute('data-id');
        const targets = connections[leftId] || [];

        const leftRect = left.getBoundingClientRect();
        // Start point: Right center of left node
        const x1 = leftRect.right - svgRect.left;
        const y1 = leftRect.top + leftRect.height / 2 - svgRect.top;

        targets.forEach(targetId => {
            const target = document.querySelector(`.skill-node[data-id="${targetId}"]`);
            if (target) {
                const targetRect = target.getBoundingClientRect();
                // End point: Left center of right node
                const x2 = targetRect.left - svgRect.left;
                const y2 = targetRect.top + targetRect.height / 2 - svgRect.top;

                // Bezier curve control points
                const controlOffset = (x2 - x1) * 0.5;
                const cx1 = x1 + controlOffset;
                const cy1 = y1;
                const cx2 = x2 - controlOffset;
                const cy2 = y2;

                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

                path.setAttribute('d', d);
                path.setAttribute('class', 'connection-line');
                path.setAttribute('data-from', leftId);
                path.setAttribute('data-to', targetId);
                svg.appendChild(path);
            }
        });
    });
}

// Initial draw
window.addEventListener('load', drawConnections);
window.addEventListener('resize', drawConnections);

// Hover Effects
leftNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
        const id = node.getAttribute('data-id');
        node.classList.add('active');

        // Highlight connections
        document.querySelectorAll(`.connection-line[data-from="${id}"]`).forEach(line => {
            line.classList.add('active');
            // Highlight target nodes
            const targetId = line.getAttribute('data-to');
            document.querySelector(`.skill-node[data-id="${targetId}"]`).classList.add('active');
        });
    });

    node.addEventListener('mouseleave', () => {
        // Reset all
        document.querySelectorAll('.skill-node').forEach(n => n.classList.remove('active'));
        document.querySelectorAll('.connection-line').forEach(l => l.classList.remove('active'));
    });
});
