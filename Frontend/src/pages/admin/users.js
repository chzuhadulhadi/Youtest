import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, InputLabel, Select, FormControl } from '@mui/material';
import { apiCall } from '../../apiCalls/apiCalls';
import { getUsers,deleteUser,updateUser } from '../../apiCalls/apiRoutes';

function Users() {
    const [users, setUsers] = useState([]);
    const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        apiCall("post", getUsers)
            .then((res) => {
                if (res.status === 200) {
                    setUsers(res.data.data);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleEditUser = (user) => {
        setSelectedUser({ ...user }); // Copy the user data
        setEditUserDialogOpen(true);
    };

    const handleCloseEditUserDialog = () => {
        setEditUserDialogOpen(false);
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser({
            ...selectedUser,
            [name]: value,
        });
    };

    const handleSaveUser = () => {
        apiCall("post", updateUser, selectedUser)
        .then((res) => {
            if (res.status === 200) {
                loadUsers();
            }
        }).catch((err) => {
            console.error(err);
        });
        // Placeholder for saving edited user data
        console.log(`Save edited user with ID ${selectedUser.id}`);
        // Close the edit dialog
        handleCloseEditUserDialog();
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };
    const handleDeleteUser = (id) => {
        apiCall("post", deleteUser, { id })
        .then((res) => {
            if (res.status === 200) {
                loadUsers();
            }
        }).catch((err) => {
            console.error(err);
        });

        console.log(`Delete user with ID ${id}`);
    };

    const filteredUsers = users.filter((user) => {
        return (
            user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase())
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
            <h1>User List</h1>
            <Table my={2}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Email Verified</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.fullName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.emailVerified ? 'Yes' : 'No'}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleEditUser(user)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Edit User Dialog */}
            <Dialog open={editUserDialogOpen} onClose={handleCloseEditUserDialog}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        <>
                            <TextField
                                label="Full Name"
                                variant="outlined"
                                fullWidth
                                name="fullName"
                                value={selectedUser.fullName}
                                onChange={handleFieldChange}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={selectedUser.email}
                                onChange={handleFieldChange}
                            />
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="role">Role</InputLabel>
                                <Select
                                    label="Role"
                                    name="role"
                                    value={selectedUser.role}
                                    onChange={handleFieldChange}
                                >
                                    <MenuItem value={1}>Admin</MenuItem>
                                    <MenuItem value={2}>User</MenuItem>
                                </Select>

                            </FormControl>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="verification">Email Verified</InputLabel>
                                <Select
                                    label="emailVerified"
                                    name="emailVerified"
                                    value={selectedUser.emailVerified}
                                    onChange={handleFieldChange}
                                >
                                    <MenuItem value={0}>No</MenuItem>
                                    <MenuItem value={1}>Yes</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditUserDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveUser} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Users;
