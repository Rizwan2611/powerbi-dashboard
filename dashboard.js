// Dashboard JavaScript for Power BI Clone
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components
    initializeDashboard();
    initializeCharts();
    initializeFilters();
    initializeRevenueChartControls();
});

// Global variables for charts
let charts = {};
let currentData = generateSampleData();

// Initialize dashboard
function initializeDashboard() {
    // Auto-refresh functionality
    setInterval(updateDashboardData, 30000); // Update every 30 seconds
    
    // Refresh button
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.style.transform = 'rotate(360deg)';
            this.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 500);
            
            updateDashboardData();
        });
    }
}

// Initialize all charts
function initializeCharts() {
    initializeKPISparklines();
    initializeMainCharts();
}

// Initialize KPI sparkline charts
function initializeKPISparklines() {
    const sparklineConfigs = [
        { id: 'revenueSparkline', data: [2.1, 2.2, 2.0, 2.3, 2.4, 2.5, 2.4], color: '#107c10' },
        { id: 'customersSparkline', data: [1100, 1150, 1200, 1180, 1220, 1240, 1247], color: '#0078d4' },
        { id: 'conversionSparkline', data: [3.5, 3.4, 3.6, 3.3, 3.2, 3.1, 3.2], color: '#d13438' },
        { id: 'aovSparkline', data: [1800, 1850, 1900, 1920, 1950, 1960, 1967], color: '#ff8c00' }
    ];
    
    sparklineConfigs.forEach(config => {
        const ctx = document.getElementById(config.id);
        if (ctx) {
            charts[config.id] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['', '', '', '', '', '', ''],
                    datasets: [{
                        data: config.data,
                        borderColor: config.color,
                        backgroundColor: config.color + '20',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                    elements: {
                        point: { radius: 0 }
                    }
                }
            });
        }
    });
}

// Initialize main dashboard charts
function initializeMainCharts() {
    // Revenue Trend Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        charts.revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: currentData.revenue.labels,
                datasets: [{
                    label: 'Revenue',
                    data: currentData.revenue.data,
                    borderColor: '#0078d4',
                    backgroundColor: 'rgba(0, 120, 212, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000000).toFixed(1) + 'M';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Sales by Region Chart
    const regionCtx = document.getElementById('regionChart');
    if (regionCtx) {
        charts.regionChart = new Chart(regionCtx, {
            type: 'doughnut',
            data: {
                labels: currentData.regions.labels,
                datasets: [{
                    data: currentData.regions.data,
                    backgroundColor: ['#0078d4', '#107c10', '#ff8c00', '#5c2d91'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
    
    // Customer Acquisition Chart
    const customerCtx = document.getElementById('customerChart');
    if (customerCtx) {
        charts.customerChart = new Chart(customerCtx, {
            type: 'bar',
            data: {
                labels: currentData.customers.labels,
                datasets: [{
                    label: 'New Customers',
                    data: currentData.customers.data,
                    backgroundColor: '#107c10',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Product Performance Chart
    const productCtx = document.getElementById('productChart');
    if (productCtx) {
        charts.productChart = new Chart(productCtx, {
            type: 'bar',
            data: {
                labels: currentData.products.labels,
                datasets: [{
                    label: 'Revenue',
                    data: currentData.products.data,
                    backgroundColor: ['#0078d4', '#107c10', '#ff8c00', '#5c2d91'],
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000).toFixed(0) + 'K';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Sales by Sector Chart
    const sectorCtx = document.getElementById('sectorChart');
    if (sectorCtx) {
        charts.sectorChart = new Chart(sectorCtx, {
            type: 'doughnut',
            data: {
                labels: currentData.sectors.labels,
                datasets: [{
                    data: currentData.sectors.data,
                    backgroundColor: ['#0078d4', '#107c10', '#ff8c00', '#5c2d91', '#a80000'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
}

// Initialize filters
function initializeFilters() {
    const dateFilter = document.getElementById('dateFilter');
    const regionFilter = document.getElementById('regionFilter');
    
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            updateChartsData('date', this.value);
        });
    }
    
    if (regionFilter) {
        regionFilter.addEventListener('change', function() {
            updateChartsData('region', this.value);
        });
    }
}

// Add a new function to handle revenue chart period controls
function initializeRevenueChartControls() {
    const chartControlContainer = document.querySelector('.chart-card.large .chart-controls');
    if (chartControlContainer) {
        chartControlContainer.addEventListener('click', function(event) {
            const target = event.target;
            if (target.classList.contains('chart-btn')) {
                // Remove active class from all buttons
                chartControlContainer.querySelectorAll('.chart-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                // Add active class to clicked button
                target.classList.add('active');
                // Update chart data based on period
                updateChartsData('period', target.dataset.period);
            }
        });
    }
}

// Update dashboard data
function updateDashboardData() {
    currentData = generateSampleData();
    updateKPIValues();
    updateChartsData();
}

// Update KPI values
function updateKPIValues() {
    const kpiValues = {
        revenue: '$2,456,789',
        customers: '1,247',
        conversion: '3.2%',
        aov: '$1,967'
    };
    
    Object.entries(kpiValues).forEach(([key, value]) => {
        const element = document.querySelector(`.kpi-card:nth-child(${getKPIIndex(key)}) .kpi-value`);
        if (element) {
            element.textContent = value;
        }
    });
}

// Get KPI index
function getKPIIndex(key) {
    const indices = {
        revenue: 1,
        customers: 2,
        conversion: 3,
        aov: 4
    };
    return indices[key] || 1;
}

// Update charts data
function updateChartsData(filterType = null, value = null) {
    let data = generateSampleData(filterType ? { type: filterType, value: value } : null);
    
    if (filterType === 'period' && charts.revenueChart) {
        // Simulate different data for daily/weekly/monthly
        switch(value) {
            case 'daily':
                data.revenue.labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
                data.revenue.data = [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4].map(v => v * 1000000 + (Math.random() - 0.5) * 50000);
                break;
            case 'weekly':
                data.revenue.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
                data.revenue.data = [1.5, 1.7, 1.8, 2.0, 2.2, 2.4].map(v => v * 1000000 + (Math.random() - 0.5) * 100000);
                break;
            case 'monthly':
                data.revenue.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                data.revenue.data = [2.1, 2.3, 2.2, 2.4, 2.5, 2.4].map(v => v * 1000000 + (Math.random() - 0.5) * 200000);
                break;
        }
    }

    // Update Revenue Chart
    if (charts.revenueChart) {
        charts.revenueChart.data.labels = data.revenue.labels;
        charts.revenueChart.data.datasets[0].data = data.revenue.data;
        charts.revenueChart.update();
    }
    
    // Update Region Chart
    if (charts.regionChart) {
        charts.regionChart.data.labels = data.regions.labels;
        charts.regionChart.data.datasets[0].data = data.regions.data;
        charts.regionChart.update();
    }
    
    // Update Customer Chart
    if (charts.customerChart) {
        charts.customerChart.data.labels = data.customers.labels;
        charts.customerChart.data.datasets[0].data = data.customers.data;
        charts.customerChart.update();
    }
    
    // Update Product Chart
    if (charts.productChart) {
        charts.productChart.data.labels = data.products.labels;
        charts.productChart.data.datasets[0].data = data.products.data;
        charts.productChart.update();
    }
    
    // Update Sales by Sector Chart
    if (charts.sectorChart) {
        charts.sectorChart.data.labels = data.sectors.labels;
        charts.sectorChart.data.datasets[0].data = data.sectors.data;
        charts.sectorChart.update();
    }
}

// Generate sample data
function generateSampleData(filter = null) {
    const variation = () => (Math.random() - 0.5) * 200000;
    
    const data = {
        revenue: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [2.1, 2.3, 2.2, 2.4, 2.5, 2.4].map(v => v * 1000000 + variation())
        },
        regions: {
            labels: ['North', 'South', 'East', 'West'],
            data: [30, 25, 20, 25].map(v => v * 10000 + variation())
        },
        customers: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [200, 250, 230, 270, 290, 280].map(v => v + Math.floor(Math.random() * 50))
        },
        products: {
            labels: ['Product A', 'Product B', 'Product C', 'Product D'],
            data: [450, 380, 290, 210].map(v => v * 1000 + variation())
        },
        sectors: {
            labels: ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing'],
            data: [40, 20, 15, 15, 10]
        }
    };

    return data;
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Product Table Search and Export
const productSearch = document.getElementById('productSearch');
const productsTable = document.getElementById('productsTable');
const exportTableBtn = document.getElementById('exportTable');
if (productSearch && productsTable) {
    productSearch.addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        const rows = productsTable.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(filter) ? '' : 'none';
        });
    });
}
if (exportTableBtn && productsTable) {
    exportTableBtn.addEventListener('click', function() {
        let csv = '';
        const rows = productsTable.querySelectorAll('tr');
        rows.forEach(row => {
            const cols = Array.from(row.querySelectorAll('th,td')).map(col => '"' + col.innerText.replace(/"/g, '""') + '"');
            csv += cols.join(',') + '\n';
        });
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'top-performing-products.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
} 