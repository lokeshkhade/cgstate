export const Menus: any[] = [
    {
        path: '/home',
        title: 'Home',
        icon: '',
        submenu: []
    },
    {
        path: '/deptaboutus',
        title: 'About Us',
        icon: '',
        submenu: [
            {
                path: '/dept/:domain_name/deptaboutus',
                title: 'About Department',
                icon: '',
                submenu: []
            }
        ]
    },
    {
        path: '',
        title: 'Downloads',
        icon: '',
        submenu: [
            {
                path: '/dept/haz/deptaboutus',
                title: 'Forms/Documents',
                icon: '',
                submenu: []
            }

        ]
    },
    {
        path: '',
        title: 'Contact Us',
        icon: '',
        submenu: [
            {
                path: '/deptaboutus',
                title: 'Contact Info.',
                icon: '',
                submenu: []
            }

        ]
    }
];