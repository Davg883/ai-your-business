'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Book, Download } from "lucide-react";

export const AcademyGrid = () => {
    // Fetch books I own
    const myLibrary = useQuery(api.library.getMyBooks);

    if (myLibrary === undefined) {
        return <div className="text-slate-500">Loading your library...</div>;
    }

    if (myLibrary.length === 0) {
        return (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                <Book className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">Your library is empty</h3>
                <p className="text-slate-500 dark:text-slate-400">Purchased resources and guides will appear here.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {myLibrary.map((item) => (
                <div key={item._id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="aspect-[3/4] bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
                        {item.coverUrl ? (
                            <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <Book size={48} />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <a
                                href={item.fileUrl || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-white text-slate-900 font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-2"
                            >
                                <Download size={18} />
                                Read Manual
                            </a>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1 uppercase tracking-wider">
                            {item.type.replace('_', ' ')}
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
