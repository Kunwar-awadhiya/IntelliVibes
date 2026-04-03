import { MapPin, DollarSign, Calendar, ExternalLink, Bookmark, Clock, Briefcase } from "lucide-react";

interface InternshipCardProps {
  data: {
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
  };
  index: number;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export default function InternshipCard({ data, index, isSaved = false, onToggleSave }: InternshipCardProps) {
  
  const roleColors: { [key: string]: { bg: string; text: string; border: string } } = {
    Technology: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    Marketing: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    Finance: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    Design: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
  };

  const roleStyle = roleColors[data.role] || roleColors.Technology;

  const getPostedText = (days?: number) => {
    if (!days) return 'New';
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    return `${Math.floor(days / 7)} weeks ago`;
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group relative overflow-hidden"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
      }}
    >
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
        <div className="flex-1 min-w-0">
          {/* Company & Platform */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-900">{data.company}</span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{data.platform}</span>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {data.title}
          </h3>
        </div>

        {/* Save Button */}
        <button
          onClick={onToggleSave}
          className={`p-2.5 rounded-xl transition-all hover:scale-110 ${
            isSaved 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
          }`}
          title={isSaved ? 'Remove from saved' : 'Save internship'}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Role Badge & Posted Time */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${roleStyle.bg} ${roleStyle.text} rounded-lg text-sm font-medium border ${roleStyle.border}`}>
          <Briefcase className="w-3.5 h-3.5" />
          {data.role}
        </span>
        {data.postedDays !== undefined && (
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg ${
            data.postedDays <= 2 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-gray-50 text-gray-600 border border-gray-200'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            {getPostedText(data.postedDays)}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {data.description}
      </p>

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {data.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm">
          <div className="p-2 bg-blue-50 rounded-lg">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Location</div>
            <div className="font-semibold text-gray-900">{data.location}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Stipend</div>
            <div className="font-semibold text-gray-900">₹{data.stipend.toLocaleString()}/mo</div>
          </div>
        </div>

        {data.duration && (
          <div className="flex items-center gap-2 text-sm col-span-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Duration</div>
              <div className="font-semibold text-gray-900">{data.duration}</div>
            </div>
          </div>
        )}
      </div>

      {/* Apply Button */}
      <a
        href={data.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg group/btn"
      >
        Apply Now
        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
      </a>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
