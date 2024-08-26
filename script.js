let n = 0; 
let m = 0; 
let w = 0; 
let projects = []; 
let countries = []; 
let idChart = null; 
let scoreChart = null; 
let maleScoreChart = null; 
let femaleScoreChart = null; 

function initialize() {
    n = parseInt(document.getElementById('num-countries').value) || 0;
    m = parseInt(document.getElementById('num-male-events').value) || 0;
    w = parseInt(document.getElementById('num-female-events').value) || 0;

    if (n <= 0 || m <= 0 || w < 0) {
        alert('请填写有效的国家数量和项目数量。');
        return;
    }

    projects = Array.from({ length: m + w }, (_, i) => ({
        id: i + 1,
        isTop5: Math.random() > 0.5, 
        results: [] 
    }));

    countries = Array.from({ length: n }, (_, i) => ({
        id: i + 1,
        score: 0, 
        maleScore: 0, 
        femaleScore: 0, 
    }));

    document.getElementById('setup-form').style.display = 'none';
    document.getElementById('input-form').style.display = 'block';
    document.getElementById('query-form').style.display = 'block';
}

function addResults(projectId, results, isTop5) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    project.isTop5 = isTop5;
    project.results = results;
    const points = isTop5 ? [7, 5, 3, 2, 1] : [5, 3, 2];

    results.forEach((countryId, index) => {
        const country = countries.find(c => c.id === countryId);
        if (country) {
            const score = points[index] || 0;
            country.score += score;
            if (projectId <= m) {
                country.maleScore += score;
            } else {
                country.femaleScore += score;
            }
        }
    });
}

function submitResults() {
    const projectId = parseInt(document.getElementById('project-id').value);
    const resultType = document.getElementById('result-type').value;
    const results = document.getElementById('results').value.split(',').map(Number);

    const isTop5 = resultType === 'top5';
    addResults(projectId, results, isTop5);
    visualizeTotal(); 
    alert(`项目${projectId}的结果已提交！`);
}

function sortCountries(by) {
    if (by === 'id') {
        return [...countries].sort((a, b) => a.id - b.id || b[by] - a[by]);
    } else {
        return [...countries].sort((a, b) => b[by] - a[by] || a.id - b.id);
    }
}

function queryCountry() {
    const countryId = parseInt(document.getElementById('query-country-id').value);
    const country = countries.find(c => c.id === countryId);
    if (!country) {
        alert('国家编号无效！');
        return;
    }

    const results = projects.map(p => {
        const index = p.results.indexOf(countryId);
        const points = p.isTop5 ? [7, 5, 3, 2, 1] : [5, 3, 2];
        return { project: p.id, score: index !== -1 ? points[index] : 0 };
    });

    const resultsText = results.map(r => `项目 ${r.project}: ${r.score} 分`).join('\n');
    alert(`国家 ${countryId} 的各项目得分：\n${resultsText}`);
}

function queryProject() {
    const projectId = parseInt(document.getElementById('query-project-id').value);
    const project = projects.find(p => p.id === projectId);
    if (!project) {
        alert('项目编号无效！');
        return;
    }

    const results = project.results.map(countryId => {
        const country = countries.find(c => c.id === countryId);
        const points = project.isTop5 ? [7, 5, 3, 2, 1] : [5, 3, 2];
        return { countryId, score: points[project.results.indexOf(countryId)] };
    }).slice(0, project.isTop5 ? 5 : 3);

    const resultsText = results.map(r => `国家 ${r.countryId}: ${r.score} 分`).join('\n');
    alert(`项目 ${projectId} 的前 ${project.isTop5 ? 5 : 3} 名国家：\n${resultsText}`);
}

function visualizeChart(ctx, chart, title, labels, dataset) {
    if (chart) {
        chart.destroy();
    }

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: dataset
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function sortAndDisplay(by) {
    const sortedCountries = sortCountries(by);
    const labels = sortedCountries.map(c => `国家${c.id}`);
    const dataset = [
        {
            label: '总分',
            data: sortedCountries.map(c => by === 'id' ? c.score : c[by]),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }
    ];

    const title = {
        'id': '按国家编号排序',
        'score': '按总分排序',
        'maleScore': '按男子项目总分排序',
        'femaleScore': '按女子项目总分排序'
    }[by];

    const chartId = {
        'id': 'idChart',
        'score': 'scoreChart',
        'maleScore': 'maleScoreChart',
        'femaleScore': 'femaleScoreChart'
    }[by];

    const ctx = document.getElementById(chartId).getContext('2d');
    const chart = by === 'id' ? idChart : by === 'score' ? scoreChart : by === 'maleScore' ? maleScoreChart : femaleScoreChart;
    
    if (chart) {
        chart.destroy();
    }

    if (by === 'id') {
        idChart = visualizeChart(ctx, idChart, title, labels, dataset);
    } else if (by === 'score') {
        scoreChart = visualizeChart(ctx, scoreChart, title, labels, dataset);
    } else if (by === 'maleScore') {
        maleScoreChart = visualizeChart(ctx, maleScoreChart, title, labels, dataset);
    } else if (by === 'femaleScore') {
        femaleScoreChart = visualizeChart(ctx, femaleScoreChart, title, labels, dataset);
    }
}

function visualizeTotal() {
    sortAndDisplay('score');
}
