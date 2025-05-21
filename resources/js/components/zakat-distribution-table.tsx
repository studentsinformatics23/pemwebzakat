"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import type { ZakatDistribution } from "@/lib/data"
import { DistribusiZakat } from "@/pages/distribusi"

interface ZakatDistributionTableProps {
  distributions: DistribusiZakat[]
  onEdit: (distribution: DistribusiZakat) => void
  onDelete: (id: number) => void
  searchQuery?: string
}

export default function ZakatDistributionTable({
  distributions,
  onEdit,
  onDelete,
  searchQuery,
}: ZakatDistributionTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[50px]">No</TableHead> */}
            <TableHead>Nama Penerima</TableHead>
            <TableHead>Jumlah Tanggungan</TableHead>
            {/* <TableHead>Type</TableHead> */}
            {/* <TableHead>Amount</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Distribution Date</TableHead> */}
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {distributions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="py-6 text-center text-muted-foreground">
                {searchQuery ? "No matching distribution records found" : "No distribution records found"}
              </TableCell>
            </TableRow>
          ) : (
            distributions.map((distribution, index) => (
              <TableRow key={distribution.id}>
                {/* <TableCell>{index + 1}</TableCell> */}
                <TableCell className="font-medium">{distribution.warga.nama}</TableCell>
                <TableCell>{distribution.warga.jumlah_tanggungan}</TableCell>
                {/* <TableCell>{distribution.assistanceType}</TableCell> */}
                {/* <TableCell>
                  {distribution.assistanceType === "Rice"
                    ? `${distribution.amount} Kg`
                    : `IDR ${distribution.amount.toLocaleString()}`}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{distribution.notes || "-"}</TableCell>
                <TableCell>{new Date(distribution.distributionDate).toLocaleDateString()}</TableCell> */}
                <TableCell>
                  <Badge
                    variant={distribution.status === "terkirim" ? "default" : "destructive"}
                    className={
                      distribution.status === "terkirim"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {distribution.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(distribution)} className="w-8 h-8">
                      <Edit className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(distribution.id)}
                      className="w-8 h-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
