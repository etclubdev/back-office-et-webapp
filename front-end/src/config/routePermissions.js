export const routePermissions = {
    "/unauthorized": [],
    "/": [],
    "/profile": [],

    "/accounts": ["ADMIN"],
    "/accounts/create": ["ADMIN"],
    "/accounts/edit/:id": ["ADMIN"],

    "/colleague/tech": ["GET_PERSONNEL"],
    "/colleague/hr": ["GET_PERSONNEL"],
    "/colleague/event": ["GET_PERSONNEL"],
    "/colleague/fer": ["GET_PERSONNEL"],
    "/colleague/pr": ["GET_PERSONNEL"],

    "/colleague/hr/create": ["MANAGE_PERSONNEL"],
    "/colleague/hr/edit/:id": ["MANAGE_PERSONNEL"],
    "/colleague/tech/create": ["MANAGE_PERSONNEL"],
    "/colleague/tech/edit/:id": ["MANAGE_PERSONNEL"],
    "/colleague/pr/create": ["MANAGE_PERSONNEL"],
    "/colleague/pr/edit/:id": ["MANAGE_PERSONNEL"],
    "/colleague/event/create": ["MANAGE_PERSONNEL"],
    "/colleague/event/edit/:id": ["MANAGE_PERSONNEL"],
    "/colleague/fer/create": ["MANAGE_PERSONNEL"],
    "/colleague/fer/edit/:id": ["MANAGE_PERSONNEL"],

    "/partners": ["MANAGE_PERSONNEL"],
    "/partners/create": ["MANAGE_PARTNER"],
    "/partners/edit/:id": ["MANAGE_PARTNER"],

    "/homepage-achievements": ["MANAGE_ACHIEVEMENT"],

    "/homepage-partners":["UPDATE_PARTNER"],

    "/homepage-faqs": ["MANAGE_FAQ"],

    "/homepage-banners": ["MANAGE_BANNER"],
    "/homepage-banners/create": ["MANAGE_BANNER"],
    "/homepage-banners/edit/:id": ["MANAGE_BANNER"],

    "/faqs": ["MANAGE_PERSONNEL"],
    "/faqs/create": ["MANAGE_FAQ"],
    "/faqs/edit/:id": ["MANAGE_FAQ"],

    "/activities": ["MANAGE_ACTIVITY"],
    "/activities/create": ["MANAGE_ACTIVITY"],
    "/activities/edit/:id": ["MANAGE_ACTIVITY"],

    "/et-news": ["MANAGE_ETNEWS"],
    "/et-news/create": ["MANAGE_ETNEWS"],
    "/et-news/edit/:id": ["MANAGE_ETNEWS"],

    "/et-blog": ["MANAGE_ETBLOG"],
    "/et-blog/create": ["MANAGE_ETBLOG"],
    "/et-blog/edit/:id": ["MANAGE_ETBLOG"],

    "/collaborator/overview": ["MANAGE_PERSONNEL"],
    "/collaborator/approve": ["MANAGE_PERSONNEL"],
    "/collaborator/archive": ["MANAGE_PERSONNEL"],
};
