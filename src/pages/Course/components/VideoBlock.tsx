import { Play, Clock } from 'lucide-react';

interface VideoBlockProps {
  hasVideo?: boolean;
  duration?: string;
  thumbnail?: string;
}

export const VideoBlock = ({
  hasVideo = true,
  duration = '12:45',
}: VideoBlockProps) => {
  if (!hasVideo) {
    return (
      <div className="w-full aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center mb-10">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Play className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg">Видео к этому уроку будет добавлено позже</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-[#0C0D33] rounded-2xl overflow-hidden shadow-xl mb-10 relative group cursor-pointer">
      {/* Thumbnail Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C0D33] to-[#1a1b4b]" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
          <Play className="w-8 h-8 text-[#DD6207] ml-1" fill="#DD6207" />
        </div>
      </div>

      {/* Duration Badge */}
      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
        <Clock className="w-4 h-4 text-white" />
        <span className="text-white text-sm font-medium">{duration}</span>
      </div>

      {/* Caption */}
      <div className="absolute bottom-4 left-4 bg-[#DD6207] px-4 py-2 rounded-lg">
        <span className="text-white text-sm font-medium">Практический разбор</span>
      </div>
    </div>
  );
};
