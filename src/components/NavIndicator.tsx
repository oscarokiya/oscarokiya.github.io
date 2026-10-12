export const NavIndicator = () => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
      <div className="bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-primary animate-pulse">
        Hover top for navigation
      </div>
    </div>
  );
};