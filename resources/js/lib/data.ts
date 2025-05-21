export interface ZakatDistribution {
    id: number;
    recipientName: string;
    zakatCategory: string;
    assistanceType: "Rice" | "Money";
    amount: number;
    notes?: string;
    distributionDate: string;
    status: "Delivered" | "Not Delivered";
}

export const zakatCategories = [
    "Fakir",
    "Miskin",
    "Amil",
    "Muallaf",
    "Riqab",
    "Gharimin",
    "Fisabilillah",
    "Ibnu Sabil",
];

export const wargaList = [
    "Ahmad Sudrajat",
    "Siti Aminah",
    "Budi Santoso",
    "Dewi Kartika",
    "Eko Prasetyo",
    "Fitri Handayani",
    "Gunawan Wibowo",
    "Hani Permata",
    "Irfan Hakim",
    "Joko Widodo",
];

export const initialZakatDistributions: ZakatDistribution[] = [
    {
        id: 1,
        recipientName: "Ahmad Sudrajat",
        zakatCategory: "Fakir",
        assistanceType: "Rice",
        amount: 10,
        notes: "Monthly assistance",
        distributionDate: "2023-05-15",
        status: "Delivered",
    },
    {
        id: 2,
        recipientName: "Siti Aminah",
        zakatCategory: "Miskin",
        assistanceType: "Money",
        amount: 500000,
        notes: "For medical expenses",
        distributionDate: "2023-05-16",
        status: "Delivered",
    },
    {
        id: 3,
        recipientName: "Budi Santoso",
        zakatCategory: "Muallaf",
        assistanceType: "Money",
        amount: 750000,
        distributionDate: "2023-05-20",
        status: "Not Delivered",
    },
    {
        id: 4,
        recipientName: "Dewi Kartika",
        zakatCategory: "Fisabilillah",
        assistanceType: "Rice",
        amount: 5,
        notes: "Education support",
        distributionDate: "2023-05-22",
        status: "Not Delivered",
    },
    {
        id: 5,
        recipientName: "Eko Prasetyo",
        zakatCategory: "Gharimin",
        assistanceType: "Money",
        amount: 1000000,
        notes: "Debt relief",
        distributionDate: "2023-05-25",
        status: "Delivered",
    },
    {
        id: 6,
        recipientName: "Fitri Handayani",
        zakatCategory: "Ibnu Sabil",
        assistanceType: "Money",
        amount: 300000,
        notes: "Travel assistance",
        distributionDate: "2023-05-28",
        status: "Not Delivered",
    },
];
