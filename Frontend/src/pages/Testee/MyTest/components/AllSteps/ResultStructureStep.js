import React, { Component, useState } from 'react';

import '../../style.css'
import showResultInGraphImg from '../../../../homepage/css/images/showresultingraph.png'
import tableSummaryImg from '../../../../homepage/css/images/imagetablesummary.png'



function ResultStructureStep(props) {

    const [tableSummaryChecked, setTableSummaryChecked] = useState(props.obj.mainObj?.resultStructure.tableSummary || true);
    const [graphChecked, setGraphChecked] = useState(props.obj.mainObj?.resultStructure.graph || true);

    function handleTickChange(e, type) {
        if (type === 'tableSummary') {
            setTableSummaryChecked(e.target.checked);
            setGraphChecked(e.target.checked);
        } else {
            setGraphChecked(e.target.checked);
            setTableSummaryChecked(e.target.checked);
        }
        props.obj.mainObjectAdderForResultStructure(e, "resultStructure", type);
    }

    return (
        <div className='result-structure-content' hidden={props.obj.tabSelected === "RESULT STRUCTURE" ? false : true}
            style={{ textAlign: "initial" }}>
            <h3>#5 - Result Structure</h3>
            <form onSubmit={(e) => { e.preventDefault(); props.obj.showTab("AUTOMATIC TEXT"); }}>
                <label className="form-label m-2 fw-bold" style={{ fontSize: "1.6rem" }}>
                    <input
                        className="form-field"
                        type="checkbox"
                        id="tableSummary"
                        onChange={(e) => handleTickChange(e, "tableSummary")}
                        checked={tableSummaryChecked}
                    /> &nbsp;
                    Table summary
                </label>
                <img style={{ width: "30%" }} src={tableSummaryImg} />
                <br />
                <label className="form-label m-2 fw-bold" style={{ fontSize: "1.6rem" }}>
                    <input
                        type="checkbox"
                        id="showResultInGraph"
                        onChange={(e) => handleTickChange(e, "graph")}
                        checked={graphChecked}
                    /> &nbsp;
                    Show Result in Graph
                </label>
                <img style={{ width: "20%" }} src={showResultInGraphImg} />
                <br />
                <button  style={{position:"relative",right:"20px"}} type="submit" onClick={(e) => { props.obj.apiCallToCreateTest(e) }}> Save Test & Close </button>
                <button type="submit" style={{position:"relative",right:"20px"}}>Next</button>
            </form>
        </div>
    );
}

export default ResultStructureStep;