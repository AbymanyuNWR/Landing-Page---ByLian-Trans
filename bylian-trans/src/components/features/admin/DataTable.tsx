"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreHorizontal, Filter } from "lucide-react";

interface Column {
    header: string;
    accessor: string;
    render?: (val: any, row: any) => React.ReactNode;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    searchPlaceholder?: string;
}

export function DataTable({ columns, data, searchPlaceholder = "Search..." }: DataTableProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = data.filter((row) =>
        Object.values(row).some(
            v => String(v).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
                <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-600 font-medium text-xs uppercase tracking-wider border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 rounded-tl-xl w-10">#</th>
                            {columns.map((col, idx) => (
                                <th key={idx} className="px-6 py-4">{col.header}</th>
                            ))}
                            <th className="px-6 py-4 rounded-tr-xl text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredData.length > 0 ? (
                            filteredData.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">{rIdx + 1}</td>
                                    {columns.map((col, cIdx) => (
                                        <td key={cIdx} className="px-6 py-4 text-slate-700">
                                            {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 2} className="px-6 py-12 text-center text-slate-500">
                                    Tidak ada data yang ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
                <span>Menampilkan 1 hingga {Math.min(filteredData.length, 10)} dari {filteredData.length} entri</span>
                <div className="flex gap-1">
                    <button className="px-3 py-1 border border-slate-200 bg-white rounded-md disabled:opacity-50 text-slate-800">Prev</button>
                    <button className="px-3 py-1 bg-primary text-white rounded-md font-medium">1</button>
                    <button className="px-3 py-1 border border-slate-200 bg-white rounded-md text-slate-800">Next</button>
                </div>
            </div>
        </div>
    );
}
