import { FolderKanban, Car, Map, Copy } from 'lucide-react';

export const NAVBAR_LINKS = [
    {
        iconName: FolderKanban,
        name: "Overview",
        url: '/overview'
    },
    {
        iconName: Car,
        name: "Distribution by Manufacturer",
        url: '/makewise'
    },
    {
        iconName: Map,
        name: "Distribution by Region",
        url: '/regionwise'
    },
    {
        iconName: Copy,
        name: "Compare",
        url: '/compare'
    },

]