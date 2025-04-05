import MainLayout from "@/components/layout/main-layout";

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return <MainLayout>{children}</MainLayout>;
}
