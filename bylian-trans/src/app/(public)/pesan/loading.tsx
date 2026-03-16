export default function PesanLoading() {
    return (
        <div className="min-h-screen bg-slate-50 pt-10 pb-20 px-4 md:px-0">
            <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
                
                {/* Header Skeleton */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="h-4 w-32 bg-slate-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-10 w-3/4 max-w-md bg-slate-200 rounded-2xl mx-auto mb-4"></div>
                    <div className="h-4 w-2/3 max-w-sm bg-slate-200 rounded-full mx-auto"></div>
                </div>

                {/* Progress Bar Skeleton */}
                <div className="max-w-3xl mx-auto mb-10 flex justify-between gap-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0"></div>
                                <div className="h-3 w-16 bg-slate-200 rounded-full hidden sm:block"></div>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full"></div>
                        </div>
                    ))}
                </div>

                {/* Booking Content Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Left/Main Content Skeleton */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-slate-100 h-96">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-6 mb-6">
                                <div className="h-6 w-48 bg-slate-200 rounded-xl"></div>
                                <div className="h-6 w-24 bg-slate-200 rounded-xl"></div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-16 w-full bg-slate-50 border border-slate-100 rounded-2xl"></div>
                                <div className="h-16 w-full bg-slate-50 border border-slate-100 rounded-2xl"></div>
                                <div className="h-16 w-full bg-slate-50 border border-slate-100 rounded-2xl"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right/Summary Sidebar Skeleton */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-slate-100 h-80 sticky top-24">
                            <div className="h-6 w-32 bg-slate-200 rounded-xl mb-6"></div>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between">
                                    <div className="h-4 w-24 bg-slate-100 rounded-full"></div>
                                    <div className="h-4 w-16 bg-slate-100 rounded-full"></div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="h-4 w-32 bg-slate-100 rounded-full"></div>
                                    <div className="h-4 w-20 bg-slate-100 rounded-full"></div>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-slate-100">
                                    <div className="h-6 w-24 bg-slate-200 rounded-xl"></div>
                                    <div className="h-6 w-32 bg-slate-200 rounded-xl"></div>
                                </div>
                            </div>
                            <div className="h-14 w-full bg-slate-200 rounded-2xl"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
