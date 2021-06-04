export const MENUITEMS = {
    // 3=director; 1=User;2=District
    1: [
        { state: '/user/dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
        { state: '/user/upload', name: 'Upload Noticeboard', type: 'link', icon: 'av_timer' },
    ],
    3: [
        { state: '/admin/dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
        { state: '/admin/totalapplication', type: 'link', name: 'Total Application', icon: 'crop_7_5' },
        { state: '/admin/grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
        { state: '/admin/lists', type: 'link', name: 'Lists', icon: 'view_list' },
        { state: '/admin/menu', type: 'link', name: 'Menu', icon: 'view_headline' },
        { state: '/admin/tabs', type: 'link', name: 'Tabs', icon: 'tab' },
        { state: '/admin/stepper', type: 'link', name: 'Stepper', icon: 'web' },
        {
            state: '/admin/expansion',
            type: 'link',
            name: 'Expansion Panel',
            icon: 'vertical_align_center'
        },
        { state: '/admin/chips', type: 'link', name: 'Chips', icon: 'vignette' },
        { state: '/admin/toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
        {
            state: '/admin/progress-snipper',
            type: 'link',
            name: 'Progress snipper',
            icon: 'border_horizontal'
        },
        {
            state: '/admin/progress',
            type: 'link',
            name: 'Progress Bar',
            icon: 'blur_circular'
        },
        {
            state: '/admin/dialog',
            type: 'link',
            name: 'Dialog',
            icon: 'assignment_turned_in'
        },
        { state: '/admin/tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
        { state: '/admin/snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
        { state: '/admin/slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
        {
            state: '/admin/slide-toggle',
            type: 'link',
            name: 'Slide Toggle',
            icon: 'all_inclusive'
        }
    ]
};