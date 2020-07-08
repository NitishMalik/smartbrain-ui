import React, { useState } from 'react';
import './styles.css';


const Profile = ({ isProfileOpen, onToggleModal, user, loadUser }) => {
    const { id, entries, name, joined, pet, age } = user;
    const [nameInput, setNameInput] = useState('');
    const [petInput, setPetInput] = useState('');
    const [ageInput, setAgeInput] = useState('');

    const onSave = (data) => {
        console.log("Save", data);
        fetch(`http://localhost:3000/profile/${id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                formInput: data
            })
        })
            .then(res => {
                if (res.status === 200 || res.status === 304) {
                    onToggleModal();
                    loadUser({ ...user, ...data })
                }
            })
            .catch(err => console.log(err))
    }

    const onHandleChange = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
            case 'nameInput':
                setNameInput(value)
                break;
            case 'ageInput':
                setAgeInput(value)
                break;
            case 'petInput':
                setPetInput(value)
                break;
            default:
                return;
        }
    }
    return (
        <div className="profile-modal">
            <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
                <main className='pa4 black-80 w-80'>
                    <img
                        src='http://tachyons.io/img/logo.jpg'
                        className='h3 w3 dib' alt='avatar'
                    />
                    <h1>{nameInput ? nameInput : name}</h1>
                    <h4>{`Images submitted: ${entries}`}</h4>
                    <p>{`Member since: ${new Date(joined).toLocaleDateString()}`}</p>
                    <hr />
                    <label className='mt2 fw6' htmlFor='nameInput'>Name:</label>
                    <input type='text'
                        name='nameInput' className='pa2 ba w-100' placeholder={name}
                        onChange={onHandleChange}></input>
                    <label className='mt2 fw6' htmlFor='user-age'>Age:</label>
                    <input type='text' name='ageInput' className='pa2 ba w-100' placeholder={age}
                        onChange={onHandleChange}></input>
                    <label className='mt2 fw6' htmlFor='user-pet'>Favourite Pet:</label>
                    <input type='text' name='petInput' className='pa2 ba w-100' placeholder={pet}
                        onChange={onHandleChange}></input>
                    <div className='mt4' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <button className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
                            onClick={() => onSave({ name: nameInput, age: ageInput, pet: petInput })}>
                            Save
                        </button>
                        <button className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
                            onClick={onToggleModal}>
                            Cancel
                        </button>
                    </div>
                </main>
                <div className='modal-close' onClick={onToggleModal}>
                    &times;
                </div>
            </article>
        </div>
    )

}

export default Profile;