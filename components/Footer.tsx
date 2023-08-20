import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-top border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <div className="flex justify-between items-center">
            <Image src="/recipe-book-icon.svg" alt="logo" width={20} height={20} className="object-contain" />
            <div className="text-[27px] text-black-100 py-5 px-3">
              RecipeMix
            </div>
          </div>
          <p className="text-base text-gray-500">
            RecipeMix 2023 <br/>
            All rights reserved &copy;
          </p>
        </div>

        <div className="footer__links">
          {footerLinks.map((link) => (
            <div key={link.title} className="footer__link">
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <Link 
                  key={item.title}
                  href={item.url}
                  className="text-gray-500"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer