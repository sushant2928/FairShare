const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-zinc-800 h-screen flex items-center justify-center p-4">
      {children}
    </div>
  );
};

export default Layout;
