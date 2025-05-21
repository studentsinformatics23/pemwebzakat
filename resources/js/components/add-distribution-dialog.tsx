import type React from "react";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

interface Kategori {
    id: string;
    nama: string;
}

interface Distribution {
    nama: string;
    jenis_bantuan: "beras" | "uang";
    jumlah_beras: number | null;
    jumlah_uang: number | null;
    catatan: string;
    tanggal_distribusi: string;
    status: "terkirim" | "belum_terkirim";
    kategori_id: string;
}

interface AddDistributionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    kategoris: Kategori[];
    onSubmit: (data: Distribution) => void;
}

export function AddDistributionDialog({
    open,
    onOpenChange,
    kategoris,
    onSubmit,
}: AddDistributionDialogProps) {
    const [formData, setFormData] = useState<Distribution>({
        nama: "",
        jenis_bantuan: "beras",
        jumlah_beras: null,
        jumlah_uang: null,
        catatan: "",
        tanggal_distribusi: format(new Date(), "yyyy-MM-dd"),
        status: "belum_terkirim",
        kategori_id: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [date, setDate] = useState<Date>(new Date());

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value ? Number.parseInt(value, 10) : null,
        }));

        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setDate(date);
            const formattedDate = format(date, "yyyy-MM-dd");

            setFormData((prev) => ({
                ...prev,
                tanggal_distribusi: formattedDate,
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.nama.trim()) {
            newErrors.nama = "Nama harus diisi";
        }

        if (!formData.kategori_id) {
            newErrors.kategori_id = "Kategori harus dipilih";
        }

        if (formData.jenis_bantuan === "beras" && !formData.jumlah_beras) {
            newErrors.jumlah_beras = "Jumlah beras harus diisi";
        }

        if (formData.jenis_bantuan === "uang" && !formData.jumlah_uang) {
            newErrors.jumlah_uang = "Jumlah uang harus diisi";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log({ formData });

        if (validateForm()) {
            router.post(
                "distribusi-lainnya",
                { ...formData },
                {
                    onSuccess: () => {
                        onSubmit(formData);
                        onOpenChange(false);
                        toast.success("Data telah ditambahkan", {
                            id: "distribusi-lainnya",
                        });

                        // Reset form
                        setFormData({
                            nama: "",
                            jenis_bantuan: "beras",
                            jumlah_beras: null,
                            jumlah_uang: null,
                            catatan: "",
                            tanggal_distribusi: format(
                                new Date(),
                                "yyyy-MM-dd"
                            ),
                            status: "belum_terkirim",
                            kategori_id: "",
                        });
                        setErrors({});
                    },
                    onStart: () => {
                        toast.loading("Proses sedang berlangsung", {
                            id: "distribusi-lainnya",
                        });
                    },
                    onError: (error) => {
                        console.log(error);
                        toast.error("Proses Gagal dilakukan", {
                            id: "distribusi-lainnya",
                        });
                    },
                }
            );
        }

        // if (validateForm()) {
        //   onSubmit(formData)
        //   onOpenChange(false)

        //   // Reset form
        //   setFormData({
        //     nama: "",
        //     jenis_bantuan: "beras",
        //     jumlah_beras: null,
        //     jumlah_uang: null,
        //     catatan: "",
        //     tanggal_distribusi: format(new Date(), "yyyy-MM-dd"),
        //     status: "belum_terkirim",
        //     kategori_id: "",
        //   })
        //   setErrors({})
        // }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Distribution</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new zakat distribution
                        record.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="py-2 space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="nama">
                            Nama <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="nama"
                            name="nama"
                            value={formData.nama}
                            onChange={handleChange}
                            className={cn(errors.nama && "border-red-500")}
                        />
                        {errors.nama && (
                            <p className="text-sm text-red-500">
                                {errors.nama}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="kategori">
                            Kategori <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={formData.kategori_id}
                            onValueChange={(value) =>
                                handleSelectChange("kategori_id", value)
                            }
                        >
                            <SelectTrigger
                                className={cn(
                                    errors.kategori_id && "border-red-500"
                                )}
                            >
                                <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
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
                        {errors.kategori_id && (
                            <p className="text-sm text-red-500">
                                {errors.kategori_id}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label>
                            Jenis Bantuan{" "}
                            <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                            value={formData.jenis_bantuan}
                            onValueChange={(value) =>
                                handleSelectChange("jenis_bantuan", value)
                            }
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="beras" id="beras" />
                                <Label htmlFor="beras">Beras</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="uang" id="uang" />
                                <Label htmlFor="uang">Uang</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {formData.jenis_bantuan === "beras" && (
                        <div className="grid gap-2">
                            <Label htmlFor="jumlah_beras">
                                Jumlah Beras (kg){" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="jumlah_beras"
                                name="jumlah_beras"
                                type="number"
                                min="0"
                                value={formData.jumlah_beras || ""}
                                onChange={handleNumberChange}
                                className={cn(
                                    errors.jumlah_beras && "border-red-500"
                                )}
                            />
                            {errors.jumlah_beras && (
                                <p className="text-sm text-red-500">
                                    {errors.jumlah_beras}
                                </p>
                            )}
                        </div>
                    )}

                    {formData.jenis_bantuan === "uang" && (
                        <div className="grid gap-2">
                            <Label htmlFor="jumlah_uang">
                                Jumlah Uang (Rp){" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="jumlah_uang"
                                name="jumlah_uang"
                                type="number"
                                min="0"
                                value={formData.jumlah_uang || ""}
                                onChange={handleNumberChange}
                                className={cn(
                                    errors.jumlah_uang && "border-red-500"
                                )}
                            />
                            {errors.jumlah_uang && (
                                <p className="text-sm text-red-500">
                                    {errors.jumlah_uang}
                                </p>
                            )}
                        </div>
                    )}

                    {/* <div className="grid gap-2">
            <Label htmlFor="catatan">Catatan</Label>
            <Textarea id="catatan" name="catatan" value={formData.catatan} onChange={handleChange} rows={3} />
          </div> */}

                    {/* <div className="grid gap-2">
            <Label htmlFor="tanggal_distribusi">Tanggal Distribusi</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {date ? format(date, "PPP", { locale: id }) : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
              </PopoverContent>
            </Popover>
          </div> */}

                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) =>
                                handleSelectChange("status", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="terkirim">
                                    Terkirim
                                </SelectItem>
                                <SelectItem value="belum_terkirim">
                                    Belum Terkirim
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
