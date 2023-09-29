import React, { Component, useState } from 'react';

import '../../style.css'
import showResultInGraphImg from '../../../../homepage/css/images/showresultingraph.png'
import tableSummaryImg from '../../../../homepage/css/images/imagetablesummary.png'



function ResultStructureStep(props) {

    function handleTickChange(e, type) {
        props.obj.mainObjectAdderForResultStructure(e, "resultStructure", type)
    }


    return (
        <div className='result-structure-content' hidden={props.obj.tabSelected == "RESULT STRUCTURE" ? false : true}
        style={{textAlign:"initial"}}>
            <h3>#5 - Result Structure</h3>
            <form onSubmit={(e) => { e.preventDefault(); props.obj.showTab("AUTOMATIC TEXT"); }}>

                <label className="form-label m-2 fw-bold" style={{ fontSize: "1.6rem" }}>Table summary <input className="form-field" type="checkbox" id="tableSummary"
                    onChange={(e) => handleTickChange(e, "tableSummary")}
                /></label>

                <img style={{ width: "30%" }} src={tableSummaryImg} />
                <br />

                <label className="form-label m-2 fw-bold" style={{ fontSize: "1.6rem" }}>Show Result in Graph  <input type="checkbox" id="showResultInGraph"
                    onChange={(e) => handleTickChange(e, "graph")}
                /></label>

                <img style={{ width: "20%" }} src={showResultInGraphImg} />
                <br />

                <button type="submit">Save Test & Close</button>
            </form>
        </div>
    )
}

export default ResultStructureStep;