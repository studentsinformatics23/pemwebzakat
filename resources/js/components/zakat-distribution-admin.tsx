import { useState, useEffect } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Search,
    Plus,
    SortAsc,
    SortDesc,
    Calendar,
    Info,
    Pencil,
    Trash2,
} from "lucide-react";

import { TableSkeleton } from "@/components/table-skeleton";
import { AddDistributionDialog } from "./add-distribution-dialog";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

// Types
interface Kategori {
    id: string;
    nama: string;
}

export interface Distribution {
    id: string;
    nama: string;
    jenis_bantuan: "beras" | "uang";
    jumlah_beras: number | null;
    jumlah_uang: number | null;
    catatan: string;
    tanggal_distribusi: string;
    status: "terkirim" | "belum_terkirim";
    kategori_id: string;
    kategori?: Kategori;
}

// Mock data for demonstration
const mockKategoris: Kategori[] = [
    { id: "1", nama: "Fakir" },
    { id: "2", nama: "Miskin" },
    { id: "3", nama: "Amil" },
    { id: "4", nama: "Muallaf" },
    { id: "5", nama: "Riqab" },
    { id: "6", nama: "Gharim" },
    { id: "7", nama: "Fisabilillah" },
    { id: "8", nama: "Ibnu Sabil" },
    { id: "9", nama: "Mampu" },
];

export function ZakatDistributionAdmin(props: {
    distribusiZakatLainnya: Distribution[];
}) {
    const [distributions, setDistributions] = useState<Distribution[]>([]);
    const [filteredDistributions, setFilteredDistributions] = useState<
        Distribution[]
    >([]);
    const [kategoris, setKategoris] = useState<Kategori[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Distribution | null;
        direction: "asc" | "desc" | null;
    }>({ key: null, direction: null });

    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDeleteConfirm = () => {
        if (selectedItem) {
            router.delete(`/distribusi-lainnya/${selectedItem!}`, {
                onSuccess: () => {
                    setDistributions((prev) =>
                        prev.filter((item) => item.nama !== selectedItem)
                    );
                    toast.success("Data berhasil dihapus", {
                        id: "delete-muzakki-lainnya",
                    });
                    setIsDeleteDialogOpen(false);
                    setSelectedItem(null);
                },
                onError: (errors) => {
                    toast.error(
                        "Terjadi Kesalahan Tolong Ulangi setelah beberapa saat",
                        {
                            id: "delete-muzakki-lainnya",
                        }
                    );
                    console.error(errors);
                },
                onStart: () => {
                    toast.loading("Data Sedang Diproses", {
                        id: "delete-muzakki-lainnya",
                    });
                },
            });
            setIsDeleteDialogOpen(false);
        }
    };

    const itemsPerPage = 10;

    // Fetch data (simulated)
    useEffect(() => {
        const fetchData = async () => {
            // Simulate API call
            // await new Promise((resolve) => setTimeout(resolve, 1000));
            setDistributions(props.distribusiZakatLainnya);
            setKategoris(mockKategoris);
            setLoading(false);
        };

        fetchData();
    }, []);

    // Filter and search data
    useEffect(() => {
        let result = [...distributions];

        // Apply category filter
        if (categoryFilter && categoryFilter !== "all") {
            result = result.filter(
                (item) => String(item.kategori_id) === categoryFilter
            );
        }

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result?.filter(
                (item) =>
                    item?.nama?.toLowerCase().includes(query) ||
                    item?.catatan?.toLowerCase().includes(query) ||
                    item?.status?.toLowerCase().includes(query)
            );
        }

        // Apply sorting
        if (sortConfig.key && sortConfig.direction) {
            result.sort((a, b) => {
                const aValue = a[sortConfig.key as keyof Distribution];
                const bValue = b[sortConfig.key as keyof Distribution];

                if (aValue === null)
                    return sortConfig.direction === "asc" ? -1 : 1;
                if (bValue === null)
                    return sortConfig.direction === "asc" ? 1 : -1;

                if (aValue! < bValue!)
                    return sortConfig.direction === "asc" ? -1 : 1;
                if (aValue! > bValue!)
                    return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }

        setFilteredDistributions(result);
        setCurrentPage(1);
    }, [distributions, categoryFilter, searchQuery, sortConfig, selectedItem]);

    // Handle sorting
    const handleSort = (key: keyof Distribution) => {
        let direction: "asc" | "desc" | null = "asc";

        if (sortConfig.key === key) {
            if (sortConfig.direction === "asc") {
                direction = "desc";
            } else if (sortConfig.direction === "desc") {
                direction = null;
            }
        }

        setSortConfig({ key, direction });
    };

    // Get current page items
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredDistributions.slice(
            startIndex,
            startIndex + itemsPerPage
        );
    };

    // // Format date
    // const formatDate = (dateString: string) => {
    //     const date = new Date(dateString);
    //     return new Intl.DateTimeFormat("id-ID", {
    //         day: "numeric",
    //         month: "long",
    //         year: "numeric",
    //     }).format(date);
    // };

    // Handle add new distribution
    const handleAddDistribution = (
        newDistribution: Omit<Distribution, "id">
    ) => {
        const id = (distributions.length + 1).toString();
        const kategori = kategoris.find(
            (k) => k.id === newDistribution.kategori_id
        );

        setDistributions([
            ...distributions,
            {
                id,
                ...newDistribution,
                kategori,
            },
        ]);
    };

    // Calculate total pages
    const totalPages = Math.ceil(filteredDistributions.length / itemsPerPage);

    // Generate pagination items
    const getPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxVisiblePages / 2)
        );
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        isActive={currentPage === i}
                        onClick={() => setCurrentPage(i)}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    // Render sort icon
    const renderSortIcon = (key: keyof Distribution) => {
        if (sortConfig.key !== key) {
            return null;
        }

        return sortConfig.direction === "asc" ? (
            <SortAsc className="inline w-4 h-4 ml-1" />
        ) : (
            <SortDesc className="inline w-4 h-4 ml-1" />
        );
    };

    return (
        <Card className="shadow-md rounded-2xl">
            <CardHeader className="pb-2">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* <div>
                        <CardTitle>Zakat Distribution Records</CardTitle>
                        <CardDescription>
                            Manage and track zakat distribution to recipients
                        </CardDescription>
                    </div> */}
                    <Button
                        onClick={() => setIsDialogOpen(true)}
                        className="self-end md:self-auto"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Tambah Penerima
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4 mb-6 md:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, notes, or status..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Select
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                    >
                        <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue placeholder="Filter by Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {kategoris.map((kategori) => (
                                <SelectItem
                                    key={kategori.id}
                                    value={kategori.id}
                                >
                                    {kategori.nama}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {loading ? (
                    <TableSkeleton />
                ) : (
                    <>
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead
                                            className="cursor-pointer"
                                            onClick={() => handleSort("nama")}
                                        >
                                            Nama {renderSortIcon("nama")}
                                        </TableHead>
                                        <TableHead
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleSort("jenis_bantuan")
                                            }
                                        >
                                            Jenis Bantuan{" "}
                                            {renderSortIcon("jenis_bantuan")}
                                        </TableHead>
                                        <TableHead
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleSort("jumlah_beras")
                                            }
                                        >
                                            Jumlah Beras{" "}
                                            {renderSortIcon("jumlah_beras")}
                                        </TableHead>
                                        <TableHead
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleSort("jumlah_uang")
                                            }
                                        >
                                            Jumlah Uang{" "}
                                            {renderSortIcon("jumlah_uang")}
                                        </TableHead>

                                        <TableHead
                                            className="cursor-pointer"
                                            onClick={() => handleSort("status")}
                                        >
                                            Status {renderSortIcon("status")}
                                        </TableHead>
                                        <TableHead>Kategori</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {getCurrentPageItems().length > 0 ? (
                                        getCurrentPageItems().map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">
                                                    {item.nama}
                                                </TableCell>
                                                <TableCell>
                                                    {item.jenis_bantuan ===
                                                    "beras"
                                                        ? "Beras"
                                                        : "Uang"}
                                                </TableCell>
                                                <TableCell>
                                                    {item.jumlah_beras !== null
                                                        ? `${item.jumlah_beras} kg`
                                                        : "-"}
                                                </TableCell>
                                                <TableCell>
                                                    {item.jumlah_uang !== null
                                                        ? new Intl.NumberFormat(
                                                              "id-ID",
                                                              {
                                                                  style: "currency",
                                                                  currency:
                                                                      "IDR",
                                                                  maximumFractionDigits: 0,
                                                              }
                                                          ).format(
                                                              item.jumlah_uang
                                                          )
                                                        : "-"}
                                                </TableCell>
                                                {/* <TableCell>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <div className="max-w-[200px] truncate">
                                                                    {
                                                                        item.catatan
                                                                    }
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="max-w-xs">
                                                                <p>
                                                                    {
                                                                        item.catatan
                                                                    }
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                                                        {formatDate(
                                                            item.tanggal_distribusi
                                                        )}
                                                    </div>
                                                </TableCell> */}
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            item.status ===
                                                            "terkirim"
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                        className={
                                                            item.status ===
                                                            "terkirim"
                                                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                                : "bg-orange-100 text-orange-800 hover:bg-orange-100"
                                                        }
                                                    >
                                                        {item.status ===
                                                        "terkirim"
                                                            ? "Terkirim"
                                                            : "Belum Terkirim"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {item.kategori?.nama || "-"}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        {/* <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>{}
                                                                // handleEdit(item)
                                                            }
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </Button> */}
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() => {
                                                                setSelectedItem(
                                                                    item?.nama!
                                                                );
                                                                setIsDeleteDialogOpen(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={8}
                                                className="py-6 text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                    <Info className="w-10 h-10 mb-2" />
                                                    <p>No records found</p>
                                                    <p className="text-sm">
                                                        Try adjusting your
                                                        search or filter
                                                    </p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <AlertDialog
                            open={isDeleteDialogOpen}
                            onOpenChange={setIsDeleteDialogOpen}
                        >
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete{" "}
                                        <span className="font-semibold">
                                            {selectedItem?.nama}
                                        </span>
                                        ’s distribution record.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        onClick={() =>
                                            setIsDeleteDialogOpen(false)
                                        }
                                    >
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-destructive hover:bg-destructive/90"
                                        onClick={handleDeleteConfirm}
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        {filteredDistributions.length > 0 && (
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing{" "}
                                    {Math.min(
                                        (currentPage - 1) * itemsPerPage + 1,
                                        filteredDistributions.length
                                    )}{" "}
                                    to{" "}
                                    {Math.min(
                                        currentPage * itemsPerPage,
                                        filteredDistributions.length
                                    )}{" "}
                                    of {filteredDistributions.length} entries
                                </div>
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => {
                                                    if (currentPage !== 1) {
                                                        setCurrentPage((prev) =>
                                                            Math.max(
                                                                1,
                                                                prev - 1
                                                            )
                                                        );
                                                    }
                                                }}
                                                // visually indicate disabled state if needed
                                                aria-disabled={
                                                    currentPage === 1
                                                }
                                            />
                                        </PaginationItem>

                                        {getPaginationItems()}

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => {
                                                    if (
                                                        currentPage !==
                                                        totalPages
                                                    ) {
                                                        setCurrentPage((prev) =>
                                                            Math.min(
                                                                totalPages,
                                                                prev + 1
                                                            )
                                                        );
                                                    }
                                                }}
                                                aria-disabled={
                                                    currentPage === totalPages
                                                }
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </>
                )}
            </CardContent>

            <AddDistributionDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                kategoris={kategoris}
                onSubmit={handleAddDistribution}
            />
        </Card>
    );
}
