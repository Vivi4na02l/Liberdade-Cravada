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
                frequency: 0.379,
            },
            {
                partido: "PPD",
                frequency: 0.264,
            },
            {
                partido: "PCP",
                frequency: 0.125,
            },
            {
                partido: "CDS",
                frequency: 0.076,
            },
            {
                partido: ["MDP","CDE"], /* MDP/CDE */
                frequency: 0.041,
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
                partido: ["PPD","PSD"],
                frequency: 0.3232,
            },
            {
                partido: ["PCP","PEV"],
                frequency: 0.0902,
            },
            {
                partido: ["CDS","PP"],
                frequency: 0.0838,
            },
            {
                partido: "B.E.",
                frequency: 0.0246,
            },
            {
                partido: ["PCTP","MRPP"],
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
                partido: ["PPD", "PSD"],
                frequency: 0.4015,
            },
            {
                partido: "PS",
                frequency: 0.3784,
            },
            {
                partido: ["CDS", "PP"],
                frequency: 0.0875,
            },
            {
                partido: ["PCP", "PEV"],
                frequency: 0.0697,
            },
            {
                partido: "B.E.",
                frequency: 0.0275,
            },
            {
                partido: ["PCTP", "MRPP"],
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
                partido: ["B.E.", "UDP"],
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
                partido: ["PPD", "PSD"],
                frequency: 0.2870,
            },
            {
                partido: ["PCP", "PEV"],
                frequency: 0.0756,
            },
            {
                partido: ["CDS", "PP"],
                frequency: 0.0726,
            },
            {
                partido: "B.E.",
                frequency: 0.0638,
            },
            {
                partido: ["PCTP", "MRPP"],
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
                partido: ["PPD", "PSD"],
                frequency: 0.2911,
            },
            {
                partido: ["CDS", "PP"],
                frequency: 0.1043,
            },
            {
                partido: "B.E.",
                frequency: 0.0982,
            },
            {
                partido: ["PCP", "PEV"],
                frequency: 0.0786,
            },
            {
                partido: ["PCTP", "MRPP"],
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
                partido: ["MPT", "P.H."],
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
            { partido: ["PPD", "PSD"], frequency: 0.3865 },
            { partido: "PS", frequency: 0.2806 },
            { partido: ["CDS", "PP"], frequency: 0.1170 },
            { partido: ["PCP", "PEV"], frequency: 0.0791 },
            { partido: "B.E.", frequency: 0.0517 },
            { partido: ["PCTP", "MRPP"], frequency: 0.0112 },
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
            { partido: ["PPD", "PSD", "CDS", "PP"], frequency: 0.3686 },
            { partido: "PS", frequency: 0.3231 },
            { partido: "B.E.", frequency: 0.1019 },
            { partido: ["PCP", "PEV"], frequency: 0.0825 },
            { partido: ["PPD", "PSD"], frequency: 0.0150 },
            { partido: "PAN", frequency: 0.0139 },
            { partido: "PDR", frequency: 0.0114 },
            { partido: ["PCTP", "MRPP"], frequency: 0.0111 },
            { partido: ["L", "TDA"], frequency: 0.0073 },
            { partido: "PNR", frequency: 0.0050 },
            { partido: "MPT", frequency: 0.0042 },
            { partido: "NC", frequency: 0.0040 },
            { partido: ["PTP", "MAS"], frequency: 0.0038 },
            { partido: "PPM", frequency: 0.0028 },
            { partido: "JPP", frequency: 0.0026 },
            { partido: "PURP", frequency: 0.0026 },
            { partido: ["CDS", "PP"], frequency: 0.0014 },
            { partido: ["CDS", "PP", "PPM"], frequency: 0.0007 },
            { partido: ["PPV", "CDC"], frequency: 0.0005 },
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
            { partido: ["PPD", "PSD"], frequency: 0.2776 },
            { partido: "B.E.", frequency: 0.0952 },
            { partido: ["PCP", "PEV"], frequency: 0.0633 },
            { partido: ["CDS", "PP"], frequency: 0.0422 },
            { partido: "PAN", frequency: 0.0332 },
            { partido: "CH", frequency: 0.0129 },
            { partido: "IL", frequency: 0.0129 },
            { partido: "L", frequency: 0.0109 },
            { partido: "A", frequency: 0.0077 },
            { partido: ["PCTP", "MRPP"], frequency: 0.0069 },
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
            { partido: ["PPD", "PSD"], frequency: 0.2767 },
            { partido: "CH", frequency: 0.0718 },
            { partido: "IL", frequency: 0.0491 },
            { partido: "B.E.", frequency: 0.0440 },
            { partido: ["PCP", "PEV"], frequency: 0.0430 },
            { partido: ["CDS", "PP"], frequency: 0.0160 },
            { partido: "PAN", frequency: 0.0158 },
            { partido: "L", frequency: 0.0128 },
            { partido: ["PPD", "PSD", "CDS", "PP"], frequency: 0.0091 },
            { partido: ["PPD", "PSD", "CDS", "PP", "PPM"], frequency: 0.0051 },
            { partido: "R.I.R.", frequency: 0.0042 },
            { partido: ["PCTP", "MRPP"], frequency: 0.0020 },
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
            { partido: ["PPD", "PSD", "CDS", "PP", "PPM"], frequency: 0.2802 },
            { partido: "PS", frequency: 0.2800 },
            { partido: "CH", frequency: 0.1807 },
            { partido: "IL", frequency: 0.0494 },
            { partido: "B.E.", frequency: 0.0436 },
            { partido: ["PCP", "PEV"], frequency: 0.0317 },
            { partido: "L", frequency: 0.0316 },
            { partido: "PAN", frequency: 0.0195 },
            { partido: "ADN", frequency: 0.0158 },
            { partido: ["PPD", "PSD", "CDS", "PP"], frequency: 0.0082 },
            { partido: "R.I.R.", frequency: 0.0040 },
            { partido: "JPP", frequency: 0.0030 },
            { partido: "ND", frequency: 0.0025 },
            { partido: ["PCTP", "MRPP"], frequency: 0.0024 },
            { partido: "VP", frequency: 0.0018 },
            { partido: "E", frequency: 0.0009 },
            { partido: ["MPT", "A"], frequency: 0.0007 },
            { partido: "PTP", frequency: 0.0004 },
            { partido: "NC", frequency: 0.0004 },
            { partido: "PPM", frequency: 0.0001 },
        ]
    },
];

let yearDefault = 1975;
document.querySelector('#sltYears').addEventListener('click', () => {
    let year = document.querySelector('#sltYears').value;

    if (yearDefault != year) {
        yearDefault = year;
        document.querySelector('#chart').innerHTML = '';
        let pos = elections.findIndex(years => years.year == year);
    
        let electionsYear = elections[pos].partidos
        createChart(electionsYear);
    }
})

// Declare the chart dimensions and margins.


createChart(elections[0].partidos);
function createChart(electionsYear) {
    const width = window.innerWidth*0.7;
    const height = 500;
    const marginTop = 30;
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 40;

    // Declare the x (horizontal position) scale.
    const x = d3.scaleBand()
        .domain(d3.groupSort(electionsYear, ([d]) => -d.frequency, (d) => d.partido)) // descending frequency
        .range([marginLeft, width - marginRight])
        .padding(0.1);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([0, d3.max(electionsYear, (d) => d.frequency)])
        .range([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    // Add a rect for each bar.
    svg.append("g")
        .attr("fill", "#C0392B")
    .selectAll()
    .data(electionsYear)
    .join("rect")
        .attr("x", (d) => x(d.partido))
        .attr("y", (d) => y(d.frequency))
        .attr("height", (d) => y(0) - y(d.frequency))
        .attr("width", x.bandwidth());

    // Add the x-axis and label.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add the y-axis and label, and remove the domain line.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Votos (%) / Partido"));

    // Append the SVG element.
    chart.append(svg.node());
}