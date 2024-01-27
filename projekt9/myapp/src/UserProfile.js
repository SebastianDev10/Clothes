import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './UserProfile.css';

function UserProfile() {
    const [editProfile, setEditProfile] = useState({
        firstName: '',
        lastName: '',
        bio: '',
        address: '',
        phoneNumber: ''
    });
    const [displayProfile, setDisplayProfile] = useState({
        firstName: '',
        lastName: '',
        bio: '',
        address: '',
        phoneNumber: ''
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputKey, setInputKey] = useState(0);
    
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        axios.get('http://localhost:8000/UserProfile/', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            const data = response.data;
            setDisplayProfile({
                firstName: data.first_name,
                lastName: data.last_name,
                bio: data.bio,
                address: data.address,
                phoneNumber: data.phone_number
            });
            setLoading(false);
            if (data.avatar) {
                const avatarPath = data.avatar.startsWith('/media/avatars/') ? data.avatar : `/media/avatars/${data.avatar}`;
                setAvatarPreview(`http://localhost:8000${avatarPath}`);
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            setLoading(false);
        });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('access_token');
        const formData = new FormData();
        formData.append('first_name', editProfile.firstName);
        formData.append('last_name', editProfile.lastName);
        formData.append('bio', editProfile.bio);
        formData.append('address', editProfile.address);
        formData.append('phone_number', editProfile.phoneNumber);
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }
    
        try {
            const response = await axios.post('http://localhost:8000/UserProfile/', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            setDisplayProfile({
                firstName: response.data.first_name || '',
                lastName: response.data.last_name || '',
                bio: response.data.bio || '',
                address: response.data.address || '',
                phoneNumber: response.data.phone_number || '',
            });
    
            
            if (response.data.avatar) {
                const avatarPath = response.data.avatar.startsWith('/media/avatars/') ? response.data.avatar : `/media/avatars/${response.data.avatar}`;
                setAvatarPreview(`http://localhost:8000${avatarPath}`);
            }
    
            setEditProfile({
                firstName: '',
                lastName: '',
                bio: '',
                address: '',
                phoneNumber: ''
            });
    
            setAvatarFile(null);
            setInputKey(prevKey => prevKey + 1);
    
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    

    const history = useHistory();
    
    const redirectToHome = () => {
        history.push('/home');
        window.location.reload();
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        
        <div className="container">
            <div className="user-logo">
                <img src="/logo/Fashionova-logos_white.png" alt="Fashionova" />
            </div>
            <div className="profile-card">
                <h2 className='profile-title'>Profil Użytkownika</h2>
                <div className="avatar-section">
                    <strong className="avatar-label">Avatar: </strong>
                    {avatarPreview && (
                        <div className='avatar-circle'>
                            <img src={avatarPreview} alt="User Avatar" />
                        </div>
                    )}
                </div>
                <div className='profile-text'>
                    <strong>Imię: </strong> {displayProfile.firstName}<br />
                    <strong>Nazwisko: </strong> {displayProfile.lastName}<br />
                    <strong>O mnie: </strong> {displayProfile.bio}<br />
                    <strong>Adres: </strong> {displayProfile.address}<br />
                    <strong>Numer telefonu: </strong> {displayProfile.phoneNumber}<br />
                </div>
                
                <form onSubmit={handleSubmit}>
                    <strong>Edytuj swoje dane:</strong>
                    <input type="text" name="firstName" value={editProfile.firstName} onChange={handleInputChange} placeholder="Imię" />
                    <input type="text" name="lastName" value={editProfile.lastName} onChange={handleInputChange} placeholder="Nazwisko" />
                    <textarea name="bio" value={editProfile.bio} onChange={handleInputChange} placeholder="O mnie"></textarea>
                    <input type="text" name="address" value={editProfile.address} onChange={handleInputChange} placeholder="Adres" />
                    <input type="text" name="phoneNumber" value={editProfile.phoneNumber} onChange={handleInputChange} placeholder="Numer telefonu" />
                    <input type="file" onChange={handleAvatarChange} key={inputKey} />
                    <button type="submit" className="save-button">Zapisz zmiany</button>
                </form>
                <button onClick={redirectToHome} className="home-button">Strona główna</button>
            </div>
        </div>
    );
}

export default UserProfile;
