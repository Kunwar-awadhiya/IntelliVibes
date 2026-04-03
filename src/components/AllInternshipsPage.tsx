'use client'

import { useState, useMemo } from "react";
import InternshipCard from "@/components/InternshipCard";
import { Search, SlidersHorizontal, X, TrendingUp, Bookmark, MapPin, Briefcase, DollarSign, Clock } from "lucide-react";

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  role: string;
  applyLink: string;
  platform: string;
  description: string;
  stipend: number;
  remote: boolean;
  duration?: string;
  skills?: string[];
  postedDays?: number;
}

export default function AllInternshipsPage() {

  const mockInternships: Internship[] = [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'TechNova',
      location: 'Remote',
      role: 'Technology',
      applyLink: '#',
      platform: 'LinkedIn',
      description: 'Build scalable frontend apps using React.',
      stipend: 2000,
      remote: true,
      duration: '3 months',
      skills: ['React', 'TypeScript', 'Tailwind'],
      postedDays: 2
    },
    {
      id: '2',
      title: 'Marketing Intern',
      company: 'Brandify',
      location: 'Delhi',
      role: 'Marketing',
      applyLink: '#',
      platform: 'Internshala',
      description: 'Handle digital campaigns and growth.',
      stipend: 1200,
      remote: false,
      duration: '6 months',
      skills: ['SEO', 'Social Media', 'Analytics'],
      postedDays: 5
    },
    {
      id: '3',
      title: 'Data Analyst Intern',
      company: 'DataPeak',
      location: 'Bangalore',
      role: 'Technology',
      applyLink: '#',
      platform: 'Indeed',
      description: 'Analyze business data and build dashboards.',
      stipend: 2500,
      remote: false,
      duration: '6 months',
      skills: ['Python', 'SQL', 'PowerBI'],
      postedDays: 1
    },
    {
      id: '4',
      title: 'Finance Intern',
      company: 'FinEdge',
      location: 'Mumbai',
      role: 'Finance',
      applyLink: '#',
      platform: 'Naukri',
      description: 'Assist in financial modelling.',
      stipend: 1500,
      remote: false,
      duration: '4 months',
      skills: ['Excel', 'Finance', 'Modeling'],
      postedDays: 3
    },
    {
      id: '5',
      title: 'UI/UX Designer',
      company: 'Creative Labs',
      location: 'Remote',
      role: 'Design',
      applyLink: '#',
      platform: 'Unstop',
      description: 'Design intuitive user experiences.',
      stipend: 1800,
      remote: true,
      duration: '3 months',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      postedDays: 4
    },
    {
      id: '6',
      title: 'Backend Developer Intern',
      company: 'CloudSys',
      location: 'Pune',
      role: 'Technology',
      applyLink: '#',
      platform: 'LinkedIn',
      description: 'Develop robust backend systems.',
      stipend: 2200,
      remote: false,
      duration: '6 months',
      skills: ['Node.js', 'MongoDB', 'AWS'],
      postedDays: 1
    },
    {
      id: '7',
      title: 'Content Writing Intern',
      company: 'MediaHub',
      location: 'Remote',
      role: 'Marketing',
      applyLink: '#',
      platform: 'Internshala',
      description: 'Create engaging content for blogs.',
      stipend: 1000,
      remote: true,
      duration: '3 months',
      skills: ['Content Writing', 'SEO', 'Research'],
      postedDays: 7
    },
    {
      id: '8',
      title: 'Business Analyst Intern',
      company: 'ConsultPro',
      location: 'Hyderabad',
      role: 'Finance',
      applyLink: '#',
      platform: 'Naukri',
      description: 'Analyze business processes and strategies.',
      stipend: 1800,
      remote: false,
      duration: '5 months',
      skills: ['Excel', 'SQL', 'Business Analysis'],
      postedDays: 6
    }
  ];

  const platforms = ['LinkedIn', 'Internshala', 'Unstop', 'Naukri', 'Indeed'];
  const roles = ['Technology', 'Marketing', 'Finance', 'Design'];
  const locations = ['Remote', 'Delhi', 'Bangalore', 'Mumbai', 'Pune', 'Hyderabad'];
  const stipendRanges = [
    { label: 'Any', min: 0, max: Infinity },
    { label: '₹1000-1500', min: 1000, max: 1500 },
    { label: '₹1500-2000', min: 1500, max: 2000 },
    { label: '₹2000+', min: 2000, max: Infinity }
  ];

  const [search, setSearch] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [stipendRange, setStipendRange] = useState(stipendRanges[0]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'stipend-high' | 'stipend-low'>('recent');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [savedInternships, setSavedInternships] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'all' | 'saved'>('all');

  const toggleSelection = (value: string, state: string[], setState: any) => {
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const toggleSave = (id: string) => {
    setSavedInternships(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const clearAllFilters = () => {
    setSelectedPlatform([]);
    setSelectedRole([]);
    setSelectedLocation([]);
    setStipendRange(stipendRanges[0]);
    setRemoteOnly(false);
    setSearch("");
  };

  const activeFiltersCount = 
    selectedPlatform.length + 
    selectedRole.length + 
    selectedLocation.length + 
    (stipendRange.label !== 'Any' ? 1 : 0) +
    (remoteOnly ? 1 : 0);

  const filteredAndSortedInternships = useMemo(() => {
    let filtered = mockInternships.filter((intern) => {
      const matchesSearch = 
        intern.title.toLowerCase().includes(search.toLowerCase()) ||
        intern.company.toLowerCase().includes(search.toLowerCase()) ||
        intern.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesPlatform = selectedPlatform.length === 0 || selectedPlatform.includes(intern.platform);
      const matchesRole = selectedRole.length === 0 || selectedRole.includes(intern.role);
      const matchesLocation = selectedLocation.length === 0 || selectedLocation.includes(intern.location);
      const matchesStipend = intern.stipend >= stipendRange.min && intern.stipend <= stipendRange.max;
      const matchesRemote = !remoteOnly || intern.remote;
      const matchesView = viewMode === 'all' || savedInternships.includes(intern.id);

      return matchesSearch && matchesPlatform && matchesRole && matchesLocation && matchesStipend && matchesRemote && matchesView;
    });

    // Sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => (a.postedDays || 0) - (b.postedDays || 0));
    } else if (sortBy === 'stipend-high') {
      filtered.sort((a, b) => b.stipend - a.stipend);
    } else if (sortBy === 'stipend-low') {
      filtered.sort((a, b) => a.stipend - b.stipend);
    }

    return filtered;
  }, [mockInternships, search, selectedPlatform, selectedRole, selectedLocation, stipendRange, remoteOnly, sortBy, viewMode, savedInternships]);

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <X className="w-4 h-4" />
          Clear all filters ({activeFiltersCount})
        </button>
      )}

      {/* Remote Toggle - Prominent */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={remoteOnly}
            onChange={() => setRemoteOnly(!remoteOnly)}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              Remote Only
            </span>
          </div>
        </label>
      </div>

      {/* Stipend Range */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-900">
          <DollarSign className="w-4 h-4" />
          Stipend Range
        </h3>
        <div className="space-y-2">
          {stipendRanges.map(range => (
            <label key={range.label} className="flex items-center gap-3 cursor-pointer group py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="stipend"
                checked={stipendRange.label === range.label}
                onChange={() => setStipendRange(range)}
                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Platform Filter */}
      <div>
        <h3 className="font-semibold mb-3 text-gray-900">Platforms</h3>
        <div className="space-y-2">
          {platforms.map(platform => (
            <label key={platform} className="flex items-center gap-3 cursor-pointer group py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={selectedPlatform.includes(platform)}
                onChange={() => toggleSelection(platform, selectedPlatform, setSelectedPlatform)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                {platform}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Role Filter */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-900">
          <Briefcase className="w-4 h-4" />
          Roles
        </h3>
        <div className="space-y-2">
          {roles.map(role => (
            <label key={role} className="flex items-center gap-3 cursor-pointer group py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={selectedRole.includes(role)}
                onChange={() => toggleSelection(role, selectedRole, setSelectedRole)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                {role}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-900">
          <MapPin className="w-4 h-4" />
          Location
        </h3>
        <div className="space-y-2">
          {locations.map(location => (
            <label key={location} className="flex items-center gap-3 cursor-pointer group py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={selectedLocation.includes(location)}
                onChange={() => toggleSelection(location, selectedLocation, setSelectedLocation)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                {location}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">

      {/* Top Section - Enhanced */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 pt-20 pb-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Discover Your Dream Internship
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Browse hundreds of opportunities from top companies across India
            </p>
          </div>

          {/* Search Bar - Enhanced */}
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-5 top-4 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by role, company, or skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-4 py-4 rounded-2xl text-gray-800 focus:outline-none shadow-2xl border-2 border-transparent focus:border-blue-400 transition-all text-lg"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="text-2xl font-bold">{mockInternships.length}</div>
                <div className="text-sm text-blue-100">Total Opportunities</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="text-2xl font-bold">{mockInternships.filter(i => i.remote).length}</div>
                <div className="text-sm text-blue-100">Remote Positions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="text-2xl font-bold">{savedInternships.length}</div>
                <div className="text-sm text-blue-100">Saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        <div className="flex gap-8">

          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </h2>
            </div>
            <FilterSection />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">

            {/* View Tabs & Sort Controls */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* View Tabs */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      viewMode === 'all'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Internships
                  </button>
                  <button
                    onClick={() => setViewMode('saved')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      viewMode === 'saved'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    Saved ({savedInternships.length})
                  </button>
                </div>

                {/* Sort & Mobile Filter */}
                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>

                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="stipend-high">Highest Stipend</option>
                    <option value="stipend-low">Lowest Stipend</option>
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-gray-900">{filteredAndSortedInternships.length}</span> 
                  {viewMode === 'saved' ? ' saved internships' : ' internships found'}
                </p>
              </div>
            </div>

            {/* Mobile Filters Overlay */}
            {showMobileFilters && (
              <div className="lg:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)}>
                <div 
                  className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
                    <h2 className="font-bold text-xl">Filters</h2>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6">
                    <FilterSection />
                  </div>
                </div>
              </div>
            )}

            {/* Internship Grid */}
            {filteredAndSortedInternships.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-100">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No internships found</h3>
                <p className="text-gray-600 mb-6">
                  {viewMode === 'saved' 
                    ? "You haven't saved any internships yet. Browse and save your favorites!"
                    : "Try adjusting your filters or search terms"}
                </p>
                {activeFiltersCount > 0 && viewMode !== 'saved' && (
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredAndSortedInternships.map((intern, index) => (
                  <div key={intern.id} className="relative group">
                    <InternshipCard 
                      data={intern} 
                      index={index}
                      isSaved={savedInternships.includes(intern.id)}
                      onToggleSave={() => toggleSave(intern.id)}
                    />
                  </div>
                ))}
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
