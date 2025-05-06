import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let elections = [
    { /** 1975 */
        year: 1975,
        percentageVoted: 0.9166,
        nbrVoted: 5711829,
        nbrCouldVote: 6231539,
        partidos: [
            {
                partido: "PS",
                frequency: 0.3787,
            },
            {
                partido: "PPD/PSD",
                frequency: 0.2639,
            },
            {
                partido: "PCP-PEV",
                frequency: 0.1246,
            },
            {
                partido: "CDS-PP",
                frequency: 0.0761,
            },
            {
                partido: "MDP/CDE",
                frequency: 0.0414,
            },
        ]
    },
    { /** 1999 */
        year: 1999,
        percentageVoted: 0.6184,
        nbrVoted: 5363906,
        nbrCouldVote: 8673822,
        partidos: [
            {
                partido: "PS",
                frequency: 0.44,
            },
            {
                partido: "PPD/PSD",
                frequency: 0.3232,
            },
            {
                partido: "PCP-PEV",
                frequency: 0.0902,
            },
            {
                partido: "CDS-PP",
                frequency: 0.0838,
            },
            {
                partido: "B.E.",
                frequency: 0.0246,
            },
            {
                partido: "PCTP/MRPP",
                frequency: 0.0074,
            },
            {
                partido: "MPT",
                frequency: 0.0036,
            },
            {
                partido: "PPM",
                frequency: 0.003,
            },
            {
                partido: "PSN",
                frequency: 0.0021,
            },
            {
                partido: "P.H.",
                frequency: 0.0014,
            },
            {
                partido: "POUS",
                frequency: 0.0008,
            },
            {
                partido: "PDA",
                frequency: 0.0001,
            },
        ]
    },
    { /** 2002 */
        year: 2002,
        percentageVoted: 0.6234,
        nbrVoted: 5433924,
        nbrCouldVote: 8716949,
        partidos: [
            {
                partido: "PPD/PSD",
                frequency: 0.4015,
            },
            {
                partido: "PS",
                frequency: 0.3784,
            },
            {
                partido: "CDS-PP",
                frequency: 0.0875,
            },
            {
                partido: "PCP-PEV",
                frequency: 0.0697,
            },
            {
                partido: "B.E.",
                frequency: 0.0275,
            },
            {
                partido: "PCTP/MRPP",
                frequency: 0.0066,
            },
            {
                partido: "MPT",
                frequency: 0.0028,
            },
            {
                partido: "PPM",
                frequency: 0.0023,
            },
            {
                partido: "P.H.",
                frequency: 0.0021,
            },
            {
                partido: "PNR",
                frequency: 0.0007,
            },
            {
                partido: "B.E.-UDP",
                partidos: ["B.E.", "UDP"],
                frequency: 0.0007,
            },
            {
                partido: "POUS",
                frequency: 0.0007,
            },
        ]
    },
    { /** 2005 */
        year: 2005,
        percentageVoted: 0.6503,
        nbrVoted: 5713640,
        nbrCouldVote: 8785762,
        partidos: [
            {
                partido: "PS",
                frequency: 0.4505,
            },
            {
                partido: "PPD/PSD",
                frequency: 0.2870,
            },
            {
                partido: "PCP-PEV",
                frequency: 0.0756,
            },
            {
                partido: "CDS-PP",
                frequency: 0.0726,
            },
            {
                partido: "B.E.",
                frequency: 0.0638,
            },
            {
                partido: "PCTP/MRPP",
                frequency: 0.0084,
            },
            {
                partido: "PND",
                frequency: 0.0070,
            },
            {
                partido: "P.H.",
                frequency: 0.0030,
            },
            {
                partido: "PNR",
                frequency: 0.0016,
            },
            {
                partido: "POUS",
                frequency: 0.0010,
            },
            {
                partido: "PDA",
                frequency: 0.0003,
            },
        ]
        
    },
    { /** 2009 */
        year: 2009,
        percentageVoted: 0.5974,
        nbrVoted: 5683967,
        nbrCouldVote: 9514322,
        partidos: [
            {
                partido: "PS",
                frequency: 0.3655,
            },
            {
                partido: "PPD/PSD",
                frequency: 0.2911,
            },
            {
                partido: "CDS-PP",
                frequency: 0.1043,
            },
            {
                partido: "B.E.",
                frequency: 0.0982,
            },
            {
                partido: "PCP-PEV",
                frequency: 0.0786,
            },
            {
                partido: "PCTP/MRPP",
                frequency: 0.0093,
            },
            {
                partido: "MEP",
                frequency: 0.0045,
            },
            {
                partido: "PND",
                frequency: 0.0038,
            },
            {
                partido: "MMS",
                frequency: 0.0029,
            },
            {
                partido: "PPM",
                frequency: 0.0027,
            },
            {
                partido: "MPT-P.H.",
                partidos: ["MPT", "P.H."],
                frequency: 0.0022,
            },
            {
                partido: "PNR",
                frequency: 0.0020,
            },
            {
                partido: "PPV",
                frequency: 0.0015,
            },
            {
                partido: "PTP",
                frequency: 0.0008,
            },
            {
                partido: "POUS",
                frequency: 0.0008,
            },
            {
                partido: "MPT",
                frequency: 0.0006,
            },
        ]        
    },
    { /** 2011 */
        year: 2011,
        percentageVoted: 0.5807,
        nbrVoted: 5588594,
        nbrCouldVote: 9624133,
        partidos: [
            { partido: "PPD/PSD", frequency: 0.3865 },
            { partido: "PS", frequency: 0.2806 },
            { partido: "CDS-PP", frequency: 0.1170 },
            { partido: "PCP-PEV", frequency: 0.0791 },
            { partido: "B.E.", frequency: 0.0517 },
            { partido: "PCTP/MRPP", frequency: 0.0112 },
            { partido: "PAN", frequency: 0.0104 },
            { partido: "MPT", frequency: 0.0041 },
            { partido: "MEP", frequency: 0.0039 },
            { partido: "PNR", frequency: 0.0032 },
            { partido: "PTP", frequency: 0.0030 },
            { partido: "PPM", frequency: 0.0027 },
            { partido: "PND", frequency: 0.0021 },
            { partido: "PPV", frequency: 0.0015 },
            { partido: "POUS", frequency: 0.0008 },
            { partido: "PDA", frequency: 0.0008 },
            { partido: "P.H.", frequency: 0.0006 },
        ]
        
    },
    { /** 2015 */
        year: 2015,
        percentageVoted: 0.5586,
        nbrVoted: 5408805,
        nbrCouldVote: 9682553,
        partidos: [
            { partido: "PPD/PSD.CDS-PP",
                partidos: ["PPD/PSD", "CDS-PP"], frequency: 0.3686 },
            { partido: "PS", frequency: 0.3231 },
            { partido: "B.E.", frequency: 0.1019 },
            { partido: "PCP-PEV", frequency: 0.0825 },
            { partido: "PPD/PSD", frequency: 0.0150 },
            { partido: "PAN", frequency: 0.0139 },
            { partido: "PDR", frequency: 0.0114 },
            { partido: "PCTP/MRPP", frequency: 0.0111 },
            { partido: "L/TDA",
                partidos: ["L", "TDA"], frequency: 0.0073 },
            { partido: "PNR", frequency: 0.0050 },
            { partido: "MPT", frequency: 0.0042 },
            { partido: "NC", frequency: 0.0040 },
            { partido: "PTP-MAS",
                partidos: ["PTP", "MAS"], frequency: 0.0038 },
            { partido: "PPM", frequency: 0.0028 },
            { partido: "JPP", frequency: 0.0026 },
            { partido: "PURP", frequency: 0.0026 },
            { partido: "CDS-PP",frequency: 0.0014 },
            { partido: "CDS-PP.PPM",
                partidos: ["CDS-PP", "PPM"], frequency: 0.0007 },
            { partido: "PPV/CDC",
                partidos: ["PPV", "CDC"], frequency: 0.0005 },
            { partido: "PTP", frequency: 0.0003 },
        ]
        
    },
    { /** 2019 */
        year: 2019,
        percentageVoted: 0.4857,
        nbrVoted: 5251064,
        nbrCouldVote: 10810674,
        partidos: [
            { partido: "PS", frequency: 0.3634 },
            { partido: "PPD/PSD", frequency: 0.2776 },
            { partido: "B.E.", frequency: 0.0952 },
            { partido: "PCP-PEV", frequency: 0.0633 },
            { partido: "CDS-PP", frequency: 0.0422 },
            { partido: "PAN", frequency: 0.0332 },
            { partido: "CH", frequency: 0.0129 },
            { partido: "IL", frequency: 0.0129 },
            { partido: "L", frequency: 0.0109 },
            { partido: "A", frequency: 0.0077 },
            { partido: "PCTP/MRPP", frequency: 0.0069 },
            { partido: "R.I.R.", frequency: 0.0067 },
            { partido: "PNR", frequency: 0.0033 },
            { partido: "MPT", frequency: 0.0025 },
            { partido: "NC", frequency: 0.0024 },
            { partido: "PDR", frequency: 0.0022 },
            { partido: "PURP", frequency: 0.0022 },
            { partido: "JPP", frequency: 0.0020 },
            { partido: "PPM", frequency: 0.0016 },
            { partido: "PTP", frequency: 0.0016 },
            { partido: "MAS", frequency: 0.0006 },
        ]
        
    },
    { /** 2022 */
        year: 2022,
        percentageVoted: 0.5142,
        nbrVoted: 5563497,
        nbrCouldVote: 10820337,
        partidos: [
            { partido: "PS", frequency: 0.4137 },
            { partido: "PPD/PSD", frequency: 0.2767 },
            { partido: "CH", frequency: 0.0718 },
            { partido: "IL", frequency: 0.0491 },
            { partido: "B.E.", frequency: 0.0440 },
            { partido: "PCP-PEV", frequency: 0.0430 },
            { partido: "CDS-PP", frequency: 0.0160 },
            { partido: "PAN", frequency: 0.0158 },
            { partido: "L", frequency: 0.0128 },
            { partido: "PPD/PSD.CDS-PP",
                partidos: ["PPD/PSD", "CDS-PP"], frequency: 0.0091 },
            { partido: "PPD/PSD.CDS-PP.PPM",
                partidos: ["PPD/PSD", "CDS-PP", "PPM"], frequency: 0.0051 },
            { partido: "R.I.R.", frequency: 0.0042 },
            { partido: "PCTP/MRPP", frequency: 0.0020 },
            { partido: "JPP", frequency: 0.0020 },
            { partido: "ADN", frequency: 0.0020 },
            { partido: "MPT", frequency: 0.0014 },
            { partido: "VP", frequency: 0.0011 },
            { partido: "MAS", frequency: 0.0011 },
            { partido: "E", frequency: 0.0009 },
            { partido: "NC", frequency: 0.0007 },
            { partido: "PTP", frequency: 0.0006 },
            { partido: "A", frequency: 0.0004 },
            { partido: "PPM", frequency: 0.0000 },
        ]
        
    },
    { /** 2024 */
        year: 2024,
        percentageVoted: 0.5984,
        nbrVoted: 6473789,
        nbrCouldVote: 10818226,
        partidos: [
            { partido: "PPD/PSD.CDS-PP.PPM",
                partidos: ["PPD/PSD", "CDS-PP", "PPM"], frequency: 0.2802 },
            { partido: "PS", frequency: 0.2800 },
            { partido: "CH", frequency: 0.1807 },
            { partido: "IL", frequency: 0.0494 },
            { partido: "B.E.", frequency: 0.0436 },
            { partido: "PCP-PEV", frequency: 0.0317 },
            { partido: "L", frequency: 0.0316 },
            { partido: "PAN", frequency: 0.0195 },
            { partido: "ADN", frequency: 0.0158 },
            { partido: "PPD/PSD.CDS-PP",
                partidos: ["PPD/PSD", "CDS-PP"], frequency: 0.0082 },
            { partido: "R.I.R.", frequency: 0.0040 },
            { partido: "JPP", frequency: 0.0030 },
            { partido: "ND", frequency: 0.0025 },
            { partido: "PCTP/MRPP", frequency: 0.0024 },
            { partido: "VP", frequency: 0.0018 },
            { partido: "E", frequency: 0.0009 },
            { partido: "MPT.A",
                partidos: ["MPT", "A"], frequency: 0.0007 },
            { partido: "PTP", frequency: 0.0004 },
            { partido: "NC", frequency: 0.0004 },
            { partido: "PPM", frequency: 0.0001 },
        ]
    },
];

let fontSize = "15px"
let fontSizeX = "10px"
let fontSizeY = "15px"

let chartW;
let margin;

checkDevice();
function checkDevice() {
    if (window.innerWidth < 767) {
        fontSize = "7px"
        fontSizeX = "7px"
        fontSizeY = "7px"
        chartW = window.innerWidth * 0.7

        margin = { top: 0, right: 30, bottom: 0, left: 100 }
    } else if (window.innerWidth >= 768 && window.innerWidth < 1023) {
        fontSize = "10px"
        fontSizeX = "10px"
        fontSizeY = "10px"
        chartW = window.innerWidth * 0.7

        margin = { top: 0, right: 45, bottom: 0, left: 150 }
    }  else if (window.innerWidth >= 1024) {
        fontSize = "15px"
        fontSizeX = "15px"
        fontSizeY = "15px"
        chartW = window.innerWidth * 0.7

        margin = { top: 0, right: 65, bottom: 0, left: 200 }
    }
}

window.addEventListener("resize", () => {
    checkDevice();
})


/** GETS THE YEAR THAT THE USER WANTS TO SEE THE ELECTION'S RESULTS OFF */
// let yearDefault = 2024;
document.querySelector('#btnYear').addEventListener('click', () => {
    let year = document.querySelector('#sltYears').value;
    
    // if (yearDefault != year) {
        //     yearDefault = year;
        document.querySelector('#chart').innerHTML = '';
        let pos = elections.findIndex(years => years.year == year);
        let electionsYear = elections[pos].partidos

        document.querySelector('#numero').innerHTML = (elections[pos].percentageVoted*100).toFixed(2) + "%";
        document.querySelector('#inscritos').innerHTML = "Inscritos: "+ elections[pos].nbrCouldVote;
        document.querySelector('#votantes').innerHTML = "Votantes: "+ elections[pos].nbrVoted;

        createBarChart(electionsYear);

        // year: 1975,
        // percentageVoted: 0.9166,
        // nbrVoted: 5711829,
        // nbrCouldVote: 6231539,
    // }
});

/** CREATES BAR CHART OF EACH YEAR OF ELECTIONS */
createBarChart(elections[elections.length-1].partidos);
function createBarChart(data) {
    const width = chartW - margin.left - margin.right
    const height = 700 - margin.top - margin.bottom

    // Create the SVG container for the chart
    const svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Process the data
    data.forEach(d => {
        d.frequency = +d.frequency;
    });

    // Sort the data by frequency
    data.sort(function (a, b) {
        return d3.ascending(a.frequency, b.frequency);
    });

    // Set the x and y scales
    const x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(data, function (d) { return d.frequency; })]);

    const y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1)
        .domain(data.map(function (d) { return d.partido; }));

    // Create the x and y axes
    // const xAxis = d3.axisBottom(x)
    //     .ticks(5)
    //     .tickSize(0); // remove ticks


    const yAxis = d3.axisLeft(y)
        .tickSize(0)
        .tickPadding(10);



    // // Add vertical gridlines
    // svg.selectAll("line.vertical-grid")
    //     .data(x.ticks(5))
    //     .enter()
    //     .append("line")
    //     .attr("class", "vertical-grid")
    //     .attr("x1", function (d) { return x(d); })
    //     .attr("y1", 0)
    //     .attr("x2", function (d) { return x(d); })
    //     .attr("y2", height)
    //     .style("stroke", "gray")
    //     .style("stroke-width", 0.5)
    //     .style("stroke-dasharray", "3 3");

    // Create the bars for the chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("y", function (d) { return y(d.partido); })
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", function (d) { return x(d.frequency); })
        .attr('fill', '#C0392B')

    // //* TEXT FOR THE AXIS X */
    // svg.append("g")
    //     .attr("class", "x axis")
    //     .style("font-size", fontSizeX)
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(xAxis)
    //     .call(g => g.select(".domain").remove());

    //* TEXT FOR THE AXIS Y */
    svg.append("g")
        .attr("class", "y axis")
        .style("font-size", fontSizeY)
        .call(yAxis)
        .selectAll('path')
        .style('stroke-width', '1.75px');

    // Add labels to the end of each bar
    svg.selectAll(".label")
        .data(data)
        .enter().append("text")
        .attr("x", function (d) { return x(d.frequency) + 5; })
        .attr("y", function (d) { return y(d.partido) + y.bandwidth() / 2; })
        .attr("dy", ".35em")
        .style("font-family", "sans-serif")
        .style("font-size", fontSize)
        .style("font-weight", "bold")
        .style('fill', '#000')
        .text(function (d) { return (d.frequency*100).toFixed(2)+"%"; }); /** % */

    // Add Total label
    // svg.append("text")
    //     .attr("transform", "translate(" + width / 2 + "," + (height + margin.bottom / 2) + ")")
    //     .style("text-anchor", "middle")
    //     .style("font-size", "10px")
    //     .style("fill", "black")
    //     .style("font-family", "sans-serif")
    //     .attr("dy", "1em")
    //     .text("Votos (%)");    
}

/** GETS THE YEAR THAT THE USER WANTS TO SEE THE ELECTION'S RESULTS OFF */
let partidoDefault;
let partidoPie = [];
let partidoArray = [];
let cantCompare = false;
document.querySelector('#btnPartido').addEventListener('click', (event) => {
    event.preventDefault();
    
    let partido = document.querySelector('#sltPartido').value;

    if (partidoDefault != partido && partido != '') {
        partidoPie = []

        let partidoStats = {
            partido: partido,
            years: [
                // {
                //     year: 1975,
                //     frequency: 0,
                // },
            ]
        };

        partidoDefault = partido;
        document.querySelector('#pie').innerHTML = '';

        for (const year of elections) { /* goes through every year of the elections result array, one by one */
            if (year.partidos.find(eachPartido => eachPartido.partido == partido)) { /* if year has the partido the user clicked on, plain and simple */
                let pos = year.partidos.findIndex(eachPartido => eachPartido.partido == partido);

                partidoStats.years.push({
                    partido: year.partidos[pos].partido,
                    year: year.year,
                    frequency: (year.partidos[pos].frequency*100).toFixed(2),
                })

            } else if (year.partidos.some(
                        function (eachPartido) {
                            if (eachPartido.partidos != null) {
                                if (eachPartido.partidos.includes(partido)) {
                                    return true
                                } else {
                                    return false
                                }
                            } else {
                                return false
                            }
            })) { /* if year has the partido the user clicked on, but it's a compound name, so it's complex *like emoji */
                for (let i = 0; i < year.partidos.length; i++) {
                    if (year.partidos[i].partidos != undefined) {
                        if (year.partidos[i].partidos.includes(partido)) {
                            partidoStats.years.push({
                                partido: year.partidos[i].partido,
                                year: year.year,
                                frequency: (year.partidos[i].frequency*100).toFixed(2),
                            })
                        }
                    }
                } 
            }
        }

        partidoArray = partidoStats;
        // console.log(partidoStats);
        updateYearsSelect(partidoStats);
    }
});

function updateYearsSelect(partido) {
    let years = []
    for (const year of partido.years) {
        if (!years.includes(year.year)) {
            years.push(year.year);
        }
    }

    let html = '<option value="">Seleciona um partido primeiro</option>';
    for (const year of years) {
        html += `<option value="${year}">${year}</option>`
    }
    document.querySelector('#sltPartidoYear').innerHTML = html;

    if (years.length == 1) {
        cantCompare = true;
    } else {
        cantCompare = false;
    }

    // getsYearsUserClicked(partido, partidoPie);
}

// let partidoYearDefault;
document.querySelector('#btnAdd').addEventListener('click', (event) => {
    event.preventDefault();

    let partidoYear = document.querySelector('#sltPartidoYear').value;

    if (partidoYear != '') { //partidoYearDefault != partidoYear && 
        // partidoYearDefault = partidoYear
        
        if (partidoPie.length == 0 || (partidoPie.length != 0 && !partidoPie.find(eachYear => eachYear.year == partidoYear))) {
            for (const eachYear of partidoArray.years) {
                if (eachYear.year == partidoYear) {
                    partidoPie.push(eachYear);
                }
            }
        }
        // else {
        //     let newPartidoPie = partidoPie.filter(eachYear => eachYear.year != partidoYear);
        //     partidoPie = newPartidoPie;
        // }
    }

    // console.log(partidoPie);
    checkBeforePie(partidoPie);
})

document.querySelector('#btnRemove').addEventListener('click', (event) => {
    event.preventDefault();

    let partidoYear = document.querySelector('#sltPartidoYear').value;

    if (partidoPie.length != 0 && partidoPie.find(eachYear => eachYear.year == partidoYear)) {
        let newPartidoPie = partidoPie.filter(eachYear => eachYear.year != partidoYear);
        partidoPie = newPartidoPie;
    }

    // console.log(partidoPie);
    document.querySelector('#pie').innerHTML = '';
    // if (partidoPie.length != 0) {
        checkBeforePie(partidoPie);
    // }
})

function checkBeforePie(partidoPie) {
    if (partidoPie.length == 0) {
        document.querySelector("#cantCompare").style.display = "none";
        document.querySelector("#almostThere").style.display = "none";
    } else if (cantCompare) {
        document.querySelector("#cantCompare").style.display = "flex";
        document.querySelector("#almostThere").style.display = "none";
    } else if (partidoPie.length == 1) {
        document.querySelector("#cantCompare").style.display = "none";
        document.querySelector("#almostThere").style.display = "block";
    } else {
        document.querySelector("#cantCompare").style.display = "none";
        document.querySelector("#almostThere").style.display = "none";
        
        pie(partidoPie);
    }
}

function pie(data) {
    // console.log(data);
    document.querySelector('#pie').innerHTML = '';

    const width = window.innerWidth * 0.5;
    const height = Math.min(width, 500);

    // Create the color scale.
    const domain = data.map(d => d.partido);
const numColors = domain.length;

const redInterpolator = d3.interpolateRgbBasis(["#C0392B", "#00d32d", "#ffcc00"]);
// Podes ajustar os tons como quiseres

const generatedColors = d3.quantize(redInterpolator, numColors);

const color = d3.scaleOrdinal()
    .domain(domain)
    .range(generatedColors);

    // const generatedColors = d3.quantize(t => d3.interpolateSpectral(t * 0.6 + 0.3), data.length - 1).reverse();
    // const color = d3.scaleOrdinal()
    //     .domain(data.map(d => d.partido))
    //     .range(["#C0392B", ...generatedColors]);

    // Create the pie layout and arc generator.
    const pie = d3.pie()
        .sort(null)
        .value(d => d.frequency);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) / 2 - 1);

    const labelRadius = arc.outerRadius()() * 0.8;

    // A separate arc generator for labels.
    const arcLabel = d3.arc()
        .innerRadius(labelRadius)
        .outerRadius(labelRadius);

    const arcs = pie(data);

    //   const svg = d3.select("#chart").append("svg")
    //   .attr("width", width + margin.left + margin.right)
    //   .attr("height", height + margin.top + margin.bottom)
    //   .append("g")
    //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create the SVG container.
    //   const svg = d3.create("svg")
        const svg = d3.select("#pie").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", `max-width: 100%; height: auto; font: ${fontSize} sans-serif;`);

    // Add a sector path for each frequency.
    svg.append("g")
        .attr("stroke", "white")
        .selectAll()
        .data(arcs)
        .join("path")
        .attr("fill", d => color(d.data.partido))
        .attr("d", arc)
        .append("title")
        .text(d => `${d.data.partido}: ${d.data.frequency.toLocaleString("en-US")}`);

    // Create a new arc generator to place a label close to the edge.
    // The label shows the frequency if there is enough room.
    svg.append("g")
        .attr("text-anchor", "middle")
        .selectAll()
        .data(arcs)
        .join("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .call(text => text.append("tspan")
            .attr("y", "-0.4em")
            .attr("font-weight", "bold")
            .text(d => d.data.year))
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill-opacity", 0.7)
            .text(d => d.data.frequency.toLocaleString("en-US")+"%"))
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
            .attr("x", "0")
            .attr("y", "1.8em")
            .attr("fill-opacity", 0.7)
            .text(d => d.data.partido.toLocaleString("en-US")));
}