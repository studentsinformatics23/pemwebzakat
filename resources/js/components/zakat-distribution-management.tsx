import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ZakatDistributionTable from "./zakat-distribution-table";
import ZakatDistributionForm from "./zakat-distribution-form";
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
import { PlusCircle, Search } from "lucide-react";
import { type ZakatDistribution, initialZakatDistributions } from "@/lib/data";
import { DistribusiZakat } from "@/pages/distribusi";

export default function ZakatDistributionManagement(props: {
    distribusiZakat: DistribusiZakat[];
}) {
    const [distributions, setDistributions] = useState<DistribusiZakat[]>(
        props.distribusiZakat
    );
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState<"confirmation" | "validation">(
        "confirmation"
    );
    const [editingDistribution, setEditingDistribution] =
        useState<DistribusiZakat | null>(null);
    const [formData, setFormData] = useState<Partial<DistribusiZakat>>({});
    const [searchQuery, setSearchQuery] = useState("");

    const itemsPerPage = 5;

    // Filter distributions based on status
    const filteredDistributions = distributions.filter((distribution) => {
        // Status filter
        if (statusFilter !== "all" && distribution.status !== statusFilter) {
            return false;
        }

        // Search filter - case insensitive search across multiple fields
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            return (
                distribution.warga.nama.toLowerCase().includes(query) ||
                distribution.status.toLowerCase().includes(query)
            );
        }

        return true;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredDistributions.length / itemsPerPage);
    const paginatedDistributions = filteredDistributions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // const handleAddDistribution = () => {
    //     setEditingDistribution(null);
    //     setFormData({
    //         status: "belum_terkirim",
    //         // distributionDate: new Date().toISOString().split("T")[0],
    //     });
    //     setIsFormOpen(true);
    // };

    const handleEditDistribution = (distribution: DistribusiZakat) => {
        setEditingDistribution(distribution);
        setFormData(distribution);
        setIsFormOpen(true);
    };

    const handleDeleteDistribution = (id: number) => {
        setDistributions(distributions.filter((d) => d.id !== id));
    };

    const handleFormSubmit = (data: Partial<DistribusiZakat>) => {
        setFormData(data);

        // Validate required fields if needed
        // (Currently commented out in your original code)

        // If we're editing an existing distribution
        if (editingDistribution) {
            // Update the distribution in the array
            setDistributions(
                distributions.map((d) =>
                    d.id === editingDistribution.id
                        ? ({ ...d, ...data } as DistribusiZakat)
                        : d
                )
            );

            // Close the form after updating
            setIsFormOpen(false);
        } else {
            // Handle new distribution case if needed
            // (Currently commented out in your original code)
        }
    };

    // const handleConfirmSubmit = () => {
    //     if (editingDistribution) {
    //         // Update existing distribution
    //         setDistributions(
    //             distributions.map((d) =>
    //                 d.id === editingDistribution.id
    //                     ? ({ ...d, ...formData } as DistribusiZakat)
    //                     : d
    //             )
    //         );
    //     } else {
    //         // Add new distribution
    //         // const newDistribution: DistribusiZakat = {
    //         //     id:
    //         //         distributions.length > 0
    //         //             ? Math.max(...distributions.map((d) => d.id)) + 1
    //         //             : 1,
    //         //     ...(formData as Omit<ZakatDistribution, "id">),
    //         // } as ZakatDistribution;

    //         // setDistributions([...distributions, newDistribution]);
    //     }

    //     setIsFormOpen(false);
    //     setIsAlertOpen(false);
    // };

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col gap-4">
                <CardTitle className="text-2xl font-bold">
                    Manajemen Distribusi Zakat
                </CardTitle>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative flex items-center w-full md:w-1/2">
                        <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama"
                            className="w-full py-2 pl-8 text-sm border rounded-md border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1); // Reset to first page when searching
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Status:</span>
                            <Select
                                value={statusFilter}
                                onValueChange={(value) => {
                                    setStatusFilter(value);
                                    setCurrentPage(1); // Reset to first page when changing filter
                                }}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="terkirim">
                                        Terkirim
                                    </SelectItem>
                                    <SelectItem value="belum_terkirim">
                                        Belum Terkirim
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* <Button onClick={handleAddDistribution} className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Distribute Zakat
            </Button> */}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ZakatDistributionTable
                    distributions={paginatedDistributions}
                    onEdit={handleEditDistribution}
                    onDelete={handleDeleteDistribution}
                />

                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <Button
                            variant="outline"
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span className="text-sm">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                )}

                <ZakatDistributionForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleFormSubmit}
                    // onSubmit={() => {}}
                    initialData={formData}
                    isEditing={!!editingDistribution}
                />

                {/* <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {alertType === "validation"
                                    ? "Incomplete Form"
                                    : "Confirm Submission"}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {alertType === "validation"
                                    ? "Please complete all required fields before submitting."
                                    : "Are you sure you want to save this distribution record?"}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            {alertType === "confirmation" && (
                                <AlertDialogAction
                                    onClick={handleConfirmSubmit}
                                >
                                    Confirm
                                </AlertDialogAction>
                            )}
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog> */}
            </CardContent>
        </Card>
    );
}
