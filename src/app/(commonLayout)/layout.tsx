import { Navbar } from "@/components/layout/Navbar";

export default function CommonLayout({children}:{children:React.ReactNode}){
    return(
        <div>
              <div>
                  <Navbar/>
                 
              </div>
            {children}
        </div>
    )
}