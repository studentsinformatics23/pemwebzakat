"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { BadgeCheck, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Pencil, Wallet } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { ZakatRecord } from "@/lib/types"

import { formatCurrency, formatWeight } from "@/lib/utils"
import EditRecordModal from "./edit-record-modal"

interface DataTableProps {
  data: ZakatRecord[]
  currentPage: number
  setCurrentPage: (page: number) => void
  rowsPerPage: number
  setRowsPerPage: (rows: string) => void
  updateRecord: (record: ZakatRecord) => void
}

export default function DataTable({
  data,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  updateRecord,
}: DataTableProps) {
  const [editingRecord, setEditingRecord] = useState<ZakatRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Calculate pagination
  const totalPages = Math.ceil(data.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = Math.min(startIndex + rowsPerPage, data.length)
  const currentData = data.slice(startIndex, endIndex)

  const handleEditClick = (record: ZakatRecord) => {
    setEditingRecord(record)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingRecord(null)
  }

  const handleSaveRecord = (record: ZakatRecord) => {
    updateRecord(record)
    setIsModalOpen(false)
    setEditingRecord(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-700 border-yellow-200 bg-yellow-50">
            Pending
          </Badge>
        )
      case "lunas":
        return (
          <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
            Lunas
          </Badge>
        )
      case "batal":
        return (
          <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50">
            Batal
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div>
      <div className="overflow-hidden border rounded-md">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="w-[80px]">ID</TableHead> */}
                <TableHead>Nama KK</TableHead>
                <TableHead className="hidden md:table-cell">Nomor KK</TableHead>
                <TableHead className="hidden md:table-cell">Tanggungan</TableHead>
                {/* <TableHead>Jenis Bayar</TableHead>
                <TableHead className="hidden sm:table-cell">Pembayaran</TableHead>
                <TableHead>Total</TableHead> */}
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                currentData.map((record) => (
                  <TableRow key={record.id}>
                    {/* <TableCell className="font-medium">{record.id}</TableCell> */}
                    <TableCell>{record.nama_KK}</TableCell>
                    <TableCell className="hidden md:table-cell">{record.nomor_KK}</TableCell>
                    <TableCell className="hidden md:table-cell">{record.jumlah_tanggungan}</TableCell>
                    {/* <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          record.jenis_bayar === "beras"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-purple-50 text-purple-700 border-purple-200"
                        }
                      >
                        {record.jenis_bayar === "beras" ? "Beras" : "Uang"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {record.jenis_bayar === "beras"
                        ? formatWeight(record.bayar_beras || 0)
                        : formatCurrency(record.bayar_uang || 0)}
                    </TableCell>
                    <TableCell>{formatCurrency(record.total_zakat)}</TableCell> */}
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="secondary"
                        // size="icon"
                        onClick={() => handleEditClick(record)}
                        className="text-xs"
                      >
                        <Wallet className="w-4 h-4" />
                        {/* <span className="sr-only">Konfirmasi Pembayaran</span> */}
                        <span className="text-xs">Konfirmasi Pembayaran</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between mt-4 space-y-3 sm:flex-row sm:space-y-0">
        <div className="text-sm text-gray-500">
          Showing {data.length > 0 ? startIndex + 1 : 0}-{endIndex} of {data.length} zakat records
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="w-8 h-8"
            >
              <ChevronsLeft className="w-4 h-4" />
              <span className="sr-only">First page</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="sr-only">Previous page</span>
            </Button>

            <div className="flex items-center gap-1 mx-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum = i + 1

                // Adjust page numbers for pagination with more than 5 pages
                if (totalPages > 5) {
                  if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-8 w-8 ${currentPage === pageNum ? "bg-[#EC407A] hover:bg-[#D81B60]" : ""}`}
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-8 h-8"
            >
              <ChevronRight className="w-4 h-4" />
              <span className="sr-only">Next page</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-8 h-8"
            >
              <ChevronsRight className="w-4 h-4" />
              <span className="sr-only">Last page</span>
            </Button>
          </div>

          <Select value={rowsPerPage.toString()} onValueChange={setRowsPerPage}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Edit Modal */}
      {editingRecord && (
        <EditRecordModal
          record={editingRecord}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveRecord}
        />
      )}
    </div>
  )
}
