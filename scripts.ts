// TypeScript code for Dynamic Resume Builder
// Author: [Hassaan]
declare var html2pdf: any;

// DOM Elements
const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplay = document.getElementById('resume-display') as HTMLElement;
const resumeContent = document.getElementById('resume-content') as HTMLElement;
const resumeLinkDisplay = document.createElement('div');
const profilePictureInput = document.getElementById('profile-picture') as HTMLInputElement;
const profilePreview = document.getElementById('profile-preview') as HTMLImageElement;
const saveResumeBtn = document.getElementById('save-resume-btn') as HTMLButtonElement;
const copyLinkBtn = document.getElementById('copy-link-btn') as HTMLButtonElement;
const downloadPdfBtn = document.getElementById('download-pdf-btn') as HTMLButtonElement;

// Personal Info Fields
const nameInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const phoneInput = document.getElementById('phone') as HTMLInputElement;
const addressInput = document.getElementById('address') as HTMLInputElement;

// Resume Display Fields
const resumeName = document.getElementById('resume-name') as HTMLElement;
const resumeEmail = document.getElementById('resume-email') as HTMLElement;
const resumePhone = document.getElementById('resume-phone') as HTMLElement;
const resumeAddress = document.getElementById('resume-address') as HTMLElement;
const resumeProfilePicture = document.getElementById('resume-profile-picture') as HTMLImageElement;

// Education fields
const educationInstitutionInput = document.getElementById('education-institution') as HTMLInputElement;
const educationDegreeInput = document.getElementById('education-degree') as HTMLInputElement;
const educationYearInput = document.getElementById('education-year') as HTMLInputElement;

// Work experience fields
const workExperienceCompanyInput = document.getElementById('work-experience-company') as HTMLInputElement;
const workExperiencePositionInput = document.getElementById('work-experience-position') as HTMLInputElement;
const workExperienceYearsInput = document.getElementById('work-experience-years') as HTMLInputElement;

// Skills and resume display elements
const skillsInput = document.getElementById('skills') as HTMLInputElement;
const resumeSkillsList = document.getElementById('resume-skills') as HTMLElement;
const resumeEducation = document.getElementById('resume-education') as HTMLElement;
const resumeExperience = document.getElementById('resume-experience') as HTMLElement;

// Handle Profile Picture Upload and Preview
profilePictureInput.addEventListener('change', () => {
    const file = profilePictureInput.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            profilePreview.src = result;
            profilePreview.style.display = 'block';

            // Ensure profile picture is shown in resume
            if (resumeProfilePicture) {
                resumeProfilePicture.src = result;
                resumeProfilePicture.style.display = 'block';
            } else {
                console.error('resumeProfilePicture element not found.');
            }
        };
        reader.readAsDataURL(file);
    }
});

// Form submission to generate resume
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Generate a unique URL for the resume
    const username = (document.getElementById("username") as HTMLInputElement)?.value || "";
    const resumeUrl = `https://${username}.vercel.app/resume`;

    resumeLinkDisplay.innerHTML = `<a href="${resumeUrl}" target="_blank">${resumeUrl}</a>`;
    resumeLinkDisplay.style.display = "block";


    // Show the resume display section
    resumeDisplay.style.display = 'block';

    // Set the resume data
    resumeName.textContent = nameInput.value;
    resumeEmail.textContent = emailInput.value;
    resumePhone.textContent = phoneInput.value;
    resumeAddress.textContent = addressInput.value;

    // Education Info
    resumeEducation.innerHTML = `
        <p><strong>Institution:</strong> ${educationInstitutionInput.value}</p>
        <p><strong>Degree:</strong> ${educationDegreeInput.value}</p>
        <p><strong>Year of Graduation:</strong> ${educationYearInput.value}</p>
    `;

    // Work Experience Info
    resumeExperience.innerHTML = `
        <p><strong>Company:</strong> ${workExperienceCompanyInput.value}</p>
        <p><strong>Position:</strong> ${workExperiencePositionInput.value}</p>
        <p><strong>Years Worked:</strong> ${workExperienceYearsInput.value}</p>
    `;

        // Skills Info
    const skillsArray = skillsInput.value.split(',').map(skill => skill.trim());
    resumeSkillsList.innerHTML = '';
    skillsArray.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        resumeSkillsList.appendChild(li);
    });

    // Enable the save, copy link, and download buttons
    saveResumeBtn.style.display = 'block';
    copyLinkBtn.style.display = 'block';
    downloadPdfBtn.style.display = 'block';

    makeSectionsEditable(); // Enable editing functionality
});

// Make all sections of the resume editable
function makeSectionsEditable() {
    const editableSections = [resumeName, resumeEmail, resumePhone, resumeAddress, resumeEducation, resumeExperience, resumeSkillsList];
    
    editableSections.forEach(section => {
        section.setAttribute('contenteditable', 'true');
        section.addEventListener('input', () => {
            saveResumeBtn.style.display = 'block'; // Show save button on edit
        });
    });
}

// Save resume changes
saveResumeBtn.addEventListener('click', () => {
    alert('Resume changes have been saved.');
});
// Copy resume link to clipboard
copyLinkBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(resumeLinkDisplay.textContent || "");
    alert("Resume link copied to clipboard!");
});


// Download resume as PDF
downloadPdfBtn.addEventListener('click', () => {
    html2pdf().from(resumeContent).save();
});
