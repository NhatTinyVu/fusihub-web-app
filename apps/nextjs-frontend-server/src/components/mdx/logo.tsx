import { Logo as LogoComponent } from "@fusihub/ui";

const Logo = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex h-52 w-full items-center justify-center rounded-lg bg-white">
        <LogoComponent theme="light" width={48} height={48} />
      </div>
      <div className="flex h-52 w-full items-center justify-center rounded-lg bg-black">
        <LogoComponent theme="dark" width={48} height={48} />
      </div>
    </div>
  );
};

export default Logo;
