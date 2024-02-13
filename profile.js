const createUserButton = document.querySelectorAll('.create-profile')[0];
const form = document.querySelectorAll('.create-user-modal-popup')[0];
const closeForm = document.querySelectorAll('.close-modal')[0];
const addUserButton = document.querySelectorAll('.add-profile')[0];
const userProfileContainer = document.querySelectorAll('.user-profile-container')[0];
// const userCloseDesc = document.querySelectorAll('')[0];

form.style.display = 'none';
createUserButton.onclick = () => {
    form.style.display = 'flex';
    addUserButton.onclick = () => {
        displayProfiles();
        form.style.display = 'none';
    }
    closeForm.onclick = () => {
        form.style.display = 'none';
    }
}

let userArray = [];

let image;

// Function to create user profile and description
const createUserProfile = () => {
    const form_name = document.querySelectorAll('.name')[0].value;
    const form_email = document.querySelectorAll('.email')[0].value;
    const form_current_job = document.querySelectorAll('.current-job-input')[0].value;
    const form_job_role = document.querySelectorAll('.job-role-input')[0].value;
    const form_textarea = document.querySelectorAll('.textarea')[0].value;
    const form_facebook_link = document.querySelectorAll('.facebook-link')[0].value;
    const form_twitter_link = document.querySelectorAll('.twitter-link')[0].value;
    const form_linkedin_link = document.querySelectorAll('.linkedin-link')[0].value;
    const image_input = document.querySelectorAll('.image-file-upload')[0];

    const imageSend = () => {
        const file = image_input.files[0];
        const reader = new FileReader();

        image_input.onchange = (e) => {
            const image = document.createElement('img');
            image.className = 'user-profile-image up-e-image'
            image.src = e.target.result;
            console.log(image.src);
        }
        reader.readAsDataURL(file);
    }

    imageSend();

    let userProfile = `<div class="user-profile">
    <img src='${image.src}' alt="user-profile-image" class="user-profile-image">
    <div class="user-profile-contents-container">
        <div class="user-profile-contents">
            <span class="user-name">${form_name}</span>
            <span class="user-job-category">${form_job_role}</span>
        </div>
        <div class="social-media-links">
            <a href='${form_facebook_link}'>
                <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a href='${form_linkedin_link}'>
                <i class="fa-brands fa-linkedin-in"></i>
            </a>
            <a href='${form_twitter_link}'>
                <i class="fa-brands fa-x-twitter"></i>
            </a>
        </div>
    </div>
</div>`;

    let userProfileDescription = `<div class="up-e-container">
    <div class="top-section">
        <img src='${image.src}' alt="User-profile-image-expanded" class="up-e-image">
        <div class="user-profile-desc-close-modal"><i class="fa-solid fa-xmark"></i></div>
    </div>
    <div class="user-profile-expanded">
        <div class="up-e-upper-section">
            <span class="up-e-name">${form_name}</span>
            <span class="up-e-email">${form_email}</span>
            <span class="up-e-job-category">${form_job_role} at <span class="current-job">${form_current_job}</span></span>
            <div class="up-e-btns">
                <a href='${form_linkedin_link}'><button class="connect-user">Connect</button></a>
                <a href='${form_facebook_link}'><button class="message-user">Message</button></a>

                <button class="delete-user" onclick='deleteUserProfile()'>Delete Profile</button>
            </div>
        </div>
        <span class="job-experience-desc">${form_textarea}</span>
        <span class="social-media-reachout">
            <a href='${form_facebook_link}'><i class="fa-brands fa-facebook-f"></i></a>
            <a href='${form_linkedin_link}'><i class="fa-brands fa-linkedin-in"></i></a>
            <a href='${form_twitter_link}'><i class="fa-brands fa-x-twitter"></i></a>
        </span>
    </div>
    </div>`;

    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = userProfile.trim();
    const userProfileFinal = tempDiv.firstChild;

    let tempDiv2 = document.createElement('div');
    tempDiv2.innerHTML = userProfileDescription.trim();
    const userProfileDescriptionFinal = tempDiv2.firstChild;

    userProfileContainer.appendChild(userProfileFinal);
    userProfileContainer.appendChild(userProfileDescriptionFinal);

    return {
        'userProfile': userProfileFinal,
        'userProfileDescription': userProfileDescriptionFinal
    }
}


const displayProfiles = () => {
    let final = createUserProfile();
    let userProfile = final.userProfile;
    let userProfileDescription = final.userProfileDescription;
    userProfile.onclick = () => {
        userProfileDescription.style.display = 'block';
        userProfileDescription.querySelectorAll('.user-profile-desc-close-modal')[0].onclick = () => {
            userProfileDescription.style.display = 'none';
            allDivs.forEach(div => {
                    div.style.filter = 'none';
            });
        };
        let allDivs = document.querySelectorAll('div');
        allDivs.forEach(div => {
            if (!div.contains(userProfileDescription)) {
                div.style.filter = 'blur(10px)';
                userProfileDescription.querySelectorAll('div').forEach(childDiv => {
                    childDiv.style.filter = 'none';
                });
            } else {
                div.style.filter = 'none';
            }
        });
    }
}


const deleteUserProfile = () => {
    console.log('User profile is deleted');
}