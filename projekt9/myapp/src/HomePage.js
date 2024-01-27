import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faRightFromBracket, faUpload, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';


function HomePage() {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userProfile, setUserProfile] = useState({ avatar: null }); 
    const token = localStorage.getItem('access_token');
    const [imageTitle, setImageTitle] = useState('');
    const [imageDescription, setImageDescription] = useState('');
    const [fileName, setFileName] = useState('Nie wybrano pliku');

    const handleLogout = () => {
        localStorage.removeItem('access_token');  
        window.location.href = '/login';  
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : 'Nie wybrano pliku');
    };

    
    const handleImageReaction = async (imageID, reactionType) => {
        try {
            const endpoint = reactionType === 'like' ? `api/like/${imageID}/` : `api/dislike/${imageID}/`;
            const response = await axios.post(`http://localhost:8000/${endpoint}`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
    
            setImages(images => images.map(image =>
                image.id === imageID ? { ...image, likes: response.data.likes, dislikes: response.data.dislikes } : image
            ));
    
            setFilteredImages(filteredImages => filteredImages.map(image =>
                image.id === imageID ? { ...image, likes: response.data.likes, dislikes: response.data.dislikes } : image
            ));
        } catch (error) {
            console.error(`Error ${reactionType}ing image:`, error);
        }
    };
    


    const uploadImage = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const imageFile = event.target.elements.image.files[0];
        formData.append('image', imageFile);
        formData.append('title', imageTitle);
        formData.append('description', imageDescription);

        try {
            const response = await axios.post('http://localhost:8000/home/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log('Obraz przesłany:', response.data);
            fetchImages(); 
            setImageTitle('');
            setImageDescription('');
            setFileName('Nie wybrano pliku');
            event.target.elements.image.value = null;
        } catch (error) {
            console.error('Błąd podczas przesyłania obrazu:', error.response?.data || error);
        }
    };

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/home/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            setImages(response.data);
            setFilteredImages(response.data);
        } catch (error) {
            console.error('Błąd podczas pobierania obrazów:', error);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:8000/UserProfile/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUserProfile(response.data); 
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        fetchImages();
        fetchUserProfile();
    }, []);


    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = searchTerm
            ? images.filter((img) =>
                img.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : images;
        
        setFilteredImages(filtered);
        
    };
    

    return (
        <div className="home-page">
            <aside className="sidebar">
                <div className="logo-container">
                    <img src="/logo/Fashionova-logos_white.png" alt="Fashionova" className="sidebar-logo" />
                </div>
                <nav className="sidebar-nav">
                    {userProfile.avatar && (
                        <div className="avatar-container">
                            <img src={`http://localhost:8000${userProfile.avatar}`} alt="User Avatar" className="sidebar-avatar" />
                        </div>
                    )}
                    <button onClick={() => window.location.href = '/UserProfile'} className="profile-button">
                        <FontAwesomeIcon icon={faUser} /><span className="button-text"> Mój profil</span>
                    </button>
                    <button onClick={handleLogout} className="logout-button">
                        <FontAwesomeIcon icon={faRightFromBracket} /><span className="button-text"> Wyloguj</span>
                    </button>
                </nav>
            </aside>
            <main className="main-content">
                <section className="upload-section">
                <div className="search-bar-container">
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search clothes ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit"><FontAwesomeIcon icon={faSearch} /> Search</button>
                        </form>
                    </div>
                <form onSubmit={uploadImage} className="upload-form">
                    <div className="form-group">
                        <label htmlFor="image-upload" className="file-upload">
                            Wybierz plik
                            <input type="file" id="image-upload" name="image" onChange={handleFileChange} required hidden />
                        </label>
                        <span id="file-chosen">{fileName}</span>
                    </div>
                    <div className="form-group">
                        <input type="text" name="title" placeholder="Title" value={imageTitle} onChange={(e) => setImageTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <textarea name="description" placeholder="Description" value={imageDescription} onChange={(e) => setImageDescription(e.target.value)} required />
                    </div>
                    <button type="submit" className="upload-button"><FontAwesomeIcon icon={faUpload} /> Upload Image</button>
                    
                </form>
                </section>
                <section className="gallery-section">
                <div className="image-gallery">
                    {filteredImages.map((img) => (
                        <div key={img.id} className="image-item">
                            <img src={img.image} alt={img.title} className="gallery-image" />
                            <div className="image-info">
                            <h3>{img.title}</h3>
                            <div className="image-desc">
                            <p>{img.description}</p>
                            </div>
                            </div>
                            <div className="image-actions">
                            <button onClick={() => handleImageReaction(img.id, 'like')} className="like-button">
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </button>
                            <span>Likes: {img.likes}</span>
                            <button onClick={() => handleImageReaction(img.id, 'dislike')} className="dislike-button">
                                <FontAwesomeIcon icon={faThumbsDown} />
                            </button>
                            <span>Dislikes: {img.dislikes}</span>
                            </div>
                        </div>
                    ))}
                </div>
                </section>
            </main>
        </div>
    );
}

export default HomePage;
