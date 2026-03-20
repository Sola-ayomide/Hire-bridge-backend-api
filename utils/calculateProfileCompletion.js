// Calculate Profile Completion
const calculateProfileCompletion = (profile) => {
    let completedSections = 0;
    let totalSections = 7;

    const basic = profile.basicInfo;
    if (
        basic?.fullName &&
        basic?.dateOfBirth &&
        basic?.country &&
        basic?.state &&
        basic?.professionalTitle &&
        basic?.phoneNumber &&
        basic?.professionalSummary
    )completedSection++;

    if (profile.experience?.length > 0)completedSections++;

    if (profile.education?.length > 0) completedSections++;

    if (profile.skills?.length > 0) completedSections++;

    if (profile.resume?.file?.url && profile.resume?.linkedinProfile) completedSections++;

    completedSections++;

    const prefs = profile.jobPreferences;
    if (prefs?.desiredJobRole && prefs?.preferredWorkType && prefs?.employmentType) completedSections++;
     return Math.round((completedSections / totalSections) * 100);
}

export default calculateProfileCompletion;