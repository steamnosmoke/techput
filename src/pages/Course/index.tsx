import { Sidebar } from './components/Sidebar';
import { ContentHeader } from './components/ContentHeader';
import { VideoBlock } from './components/VideoBlock';
import { TheoryContent } from './components/TheoryContent';
import { NavigationFooter } from './components/NavigationFooter';
import { StickyHeader } from './components/StickyHeader';

export default function Course() {
  return (
    <div className="min-h-screen bg-white flex mt-16">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Sticky Header (appears on scroll) */}
        <StickyHeader />

        <div className="max-w-[1100px] mx-auto px-12 py-10">
          {/* Content Header */}
          <ContentHeader />

          {/* Video Block */}
          <VideoBlock hasVideo={true} duration="12:45" />

          {/* Theory Content */}
          <TheoryContent />
          {/* Navigation Footer */}
          <NavigationFooter />
        </div>
      </main>
    </div>
  );
}
