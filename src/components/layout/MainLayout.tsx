import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
interface MainLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}
export function MainLayout({ sidebar, children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div className="relative">
        <div className="absolute top-4 left-4 z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              {sidebar}
            </SheetContent>
          </Sheet>
        </div>
        <main>{children}</main>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex">
        <div className="hidden md:block md:sticky top-0 h-screen">
          {sidebar}
        </div>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}