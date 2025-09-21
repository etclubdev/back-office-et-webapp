const Role = {
    Admin: 'Administrator',
    HR: 'Trưởng ban HR',
    Tech: 'Trưởng ban Tech',
    PR: 'Trưởng ban PR',
    EV: 'Trưởng ban EV',
    FER: 'Trưởng ban FER',
    MEM: 'CTV/TV',
}

const managePersonalInfoRoles = [Role.Admin, Role.HR, Role.Tech, Role.PR, Role.EV, Role.FER, Role.MEM];

const manageAccountRoles = [Role.Admin];

const manageGetAllPersonnelsRoles = [Role.Admin, Role.HR, Role.Tech, Role.PR, Role.EV, Role.FER];
const manageChangeHRPersonnelRoles = [Role.Admin, Role.HR];
const manageChangeTechPersonnelRoles = [Role.Admin, Role.HR, Role.Tech];
const manageChangePRPersonnelRoles = [Role.Admin, Role.HR, Role.PR];
const manageChangeEVPersonnelRoles = [Role.Admin, Role.HR, Role.EV];
const manageChangeFERPersonnelRoles = [Role.Admin, Role.HR, Role.FER];

const manageGetPartnerRoles = [Role.Admin, Role.HR, Role.Tech, Role.PR, Role.EV, Role.FER];
const manageChangePartnerRoles = [Role.Admin, Role.FER];

const manageHomePageRoles = [Role.Admin, Role.PR];

const manageGetFAQRoles = [Role.Admin, Role.HR, Role.Tech, Role.PR, Role.EV, Role.FER, Role.MEM];
const manageChangeFAQRoles = [Role.Admin, Role.PR];

const manageActivityRoles = [Role.Admin, Role.PR, Role.EV, Role.MEM];

const manageEtNewsRoles = [Role.Admin, Role.PR, Role.MEM];

const manageEtBlogRoles = [Role.Admin, Role.HR, Role.Tech, Role.PR, Role.EV, Role.FER, Role.MEM];

const manageCollaborationRoles = [Role.Admin, Role.HR, Role.Tech, Role.PR, Role.EV, Role.FER];

export default {
    managePersonalInfoRoles,
    manageAccountRoles,
    manageGetAllPersonnelsRoles,
    manageChangeHRPersonnelRoles,
    manageChangeTechPersonnelRoles,
    manageChangePRPersonnelRoles,
    manageChangeEVPersonnelRoles,
    manageChangeFERPersonnelRoles,
    manageGetPartnerRoles,
    manageChangePartnerRoles,
    manageHomePageRoles,
    manageGetFAQRoles,
    manageChangeFAQRoles,
    manageActivityRoles,
    manageEtNewsRoles,
    manageEtBlogRoles,
    manageCollaborationRoles,
} 