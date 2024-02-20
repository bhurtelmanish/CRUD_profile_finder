const searchButton = document.querySelectorAll('.search-btn')[0];
const createButton = document.querySelectorAll('.create-btn')[0];

const addButton = document.querySelectorAll('.add-btn')[0];
let addButtonText = addButton.innerText;
const form = document.querySelectorAll('.form')[0];
const container = document.querySelectorAll('.container')[0];
const overlay = document.querySelectorAll('.overlay')[0];
const cross = document.querySelectorAll('.fa-xmark')[0];
const loader = document.querySelectorAll('.loader')[0];
const wrapper = document.querySelectorAll('.wrapper')[0];
let formHeader = document.querySelectorAll('.add-new-profile')[0];
formHeader.innerText = 'Add new profile'

const input_name = document.querySelectorAll('.input-name')[0];
const input_email = document.querySelectorAll('.input-email')[0];
const input_phone = document.querySelectorAll('.input-phone')[0];
const input_image = document.querySelectorAll('.input-image')[0];
const input = document.querySelectorAll('.input');

const searchBar = document.querySelectorAll('.search')[0];

console.log(addButtonText)
console.log(formHeader)

form.style.display = 'none'
createButton.onclick = () => {
    // Reset the form fields
    input.forEach((input) => {
        if (input.value) {
            input.value = '';
        }
    });

    // Update form header and button text
    formHeader.innerText = 'Add new profile';
    addButton.innerText = 'Add';

    // Reset edit_id to null
    edit_id = null;

    // Display the form
    form.style.display = 'flex';
    overlay.style.display = 'block';

    // Close form when cross icon is clicked
    cross.onclick = () => {
        form.style.display = 'none';
        overlay.style.display = 'none';
    };
};

window.addEventListener('DOMContentLoaded', () => {
    userArray = JSON.parse(localStorage.getItem('user_data')) ?? [];
    searchFunction(userArray);
    displayUser();

});

let userArray = [];

let edit_id = null;

addButton.addEventListener('click', async () => {
    // Get the updated user data from the form fields
    let user_name = input_name.value;
    let user_email = input_email.value;
    let user_phone = input_phone.value;
    // Validate the input data
    if (user_name.trim() == '' || user_name.trim() < 3 || user_email.trim() == '' || user_phone == '' || user_phone.length != 10) {
        alert('Please enter valid user credentials!!!');
        addButton.innerText = 'Add';
        formHeader.innerText = 'Add new profile';
    } else {
        userArray = JSON.parse(localStorage.getItem('user_data')) ?? []
        let existingUser = userArray.find(user => user_email == user.user_email || user_phone == user.user_phone);
        if (existingUser && existingUser !== userArray[edit_id]) {
            alert("User already exists");
            return;
        }
        if (edit_id == null) {
            userArray.push({
                'user_name': user_name,
                'user_email': user_email,
                'user_phone': user_phone,
                'user_image': await imageUpload()
            })

        } else {
            // Update the user data in userArray
            let newData = {
                'user_name': user_name,
                'user_email': user_email,
                'user_phone': user_phone,
                'user_image': await imageUpload()
            };
            userArray[edit_id] = newData;
            edit_id = null;
        }

        // Save the updated userArray to localStorage
        saveUser(userArray);
        // Reset the form fields and hide the form
        form.style.display = 'none';
        input.forEach((input) => {
            if (input.value) {
                input.value = '';
            }
        });

        // Refresh the display of user profiles
        displayUser();
        searchFunction(userArray); // Call searchFunction after adding a new user profile
    }
});

async function imageUpload() {
    try {
        const file = input_image.files[0];

        if (!file) {
            throw new Error("No file selected");
        }

        const fileReader = new FileReader();

        return new Promise((resolve, reject) => {
            fileReader.onload = (e) => resolve(e.target.result);
            fileReader.onerror = (error) => reject(error);
            fileReader.readAsDataURL(file);
        });
    } catch (error) {
        console.error("Error uploading image:", error);
        // Handle error appropriately, e.g., display an error message to the user
    }
}

const searchFunction = (userArray) => {
    searchBar.addEventListener('input', (e) => {
        let value = e.target.value.toLowerCase().trim();
        let filteredData = userArray.filter(user => user.user_name.toLowerCase().includes(value));
        if (filteredData.length > 0) { // Check if filteredData is not empty
            let finalData = '';
            filteredData.forEach((user, index) => {
                let userProfile = `
                <div class="profile">
                        <img src = ${user.user_image} class="user-image-profile">
                        <div class="user-profile-content">
                        <div>
                           <div class="user-details-field">Name : <span class="display-name">${user.user_name}</span></div>
                           <div class="user-details-field">Email : <span class="display-email">${user.user_email}</span></div>
                           <div class="user-details-field">Phone : <span class="display-number">${user.user_phone}</span></div>
                        </div>
                           <div class="profile-format">
                             <img src="./icons/edit-user.png" class="edit-single-profile icon" onclick="editUserProfile(${index}, '${escape(JSON.stringify(user))}')">
                             <img src="./icons/delete-user.png" class="delete-single-profile icon" onclick="deleteUserProfile(${index})">
                           </div>
                        </div>
                    </div>`;
        
                finalData += userProfile;
            });
            container.innerHTML = finalData;
        } else {
            if (value.length > 0) {
                container.innerHTML = '<div class="popup-text">No matching users found.</div>';
            } else if (value.length == 0) {
                container.innerHTML = '<div class="popup-text">No user profiles found.</div>';
            }
        }
    });
    overlay.style.display = 'none';
}

//This saves user profile data to local storage
const saveUser = (userArray) => {
    localStorage.setItem('user_data', JSON.stringify(userArray));
}

if (userArray.length == 0) {
    container.innerHTML = '<div class="popup-text">No user profiles found.</div>';
}

//Display User profile on DOM
const displayUser = () => {
    let userDetails = JSON.parse(localStorage.getItem('user_data')) ?? [];
    let finalData = '';
    if (userDetails.length === 0) {
        container.innerHTML = '<div class="popup-text">No user profiles found.</div>';
        return;
    }
    userDetails.forEach((user, index) => {
        // let userDataMain = JSON.stringify(user);
        let userProfile = `
        <div class="profile">
                <img src = ${user.user_image} class="user-image-profile">
                <div class="user-profile-content">
                <div>
                   <div class="user-details-field">Name : <span class="display-name">${user.user_name}</span></div>
                   <div class="user-details-field">Email : <span class="display-email">${user.user_email}</span></div>
                   <div class="user-details-field">Phone : <span class="display-number">${user.user_phone}</span></div>
                </div>
                   <div class="profile-format">
                     <img src="./icons/edit-user.png" class="edit-single-profile icon" onclick="editUserProfile(${index}, '${escape(JSON.stringify(user))}')">
                     <img src="./icons/delete-user.png" class="delete-single-profile icon" onclick="deleteUserProfile(${index})">
                   </div>
                </div>
            </div>`;

        finalData += userProfile;
    });
    container.innerHTML = finalData;
}

const editUserProfile = (index, userJson) => {
    userArray = JSON.parse(localStorage.getItem('user_data')) ?? [];
    let user = JSON.parse(unescape(userJson));
    form.style.display = 'flex';
    overlay.style.display = 'block';
    cross.onclick = () => {
        form.style.display = 'none';
        overlay.style.display = 'none';
    };
    addButton.innerText = 'Update';
    formHeader.innerText = 'Update profile';
    input_name.value = user.user_name;
    input_email.value = user.user_email;
    input_phone.value = user.user_phone;
    input_name.focus();
    console.log(input_name.value)
    edit_id = index;
};


const deleteUserProfile = (index) => {
    userArray = JSON.parse(localStorage.getItem('user_data')) ?? [];
    // console.log('User Profile Deleted', index);
    userArray.splice(index, 1);
    saveUser(userArray);
    displayUser();
}

