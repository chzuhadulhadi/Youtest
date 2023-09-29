import { saveUserTest } from '../../../apiCalls/apiRoutes'
import { apiCall } from "../../../apiCalls/apiCalls";
import React from 'react';
import { useState } from "react";


function TableRows(data) {
    return (
        <>
            <tbody>
                {data.data.result &&
                    data.data.result.map(function (categories) {
                        { console.log(categories) }
                        return (
                            <tr>
                                <td>{categories.category}</td>
                                <td>{categories.percentage} %</td>
                                {/* <td>{categories.text}</td> */}

                            </tr>
                        )
                    })
                }
            </tbody>


        </>
    )
}
export default TableRows;
