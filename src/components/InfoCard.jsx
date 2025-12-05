import React from 'react';

const InfoCard = ({ icon, label, value }) => {
    let theme = "purple"; 
    if (label.toLowerCase().includes("income")) theme = "green";
    if (label.toLowerCase().includes("expense")) theme = "red";

    const themes = {
        purple: { 
            iconColor: "text-purple-400", 
            bgColor: "bg-purple-500/10", 
            borderColor: "border-purple-500/20",
            glowColor: "from-purple-500/20 to-blue-600/20"
        },
        green: { 
            iconColor: "text-emerald-400", 
            bgColor: "bg-emerald-500/10", 
            borderColor: "border-emerald-500/20",
            glowColor: "from-emerald-500/20 to-green-600/20"
        },
        red: { 
            iconColor: "text-rose-400", 
            bgColor: "bg-rose-500/10", 
            borderColor: "border-rose-500/20",
            glowColor: "from-rose-500/20 to-red-600/20"
        }
    };
    
    const t = themes[theme];

    return (
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-xl h-full flex items-center">
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${t.glowColor} blur-2xl opacity-40 group-hover:opacity-70 transition-opacity`}></div>
            
            <div className="relative z-10 flex items-center gap-4 w-full">
                <div className={`w-14 h-14 shrink-0 rounded-2xl ${t.bgColor} border ${t.borderColor} flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:scale-105 transition-transform duration-300`}>
                    <div className={`w-7 h-7 ${t.iconColor} flex items-center justify-center`}>
                        {icon}
                    </div>
                </div>
                
                <div className="flex flex-col justify-center min-w-0">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 truncate">{label}</p>
                    <h3 className="text-2xl font-bold text-white tracking-tight leading-none truncate">
                        ₱{value}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;