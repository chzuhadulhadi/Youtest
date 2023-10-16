import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import only the necessary components
import { apiCall } from '../../apiCalls/apiCalls';
import { useNavigate } from 'react-router-dom';
import { deleteTest, updateTest, getTests,transferTests } from '../../apiCalls/apiRoutes';

function Tests() {
    const [tests, setTests] = useState([]);
    const [editTestDialogOpen, setEditTestDialogOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [selectedTests, setSelectedTests] = useState([]);
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);

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
    const TransferTest = () => {
        console.log('here');
        apiCall("post", transferTests, {ids:selectedTests,email:email})
            .then((res) => {
                if (res.status === 200) {
                    loadTests();
                }
            }).catch((err) => {
                console.error(err);
            });
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
            <Dialog open={open}>
                <DialogTitle id="form-dialog-title">Transfer To:</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={(e)=>setEmail(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpen(false)}}>Cancel</Button>
                    <Button onClick={TransferTest}>Save</Button>
                </DialogActions>
            </Dialog>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchText}
                onChange={handleSearch}
            />
            <h1>Test List</h1>
            <Button onClick={()=>setOpen(!open)}>Transfer Tests</Button>
            <Table my={2} sx={{ position: 'relative', borderCollapse: 'collapse' }}>
                <TableHead sx={{
                    position: 'sticky',
                    top: 0,
                }}>
                    <TableRow>
                        <TableCell>Select</TableCell>
                        <TableCell>Sr No.</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Before Test Text</TableCell>
                        <TableCell>After Test Text</TableCell>
                        <TableCell>Order</TableCell>
                        <TableCell>Time in Mins</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Owner</TableCell>
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
                            <TableCell dangerouslySetInnerHTML={{ __html: test.beforeTestText }}></TableCell>
                            <TableCell dangerouslySetInnerHTML={{ __html: test.afterTestText }}></TableCell>
                            <TableCell>{test.randomOrder=='0' ? 'Sequence':'Random'}</TableCell>
                            <TableCell>{test.timeLimit}</TableCell>
                            <TableCell>{test.createdAt}</TableCell>
                            <TableCell>{test.createdByEmail}</TableCell>
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
