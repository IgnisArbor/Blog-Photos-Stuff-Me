document.addEventListener('DOMContentLoaded', () => {
    const treeData = {
        name: "Life",
        children: [
            {
                name: "Bacteria",
                url: "bacteria.html"
            },
            {
                name: "Archae",
                url: "archae.html"
            },
            {
                name: "Eukaryote",
                children: [
                    {
                        name: "Animalia",
                        children: [
                            { name: "Reptilia", url: "reptilia.html" },
                            { name: "Insecta", url: "insecta.html" },
                            { name: "Arachnida", url: "arachnida.html" },
                            { name: "Mammalia", url: "mammalia.html" },
                            { name: "Aves", url: "aves.html" },
                            { name: "Amphibia", url: "amphibia.html" },
                            { name: "Fish", url: "fish.html" },
                            { name: "Mollusca", url: "mollusca.html" },
                            { name: "Misc", url: "misc.html" }
                        ]
                    },
                    { name: "Fungi", url: "fungi.html" },
                    { name: "Viridiplantae", url: "viridiplantae.html" }
                ]
            }
        ]
    };

    const margin = { top: 20, right: 90, bottom: 30, left: 90 },
          width = 960 - margin.left - margin.right,
          height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#tree-container").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const root = d3.hierarchy(treeData, d => d.children);
    root.x0 = height / 2;
    root.y0 = 0;

    const treeLayout = d3.tree().size([height, width]);

    function update(source) {
        const treeData = treeLayout(root);
        const nodes = treeData.descendants(),
              links = treeData.descendants().slice(1);

        nodes.forEach(d => { d.y = d.depth * 180; });

        const node = svg.selectAll('g.node')
            .data(nodes, d => d.id || (d.id = ++i));

        const nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", d => `translate(${source.y0},${source.x0})`)
            .on('click', click);

        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", d => d._children ? "lightsteelblue" : "#fff");

        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", d => d.children || d._children ? -13 : 13)
            .attr("text-anchor", d => d.children || d._children ? "end" : "start")
            .text(d => d.data.name);

        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
            .duration(200)
            .attr("transform", d => `translate(${d.y},${d.x})`);

        nodeUpdate.select('circle.node')
            .attr('r', 10)
            .style("fill", d => d._children ? "lightsteelblue" : "#fff")
            .attr('cursor', 'pointer');

        const nodeExit = node.exit().transition()
            .duration(200)
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .remove();

        nodeExit.select('circle')
            .attr('r', 1e-6);

        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        const link = svg.selectAll('path.link')
            .data(links, d => d.id);

        const linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', d => {
                const o = { x: source.x0, y: source.y0 };
                return diagonal(o, o);
            });

        const linkUpdate = linkEnter.merge(link);

        linkUpdate.transition()
            .duration(200)
            .attr('d', d => diagonal(d, d.parent));

        const linkExit = link.exit().transition()
            .duration(200)
            .attr('d', d => {
                const o = { x: source.x, y: source.y };
                return diagonal(o, o);
            })
            .remove();

        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        function diagonal(s, d) {
            return `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                      ${(s.y + d.y) / 2} ${d.x},
                      ${d.y} ${d.x}`;
        }

        function click(event, d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
                if (d.data.url) {
                    window.location.href = d.data.url;
                }
            }
            update(d);
        }
    }

    update(root);
});
