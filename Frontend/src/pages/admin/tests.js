import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, TextField } from '@mui/material'; // Import only the necessary components
import { apiCall } from '../../apiCalls/apiCalls';
import { useNavigate } from 'react-router-dom';
import { deleteTest, updateTest, getTests } from '../../apiCalls/apiRoutes';

function Tests() {
    const [tests, setTests] = useState([]);
    const [editTestDialogOpen, setEditTestDialogOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [selectedTests, setSelectedTests] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        loadTests();
    }, []);

    const loadTests = () => {
        apiCall("post", getTests)
            .then((res) => {
                if (res.status === 200) {
                    setTests(res.data.data.rows);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleEditTest = (test) => {
        navigate(`/admin/dashboard/tests/${test.id}`);
        setSelectedTest({ ...test });
        setEditTestDialogOpen(true);
    };
    const handleDeleteTest = (testId) => {
        apiCall("post", deleteTest, { id: testId })
            .then((res) => {
                if (res.status === 200) {
                    loadTests();
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
        if (selectedTests.includes(testId)) {
            // If the test is already selected, remove it from the selection
            setSelectedTests(selectedTests.filter(id => id !== testId));
        } else {
            // If the test is not selected, add it to the selection
            setSelectedTests([...selectedTests, testId]);
        }
    };

    const handleSaveTest = () => {
        apiCall("post", updateTest, selectedTest)
            .then((res) => {
                if (res.status === 200) {
                    loadTests();
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

    const filteredTests = tests.filter((test) => {
        return (
            test.name.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    return (
        <div>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchText}
                onChange={handleSearch}
            />
            <h1>Test List</h1>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Select</TableCell>
                        <TableCell>Sr No.</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Time in Mins</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredTests.map((test, index) => (
                        <TableRow key={test.id}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedTests.includes(test.id)}
                                    onChange={() => handleToggleSelect(test.id)}
                                />
                            </TableCell>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{test.name}</TableCell>
                            <TableCell>{test.timeLimit}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleEditTest(test)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleDeleteTest(test.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default Tests;
