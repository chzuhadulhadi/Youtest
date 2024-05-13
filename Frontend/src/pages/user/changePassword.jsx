import React, { useEffect, useState } from 'react';
import { myInfo, resetpass } from '../../apiCalls/apiRoutes'
import { apiCall } from "../../apiCalls/apiCalls";
import { toast } from 'react-toastify';


const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            showToastMessage("Passwords do not match", "red", 2);
            return;
        }
        if (newPassword.length < 8) {
            showToastMessage("Password must be at least 8 characters", "red", 2);
            return;
        }

        apiCall('post', myInfo)
            .then((res) => {
                if (res.status == 200) {
                    const token = res.data.data.verificationToken;

                    apiCall("post", resetpass, { token: token, password: newPassword })
                        .then((res) => {
                            if (res.status == 200) {
                                setNewPassword('');
                                setConfirmPassword('');
                                showToastMessage("Password reset sucessfull", "green", 1);
                            }
                        })
                        .catch((err) => {
                            showToastMessage(err?.response?.data?.message, "red", 2);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
            });

    };

    const showToastMessage = (text, color, notify) => {
        if (notify == 1) {
            toast.success(text, {
                position: toast.POSITION.TOP_RIGHT,
                style: { color: color },
            });
        } else {
            toast.warning(text, {
                position: toast.POSITION.TOP_RIGHT,
                style: { color: color },
            });
        }
    };


    return (
        <div class="Get_sec" style={{ height: '100vh' }}>
            <h1>Change Password</h1>
            <div class="card card-outline-secondary">
                <div class="card-header">
                    <h3 class="mb-0">Change Password</h3>
                </div>
                <div class="card-body">
                    <form class="form" role="form" autocomplete="off">
                        <div class="form-group">
                            <label for="inputPasswordNew">New Password</label>
                            <input type="password" class="form-control" id="inputPasswordNew" onChange={(e) => setNewPassword(e.target.value)} required="" value={newPassword} />
                            <span class="form-text small text-muted">
                                The password must be 8-20 characters, and must <em>not</em> contain spaces.
                            </span>
                        </div>
                        <div class="form-group">
                            <label for="inputPasswordNewVerify">Verify</label>
                            <input type="password" class="form-control" id="inputPasswordNewVerify" required="" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                            <span class="form-text small text-muted">
                                To confirm, type the new password again.
                            </span>
                        </div>
                        <div class="form-group">
                            <button type="submit" disabled={newPassword === '' || confirmPassword === ''} onClick={handleSubmit}
                             class="btn btn-success btn-lg float-right">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;