import * as d3 from 'd3';
import Histogram from './Histogram';

import '../style/histogram.css';

function MainViz(_) {
    const timeline = Histogram()
        .domain([new Date(2013, 0, 1), new Date(2013, 11, 31)])
        .thresholds(d3.timeMonth.range(new Date(2013, 0, 1), new Date(2013, 11, 13), 1))
        .value(d => d.t0)
        .tickXFormat(d => {
            return new Date(d).toUTCString();
        })
        .tickX(1)
        .maxY(400)
        .tickY(2)

    function mainViz(data) {
        const root = this;
        // const width = this.clientWidth;
        // const height = this.clientHeight;
        //Nest trips by origin station
        const tripsByStation0 = d3.nest()
            .key(d => d.station0)
            .entries(data)
            .map(d => d.values)
            // .sort(d => );//EXCISE

        const stationNodes = d3.select(this).selectAll('.station-node')
            .data(tripsByStation0);
        const stationNodesEnter = stationNodes.enter()
            .append('div')
            // .attr('class','station-node')
            .classed('station-node', true)
            .style('width', '300px') //could be customized; e.g, size buttons
            .style('height', '180px')
            .style('float', 'left');
        stationNodes.exit().remove()

        stationNodes.merge(stationNodesEnter)
            .each(timeline);
    }

    return mainViz;
}

export default MainViz;