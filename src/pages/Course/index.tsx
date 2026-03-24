import { Sidebar } from "./components/Sidebar";
import { ContentHeader } from "./components/ContentHeader";
import { VideoBlock } from "./components/VideoBlock";
import { TheoryContent } from "./components/TheoryContent";
import { NavigationFooter } from "./components/NavigationFooter";
import { StickyHeader } from "./components/StickyHeader";

export default function Course() {
  return (
    <div className="min-h-screen bg-white flex mt-16">
      {/* Sidebar (Desktop - sticky, Mobile - fixed с управлением внутри компонента) */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <StickyHeader />

        <div
          className="max-w-[1100px] mx-auto px-12 py-10 
        max-sm:px-4 max-sm:py-6"
        >
          <ContentHeader />
          <VideoBlock hasVideo={true} duration="12:45" />
          <TheoryContent />
          <NavigationFooter />
        </div>
      </main>
    </div>
  );
}
