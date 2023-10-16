import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, TextField } from '@mui/material'; // Import only the necessary components
import { apiCall } from '../../apiCalls/apiCalls';
import { useNavigate } from 'react-router-dom';
import { deleteTest, updateTest, getResults } from '../../apiCalls/apiRoutes';

function Results() {
    const [results, setResults] = useState([]);
    const [editTestDialogOpen, setEditTestDialogOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [selectedResults, setSelectedResults] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        loadResults();
    }, []);

    const loadResults = () => {
        apiCall("post", getResults)
            .then((res) => {
                if (res.status === 200) {
                    setResults(res.data.data);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleEditTest = (test) => {
        // navigate(`/admin/dashboard/results/${test.id}`);
        setSelectedTest({ ...test });
        setEditTestDialogOpen(true);
    };
    const handleDeleteTest = (testId) => {
        apiCall("post", deleteTest, { id: testId })
            .then((res) => {
                if (res.status === 200) {
                    loadResults();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleCloseEditTestDialog = () => {
        setEditTestDialogOpen(false);
    };

    const handleToggleSelect = (testId) => {
        if (selectedResults.includes(testId)) {
            // If the test is already selected, remove it from the selection
            setSelectedResults(selectedResults.filter(id => id !== testId));
        } else {
            // If the test is not selected, add it to the selection
            setSelectedResults([...selectedResults, testId]);
        }
    };

    const handleSaveTest = () => {
        apiCall("post", updateTest, selectedTest)
            .then((res) => {
                if (res.status === 200) {
                    loadResults();
                }
            }).catch((err) => {
                console.error(err);
            });
        // Placeholder for saving edited Test data
        console.log(`Save edited Test with ID ${selectedTest.id}`);
        // Close the edit dialog
        handleCloseEditTestDialog();
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    // const filteredResults = results?.filter((test) => {
    //     return (
    //         results.name.toLowerCase().includes(searchText.toLowerCase())
    //     );
    // });

    return (
        <div>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchText}
                onChange={handleSearch}
            />
            <h1>Result List</h1>

            <Table my={2} sx={{ position: 'relative', borderCollapse: 'collapse' }}>
                <TableHead sx={{
                    position: 'sticky',
                    top: 0,
                }}>
                    <TableRow>
                        {/* <TableCell>Select</TableCell> */}
                        <TableCell>Sr No.</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>total Question</TableCell>
                        <TableCell>total Answer</TableCell>
                        <TableCell>time Taken For Test</TableCell>
                        <TableCell>total Percentage</TableCell>
                        <TableCell>total Categories</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results?.map((test, index) => (
                        <TableRow key={test.id}>
                            {/* <TableCell>
                                <Checkbox
                                    checked={selectedResults.includes(test.id)}
                                    onChange={() => handleToggleSelect(test.id)}
                                />
                            </TableCell> */}
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{test.name}</TableCell>
                            <TableCell>{test.resultStats.totalQuestion}</TableCell>
                            <TableCell>{test.resultStats.totalAnswer}</TableCell>
                            <TableCell>{test.resultStats.timeTakenForTest}</TableCell>
                            <TableCell>{test.resultStats.totalPercentage}</TableCell>
                            <TableCell>{test.resultStats.totalCategories}</TableCell>
                            <TableCell>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Category</TableCell>
                                            <TableCell>Percentage</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {test.result.map((resultItem, resultIndex) => (
                                            <TableRow key={resultIndex}>
                                                <TableCell>{resultItem.category}</TableCell>
                                                <TableCell>{resultItem.percentage}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default Results;
