import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model = [
        {
            label: "Home",
            items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }],
        },
        {
            label: "Admin",
            items: [
                {
                    label: "Appointment List",
                    icon: "pi pi-fw pi-bookmark",
                    to: "/pages/appointment-list",
                },
                {
                    label: "Time Management",
                    icon: "pi pi-fw pi-bookmark",
                },
                {
                    label: "Chamber Menagement",
                    icon: "pi pi-fw pi-bookmark",
                },
                {
                    label: "Availability Management",
                    icon: "pi pi-fw pi-bookmark",
                },
                {
                    label: "General Setting",
                    icon: "pi pi-fw pi-bookmark",
                },
                {
                    label: "SMS Templates",
                    icon: "pi pi-fw pi-bookmark",
                },
            ],
        },
        {
            label: "Pages",
            icon: "pi pi-fw pi-briefcase",
            to: "/pages",
            items: [
                {
                    label: "Auth",
                    icon: "pi pi-fw pi-user",
                    items: [
                        {
                            label: "Login",
                            icon: "pi pi-fw pi-sign-in",
                            to: "/auth/login",
                        },
                        {
                            label: "Error",
                            icon: "pi pi-fw pi-times-circle",
                            to: "/auth/error",
                        },
                        {
                            label: "Access Denied",
                            icon: "pi pi-fw pi-lock",
                            to: "/auth/access",
                        },
                    ],
                },
                {
                    label: "Not Found",
                    icon: "pi pi-fw pi-exclamation-circle",
                    to: "/pages/notfound",
                },
            ],
        },
        ,
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
