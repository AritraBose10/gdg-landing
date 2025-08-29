'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Calendar, Check, ChevronLeft, ChevronRight, Code, Filter, Github, Hash, Layers, Link as LinkIcon, Linkedin, Mail, Menu, Phone, Search, User, Users, X, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Loader from '../../components/Loader';


const allYears = ['2nd Year', '3rd Year', '4th Year'];
const allDomains = [

    { value: 'ai-ml', label: 'AI/ML' },
    { value: 'cloud', label: 'Cloud' },
    { value: 'web-dev', label: 'Web Development' },
    { value: 'android-dev', label: 'Android' },
    { value: 'web3', label: 'Web3' },
    { value: 'dsa', label: 'DSA' },
    { value: 'robotics', label: 'Robotics' },
    { value: 'cybersec', label: 'CyberSecurity' },
    { value: 'gamedev', label: 'Game Development' },
    { value: 'public-relations', label: 'Public Relations and Outreach' },
    { value: 'social-media', label: 'Social Media Handling' },
    { value: 'creative-media', label: 'Creative Media' },
    { value: 'operations', label: 'Operations and Management' },
    { value: 'design', label: 'Design' },
];




// --- UI Components ---
const SidebarFilterButton = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100'
            }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);


const FilterDropdown = ({ options, value, onChange, placeholder }) => (
    <div className="relative">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none w-full bg-white text-gray-700 text-sm font-medium px-4 py-2 pr-10 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            <option value="All">{placeholder}</option>
            {options.map(opt => (
                <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
            ))}
        </select>
        <Filter size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
);

const InfoField = ({ icon, label, value, color }) => (
    <div className="flex items-center text-sm">
        <div className={`flex-shrink-0 w-5 ${color}`}>{icon}</div>
        <div className="ml-3 truncate">
            <p className="font-medium text-gray-800 truncate">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
        </div>
    </div>
);

const SkillPill = ({ skill }) => (
    <div className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium border border-gray-200">
        {skill}
    </div>
);

// Main Page Component for Next.js
export default function ApplicantReviewPage() {
    const [candidates, setCandidates] = useState<any[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({ roleType: 'All', status: 'All', domain: 'All', year: 'All' });
    const [searchQuery, setSearchQuery] = useState('');
    const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
    const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
        // FIX: Use optional chaining to prevent crashes if 'name' is missing.
        const searchMatch = c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? true;

        const roleMatch = filters.roleType === 'All' || c.type === filters.roleType;
        const statusMatch = filters.status === 'All' || c.status === filters.status;
        const yearMatch = filters.year === 'All' || c.year === filters.year;

        // FIX: Use optional chaining to prevent crashes if 'domain' is missing.
        const domainMatch = filters.domain === 'All' || c.domain?.some(d => d.value === filters.domain);
        
        return searchMatch && roleMatch && statusMatch && yearMatch && domainMatch;
    });
}, [candidates, filters, searchQuery]);

   useEffect(() => {
    const fetchCandidates = async () => {
        try {
            const response = await fetch('/api/applications');
            if (!response.ok) {
                throw new Error('Failed to fetch applicants. Are you logged in?');
            }
            const rawData = await response.json();

            // Normalize the raw data to create a consistent structure
            const normalizedData = rawData.map((c, index) => ({
                // Spread the original data first
                ...c,
                // Now, provide fallbacks and unify properties.
                // This will add or overwrite properties to ensure they always exist.
                id: c.id || `generated-id-${index}`,
                name: c.name || 'No Name',
                avatar: c.avatar || '',
                role: c.role || 'Applicant',
                domain: c.domain || [],
                skills: c.skills || [], // CRITICAL: Prevents crashes by ensuring skills is always an array
                batchYear: c.batchYear || c.batch || 'N/A', // Unifies batch and batchYear
            }));

            // Use the clean, normalized data to set the state
            const savedDecisions = JSON.parse(localStorage.getItem('candidateDecisions_v6') || '{}');
            setCandidates(normalizedData.map((c) => ({
                ...c,
                status: savedDecisions[c.id] || 'Pending' // All new candidates get a 'Pending' status
            })));

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    fetchCandidates();
}, []);
            // 3. Use the clean, normalized data to set your state
            const savedDecisions = JSON.parse(localStorage.getItem('candidateDecisions_v6') || '{}');
            setCandidates(normalizedData.map((c) => ({ ...c, status: savedDecisions[c.id] || 'Pending' })));

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    fetchCandidates();
}, []);







useEffect(() => {
    if (currentIndex[0] >= filteredCandidates.length && filteredCandidates.length > 0) {
        setCurrentIndex([filteredCandidates.length - 1, -1]);
    }
}, [filteredCandidates, currentIndex]);

    const currentCandidate = filteredCandidates[currentIndex[0]];

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                <h2 className="text-2xl font-bold">Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    // In your paginate function
const paginate = (newDirection) => {
    // Get the current index from the state array
    const currentIdx = currentIndex[0];
    const newIndex = currentIdx + newDirection;

    // Check if the new index is within the valid range (0 to length-1)
    if (newIndex < 0 || newIndex >= filteredCandidates.length) {
        return; // If not, do nothing and exit the function
    }

    // If the new index is valid, update the state
    setCurrentIndex([newIndex, newDirection]);
};

    const handleDecision = (id, newStatus) => {
        paginate(1);
        setTimeout(() => {
            setCandidates(prev => {
                const newCandidates = prev.map(c => c.id === id ? { ...c, status: newStatus } : c);
                const decisions = newCandidates.reduce((acc, c) => {
                    if (c.status !== 'Pending') acc[c.id] = c.status;
                    return acc;
                }, {});
                localStorage.setItem('candidateDecisions_v7', JSON.stringify(decisions));
                return newCandidates;
            });
        }, 200);
    };

    const cardVariants = {
        enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0, scale: 0.9, rotateY: direction > 0 ? -30 : 30 }),
        center: { zIndex: 1, x: 0, opacity: 1, scale: 1, rotateY: 0 },
        exit: (direction) => ({ zIndex: 0, x: direction < 0 ? '100%' : '-100%', opacity: 0, scale: 0.9, rotateY: direction < 0 ? 30 : -30 }),
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

                body {
                    font-family: 'Roboto', sans-serif;
                    overflow:hidden;
                }

                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }

                .bg-shape1 { animation: float 15s ease-in-out infinite; }
                .bg-shape2 { animation: float 20s ease-in-out infinite; }
                .bg-shape3 { animation: float 25s ease-in-out infinite; }
            `}</style>
            <div className="min-h-screen w-full bg-[#f8f9fa] flex overflow-hidden relative">
                {/* --- Animated Background Shapes --- */}
                <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
                    <div className="absolute bg-shape1 w-96 h-96 bg-[#4285F4]/10 rounded-full -top-40 -left-40 filter blur-3xl"></div>
                    <div className="absolute bg-shape2 w-80 h-80 bg-[#DB4437]/10 rounded-full -bottom-20 -right-20 filter blur-3xl"></div>
                    <div className="absolute bg-shape3 w-72 h-72 bg-[#F4B400]/10 rounded-full bottom-40 left-20 filter blur-3xl"></div>
                </div>

                {/* --- Sidebar --- */}
                <aside className={`bg-white/70 backdrop-blur-lg border-r border-gray-200 transition-all duration-300 ease-in-out z-30 ${sidebarOpen ? 'w-64 p-4' : 'w-0 p-0 overflow-hidden'}`}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                        <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-800"><XCircle size={20} /></button>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">Role Type</h3>
                            <div className="space-y-2">
                                <SidebarFilterButton label="All Roles" icon={<Briefcase size={18} />} isActive={filters.roleType === 'All'} onClick={() => setFilters(f => ({ ...f, roleType: 'All' }))} />
                                <SidebarFilterButton label="Technical" icon={<Code size={18} />} isActive={filters.roleType === 'Technical'} onClick={() => setFilters(f => ({ ...f, roleType: 'Technical' }))} />
                                <SidebarFilterButton label="Non-Technical" icon={<Users size={18} />} isActive={filters.roleType === 'Non-Technical'} onClick={() => setFilters(f => ({ ...f, roleType: 'Non-Technical' }))} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">Status</h3>
                            <div className="space-y-2">
                                <SidebarFilterButton label="All Status" icon={<Layers size={18} />} isActive={filters.status === 'All'} onClick={() => setFilters(f => ({ ...f, status: 'All' }))} />
                                <SidebarFilterButton label="Pending" icon={<Layers size={18} />} isActive={filters.status === 'Pending'} onClick={() => setFilters(f => ({ ...f, status: 'Pending' }))} />
                                <SidebarFilterButton label="Accepted" icon={<Check size={18} />} isActive={filters.status === 'Accepted'} onClick={() => setFilters(f => ({ ...f, status: 'Accepted' }))} />
                                <SidebarFilterButton label="Rejected" icon={<X size={18} />} isActive={filters.status === 'Rejected'} onClick={() => setFilters(f => ({ ...f, status: 'Rejected' }))} />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* --- Main Content --- */}
                <div className="flex-1 flex flex-col">
                    <header className="w-full bg-white/70 backdrop-blur-lg border-b border-gray-200 p-4 z-20">
                        <div className="flex justify-between items-center gap-4">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                                    <Menu size={22} />
                                </button>
                                <h1 className="text-2xl font-bold text-gray-800 tracking-tight hidden sm:block">Applicant Review</h1> <p className="text-gray-600 font-medium">
                                    <p>
    {currentCandidate ? `Candidate ${currentIndex[0] + 1} of ${filteredCandidates.length}` : 'No candidates to display'}
</p>                                </p>
                            </div>
                            <div className="flex flex-wrap justify-end items-center gap-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search by name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-40 sm:w-48 bg-white text-gray-700 text-sm font-medium px-4 py-2 pl-10 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    />
                                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                                <div className="hidden md:flex items-center gap-2">
                                    <FilterDropdown options={allDomains} value={filters.domain} onChange={(v) => setFilters(f => ({ ...f, domain: v }))} placeholder="All Domains" />
                                    <FilterDropdown options={allYears} value={filters.year} onChange={(v) => setFilters(f => ({ ...f, year: v }))} placeholder="All Years" />
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 relative" style={{ perspective: '2000px' }}>
                        <div className="w-full max-w-md h-[640px] relative">
                            <AnimatePresence initial={false} custom={direction}>
                                {currentCandidate ? (
                                    <motion.div
                                        key={currentCandidate.id}
                                        custom={direction}
                                        variants={cardVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.5 }}
                                        className="absolute w-full h-full bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col p-6"
                                    >
                                        <div className="flex items-center gap-5 mb-5">
                                            <img className="w-24 h-24 rounded-full shadow-lg border-4 border-white" src={currentCandidate.avatar} alt={currentCandidate.name} onError={(e) => {
                                                e.currentTarget.onerror = null; // Corrected
                                                // Fallback to a placeholder if the avatar image fails to load
                                                e.currentTarget.src = `https://placehold.co/96x96/EBF4FF/7F9CF5?text=${currentCandidate.name.charAt(0)}`;
                                            }} />
                                            <div>
                                                <h2 className="text-3xl font-bold text-gray-900">{currentCandidate.name}</h2>
                                                <p className="text-lg text-gray-600 font-medium">{currentCandidate.role}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-5">
                                            <InfoField icon={<User size={20} />} label="Student ID" value={currentCandidate.studentId} color="text-blue-500" />
                                            <InfoField icon={<Layers size={20} />} label="Batch" value={currentCandidate.batchYear} color="text-yellow-500" />
                                            <InfoField icon={<Calendar size={20} />} label="Year" value={currentCandidate.year} color="text-red-500" />
                                            <InfoField icon={<Hash size={20} />} label="Type" value={currentCandidate.type} color="text-green-500" />
                                            <InfoField icon={<Mail size={20} />} label="Email" value={currentCandidate.email} color="text-blue-500" />
                                            <InfoField icon={<Phone size={20} />} label="Phone" value={currentCandidate.phoneNumber} color="text-yellow-500" />
                                        </div>

                                        <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                                            <div>
                                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Domains</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {currentCandidate.domain.length > 0 ? currentCandidate.domain.map(d => <SkillPill key={d.value} skill={d.label} />) : <p className="text-sm text-gray-400">No domains listed</p>}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Skills</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {currentCandidate.skills.map((skill, index) => {
                                                        // Check if the skill is an object with a label, or just a string
                                                        const skillLabel = typeof skill === 'object' && skill.label ? skill.label : skill;
                                                        const key = typeof skill === 'object' && skill.value ? skill.value : `${skill}-${index}`;

                                                        return <SkillPill key={key} skill={skillLabel} />;
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center gap-6 my-5 text-gray-500">
                                            <a href={currentCandidate.experiences} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><LinkIcon size={24} /></a>
                                            <a href={currentCandidate.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><Linkedin size={24} /></a>
                                            {currentCandidate.github && <a href={currentCandidate.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><Github size={24} /></a>}
                                        </div>

                                        <div className="flex justify-center space-x-4">
                                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleDecision(currentCandidate.id, 'Rejected')} className="w-1/2 flex items-center justify-center py-3.5 text-base font-bold rounded-full text-white bg-red-500 hover:bg-red-600 transition-all duration-200 shadow-md"><X className="mr-2 h-5 w-5" />Reject</motion.button>
                                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleDecision(currentCandidate.id, 'Accepted')} className="w-1/2 flex items-center justify-center py-3.5 text-base font-bold rounded-full text-white bg-green-500 hover:bg-green-600 transition-all duration-200 shadow-md"><Check className="mr-2 h-5 w-5" />Accept</motion.button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full text-center bg-white rounded-3xl shadow-2xl p-8">
                                        <Search size={64} className="text-gray-300 mb-4" />
                                        <h3 className="text-2xl font-bold text-gray-800">No Candidates Found</h3>
                                        <p className="text-gray-500 mt-2">Your search and filters did not match any applicants.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={() => paginate(-1)}
    // FIX: Disable if it's the FIRST card OR if there are no candidates
    disabled={currentIndex[0] === 0 || !currentCandidate}
    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
>
    <ChevronLeft className="h-6 w-6 text-gray-700" />
</motion.button>

<motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={() => paginate(1)}
    // FIX: Disable if it's the LAST card OR if there are no candidates
    disabled={currentIndex[0] === filteredCandidates.length - 1 || !currentCandidate}
    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
>
    <ChevronRight className="h-6 w-6 text-gray-700" />
</motion.button>
                    </main>




                </div>
            </div>
        </>
    );
}
