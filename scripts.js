// // Function to render skills in separate bordered frames
// function renderSkills(skills: string) {
//     const skillsContainer = document.createElement('div');
//     skillsContainer.style.display = 'flex';
//     skillsContainer.style.flexWrap = 'wrap';
//     const skillList = skills.split(',').map(skill => skill.trim());
//     skillList.forEach(skill => {
//         const skillBox = document.createElement('div');
//         skillBox.contentEditable = 'true';  // Allow user to edit individual skills
//         skillBox.innerText = skill;
//         skillBox.style.border = '1px solid #000';
//         skillBox.style.borderRadius = '8px';
//         skillBox.style.padding = '5px 10px';
//         skillBox.style.margin = '5px';
//         skillBox.style.minWidth = '100px';
//         skillBox.style.textAlign = 'center';
//         skillsContainer.appendChild(skillBox);
//     });
//     return skillsContainer;
// }
// // HTML elements
// const form = document.getElementById("resume-form") as HTMLFormElement;
// const resumeContent = document.getElementById("resume-content") as HTMLElement;
// const resumeDisplay = document.getElementById("resume-display") as HTMLElement;
// const resumeLinkDisplay = document.createElement('div');
// document.body.appendChild(resumeLinkDisplay);
// const downloadButton = document.getElementById("download-pdf-btn") as HTMLButtonElement;
// const copyLinkButton = document.getElementById("copy-link-btn") as HTMLButtonElement;
// // Form submit event to generate the resume
// form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     // Get form values
//     const name = (document.getElementById("name") as HTMLInputElement)?.value || "";
//     const email = (document.getElementById("email") as HTMLInputElement)?.value || "";
//     const phone = (document.getElementById("phone") as HTMLInputElement)?.value || "";
//     const address = (document.getElementById("address") as HTMLInputElement)?.value || "";
//     const institution = (document.getElementById("education-institution") as HTMLInputElement)?.value || "";
//     const degree = (document.getElementById("education-degree") as HTMLInputElement)?.value || "";
//     const educationYear = (document.getElementById("education-year") as HTMLInputElement)?.value || "";
//     const company = (document.getElementById("work-experience-company") as HTMLInputElement)?.value || "";
//     const position = (document.getElementById("work-experience-position") as HTMLInputElement)?.value || "";
//     const yearsWorked = (document.getElementById("work-experience-years") as HTMLInputElement)?.value || "";
//     const skills = (document.getElementById("skills") as HTMLInputElement)?.value || "";
//     // Generate a unique URL for the resume
//     const username = (document.getElementById("username") as HTMLInputElement)?.value || "";
//     const resumeUrl = `https://${username}.vercel.app/resume`;
//     resumeLinkDisplay.innerHTML = `<p>Your resume can be shared via this link: <a href="${resumeUrl}" target="_blank">${resumeUrl}</a></p>`;
//     resumeLinkDisplay.style.display = "block";
//     // Insert resume content into the DOM with the captured form values
//     resumeContent.innerHTML = `
//         <div class="resume-header">
//             <h1 contenteditable="true" class="resume-name">${name}</h1>
//             <p contenteditable="true" class="resume-contact">${email} | ${phone} | ${address}</p>
//         </div>
//         <div class="resume-section">
//             <h2>Education</h2>
//             <p contenteditable="true"><strong contenteditable="true">${degree}</strong>, ${institution}, ${educationYear}</p>
//         </div>
//         <div class="resume-section">
//             <h2>Work Experience</h2>
//             <p contenteditable="true"><strong contenteditable="true">${position}</strong>, ${company}, ${yearsWorked} years</p>
//         </div>
//     `;
//     // Append skills section
//     resumeContent.appendChild(renderSkills(skills));
//     resumeDisplay.style.display = "block";
//     downloadButton.style.display = "inline-block";
//     copyLinkButton.style.display = "inline-block";
// });
// // Download resume as PDF
// downloadButton.addEventListener("click", () => {
//     html2pdf().from(resumeContent).save();
// });
// // Copy resume link to clipboard
// copyLinkButton.addEventListener("click", () => {
//     navigator.clipboard.writeText(resumeLinkDisplay.textContent || "");
//     alert("Resume link copied to clipboard!");
// });
// TypeScript code for Dynamic Resume Builder
// DOM Elements
var themeSelect = document.getElementById('theme-select');
var form = document.getElementById('resume-form');
var resumeDisplay = document.getElementById('resume-display');
var resumeContent = document.getElementById('resume-content');
var resumeLinkDisplay = document.createElement('div');
var profilePictureInput = document.getElementById('profile-picture');
var profilePreview = document.getElementById('profile-preview');
var saveResumeBtn = document.getElementById('save-resume-btn');
var copyLinkBtn = document.getElementById('copy-link-btn');
var downloadPdfBtn = document.getElementById('download-pdf-btn');
// Personal Info Fields
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var addressInput = document.getElementById('address');
// Resume Display Fields
var resumeName = document.getElementById('resume-name');
var resumeEmail = document.getElementById('resume-email');
var resumePhone = document.getElementById('resume-phone');
var resumeAddress = document.getElementById('resume-address');
var resumeProfilePicture = document.getElementById('resume-profile-picture');
// Education fields
var educationInstitutionInput = document.getElementById('education-institution');
var educationDegreeInput = document.getElementById('education-degree');
var educationYearInput = document.getElementById('education-year');
// Work experience fields
var workExperienceCompanyInput = document.getElementById('work-experience-company');
var workExperiencePositionInput = document.getElementById('work-experience-position');
var workExperienceYearsInput = document.getElementById('work-experience-years');
// Skills and resume display elements
var skillsInput = document.getElementById('skills');
var resumeSkillsList = document.getElementById('resume-skills');
var resumeEducation = document.getElementById('resume-education');
var resumeExperience = document.getElementById('resume-experience');
// Handle Profile Picture Upload and Preview
profilePictureInput.addEventListener('change', function () {
    var _a;
    var file = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var result = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            profilePreview.src = result;
            profilePreview.style.display = 'block';
            // Ensure profile picture is shown in resume
            if (resumeProfilePicture) {
                resumeProfilePicture.src = result;
                resumeProfilePicture.style.display = 'block';
            }
            else {
                console.error('resumeProfilePicture element not found.');
            }
        };
        reader.readAsDataURL(file);
    }
});
// Form submission to generate resume
form.addEventListener('submit', function (e) {
    var _a;
    e.preventDefault();
    // Generate a unique URL for the resume
    var username = ((_a = document.getElementById("username")) === null || _a === void 0 ? void 0 : _a.value) || "";
    var resumeUrl = "https://".concat(username, ".vercel.app/resume");
    resumeLinkDisplay.innerHTML = "<a href=\"".concat(resumeUrl, "\" target=\"_blank\">").concat(resumeUrl, "</a>");
    resumeLinkDisplay.style.display = "block";
    // Show the resume display section
    resumeDisplay.style.display = 'block';
    // Set the resume data
    resumeName.textContent = nameInput.value;
    resumeEmail.textContent = emailInput.value;
    resumePhone.textContent = phoneInput.value;
    resumeAddress.textContent = addressInput.value;
    // Education Info
    resumeEducation.innerHTML = "\n        <p><strong>Institution:</strong> ".concat(educationInstitutionInput.value, "</p>\n        <p><strong>Degree:</strong> ").concat(educationDegreeInput.value, "</p>\n        <p><strong>Year of Graduation:</strong> ").concat(educationYearInput.value, "</p>\n    ");
    // Work Experience Info
    resumeExperience.innerHTML = "\n        <p><strong>Company:</strong> ".concat(workExperienceCompanyInput.value, "</p>\n        <p><strong>Position:</strong> ").concat(workExperiencePositionInput.value, "</p>\n        <p><strong>Years Worked:</strong> ").concat(workExperienceYearsInput.value, "</p>\n    ");
    // Skills Info
    var skillsArray = skillsInput.value.split(',').map(function (skill) { return skill.trim(); });
    resumeSkillsList.innerHTML = '';
    skillsArray.forEach(function (skill) {
        var li = document.createElement('li');
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
    var editableSections = [resumeName, resumeEmail, resumePhone, resumeAddress, resumeEducation, resumeExperience, resumeSkillsList];
    editableSections.forEach(function (section) {
        section.setAttribute('contenteditable', 'true');
        section.addEventListener('input', function () {
            saveResumeBtn.style.display = 'block'; // Show save button on edit
        });
    });
}
// Save resume changes
saveResumeBtn.addEventListener('click', function () {
    alert('Resume changes have been saved.');
});
// Copy resume link to clipboard
copyLinkBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(resumeLinkDisplay.textContent || "");
    alert("Resume link copied to clipboard!");
});
// Download resume as PDF
downloadPdfBtn.addEventListener('click', function () {
    html2pdf().from(resumeContent).save();
});
