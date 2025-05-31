import { HeroSection } from '@/components/sections/hero-section'
import { DashboardStats } from '@/components/sections/dashboard-stats'
import { QuickAccess } from '@/components/sections/quick-access'
import { RecentActivity } from '@/components/sections/recent-activity'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeroSection />
      <div className="border-t">
        <DashboardStats />
      </div>
      <div className="border-t bg-muted/30">
        <QuickAccess />
      </div>
      <div className="border-t">
        <RecentActivity />
      </div>
    </main>
  );
}
